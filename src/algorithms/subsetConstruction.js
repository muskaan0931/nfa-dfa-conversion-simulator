import { canonicalSubset, subsetKey, displaySubset } from "./automataUtils";

/**
 * NFA shape:
 * {
 *   states: string[],
 *   alphabet: string[],
 *   startState: string,
 *   finalStates: string[],
 *   transitions: [{ from, symbol, to: string[] }]
 * }
 *
 * No epsilon transitions are supported in this version.
 */
export function buildTransitionMap(nfa) {
  const map = new Map();

  for (const state of nfa.states) {
    for (const symbol of nfa.alphabet) {
      map.set(`${state}|||${symbol}`, []);
    }
  }

  for (const transition of nfa.transitions) {
    const key = `${transition.from}|||${transition.symbol}`;
    const current = map.get(key) ?? [];
    map.set(key, [...new Set([...current, ...transition.to])]);
  }

  return map;
}

export function move(nfa, subset, symbol, transitionMap = buildTransitionMap(nfa)) {
  const destinations = new Set();

  for (const state of subset) {
    const next = transitionMap.get(`${state}|||${symbol}`) ?? [];
    next.forEach((s) => destinations.add(s));
  }

  return canonicalSubset([...destinations]);
}

export function isFinalSubset(subset, finalStates) {
  const finals = new Set(finalStates);
  return subset.some((state) => finals.has(state));
}

export function subsetConstruction(nfa) {
  const transitionMap = buildTransitionMap(nfa);
  const startSubset = canonicalSubset([nfa.startState]);
  const startKey = subsetKey(startSubset);

  const subsets = new Map([[startKey, startSubset]]);
  const queue = [startSubset];
  const processed = new Set();
  const transitions = [];
  const steps = [];

  while (queue.length) {
    const current = queue.shift();
    const currentKey = subsetKey(current);

    if (processed.has(currentKey)) continue;
    processed.add(currentKey);

    for (const symbol of nfa.alphabet) {
      const destination = move(nfa, current, symbol, transitionMap);
      const destinationKey = subsetKey(destination);
      const isNew = !subsets.has(destinationKey);

      if (isNew) {
        subsets.set(destinationKey, destination);
        queue.push(destination);
      }

      transitions.push({
        fromKey: currentKey,
        toKey: destinationKey,
        symbol,
      });

      const derivationRows = current.map((state) => ({
        state,
        destinations: transitionMap.get(`${state}|||${symbol}`) ?? [],
      }));

      steps.push({
        index: steps.length + 1,
        fromKey: currentKey,
        fromSubset: current,
        symbol,
        destination,
        destinationKey,
        isNew,
        derivationRows,
        equation:
          destination.length === 0
            ? `${displaySubset(current)} --${symbol}--> ∅`
            : `${displaySubset(current)} --${symbol}--> ${displaySubset(destination)}`,
      });
    }
  }

  // Note: if ∅ was generated it is queued like any other subset, so its
  // self-loops on every symbol are produced by the loop above.

  const subsetList = [...subsets.values()];
  const names = new Map();
  subsetList.forEach((subset, index) => {
    names.set(subsetKey(subset), indexToName(index));
  });

  const dfaStates = subsetList.map((subset) => {
    const key = subsetKey(subset);
    return {
      id: names.get(key),
      key,
      subset,
      label: displaySubset(subset),
      isStart: key === startKey,
      isFinal: isFinalSubset(subset, nfa.finalStates),
      isDead: subset.length === 0,
    };
  });

  const dfaTransitions = transitions
    .filter((t, i, arr) =>
      i === arr.findIndex(
        (x) =>
          x.fromKey === t.fromKey &&
          x.toKey === t.toKey &&
          x.symbol === t.symbol
      )
    )
    .map((t) => ({
      from: names.get(t.fromKey),
      to: names.get(t.toKey),
      fromKey: t.fromKey,
      toKey: t.toKey,
      symbol: t.symbol,
    }));

  return {
    dfaStates,
    dfaTransitions,
    steps,
    startStateId: names.get(startKey),
  };
}

function indexToName(index) {
  let n = index;
  let result = "";
  do {
    result = String.fromCharCode(65 + (n % 26)) + result;
    n = Math.floor(n / 26) - 1;
  } while (n >= 0);
  return result;
}

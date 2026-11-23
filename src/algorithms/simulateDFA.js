export function simulateDFA(dfa, input) {
  const symbols = [...String(input ?? "")];
  const alphabet = new Set(dfa.alphabet);

  for (const symbol of symbols) {
    if (!alphabet.has(symbol)) {
      return {
        valid: false,
        accepted: false,
        error: `Symbol '${symbol}' is not part of the alphabet.`,
        path: [],
      };
    }
  }

  const transitionMap = new Map();
  for (const transition of dfa.transitions) {
    transitionMap.set(`${transition.from}|||${transition.symbol}`, transition.to);
  }

  const statesById = new Map(dfa.states.map((state) => [state.id, state]));
  let current = dfa.startStateId;
  const path = [{ stateId: current, symbol: null }];

  for (const symbol of symbols) {
    const next = transitionMap.get(`${current}|||${symbol}`);

    if (next === undefined) {
      return {
        valid: true,
        accepted: false,
        error: "No DFA transition exists for the current state and symbol.",
        path,
      };
    }

    current = next;
    path.push({ stateId: current, symbol });
  }

  const finalState = statesById.get(current);
  return {
    valid: true,
    accepted: Boolean(finalState?.isFinal),
    finalStateId: current,
    path,
    error: null,
  };
}

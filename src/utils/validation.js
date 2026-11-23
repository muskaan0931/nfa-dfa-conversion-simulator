export function validateNFA(nfa) {
  const errors = [];
  const stateSet = new Set(nfa.states);
  const alphabetSet = new Set(nfa.alphabet);

  if (!nfa.states.length) errors.push("At least one state is required.");
  if (nfa.states.some((s) => !s.trim())) errors.push("State names cannot be empty.");
  if (stateSet.size !== nfa.states.length) errors.push("State names cannot be duplicated.");
  if (nfa.alphabet.some((s) => !s.trim())) errors.push("Alphabet symbols cannot be empty.");
  if (alphabetSet.size !== nfa.alphabet.length) errors.push("Alphabet symbols cannot be duplicated.");
  if (!nfa.alphabet.length) errors.push("At least one alphabet symbol is required.");

  if (!nfa.startState) errors.push("Start state is required.");
  else if (!stateSet.has(nfa.startState)) errors.push(`Start state '${nfa.startState}' does not exist.`);

  for (const finalState of nfa.finalStates) {
    if (!stateSet.has(finalState)) errors.push(`Final state '${finalState}' does not exist.`);
  }

  const seen = new Set();
  for (const [index, transition] of nfa.transitions.entries()) {
    const label = `Transition ${index + 1}`;

    if (!transition.from || !stateSet.has(transition.from)) {
      errors.push(`${label}: source state does not exist.`);
    }
    if (!transition.symbol || !alphabetSet.has(transition.symbol)) {
      errors.push(`${label}: symbol '${transition.symbol || ""}' is not part of the alphabet.`);
    }
    if (!Array.isArray(transition.to) || !transition.to.length) {
      errors.push(`${label}: at least one destination state is required.`);
      continue;
    }

    for (const destination of transition.to) {
      if (!stateSet.has(destination)) {
        errors.push(`${label}: destination state '${destination}' does not exist.`);
      }
    }

    const key = `${transition.from}|||${transition.symbol}`;
    if (seen.has(key)) {
      errors.push(
        `${label}: duplicate transition for ${transition.from} on '${transition.symbol}'. Combine destinations into one row.`
      );
    }
    seen.add(key);
  }

  return { valid: errors.length === 0, errors };
}

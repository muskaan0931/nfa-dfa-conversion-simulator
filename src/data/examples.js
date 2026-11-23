export const EXAMPLES = [
  {
    id: "simple",
    name: "Example 1 — Simple NFA",
    description: "Three-state NFA for the basic subset construction demonstration.",
    states: ["q0", "q1", "q2"],
    alphabet: ["0", "1"],
    startState: "q0",
    finalStates: ["q2"],
    transitions: [
      { from: "q0", symbol: "0", to: ["q0", "q1"] },
      { from: "q0", symbol: "1", to: ["q0"] },
      { from: "q1", symbol: "1", to: ["q2"] }
    ]
  },
  {
    id: "multiple",
    name: "Example 2 — Multiple destinations",
    description: "Several state-symbol pairs branch to multiple destinations.",
    states: ["q0", "q1", "q2", "q3"],
    alphabet: ["0", "1"],
    startState: "q0",
    finalStates: ["q3"],
    transitions: [
      { from: "q0", symbol: "0", to: ["q0", "q1"] },
      { from: "q0", symbol: "1", to: ["q0", "q2"] },
      { from: "q1", symbol: "1", to: ["q3"] },
      { from: "q2", symbol: "0", to: ["q3"] }
    ]
  },
  {
    id: "dead",
    name: "Example 3 — Dead state",
    description: "Missing NFA transitions generate the empty DFA subset.",
    states: ["q0", "q1"],
    alphabet: ["0", "1"],
    startState: "q0",
    finalStates: ["q1"],
    transitions: [
      { from: "q0", symbol: "0", to: ["q1"] },
      { from: "q1", symbol: "1", to: ["q1"] }
    ]
  },
  {
    id: "final",
    name: "Example 4 — Multiple final subsets",
    description: "Several DFA subsets contain the NFA final state.",
    states: ["q0", "q1", "q2"],
    alphabet: ["0", "1"],
    startState: "q0",
    finalStates: ["q1", "q2"],
    transitions: [
      { from: "q0", symbol: "0", to: ["q0", "q1"] },
      { from: "q0", symbol: "1", to: ["q0", "q2"] },
      { from: "q1", symbol: "0", to: ["q1"] },
      { from: "q2", symbol: "1", to: ["q2"] }
    ]
  }
];

export function cloneExample(example) {
  return JSON.parse(JSON.stringify(example));
}

export const DEFAULT_EXAMPLE = EXAMPLES[0];

import { describe, expect, test } from "vitest";
import { subsetConstruction } from "./subsetConstruction";
import { simulateDFA } from "./simulateDFA";

const nfa = {
  states: ["q0", "q1", "q2"],
  alphabet: ["0", "1"],
  startState: "q0",
  finalStates: ["q2"],
  transitions: [
    { from: "q0", symbol: "0", to: ["q0", "q1"] },
    { from: "q0", symbol: "1", to: ["q0"] },
    { from: "q1", symbol: "1", to: ["q2"] }
  ]
};

describe("simulateDFA", () => {
  const built = subsetConstruction(nfa);
  const dfa = {
    ...built,
    states: built.dfaStates,
    transitions: built.dfaTransitions,
    alphabet: nfa.alphabet,
  };

  test("accepts a string that reaches a final subset", () => {
    const result = simulateDFA(dfa, "01");
    expect(result.valid).toBe(true);
    expect(result.accepted).toBe(true);
  });

  test("rejects a string that reaches a non-final subset", () => {
    const result = simulateDFA(dfa, "1");
    expect(result.valid).toBe(true);
    expect(result.accepted).toBe(false);
  });

  test("rejects invalid alphabet symbols with a friendly error", () => {
    const result = simulateDFA(dfa, "2");
    expect(result.valid).toBe(false);
    expect(result.error).toContain("not part of the alphabet");
  });
});

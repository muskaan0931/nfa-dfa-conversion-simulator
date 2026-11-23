import { describe, expect, test } from "vitest";
import { subsetConstruction } from "./subsetConstruction";

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

describe("subsetConstruction", () => {
  test("creates the correct reachable subsets", () => {
    const result = subsetConstruction(nfa);
    expect(result.dfaStates.map((s) => s.label)).toEqual([
      "{q0}",
      "{q0, q1}",
      "{q0, q2}"
    ]);
  });

  test("marks a subset final if it contains an NFA final state", () => {
    const result = subsetConstruction(nfa);
    expect(result.dfaStates.find((s) => s.label === "{q0, q2}").isFinal).toBe(true);
  });

  test("generates a dead state when a transition produces the empty subset", () => {
    const deadNfa = {
      states: ["q0"],
      alphabet: ["0"],
      startState: "q0",
      finalStates: [],
      transitions: []
    };
    const result = subsetConstruction(deadNfa);
    const dead = result.dfaStates.find((s) => s.isDead);
    expect(dead).toBeTruthy();
    expect(result.dfaTransitions.some((t) => t.from === dead.id && t.to === dead.id)).toBe(true);
  });
});

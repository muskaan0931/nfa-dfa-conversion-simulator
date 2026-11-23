import { describe, expect, test } from "vitest";
import { validateNFA } from "./validation";

const valid = {
  states: ["q0", "q1"],
  alphabet: ["0", "1"],
  startState: "q0",
  finalStates: ["q1"],
  transitions: [{ from: "q0", symbol: "0", to: ["q1"] }]
};

describe("validateNFA", () => {
  test("accepts a valid NFA", () => {
    expect(validateNFA(valid).valid).toBe(true);
  });

  test("detects duplicate states", () => {
    expect(validateNFA({ ...valid, states: ["q0", "q0"] }).valid).toBe(false);
  });

  test("detects an invalid transition destination", () => {
    expect(validateNFA({
      ...valid,
      transitions: [{ from: "q0", symbol: "0", to: ["q9"] }]
    }).valid).toBe(false);
  });

  test("detects duplicate state-symbol transition rows", () => {
    expect(validateNFA({
      ...valid,
      transitions: [
        { from: "q0", symbol: "0", to: ["q1"] },
        { from: "q0", symbol: "0", to: ["q0"] }
      ]
    }).valid).toBe(false);
  });
});

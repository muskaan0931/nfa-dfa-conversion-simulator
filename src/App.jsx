import { useMemo, useState } from "react";
import Header from "./components/Header";
import ExampleSelector from "./components/ExampleSelector";
import NFAInput from "./components/NFAInput";
import SubsetConstruction from "./components/SubsetConstruction";
import DFAStates from "./components/DFAStates";
import DFATransitionTable from "./components/DFATransitionTable";
import DFAGraph from "./components/DFAGraph";
import StringTester from "./components/StringTester";
import InfoSection from "./components/InfoSection";
import { DEFAULT_EXAMPLE, EXAMPLES, cloneExample } from "./data/examples";
import { subsetConstruction } from "./algorithms/subsetConstruction";
import { simulateDFA } from "./algorithms/simulateDFA";
import { validateNFA } from "./utils/validation";

const blankNFA = {
  states: ["q0", "q1"],
  alphabet: ["0", "1"],
  startState: "q0",
  finalStates: ["q1"],
  transitions: [
    { from: "q0", symbol: "0", to: ["q1"] }
  ]
};

export default function App() {
  const [nfa, setNfa] = useState(() => cloneExample(DEFAULT_EXAMPLE));
  const [validation, setValidation] = useState(null);
  const [dfa, setDfa] = useState(null);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [testResult, setTestResult] = useState(null);
  const [selectedExample, setSelectedExample] = useState(DEFAULT_EXAMPLE.id);

  const dfaModel = useMemo(() => {
    if (!dfa) return null;
    return {
      ...dfa,
      states: dfa.dfaStates,
      transitions: dfa.dfaTransitions,
      alphabet: nfa.alphabet,
    };
  }, [dfa, nfa.alphabet]);

  const loadExample = (id) => {
    setSelectedExample(id);
    if (!id) return;
    const example = EXAMPLES.find((x) => x.id === id);
    if (!example) return;
    setNfa(cloneExample(example));
    setValidation(null);
    setDfa(null);
    setSteps([]);
    setCurrentStep(0);
    setTestResult(null);
  };

  const reset = () => {
    setNfa(cloneExample(blankNFA));
    setSelectedExample("");
    setValidation(null);
    setDfa(null);
    setSteps([]);
    setCurrentStep(0);
    setTestResult(null);
  };

  const validate = () => {
    const result = validateNFA(nfa);
    setValidation(result);
    return result;
  };

  const convert = () => {
    const result = validateNFA(nfa);
    setValidation(result);
    if (!result.valid) return;

    const resultDFA = subsetConstruction(nfa);
    setDfa(resultDFA);
    setSteps(resultDFA.steps);
    setCurrentStep(0);
    setTestResult(null);

    setTimeout(() => document.getElementById("dfa-output")?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };

  const testString = (input) => {
    if (!dfaModel) return null;
    const result = simulateDFA(dfaModel, input);
    setTestResult(result);
    return result;
  };

  const canConvert = Boolean(validation?.valid);

  return (
    <div className="app-shell">
      <Header onReset={reset} />

      <main className="main">
        <section className="hero">
          <div>
            <div className="hero-kicker">Interactive academic simulator</div>
            <h2>Understand how an NFA becomes a DFA.</h2>
            <p>Define an NFA, validate it, watch subset construction derive every reachable DFA state, inspect the graph, and test strings on the result.</p>
          </div>
          <div className="hero-equation">
            <span>NFA</span><b>→</b><span>DFA</span>
            <small>Subset Construction</small>
          </div>
        </section>

        <ExampleSelector examples={EXAMPLES} value={selectedExample} onChange={loadExample} />

        <NFAInput
          nfa={nfa}
          setNfa={setNfa}
          onValidate={validate}
          onConvert={convert}
          validation={validation}
          canConvert={canConvert}
        />

        {steps.length > 0 && <SubsetConstruction steps={steps} currentStep={currentStep} setCurrentStep={setCurrentStep} />}

        {dfa && (
          <div id="dfa-output">
            <DFAStates states={dfa.dfaStates} />
            <DFATransitionTable states={dfa.dfaStates} transitions={dfa.dfaTransitions} alphabet={nfa.alphabet} />
            <DFAGraph states={dfa.dfaStates} transitions={dfa.dfaTransitions} path={testResult?.path ?? []} />
            <StringTester dfa={dfaModel} onResult={testString} />
          </div>
        )}

        <InfoSection />
      </main>

      <footer className="footer">
        <span>NFA → DFA Conversion Simulator</span>
        <span>Automata Theory & Computation · No backend required</span>
      </footer>
    </div>
  );
}

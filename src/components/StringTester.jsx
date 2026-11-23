import { useState } from "react";
import { CheckCircle2, XCircle, Route, AlertTriangle } from "lucide-react";

export default function StringTester({ dfa, onResult }) {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);

  const test = () => {
    const r = onResult(input);
    setResult(r);
  };

  return (
    <section className="card">
      <div className="section-head">
        <div>
          <span className="step-number">06</span>
          <div><div className="section-kicker">Simulation</div><h2>Test a String</h2></div>
        </div>
      </div>
      <div className="tester-row">
        <div className="grow">
          <label htmlFor="test-string">Input string</label>
          <input
            id="test-string"
            value={input}
            onChange={(e) => { setInput(e.target.value); setResult(null); }}
            placeholder="e.g. 10101"
            className="string-input"
          />
          <p className="muted small">Enter symbols exactly as defined in the alphabet. An empty string is also valid.</p>
        </div>
        <button className="btn primary test-btn" onClick={test}><Route size={17} /> Test String</button>
      </div>

      {result && (
        <div className={`result-panel ${result.error ? "invalid" : result.accepted ? "accepted" : "rejected"}`}>
          {result.error ? <AlertTriangle size={22} /> : result.accepted ? <CheckCircle2 size={22} /> : <XCircle size={22} />}
          <div className="result-main">
            <strong>{result.error ? "Invalid input" : result.accepted ? "✓ ACCEPTED" : "✕ REJECTED"}</strong>
            <span>{result.error || (result.accepted ? "The DFA ended in a final state." : "The DFA ended in a non-final state.")}</span>
          </div>
        </div>
      )}

      {result?.path?.length > 0 && !result.error && (
        <div className="path-panel">
          <div className="path-title">Execution path</div>
          <div className="path-list">
            {result.path.map((step, index) => (
              <div className="path-step" key={`${step.stateId}-${index}`}>
                {index === 0 ? <span className="path-symbol">START</span> : <span className="path-symbol">{step.symbol}</span>}
                <span className="path-arrow">→</span>
                <strong>{step.stateId}</strong>
                <span className="path-subset">{dfa.states.find((s) => s.id === step.stateId)?.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

import { ChevronLeft, ChevronRight, Calculator } from "lucide-react";
import { displaySubset } from "../algorithms/automataUtils";

export default function SubsetConstruction({ steps, currentStep, setCurrentStep }) {
  if (!steps.length) return null;

  const step = steps[currentStep] ?? steps[0];

  return (
    <section className="card">
      <div className="section-head">
        <div>
          <span className="step-number">02</span>
          <div><div className="section-kicker">Algorithm</div><h2>Subset Construction</h2></div>
        </div>
        <span className="status-chip accent"><Calculator size={14} /> {steps.length} derivations</span>
      </div>

      <p className="section-description">
        The simulator processes each generated subset and applies every input symbol. New subsets are queued until every reachable DFA state has been processed.
      </p>

      <div className="stepper">
        <div className="stepper-top">
          <span>Step {currentStep + 1} of {steps.length}</span>
          <strong>{step.equation}</strong>
        </div>

        <div className="derivation-card">
          <div className="derivation-title">
            <span className="formula">{displaySubset(step.fromSubset)}</span>
            <span className="arrow-label">on</span>
            <span className="symbol-token">{step.symbol}</span>
            <span className="arrow-big">→</span>
            <span className="formula">{displaySubset(step.destination)}</span>
            {step.isNew && <span className="new-badge">NEW DFA STATE</span>}
            {step.deadState && <span className="dead-badge">DEAD STATE</span>}
          </div>

          {!step.deadState && (
            <div className="derivation-rows">
              {step.derivationRows.map((row) => (
                <div className="derivation-row" key={row.state}>
                  <span>δ({row.state}, {step.symbol})</span>
                  <span>=</span>
                  <code>{displaySubset(row.destinations)}</code>
                </div>
              ))}
              <div className="union-line">
                Union → <strong>{displaySubset(step.destination)}</strong>
              </div>
            </div>
          )}
        </div>

        <div className="step-controls">
          <button className="btn secondary" disabled={currentStep === 0} onClick={() => setCurrentStep((x) => x - 1)}><ChevronLeft size={16} /> Previous</button>
          <div className="step-dots" aria-label="Construction steps">
            {steps.slice(0, Math.min(steps.length, 18)).map((_, i) => (
              <button key={i} className={i === currentStep ? "dot active" : "dot"} onClick={() => setCurrentStep(i)} aria-label={`Step ${i + 1}`} />
            ))}
            {steps.length > 18 && <span className="muted small">…</span>}
          </div>
          <button className="btn secondary" disabled={currentStep === steps.length - 1} onClick={() => setCurrentStep((x) => x + 1)}>Next <ChevronRight size={16} /></button>
        </div>
      </div>
    </section>
  );
}

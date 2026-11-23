import { Plus, Trash2, CheckCircle2, ArrowRight } from "lucide-react";

function Pill({ children, onRemove }) {
  return (
    <span className="pill">
      {children}
      <button onClick={onRemove} aria-label={`Remove ${children}`}><Trash2 size={12} /></button>
    </span>
  );
}

export default function NFAInput({
  nfa, setNfa, onValidate, onConvert, validation, canConvert
}) {
  const addState = () => {
    const base = "q";
    let i = nfa.states.length;
    while (nfa.states.includes(`${base}${i}`)) i++;
    setNfa((x) => ({ ...x, states: [...x.states, `${base}${i}`] }));
  };

  const removeState = (state) => {
    if (nfa.states.length <= 1) return;
    setNfa((x) => ({
      ...x,
      states: x.states.filter((s) => s !== state),
      startState: x.startState === state ? "" : x.startState,
      finalStates: x.finalStates.filter((s) => s !== state),
      transitions: x.transitions.filter((t) => t.from !== state && !t.to.includes(state))
    }));
  };

  const addSymbol = () => {
    let i = nfa.alphabet.length;
    let symbol = String(i);
    while (nfa.alphabet.includes(symbol)) symbol = String(++i);
    setNfa((x) => ({ ...x, alphabet: [...x.alphabet, symbol] }));
  };

  const removeSymbol = (symbol) => {
    if (nfa.alphabet.length <= 1) return;
    setNfa((x) => ({
      ...x,
      alphabet: x.alphabet.filter((s) => s !== symbol),
      transitions: x.transitions.filter((t) => t.symbol !== symbol)
    }));
  };

  const toggleFinal = (state) => {
    setNfa((x) => ({
      ...x,
      finalStates: x.finalStates.includes(state)
        ? x.finalStates.filter((s) => s !== state)
        : [...x.finalStates, state]
    }));
  };

  const addTransition = () => {
    setNfa((x) => ({
      ...x,
      transitions: [...x.transitions, { from: x.states[0] ?? "", symbol: x.alphabet[0] ?? "", to: [x.states[0] ?? ""] }]
    }));
  };

  const updateTransition = (index, patch) => {
    setNfa((x) => ({
      ...x,
      transitions: x.transitions.map((t, i) => i === index ? { ...t, ...patch } : t)
    }));
  };

  const removeTransition = (index) => {
    setNfa((x) => ({ ...x, transitions: x.transitions.filter((_, i) => i !== index) }));
  };

  return (
    <section className="card" id="nfa-definition">
      <div className="section-head">
        <div>
          <span className="step-number">01</span>
          <div>
            <div className="section-kicker">Input</div>
            <h2>Define NFA</h2>
          </div>
        </div>
        <span className="status-chip neutral">No ε-transitions</span>
      </div>

      <div className="info-callout">
        <strong>What is subset construction?</strong>
        <span>Each DFA state represents a set of NFA states that could be active after reading the same input.</span>
      </div>

      <div className="input-grid three">
        <div className="field-block">
          <label>States</label>
          <div className="pill-wrap">
            {nfa.states.map((state) => (
              <Pill key={state} onRemove={() => removeState(state)}>{state}</Pill>
            ))}
            <button className="mini-add" onClick={addState}><Plus size={14} /> Add state</button>
          </div>
        </div>

        <div className="field-block">
          <label>Alphabet</label>
          <div className="pill-wrap">
            {nfa.alphabet.map((symbol) => (
              <Pill key={symbol} onRemove={() => removeSymbol(symbol)}>{symbol}</Pill>
            ))}
            <button className="mini-add" onClick={addSymbol}><Plus size={14} /> Add symbol</button>
          </div>
        </div>

        <div className="field-block">
          <label htmlFor="start-state">Start state</label>
          <select
            id="start-state"
            value={nfa.startState}
            onChange={(e) => setNfa((x) => ({ ...x, startState: e.target.value }))}
          >
            <option value="">Select start state</option>
            {nfa.states.map((state) => <option key={state}>{state}</option>)}
          </select>
        </div>
      </div>

      <div className="field-block">
        <label>Final states</label>
        <div className="checkbox-row">
          {nfa.states.map((state) => (
            <label className="check-card" key={state}>
              <input
                type="checkbox"
                checked={nfa.finalStates.includes(state)}
                onChange={() => toggleFinal(state)}
              />
              <span>{state}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="transition-head">
        <div>
          <label>NFA transitions</label>
          <p className="muted small">A state-symbol pair may have multiple destinations. Combine them in one row.</p>
        </div>
        <button className="btn secondary small-btn" onClick={addTransition}><Plus size={15} /> Add transition</button>
      </div>

      <div className="transition-table-wrap">
        <table className="data-table">
          <thead><tr><th>From</th><th>Input</th><th>To state(s)</th><th></th></tr></thead>
          <tbody>
            {nfa.transitions.length === 0 ? (
              <tr><td colSpan="4" className="empty-cell">No transitions yet. Add one to define the NFA.</td></tr>
            ) : nfa.transitions.map((t, index) => (
              <tr key={index}>
                <td>
                  <select value={t.from} onChange={(e) => updateTransition(index, { from: e.target.value })}>
                    {nfa.states.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </td>
                <td>
                  <select value={t.symbol} onChange={(e) => updateTransition(index, { symbol: e.target.value })}>
                    {nfa.alphabet.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </td>
                <td>
                  <input
                    value={t.to.join(",")}
                    onChange={(e) => updateTransition(index, {
                      to: e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                    })}
                    placeholder="q0,q1"
                  />
                </td>
                <td>
                  <button className="icon-btn danger" onClick={() => removeTransition(index)} aria-label="Remove transition"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {validation && !validation.valid && (
        <div className="error-box">
          <strong>Please fix these issues:</strong>
          <ul>{validation.errors.map((e) => <li key={e}>{e}</li>)}</ul>
        </div>
      )}
      {validation?.valid && (
        <div className="success-box"><CheckCircle2 size={17} /> NFA is valid and ready for subset construction.</div>
      )}

      <div className="action-row">
        <button className="btn secondary" onClick={onValidate}><CheckCircle2 size={17} /> Validate NFA</button>
        <button className="btn primary" disabled={!canConvert} onClick={onConvert}><ArrowRight size={17} /> Convert NFA → DFA</button>
      </div>
    </section>
  );
}

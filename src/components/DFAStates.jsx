import { CircleDot, Flag, Skull } from "lucide-react";

export default function DFAStates({ states }) {
  return (
    <section className="card">
      <div className="section-head">
        <div>
          <span className="step-number">03</span>
          <div><div className="section-kicker">Generated output</div><h2>DFA States</h2></div>
        </div>
        <span className="status-chip neutral">{states.length} states</span>
      </div>
      <div className="dfa-state-grid">
        {states.map((state) => (
          <div className={`dfa-state-card ${state.isFinal ? "final" : ""} ${state.isDead ? "dead" : ""}`} key={state.id}>
            <div className="dfa-state-id">{state.id}</div>
            <div className="dfa-subset">{state.label}</div>
            <div className="state-tags">
              {state.isStart && <span><CircleDot size={12} /> START</span>}
              {state.isFinal && <span><Flag size={12} /> FINAL</span>}
              {state.isDead && <span><Skull size={12} /> DEAD</span>}
              {!state.isStart && !state.isFinal && !state.isDead && <span>NORMAL</span>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

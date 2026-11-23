export default function InfoSection() {
  return (
    <section className="info-section">
      <div>
        <div className="section-kicker">Project information</div>
        <h2>NFA → DFA Conversion Simulator</h2>
        <p>Technique: <strong>Subset Construction</strong></p>
        <p>Purpose: Convert a Non-Deterministic Finite Automaton into an equivalent Deterministic Finite Automaton and test strings on the generated DFA.</p>
      </div>
      <div className="math-card">
        <div>For NFA <strong>N = (Q, Σ, δ, q₀, F)</strong></div>
        <div className="math">δ′(S, a) = ⋃ δ(q, a), q ∈ S</div>
        <div>A DFA subset <strong>S</strong> is final when <strong>S ∩ F ≠ ∅</strong>.</div>
        <div>Maximum possible DFA states: <strong>2ⁿ</strong>.</div>
      </div>
    </section>
  );
}

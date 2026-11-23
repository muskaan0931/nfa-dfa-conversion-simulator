import { BookOpen, RotateCcw } from "lucide-react";

export default function Header({ onReset }) {
  return (
    <header className="topbar">
      <div className="brand">
        <div className="brand-mark">δ</div>
        <div>
          <div className="eyebrow">Automata Theory & Computation</div>
          <h1>NFA → DFA Conversion Simulator</h1>
        </div>
      </div>
      <div className="top-actions">
        <span className="tech-badge"><BookOpen size={15} /> Subset Construction</span>
        <button className="btn secondary" onClick={onReset}><RotateCcw size={16} /> Reset</button>
      </div>
    </header>
  );
}

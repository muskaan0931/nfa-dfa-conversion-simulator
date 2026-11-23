import { Play } from "lucide-react";

export default function ExampleSelector({ examples, value, onChange }) {
  return (
    <div className="example-bar">
      <div>
        <div className="section-kicker">Quick demo</div>
        <strong>Load a predefined NFA</strong>
        <p className="muted">Use an example to demonstrate the full workflow instantly.</p>
      </div>
      <div className="example-control">
        <select value={value} onChange={(e) => onChange(e.target.value)} aria-label="Example NFA">
          <option value="">Choose an example…</option>
          {examples.map((example) => <option key={example.id} value={example.id}>{example.name}</option>)}
        </select>
        <span className="hint"><Play size={13} /> Ready for classroom demo</span>
      </div>
    </div>
  );
}

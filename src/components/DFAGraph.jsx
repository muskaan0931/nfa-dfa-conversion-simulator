import { useMemo } from "react";
import {
  ReactFlow, Background, Controls, MiniMap, MarkerType
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

function layoutNodes(states) {
  const cols = Math.max(1, Math.ceil(Math.sqrt(states.length)));
  return states.map((state, index) => ({
    id: state.id,
    position: {
      x: (index % cols) * 230,
      y: Math.floor(index / cols) * 150
    },
    data: { label: `${state.id}\n${state.label}` },
    type: "default",
    style: {
      width: 160,
      minHeight: 72,
      borderRadius: state.isFinal ? 16 : 12,
      border: state.isFinal ? "4px double #172033" : "2px solid #172033",
      background: state.isDead ? "#f2f4f7" : "#ffffff",
      fontWeight: 700,
      color: "#172033",
      whiteSpace: "pre-line",
      textAlign: "center",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: state.isStart ? "0 0 0 4px #dcecff" : "0 8px 24px rgba(15, 23, 42, .08)"
    }
  }));
}

export default function DFAGraph({ states, transitions, path = [] }) {
  const activeEdges = useMemo(() => new Set(
    path.slice(1).map((p, i) => `${path[i].stateId}→${p.stateId}`)
  ), [path]);

  const nodes = useMemo(() => layoutNodes(states), [states]);

  const edges = useMemo(() => {
    const grouped = new Map();
    for (const t of transitions) {
      const key = `${t.from}→${t.to}`;
      if (!grouped.has(key)) grouped.set(key, []);
      grouped.get(key).push(t.symbol);
    }

    return [...grouped.entries()].map(([key, symbols]) => {
      const [from, to] = key.split("→");
      const active = activeEdges.has(key);
      return {
        id: `${from}-${to}`,
        source: from,
        target: to,
        label: symbols.join(", "),
        markerEnd: { type: MarkerType.ArrowClosed, width: 18, height: 18 },
        animated: active,
        style: { strokeWidth: active ? 4 : 2 },
        labelStyle: { fontWeight: 800 },
        labelBgPadding: [5, 3],
        labelBgBorderRadius: 5
      };
    });
  }, [transitions, activeEdges]);

  if (!states.length) return null;

  return (
    <section className="card">
      <div className="section-head">
        <div>
          <span className="step-number">05</span>
          <div><div className="section-kicker">Visualisation</div><h2>DFA Graph</h2></div>
        </div>
        <span className="status-chip neutral">Zoom · pan · inspect</span>
      </div>
      <div className="graph-wrap">
        <ReactFlow nodes={nodes} edges={edges} fitView minZoom={0.3} maxZoom={1.8}>
          <Background gap={20} size={1} />
          <Controls />
          <MiniMap pannable zoomable />
        </ReactFlow>
      </div>
      <div className="legend">
        <span><i className="legend-dot start" /> Start</span>
        <span><i className="legend-dot final" /> Final</span>
        <span><i className="legend-dot dead" /> Dead / ∅</span>
        <span>Bold animated edges = tested path</span>
      </div>
    </section>
  );
}

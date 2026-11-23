export default function DFATransitionTable({ states, transitions, alphabet }) {
  const getTarget = (stateId, symbol) => {
    const t = transitions.find((x) => x.from === stateId && x.symbol === symbol);
    return t?.to ?? "—";
  };

  return (
    <section className="card">
      <div className="section-head">
        <div>
          <span className="step-number">04</span>
          <div><div className="section-kicker">Generated output</div><h2>DFA Transition Table</h2></div>
        </div>
      </div>
      <div className="transition-table-wrap">
        <table className="data-table dfa-table">
          <thead>
            <tr>
              <th>DFA State</th>
              {alphabet.map((symbol) => <th key={symbol}>Input {symbol}</th>)}
            </tr>
          </thead>
          <tbody>
            {states.map((state) => (
              <tr key={state.id}>
                <td>
                  <strong>{state.id}</strong>
                  <span className="table-subset">{state.label}</span>
                  <span className="table-tags">
                    {state.isStart && "START "}
                    {state.isFinal && "FINAL "}
                    {state.isDead && "DEAD"}
                  </span>
                </td>
                {alphabet.map((symbol) => <td key={symbol}><span className="transition-target">{getTarget(state.id, symbol)}</span></td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

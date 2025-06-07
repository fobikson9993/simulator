import React from "react";

function WarningsPanel({ warnings }) {
  if (!warnings || warnings.length === 0) return null;
  return (
    <div style={{ background: '#fffbe6', border: '1px solid orange', color: '#b36b00', padding: 12, margin: '16px 0', borderRadius: 6 }}>
      <b>Ostrzeżenia:</b>
      <ul style={{ margin: 0, paddingLeft: 20 }}>
        {warnings.map((w, idx) => (
          <li key={idx}>⚠️ Linia {w.line}: {w.message}</li>
        ))}
      </ul>
    </div>
  );
}

export default WarningsPanel; 
import React from "react";

function ConsoleOutput({ output }) {
  return (
    <div>
      <h2>Konsola wynikowa</h2>
      <pre style={{background: '#eee', padding: '10px', minHeight: '60px'}}>
        {output && output.length > 0 ? output.join("\n") : "Brak komunikatów."}
      </pre>
    </div>
  );
}

export default ConsoleOutput; 
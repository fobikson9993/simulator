import React from "react";

function GCodeEditor({ gcode, setGcode }) {
  return (
    <div>
      <h2>Edytor G-kodu</h2>
      <textarea
        value={gcode}
        onChange={e => setGcode(e.target.value)}
        rows={10}
        cols={60}
      />
    </div>
  );
}

export default GCodeEditor; 
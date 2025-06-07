import React, { useState } from "react";
import GCodeEditor from "./components/GCodeEditor";
import ConsoleOutput from "./components/ConsoleOutput";
import Graphics3D from "./components/Graphics3D";
import Sidebar from "./components/Sidebar";
import WarningsPanel from "./components/WarningsPanel";
import { validateGCode } from "./utils/validateGCode";

function App() {
  const [gcode, setGcode] = useState("");
  const [consoleOutput, setConsoleOutput] = useState([]);
  const [warnings, setWarnings] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [trajectory, setTrajectory] = useState([]); // pod animację

  const handleAnalyze = () => {
    const { errors, warnings } = validateGCode(gcode);
    setConsoleOutput(errors);
    setWarnings(warnings);
    setSidebarOpen(true);
    // Trajektoria do rozbudowy (np. po analizie G-kodu)
    // setTrajectory(...)
  };

  const handleExportNC = () => {
    const blob = new Blob([gcode], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "program.nc";
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h1>Symulator CNC (Sinumerik 810D)</h1>
      <GCodeEditor gcode={gcode} setGcode={setGcode} />
      <WarningsPanel warnings={warnings} />
      <button onClick={handleAnalyze} style={{margin: '10px 10px 10px 0'}}>Analizuj G-kod</button>
      <button onClick={handleExportNC} style={{margin: '10px 0'}}>Eksportuj do .nc</button>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)}>
        <ConsoleOutput output={consoleOutput.map(e => `❌ Linia ${e.line}: ${e.message}`)} />
        {warnings.length > 0 && (
          <div style={{color: 'orange', marginTop: 20}}>
            <b>Ostrzeżenia:</b>
            <ul>
              {warnings.map((w, idx) => (
                <li key={idx}>⚠️ Linia {w.line}: {w.message}</li>
              ))}
            </ul>
          </div>
        )}
      </Sidebar>
      <Graphics3D gcode={gcode} trajectory={trajectory} />
    </div>
  );
}

export default App; 
import React, { useRef, useState, useEffect } from "react";

function drawTrajectory(ctx, trajectory) {
  if (!ctx || !trajectory || trajectory.length === 0) return;
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  const scale = 5;
  const offsetX = 50;
  const offsetY = 250;
  let prev = { x: 0, z: 0 };
  trajectory.forEach(cmd => {
    let color = "#888";
    let dash = [];
    if (cmd.cmd === "rapid") {
      color = "blue";
      dash = [5, 5];
    } else if (cmd.cmd === "linear") {
      color = "red";
      dash = [];
    } else if (cmd.cmd === "arcCW" || cmd.cmd === "arcCCW") {
      color = "green";
      dash = [];
    }
    const x1 = offsetX + prev.x * scale;
    const z1 = offsetY - prev.z * scale;
    const x2 = offsetX + cmd.x * scale;
    const z2 = offsetY - cmd.z * scale;
    ctx.beginPath();
    ctx.setLineDash(dash);
    ctx.strokeStyle = color;
    ctx.moveTo(x1, z1);
    ctx.lineTo(x2, z2);
    ctx.stroke();
    prev = { x: cmd.x, z: cmd.z };
  });
}

function Graphics3D({ gcode, trajectory }) {
  const fileInputRef = useRef();
  const [satFileName, setSatFileName] = useState("");
  const canvasRef = useRef();

  useEffect(() => {
    if (trajectory && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      drawTrajectory(ctx, trajectory);
    }
  }, [trajectory]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSatFileName(file.name);
      // Tu można dodać logikę wczytywania i przetwarzania pliku .SAT
    }
  };

  return (
    <div id="view-3d" style={{border: '1px solid #ccc', minHeight: '320px', marginTop: '20px', position: 'relative', paddingBottom: 20}}>
      <div style={{position: 'absolute', top: 10, right: 10}}>
        <button onClick={() => fileInputRef.current.click()}>Wczytaj plik .SAT</button>
        <input
          type="file"
          accept=".sat,.SAT"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        {satFileName && <div>Załadowano: {satFileName}</div>}
      </div>
      <div style={{textAlign: 'center', paddingTop: 100}}>
        <canvas ref={canvasRef} width={600} height={300} style={{border: '1px solid #aaa', background: '#fff'}} />
        <div style={{marginTop: 10}}>Widok 3D (trajektoria narzędzia w układzie X/Z)</div>
      </div>
    </div>
  );
}

export default Graphics3D; 
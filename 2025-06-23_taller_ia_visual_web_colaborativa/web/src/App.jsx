// src/App.tsx
import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import DetectionScene from "./components/DetectionScene";
import Uploader from "./components/Uploader";

export default function App() {
  const [reloadKey, setReloadKey] = useState(0);

  const reloadScene = () => setReloadKey((k) => k + 1);

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#111" }}>
      <Uploader onUploadComplete={reloadScene} />
      <Canvas orthographic camera={{ zoom: 1, position: [0, 0, 100] }}>
        <DetectionScene key={reloadKey} />
      </Canvas>
    </div>
  );
}


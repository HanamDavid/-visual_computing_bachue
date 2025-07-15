// SceneCanvas.jsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ModelViewer from './ModelViewer';
import * as dat from 'dat.gui';
import { useEffect, useRef } from 'react';

export default function SceneCanvas({ onMetricsUpdate }) {
  const guiRef = useRef();
  const metricsRef = useRef({
    temperatura: 25,
    energia: 50,
    voltaje: 220,
  });

  useEffect(() => {
    const gui = new dat.GUI();
    guiRef.current = gui;
    gui.add(metricsRef.current, 'temperatura').listen().name("Temperatura (°C)");
    gui.add(metricsRef.current, 'energia').listen().name("Energía (%)");
    gui.add(metricsRef.current, 'voltaje').listen().name("Voltaje (V)");
    return () => gui.destroy();
  }, []);

  return (
    <Canvas camera={{ position: [0, 1.5, 3], fov: 75 }}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 10, 7.5]} intensity={1} />
      <ModelViewer
        onMetricsChange={({ temperature, energy, voltage }) => {
            metricsRef.current.temperatura = parseFloat(temperature.toFixed(2));
            metricsRef.current.energia = parseFloat(energy.toFixed(2));
            metricsRef.current.voltaje = parseFloat(voltage.toFixed(2));
            onMetricsUpdate?.({ temperature, energy, voltage }); // ✅ pasa el objeto completo
        }}
        />
      <OrbitControls />
    </Canvas>
  );
}

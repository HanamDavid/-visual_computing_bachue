// ModelViewer.jsx
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useEffect, useState } from 'react';

export default function ModelViewer({ onMetricsChange }) {
  const ref = useRef();
  const { scene } = useGLTF('/modelo.glb');

  const [metrics, setMetrics] = useState({
    temperature: 25,
    energy: 50,
    voltage: 220,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const t = Date.now() / 1000;
      const temperature = 25 + 5 * Math.sin(t);
      const energy = 50 + 30 * Math.sin(t * 0.8);
      const voltage = 220 + 20 * Math.sin(t * 1.2);

      setMetrics({ temperature, energy, voltage });

      if (ref.current) {
        const h = 0.01 * temperature;
        ref.current.traverse((child) => {
          if (child.isMesh && child.material) {
            child.material.color.setHSL(h, 1, 0.5);
          }
        });
      }

      onMetricsChange({
        temperature,
        energy,
        voltage,
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onMetricsChange]);

  useFrame(() => {
    if (ref.current) {
      const { energy, voltage } = metrics;

      // Escala proporcional al nivel de energía
      const scale = 1 + 0.01 * (energy - 50) / 30;
      ref.current.scale.set(scale, scale, scale);

      // Movimiento vertical según el voltaje
      ref.current.position.y = (voltage - 220) * 0.02;

      // Rotación lenta por voltaje
      ref.current.rotation.y += 0.0003 * voltage;
    }
  });

  return <primitive ref={ref} object={scene} />;
}

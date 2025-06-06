import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Line } from '@react-three/drei'

function Arm({ angles, setAngles, trace }) {
  const group1 = useRef()
  const group2 = useRef()
  const group3 = useRef()
  const [positions, setPositions] = useState([])

  useFrame((state) => {
    // Si no hay interacción manual, animar automáticamente
    if (!angles.manual) {
      const t = state.clock.elapsedTime
      setAngles({
        theta1: Math.sin(t) * 0.5,
        theta2: Math.cos(t) * 0.5,
        theta3: Math.sin(t * 1.5) * 0.5,
        manual: false,
      })
    }

    // Aplicar rotaciones progresivas
    if (group1.current) group1.current.rotation.z = angles.theta1
    if (group2.current) group2.current.rotation.z = angles.theta2
    if (group3.current) group3.current.rotation.z = angles.theta3

    // Calcular posición del extremo y guardar para la traza
    if (trace) {
      // Cinemática directa simple para 3 eslabones de longitud 2
      const l = 2
      const a1 = angles.theta1
      const a2 = angles.theta2
      const a3 = angles.theta3
      const x =
        l * Math.cos(a1) +
        l * Math.cos(a1 + a2) +
        l * Math.cos(a1 + a2 + a3)
      const y =
        l * Math.sin(a1) +
        l * Math.sin(a1 + a2) +
        l * Math.sin(a1 + a2 + a3)
      setPositions((prev) =>
        prev.length > 500
          ? [...prev.slice(1), [x + 1, y, 0]]
          : [...prev, [x + 1, y, 0]]
      )
    }
  })

  return (
    <>
      <group ref={group1}>
        {/* Primer eslabón */}
        <mesh position={[1, 0, 0]}>
          <boxGeometry args={[2, 0.4, 0.4]} />
          <meshStandardMaterial color="orange" />
        </mesh>
        <group ref={group2} position={[2, 0, 0]}>
          {/* Segundo eslabón */}
          <mesh position={[1, 0, 0]}>
            <boxGeometry args={[2, 0.4, 0.4]} />
            <meshStandardMaterial color="skyblue" />
          </mesh>
          <group ref={group3} position={[2, 0, 0]}>
            {/* Tercer eslabón */}
            <mesh position={[1, 0, 0]}>
              <boxGeometry args={[2, 0.4, 0.4]} />
              <meshStandardMaterial color="limegreen" />
            </mesh>
          </group>
        </group>
      </group>
      {/* Línea de traza */}
      {trace && positions.length > 1 && (
        <Line
          points={positions}
          color="hotpink"
          lineWidth={2}
          dashed={false}
        />
      )}
    </>
  )
}

export default function App() {
  const [angles, setAngles] = useState({
    theta1: 0,
    theta2: 0,
    theta3: 0,
    manual: false,
  })
  const [trace, setTrace] = useState(true)

  // Handlers para sliders
  const handleSlider = (name) => (e) => {
    setAngles((prev) => ({
      ...prev,
      [name]: parseFloat(e.target.value),
      manual: true,
    }))
  }

  // Botón para volver a animación automática
  const handleAuto = () => setAngles((prev) => ({ ...prev, manual: false }))

  return (
    <>
      <style>{`
        body, html, #root {
          margin: 0;
          padding: 0;
          height: 100%;
          width: 100%;
          overflow: hidden;
          font-family: sans-serif;
        }
        .canvas-fullscreen {
          width: 100vw;
          height: 100vh;
          display: block;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 0;
        }
        .title {
          position: absolute;
          top: 20px;
          width: 100%;
          text-align: center;
          color: white;
          font-size: 48px;
          font-weight: bold;
          z-index: 2;
          pointer-events: none;
          text-shadow: 0px 0px 10px black;
        }
        .controls {
          position: absolute;
          top: 90px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0,0,0,0.7);
          padding: 18px 24px 12px 24px;
          border-radius: 16px;
          z-index: 3;
          color: white;
          min-width: 320px;
          box-shadow: 0 2px 16px #0008;
        }
        .controls label {
          display: block;
          margin-bottom: 8px;
        }
        .controls input[type="range"] {
          width: 180px;
        }
        .controls button {
          margin-top: 8px;
          margin-right: 8px;
          padding: 4px 12px;
          font-size: 1rem;
          border-radius: 6px;
          border: none;
          background: #ff9800;
          color: white;
          cursor: pointer;
        }
        .controls button:active {
          background: #e65100;
        }
      `}</style>
      <div className="title">Taller - Cinemática Directa</div>
      <div className="controls">
        <label>
          θ₁:
          <input
            type="range"
            min={-Math.PI}
            max={Math.PI}
            step={0.01}
            value={angles.theta1}
            onChange={handleSlider('theta1')}
            disabled={!angles.manual}
          />{' '}
          {angles.theta1.toFixed(2)}
        </label>
        <label>
          θ₂:
          <input
            type="range"
            min={-Math.PI}
            max={Math.PI}
            step={0.01}
            value={angles.theta2}
            onChange={handleSlider('theta2')}
            disabled={!angles.manual}
          />{' '}
          {angles.theta2.toFixed(2)}
        </label>
        <label>
          θ₃:
          <input
            type="range"
            min={-Math.PI}
            max={Math.PI}
            step={0.01}
            value={angles.theta3}
            onChange={handleSlider('theta3')}
            disabled={!angles.manual}
          />{' '}
          {angles.theta3.toFixed(2)}
        </label>
        <div>
          <button onClick={handleAuto}>Animación automática</button>
          <button onClick={() => setTrace((t) => !t)}>
            {trace ? 'Ocultar traza' : 'Mostrar traza'}
          </button>
        </div>
      </div>
      <Canvas className="canvas-fullscreen" camera={{ position: [0, 0, 8], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
        <Arm angles={angles} setAngles={setAngles} trace={trace} />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </>
  )
}
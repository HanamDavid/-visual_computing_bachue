import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

function InteractiveCube() {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  const [position, setPosition] = useState([0, 0, 0])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'r') setPosition([0, 0, 0])
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useFrame(() => {
    if (hovered && meshRef.current) {
      meshRef.current.rotation.y += 0.01
    }
  })

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={[2.5, 2.5, 2.5]}
      onClick={() => setPosition([Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1])}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry />
      <meshStandardMaterial color={hovered ? 'orange' : 'skyblue'} />
    </mesh>
  )
}

export default function Scene() {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Título HTML */}
      <h1 style={{
        position: 'absolute',
        top: 10,
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: '24px',
        fontWeight: 'bold',
        background: 'rgba(255, 255, 255, 0.8)',
        padding: '8px 16px',
        borderRadius: '8px',
        zIndex: 10
      }}>
        Entrada del Usuario e Interfaz UI
      </h1>

      {/* Canvas de Three.js */}
      <Canvas
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
        }}
        camera={{ position: [0, 0, 4] }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <InteractiveCube />
        <OrbitControls />
      </Canvas>

      {/* UI flotante */}
      <div style={{
        position: 'absolute',
        top: 60,
        left: 20,
        background: 'blue',
        padding: 10,
        borderRadius: 8,
        zIndex: 5
      }}>
        <p><strong>Controles:</strong></p>
        <ul>
          <li>Haz clic en el cubo para moverlo.</li>
          <li>Pasa el mouse para hacerlo rotar.</li>
          <li>Presiona <code>r</code> para reiniciar su posición.</li>
        </ul>
      </div>
    </div>
  )
}

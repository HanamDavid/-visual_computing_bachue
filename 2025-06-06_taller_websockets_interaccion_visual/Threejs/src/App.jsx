import React, { useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

export default function App() {
  const [position, setPosition] = useState([0, 0, 0])
  const [color, setColor] = useState('orange')
  const socketRef = useRef(null)

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8765')
    socketRef.current = socket

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        // data: { position: [x, y, z], color: "#RRGGBB" }
        if (data.position) setPosition(data.position)
        if (data.color) setColor(data.color)
      } catch (e) {
        console.error('Error parsing message', e)
      }
    }

    socket.onerror = (err) => {
      console.error('WebSocket error:', err)
    }

    return () => {
      socket.close()
    }
  }, [])

  return (
    <>
      <style>{`
        body, html, #root {
          margin: 0;
          padding: 0;
          height: 100%;
          width: 100%;
          overflow: hidden;
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
      `}</style>
      <div className="title">WebSockets e Interacción Visual en Tiempo Real </div>
      <Canvas className="canvas-fullscreen" camera={{ position: [0, 0, 8], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
        <mesh position={position}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color={color} />
        </mesh>
        <OrbitControls />
      </Canvas>
    </>
  )
}
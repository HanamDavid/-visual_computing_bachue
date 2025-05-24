// App.jsx
import React from 'react'
import { Canvas, useFrame, extend } from '@react-three/fiber'
import { OrbitControls, shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'

// Define el shader material personalizado
const MyShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color(0.2, 0.6, 1.0)
  },
  // Vertex Shader
  `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  // Fragment Shader
  `
  uniform float uTime;
  uniform vec3 uColor;
  varying vec2 vUv;

  void main() {
    float pulse = sin(uTime + vUv.x * 10.0) * 0.5 + 0.5;
    gl_FragColor = vec4(uColor * pulse, 1.0);
  }
  `
)

extend({ MyShaderMaterial })

function AnimatedSphere() {
  const ref = React.useRef()
  useFrame((state) => {
    if (ref.current) {
      ref.current.uTime = state.clock.getElapsedTime()
    }
  })

  return (
    <mesh>
      <sphereGeometry args={[2, 64, 64]} />
      <myShaderMaterial ref={ref} />
    </mesh>
  )
}

export default function App() {
  return (
    <>
      {/* Estilos en línea */}
      <style>{`
        body, html, #root {
          margin: 0;
          padding: 0;
          height: 100%;
          width: 100%;
          overflow: hidden;
          font-family: sans-serif;
        }
        canvas {
          display: block;
        }
        .title {
          position: absolute;
          top: 70px;
          width: 100%;
          text-align: center;
          color: white;
          font-size: 48px;
          font-weight: bold;
          z-index: 1;
          pointer-events: none;
          text-shadow: 0px 0px 10px black;
        }
      `}</style>

      {/* Título */}
      <div className="title">Taller - Sombras Personalizadas</div>

      {/* Escena 3D */}
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <AnimatedSphere />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </>
  )
}

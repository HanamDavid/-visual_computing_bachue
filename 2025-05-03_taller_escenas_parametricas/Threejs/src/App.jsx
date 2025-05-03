import './App.css'
import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls } from '@react-three/drei'
import { useState } from 'react'

// Datos para parametrizar los objetos
const objectData = [
  { id: 1, type: 'GLTF', position: [0, 0, 0], scale: 1, color: 'red', rotation: [0, 0, 0] },
  { id: 2, type: 'GLTF', position: [2, 0, 0], scale: 0.8, color: 'blue', rotation: [0, Math.PI / 4, 0] },
  { id: 3, type: 'GLTF', position: [-2, 0, 0], scale: 1.2, color: 'green', rotation: [0, Math.PI / 2, 0] },
]

function ModelGLTF({ position, scale, color, rotation }) {
  const { scene } = useGLTF('/src/assets/box.gltf')
  scene.scale.set(scale, scale, scale)
  scene.position.set(...position)
  scene.rotation.set(...rotation)
  scene.traverse((child) => {
    if (child.isMesh) {
      child.material.color.set(color)
    }
  })
  return <primitive object={scene} />
}

function App() {
  const [globalScale, setGlobalScale] = useState(1) // Control dinámico de escala

  return (
    <>
      <h1>3D NIKO</h1>
      <div className="controls">
        <label>
          Escala global:
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={globalScale}
            onChange={(e) => setGlobalScale(parseFloat(e.target.value))}
          />
        </label>
      </div>
      <div className="canvas-container">
        <Canvas>
          <ambientLight intensity={0.8} />
          <pointLight position={[10, 10, 10]} />
          {objectData.map((obj) => (
            <ModelGLTF
              key={obj.id}
              position={obj.position}
              scale={obj.scale * globalScale} // Escala dinámica
              color={obj.color}
              rotation={obj.rotation}
            />
          ))}
          <OrbitControls />
        </Canvas>
      </div>
    </>
  )
}

export default App
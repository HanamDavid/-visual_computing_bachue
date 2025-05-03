import './App.css'
import { Canvas } from '@react-three/fiber'
import { useLoader } from '@react-three/fiber'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import { MeshStandardMaterial } from 'three'
import { useGLTF, OrbitControls } from '@react-three/drei' // Importa OrbitControls
import { useState } from 'react'

function ModelGLTF() {
  const { scene } = useGLTF('/src/assets/box.gltf')
  scene.scale.set(1, 1, 1) // Escala completa
  scene.position.set(0, 0, 0) // Ajusta la posición
  return <primitive object={scene} />
}

function ModelOBJ() {
  const obj = useLoader(OBJLoader, '/src/assets/Heart_box.obj')
  obj.scale.set(0.3, 0.3, 0.3) // Ajusta la escala (reduce al 10%)
  obj.position.set(0, 0, 0) // Ajusta la posición
  return <primitive object={obj} />
}

function ModelSTL() {
  const geometry = useLoader(STLLoader, '/src/assets/gift_box.stl')
  const material = new MeshStandardMaterial({ color: 'orange' })
  return (
    <mesh geometry={geometry} material={material} position={[0, 1.5, 0]} scale={[0.1, 0.1, 0.1]} />
  )
}

function App() {
  const [selectedModel, setSelectedModel] = useState('GLTF') // Estado para el modelo seleccionado

  return (
    <>
      <h1>3D NIKO</h1>
      <div className="controls">
        <button onClick={() => setSelectedModel('GLTF')}>Mostrar GLTF</button>
        <button onClick={() => setSelectedModel('OBJ')}>Mostrar OBJ</button>
        <button onClick={() => setSelectedModel('STL')}>Mostrar STL</button>
      </div>
      <div className="canvas-container">
        <Canvas>
          <ambientLight intensity={0.8} />
          <pointLight position={[10, 10, 10]} />
          {selectedModel === 'GLTF' && <ModelGLTF />}
          {selectedModel === 'OBJ' && <ModelOBJ />}
          {selectedModel === 'STL' && <ModelSTL />}
          <OrbitControls /> {/* Agrega OrbitControls aquí */}
        </Canvas>
      </div>
    </>
  )
}

export default App
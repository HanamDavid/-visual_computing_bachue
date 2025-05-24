import './App.css'
import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera, OrthographicCamera, OrbitControls } from '@react-three/drei'
import { useRef, useState, useEffect } from 'react'

function Boxes() {
  const positions = [
    [0, 0, 0],
    [2, 1, -3],
    [-2, -1, -6],
    [3, -2, -10],
    [-3, 2, -15]
  ]
  return positions.map((pos, i) => (
    <mesh position={pos} key={i}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={`hsl(${i * 60}, 80%, 60%)`} />
    </mesh>
  ))
}

// Componente que configura cámaras y actualiza info
function CameraControls({ usePerspective, onUpdate }) {
  const perspectiveRef = useRef()
  const orthoRef = useRef()

  // Actualizar info de la cámara en cada frame
  useFrame(({ size }) => {
    const camera = usePerspective ? perspectiveRef.current : orthoRef.current
    if (!camera) return

    const info = {
      tipo: usePerspective ? 'Perspectiva' : 'Ortográfica'
    }

    if (usePerspective) {
      info.fov = camera.fov.toFixed(2)
      info.aspect = camera.aspect.toFixed(2)
      info.near = camera.near.toFixed(2)
      info.far = camera.far.toFixed(2)
    } else {
      info.left = camera.left.toFixed(2)
      info.right = camera.right.toFixed(2)
      info.top = camera.top.toFixed(2)
      info.bottom = camera.bottom.toFixed(2)
      info.near = camera.near.toFixed(2)
      info.far = camera.far.toFixed(2)
    }

    onUpdate(info)
  })

  return (
    <>
      {usePerspective ? (
        <PerspectiveCamera
          ref={perspectiveRef}
          makeDefault
          position={[0, 0, 10]}
          fov={60}
        />
      ) : (
        <OrthographicCamera
          ref={orthoRef}
          makeDefault
          position={[0, 0, 10]}
          zoom={50}
        />
      )}
      <OrbitControls />
    </>
  )
}

function App() {
  const [usePerspective, setUsePerspective] = useState(true)
  const [cameraInfo, setCameraInfo] = useState({})

  return (
    <>
      <h1>Taller Cámara Virtual</h1>
      <div className="controls">
        <button onClick={() => setUsePerspective(v => !v)}>
          Usar cámara {usePerspective ? 'Ortográfica' : 'Perspectiva'}
        </button>
      </div>

      <div className="info-panel">
        <strong>Tipo de cámara:</strong> {cameraInfo.tipo} <br />
        {cameraInfo.fov && <div><strong>fov:</strong> {cameraInfo.fov}</div>}
        {cameraInfo.aspect && <div><strong>aspect:</strong> {cameraInfo.aspect}</div>}
        {cameraInfo.left && <div><strong>left:</strong> {cameraInfo.left}</div>}
        {cameraInfo.right && <div><strong>right:</strong> {cameraInfo.right}</div>}
        {cameraInfo.top && <div><strong>top:</strong> {cameraInfo.top}</div>}
        {cameraInfo.bottom && <div><strong>bottom:</strong> {cameraInfo.bottom}</div>}
        <div><strong>near:</strong> {cameraInfo.near}</div>
        <div><strong>far:</strong> {cameraInfo.far}</div>
      </div>

      <Canvas style={{ height: 500, background: '#222' }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 7]} intensity={1} />
        <CameraControls usePerspective={usePerspective} onUpdate={setCameraInfo} />
        <Boxes />
      </Canvas>
    </>
  )
}

export default App


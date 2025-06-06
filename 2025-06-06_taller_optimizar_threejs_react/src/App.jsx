import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { ModelWithLOD } from './components/ModelWithLOD'
import { TextureComparison } from './components/TextureComparison'
import { PerformanceMonitor } from './components/PerformanceMonitor'

export default function App() {
  return (
    <>
      <PerformanceMonitor />
      <Canvas 
        camera={{ position: [0, 5, 10], fov: 50 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        <ModelWithLOD />
        <TextureComparison />
        
        <OrbitControls />
        <Environment preset="city" />
        <gridHelper args={[20, 20]} />
      </Canvas>
    </>
  )
}

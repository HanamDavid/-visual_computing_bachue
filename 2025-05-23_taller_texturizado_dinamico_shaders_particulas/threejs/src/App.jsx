import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { CenterObject } from './components/CenterObject'
import { Particles } from './components/Particles'
function App() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls />  {/* Permite mover la cámara con el ratón */}
      <CenterObject />  {/* Objeto central (lo definiremos después) */}
      <Particles />
    </Canvas>
  )
}

export default App

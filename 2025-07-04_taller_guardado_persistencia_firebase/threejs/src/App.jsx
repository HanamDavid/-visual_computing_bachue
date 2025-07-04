import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { ObjetoPersistente } from "./components/ObjetoPersistente";

function App() {
  return (
    <Canvas camera={{ position: [0, 2, 6], fov: 50 }}>
      <ambientLight />
      <directionalLight position={[0, 5, 5]} />
      <ObjetoPersistente />
      <OrbitControls />
    </Canvas>
  );
}

export default App;

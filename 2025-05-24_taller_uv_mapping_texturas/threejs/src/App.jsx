import { Canvas } from '@react-three/fiber';
import Scene from './components/Scene';
import './App.css';

function App() {

  return (
    <div className="app-container">
      <div className="main-content">
        <Canvas shadows style={{ width: '100%', height: '100%' }}>
          <Scene/>
        </Canvas>
      </div>
    </div>
  );
}

export default App;


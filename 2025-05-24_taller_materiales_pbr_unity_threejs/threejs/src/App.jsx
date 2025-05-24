import { Canvas } from '@react-three/fiber';
import Scene from './components/Scene';
import './App.css';
import { useRef, useState } from 'react';

function App() {
  const [mode, setMode] = useState('image');
  const videoRef = useRef(null);

  return (
    <div className="app-container">
      <div className="main-content">
        <Canvas shadows style={{ width: '100%', height: '100%' }}>
          <Scene />
        </Canvas>
      </div>
    </div>
  );
}

export default App;


import { Canvas } from '@react-three/fiber';
import Scene from './components/Scene';
import './App.css';
import { useRef, useState } from 'react';

function App() {
  const [mode, setMode] = useState('image');
  const videoRef = useRef(null);

  return (
    <div className="app-container">
      <video
        ref={videoRef}
        src="/video360.mp4"
        loop
        muted
        playsInline
        style={{ display: 'none' }}
        crossOrigin="anonymous"
      />
      <div className="main-content">
        <Canvas shadows style={{ width: '100%', height: '100%' }}>
          <Scene mode={mode} videoRef={videoRef} />
        </Canvas>
        <nav className="buttons">
          <button onClick={() => setMode('image')}>Imagen</button>
          <button onClick={() => setMode('video')}>Video</button>
        </nav>
      </div>
    </div>
  );
}

export default App;


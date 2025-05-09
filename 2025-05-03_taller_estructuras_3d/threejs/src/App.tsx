import { Canvas } from '@react-three/fiber';
import React, { useState } from 'react';
import Scene from './components/Scene'
import './App.css'

function App() {
  const [transform, setTransform] = useState('none');
  const [modelInfo, setModelInfo] = useState(null);

  const handleVerticesClick = () => {
    setTransform('vertices');
  };

  const handleEdgesClick = () => {
    setTransform('edges');
  };

  const handleFacesClick = () => {
    setTransform('faces');
  };

  return (
    <div className="app-container">
            <nav className="vertical-nav">
                <h1>To ESCAPE back to reality press a$#213(error: not found) </h1>
                <h1>isthis@real → bachue.sh</h1>
                <div className="buttons">
                    <button
                        onClick={handleFacesClick}
                        >
                    Caras
                    </button>
                    <button
                        onClick={handleEdgesClick}
                    >Aristas</button>
                    <button
                        onClick={handleVerticesClick}
                    >Vertices</button>
                </div>
                <div className="model_data">
                    <h3>Model data:</h3>
                    {modelInfo ? (
                        <ul>
                            <li><strong>Vertices:</strong> {modelInfo.vertices}</li>
                            <li><strong>Faces:</strong> {modelInfo.faces}</li>
                            <li><strong>Meshes:</strong> {modelInfo.meshes}</li>
                        </ul>
                    ) : (
                    <p>Loading...</p>
                    )}
                </div>
            </nav>
            <div className="main-content">
                <Canvas shadows style={{ width: '100%', height: '100%' }}>
                    <Scene transform_comp={transform} onModelInfo={setModelInfo}/>
                </Canvas>
      </div>
    </div>
  )
}

export default App;

import React from 'react';
import './App.css';
import { Scene } from './components/Scene';

function App() {
  return (
    <div className="container">
            <h1>Cinematica Inversa con React Three Fiber</h1>
            <div>
                <Scene />
            </div>
    </div>
  );
}

export default App;

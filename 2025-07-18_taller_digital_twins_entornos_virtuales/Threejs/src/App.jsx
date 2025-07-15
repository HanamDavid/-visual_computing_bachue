import './App.css';
import SceneCanvas from './components/SceneCanvas';
import MetricChart from './components/MetricChart';
import { useState, useEffect } from 'react';

function App() {
  const [dataHistory, setDataHistory] = useState([]);

  const handleMetricUpdate = (metrics) => {
    setDataHistory(prev => {
      const updated = [...prev, metrics];
      return updated.slice(-100); // máximo 100 puntos
    });
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>Simulación 3D del Sistema Físico</h1>
      </header>
      <div className="canvas-container">
        <SceneCanvas onMetricsUpdate={handleMetricUpdate} />
      </div>
      <div style={{ padding: '1rem' }}>
        <MetricChart dataHistory={dataHistory} />
      </div>
    </div>
  );
}

export default App;


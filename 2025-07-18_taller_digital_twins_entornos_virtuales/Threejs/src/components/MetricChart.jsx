// src/components/MetricChart.jsx
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip
} from 'chart.js';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Legend, Tooltip);

export default function MetricChart({ dataHistory }) {
  const labels = dataHistory.map((_, i) => i); // eje X: puntos por índice

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Temperatura',
        data: dataHistory.map(d => d?.temperature ?? 0),
        borderColor: 'red',
        backgroundColor: 'rgba(255, 0, 0, 0.1)',
        tension: 0.3,
        fill: false,
      },
      {
        label: 'Energía',
        data: dataHistory.map(d => d?.energy ?? 0),
        borderColor: 'green',
        backgroundColor: 'rgba(0, 255, 0, 0.1)',
        tension: 0.3,
        fill: false,
      },
      {
        label: 'Voltaje',
        data: dataHistory.map(d => d?.voltage ?? 0),
        borderColor: 'blue',
        backgroundColor: 'rgba(0, 0, 255, 0.1)',
        tension: 0.3,
        fill: false,
      }
    ]
  };

  return (
    <div style={{
      background: '#fff',
      padding: '1rem',
      borderRadius: '10px',
      width: '100%',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <Line data={chartData} />
    </div>
  );
}

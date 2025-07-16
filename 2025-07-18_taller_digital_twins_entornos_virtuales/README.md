# Taller de Jerarquías y Transformaciones

## Unity
En este taller se desarrolló una simulación interactiva en Unity de un brazo robótico con variables físicas como temperatura, voltaje, nivel de energía y movimiento en tres ejes. A través de scripts en C#, se programaron comportamientos dinámicos usando funciones como Mathf.Sin y Random.Range, y se visualizaron los datos en tiempo real mediante UI Sliders.  El taller combinó conceptos de simulación, programación y visualización para crear un gemelo digital básico.

### 📸 Capturas o GIFs
![Vídeo sin título ‐ Hecho con Clipchamp (2)](https://github.com/user-attachments/assets/c7e382b8-e334-4c1b-91c0-ec926df7ee76)


### 🎯 Codigo Relevante
    using UnityEngine;
    using UnityEngine.UI;
    using TMPro;
    using System.Collections.Generic;
    
    public class RobotArmSimulator : MonoBehaviour
    {
        // Variables simuladas
        public float temperatura;
        public float voltaje;
        public float nivelEnergia;
        public Vector3 movimiento;
        public float frecuencia = 1f;
    
        private float tiempo;
    
        // Sliders
        public Slider sliderMovimientoX, sliderMovimientoY, sliderMovimientoZ;
        public Slider sliderTemperatura, sliderVoltaje, sliderEnergia;
    
        // Historial
        private Queue<float> historialTemperatura = new Queue<float>();
        private Queue<float> historialVoltaje = new Queue<float>();
        private Queue<float> historialEnergia = new Queue<float>();
    
        public int maxHistorial = 10; // valores máximos a guardar
        public TextMeshProUGUI textoHistorial;
    
        void Start()
        {
            nivelEnergia = 100f;
    
            if (sliderEnergia != null)
                sliderEnergia.minValue = 0f; sliderEnergia.maxValue = 100f;
    
            if (sliderVoltaje != null)
                sliderVoltaje.minValue = 12f; sliderVoltaje.maxValue = 14f;
    
            if (sliderTemperatura != null)
                sliderTemperatura.minValue = 40f; sliderTemperatura.maxValue = 60f;
    
            if (sliderMovimientoX != null)
                sliderMovimientoX.minValue = -1f; sliderMovimientoX.maxValue = 1f;
    
            if (sliderMovimientoY != null)
                sliderMovimientoY.minValue = -1f; sliderMovimientoY.maxValue = 1f;
    
            if (sliderMovimientoZ != null)
                sliderMovimientoZ.minValue = -1f; sliderMovimientoZ.maxValue = 1f;
        }
    
        void Update()
        {
            tiempo += Time.deltaTime * frecuencia;
    
            // Simulación
            temperatura = 50f + Mathf.Sin(tiempo) * 10f + Random.Range(-1f, 1f);
            voltaje = 13f + Mathf.Sin(tiempo * 0.5f) * 1f;
            nivelEnergia -= Time.deltaTime * 1f;
            nivelEnergia = Mathf.Clamp(nivelEnergia, 0f, 100f);
    
            movimiento = new Vector3(
                Mathf.Sin(tiempo),
                Mathf.Sin(tiempo * 0.5f),
                Mathf.Sin(tiempo * 0.25f)
            );
    
            // Actualizar sliders
            if (sliderMovimientoX != null) sliderMovimientoX.value = movimiento.x;
            if (sliderMovimientoY != null) sliderMovimientoY.value = movimiento.y;
            if (sliderMovimientoZ != null) sliderMovimientoZ.value = movimiento.z;
            if (sliderTemperatura != null) sliderTemperatura.value = temperatura;
            if (sliderVoltaje != null) sliderVoltaje.value = voltaje;
            if (sliderEnergia != null) sliderEnergia.value = nivelEnergia;
    
            // Guardar en historial
            AgregarHistorial(historialTemperatura, temperatura);
            AgregarHistorial(historialVoltaje, voltaje);
            AgregarHistorial(historialEnergia, nivelEnergia);
    
            // Mostrar historial en texto
            if (textoHistorial != null)
            {
                textoHistorial.text =
                    $"Historial Temperatura:\n{FormatearHistorial(historialTemperatura)}\n\n" +
                    $"Historial Voltaje:\n{FormatearHistorial(historialVoltaje)}\n\n" +
                    $"Historial Energía:\n{FormatearHistorial(historialEnergia)}";
            }
        }
    
        void AgregarHistorial(Queue<float> historial, float nuevoValor)
        {
            if (historial.Count >= maxHistorial)
                historial.Dequeue();
            historial.Enqueue(nuevoValor);
        }
    
        string FormatearHistorial(Queue<float> historial)
        {
            string texto = "";
            foreach (var valor in historial)
                texto += $"{valor:F1}\n";
            return texto;
        }
    }


## Three.js

En este taller construimos una simulación 3D interactiva en la web utilizando React y Three.js, donde cargamos un modelo .glb, simulamos variables físicas como temperatura, energía y voltaje, y aplicamos transformaciones visuales dinámicas en tiempo real como tamaño, posicion y color. Además, integramos dat.GUI para mostrar los valores actuales y Chart.js para visualizar el historial de cambios mediante gráficas interactivas. También exploramos cómo manejar archivos pesados, incluyendo compresión de modelos y el uso de Git LFS para versiones grandes.


### 📸 Capturas o GIFs
![2025-07-15 17-33-15](https://github.com/user-attachments/assets/b0070880-7c1b-4d4d-86a4-5b06d5805d15)


### 🎯 Codigo Relevante

- SceneCanvas.jsx

        <Canvas camera={{ position: [0, 1.5, 3], fov: 75 }}>
              <ambientLight intensity={0.3} />
              <directionalLight position={[5, 10, 7.5]} intensity={1} />
              <ModelViewer
                onMetricsChange={({ temperature, energy, voltage }) => {
                    metricsRef.current.temperatura = parseFloat(temperature.toFixed(2));
                    metricsRef.current.energia = parseFloat(energy.toFixed(2));
                    metricsRef.current.voltaje = parseFloat(voltage.toFixed(2));
                    onMetricsUpdate?.({ temperature, energy, voltage }); // ✅ pasa el objeto completo
                }}
                />
              <OrbitControls />
          </Canvas>

- MetricChart.jsx
  
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
  
- ModelViewer
              
            import { useGLTF } from '@react-three/drei';
            import { useFrame } from '@react-three/fiber';
            import { useRef, useEffect, useState } from 'react';
            
            export default function ModelViewer({ onMetricsChange }) {
              const ref = useRef();
              const { scene } = useGLTF('/modelo.glb');
            
              const [metrics, setMetrics] = useState({
                temperature: 25,
                energy: 50,
                voltage: 220,
              });
            
              useEffect(() => {
                const interval = setInterval(() => {
                  const t = Date.now() / 1000;
                  const temperature = 25 + 5 * Math.sin(t);
                  const energy = 50 + 30 * Math.sin(t * 0.8);
                  const voltage = 220 + 20 * Math.sin(t * 1.2);
            
                  setMetrics({ temperature, energy, voltage });
            
                  if (ref.current) {
                    const h = 0.01 * temperature;
                    ref.current.traverse((child) => {
                      if (child.isMesh && child.material) {
                        child.material.color.setHSL(h, 1, 0.5);
                      }
                    });
                  }
            
                  onMetricsChange({
                    temperature,
                    energy,
                    voltage,
                  });
                }, 100);
            
                return () => clearInterval(interval);
              }, [onMetricsChange]);
            
              useFrame(() => {
                if (ref.current) {
                  const { energy, voltage } = metrics;
            
                  // Escala proporcional al nivel de energía
                  const scale = 1 + 0.01 * (energy - 50) / 30;
                  ref.current.scale.set(scale, scale, scale);
            
                  // Movimiento vertical según el voltaje
                  ref.current.position.y = (voltage - 220) * 0.02;
            
                  // Rotación lenta por voltaje
                  ref.current.rotation.y += 0.0003 * voltage;
                }
              });
            
              return <primitive ref={ref} object={scene} />;
            }

### Comentarios personales sobre el aprendizaje y dificultades encontradas.

Se encontraron bastantes dificultades en el uso del modelo en react debido a su peso, fue mucho mas sencillo y versatil su uso en Unity

!!!!!Ademas, Al repositorio no se agrego el modelo debido a su gran peso +80MB!!!!

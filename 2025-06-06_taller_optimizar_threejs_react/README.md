# 🧪 Taller de Optimización Visual en Three.js/React Three Fiber

📅 Fecha  
2025-06-06  

---

## 🎯 Objetivo del Taller  
Implementar técnicas avanzadas de optimización para gráficos 3D en la web, comparando rendimiento (FPS) y calidad visual antes/después de aplicar:  
- Niveles de detalle (LOD)  
- Compresión de texturas  

---

## 🧠 Conceptos Aprendidos  
1. **LOD (Level of Detail)**: Cambio automático de modelos 3D según distancia a cámara  
2. **Baking de texturas**: Pre-cálculo de iluminación en texturas  
3. **Formatos comprimidos**: WebP vs JPG para texturas  
4. **Monitoreo de rendimiento**: Uso de stats.js para FPS   

---

## 🔧 Herramientas y Entornos  
- **Three.js** (v0.150.0) + **React Three Fiber** (v8.0.0)  
- **@react-three/drei** (v9.0.0) para componentes preconstruidos  
- **Vite** (entorno de desarrollo)  

---

## 📁 Estructura del Proyecto  
```bash
2023-11-20_optimizacion_threejs/
├── public/
│ ├── models/
│ │ ├── high-res_11th_c_bce_fangding_food_vessel.glb
│ │ └── low-poly_fangding_food_vessel.glb
│ └── textures/
│ ├── wood_cabinet_worn_long_diff_1k.webp
│ ├── wood_cabinet_worn_long_diff_1k.jpg
├── src/
│ ├── components/
│ │ ├── ModelWithLOD.jsx
│ │ ├── TextureComparison.jsx
│ │ └── PerformanceMonitor.jsx
└── README.md

```

---

## 🧪 Implementación  

### 🔹 Etapas realizadas  
1. **Preparación de assets**:  
   - Modelos high/low-poly descargados de internet  
   - Texturas convertidas a WebP con Squoosh.app  

2. **Implementación en código**:  
   ```jsx
   // Uso de LOD (ModelWithLOD.jsx)
   <LOD>
     <primitive object={highRes.scene} distance={0} />
     <primitive object={lowRes.scene} distance={15} />
   </LOD>
    ```
## 📊 Resultados Visuales

![optimizacion modelo 3d](https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExa2F6bjlldGtmNXN6bG0wc3NjNXgwMGFybmJzbno1bDZvaHRiemZkaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xn6SkWl9tmCL14cc5q/giphy.gif)
![optimizaciontexturas](https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcGcwM3ZzNzlqN2hhN29mNW1pcmk2NWJmam81b2N5dTN3bjdpMmN2YyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Dpoc1bNHSxgDTGRobS/giphy.gif)

## 🧩 Prompts Usados
- "Three.js LOD implementation with React Three Fiber"

- "Best practices for texture compression in WebGL"

- "How to display real-time FPS in Three.js"

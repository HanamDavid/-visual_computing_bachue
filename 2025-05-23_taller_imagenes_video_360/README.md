# 🌀 Taller 64 - Visualización de Imágenes y Video 360° en Unity y Three.js

## 📅 Fecha
2025-05-23 – Fecha de entrega o realización

---

## 🎯 Objetivo del Taller

Aprender a cargar e integrar imágenes panorámicas (equirectangulares) y videos 360° dentro de entornos 3D inmersivos utilizando Unity y Three.js con React. Este conocimiento es clave para el desarrollo de experiencias XR, recorridos virtuales y visualización envolvente.

---

## 🧠 Conceptos Aprendidos

- [x] Transformaciones geométricas (escala, rotación)
- [x] Shaders y proyección esférica
- [x] Integración de texturas en 360°
- [x] Uso de VideoPlayer (Unity) y VideoTexture (Three.js)
- [x] Navegación en escena con controles de cámara
- [x] Otro: Visualización inmersiva en experiencias XR

---

## 🔧 Herramientas y Entornos

- Unity 2022 LTS
- Three.js con React Three Fiber
- React + Vite + Tailwind
- VSCode / Rider / Unity Editor


---

## 📁 Estructura del Proyecto

2025-05-23_taller_imagenes_video_360/
├── unity/
│ ├── Assets/Panoramas/
│ ├── Scripts/
├── threejs/
│ ├── public/video360.mp4
│ ├── public/panorama.jpg
│ ├── src/components/Scene.jsx
├
│
│-- imagen360_threejs.gif
├── README.md

---

## 🧪 Implementación

### 🔹 Etapas realizadas
1. Preparación de texturas equirectangulares (.jpg/.mp4)
2. Configuración de geometría invertida (esfera con escala negativa)
3. Carga de textura como mapa en Unity (Material) y Three.js (map/VideoTexture)
4. Control de cámara libre (OrbitControls / MouseLook)
5. Interacción y pruebas de navegación inmersiva

### 🔹 Código relevante



React + Three.js – VideoTexture 360°:

<mesh scale={[-1, 1, 1]}>
  <sphereGeometry args={[10, 60, 40]} />
  <meshBasicMaterial map={videoTexture} side={THREE.BackSide} />
</mesh>


![imagen360_threejs](./imagen360_threejs.gif)

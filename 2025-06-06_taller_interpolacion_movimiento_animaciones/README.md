# Interpolación de Movimiento y Rotación en Three.js

## 🎯 Objetivo

Visualizar la interpolación de posición y rotación de un objeto entre dos puntos, usando diferentes métodos:

- **LERP (Linear Interpolation)** para posición lineal.
- **SLERP (Spherical Linear Interpolation)** para rotación suave con cuaterniones.
- **Curva de Bézier** para interpolación suave de trayectoria.

---

## ✨ Métodos de Interpolación

### 🔹 LERP (Linear Interpolation)
Usa la fórmula:
```ts
vector.lerpVectors(p0, p1, t)
```
Permite interpolar de forma lineal entre dos puntos p0 y p1 según el parámetro t ∈ [0,1].

### 🔹 Bézier Curve Interpolation
Utiliza THREE.QuadraticBezierCurve3(p0, p1, p2) para definir una curva cuadrática:

```ts
curve.getPoint(t)
```

### 🔹 SLERP (Spherical Linear Interpolation)
Para rotación entre dos orientaciones, se interpolan dos cuaterniones:

```ts
quaternion.slerpQuaternions(qStart, qEnd, t)
```
Evita rotaciones bruscas al interpolar sobre la esfera de rotaciones.

## 🎞️ Animaciones (GIFs)
![Movimiento Curvo](https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMHViMmp4MWxqNjZiN3dvNjlhNHExNTFpbTB3emo1OXd1dzloZHl0eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/qoBmGZ9xJPepnG7ffo/giphy.gif)

## 🧠 Código Relevante
### 📄 Archivo Principal
App.js

Contiene:

- Definición de puntos y curva.

- Lógica de interpolación con useFrame().

- Uso de leva para controlar t.

- Visualización con <Canvas>, <Line>, <mesh>

### 🛠 Funciones y Componentes Clave
- ObjetoInterpolado: Interpola posición y rotación.

- CurvaBezier: Muestra la trayectoria curva.

- Puntos: Renderiza puntos visibles de inicio y fin.
  
## ✅ Prompts Usados
- "How do I animate an object smoothly between two points using Bézier curves in Three.js?"

- "What's the difference between linear interpolation and Bézier interpolation in 3D graphics?"

- "How to interpolate rotation using quaternions with slerp in Three.js?"

.

## 💭 Reflexión
En la experiencia visual:

- La interpolación Bézier fue más natural y fluida, ideal para trayectorias suaves.

- La interpolación lineal es directa, pero puede parecer robótica o menos orgánica.

- SLERP aporta rotación continua sin saltos ni cortes, crucial en animaciones 3D realistas.



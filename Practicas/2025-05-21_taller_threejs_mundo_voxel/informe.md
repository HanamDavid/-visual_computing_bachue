# 🌍 Mundo Estilo Minecraft en Three.js

Un mundo 3D procedural construido con [Three.js](https://threejs.org/), inspirado en el estilo visual de Minecraft. Incluye un terreno tipo voxel, árboles, rocas, plantas y criaturas simples generadas de forma procedural, con iluminación básica y formas primitivas.
Este codigo fue hecho en un editor online: https://codesandbox.io/p/sandbox/three-js-forked-vtnt27?file=%2Fsrc%2Findex.js 

---

## 🧪 Taller Práctico #3

**Objetivo:**  
Crear un mundo 3D con terreno estilo voxel, elementos naturales y criaturas usando Three.js. Aplicar materiales PBR, iluminación simple y geometrías primitivas (cubo, esfera, cono, etc.).

---

## 🧩 Ejemplos de Funciones Usadas

```js
function createTerrain(size) { /* Genera el terreno voxel */ }

function createTree(x, y, z) { /* Crea un árbol con cilindros y esferas */ }

function createPig(x, y, z) { /* Construye un cerdo usando cubos agrupados */ }

function createRock(x, y, z) { /* Roca procedural con geometría de esfera */ }

function createPlant(x, y, z) { /* Planta decorativa simple */ }

function setupLighting() { /* Añade luz ambiental y direccional */ }
```
## 🧱 Organización del Mundo y Elementos
 - Terreno Voxel: Cuadrícula de cubos (BoxGeometry) con alturas aleatorias.

 - Árboles: Hechos con CylinderGeometry (tronco) y SphereGeometry (hojas).

 - Rocas: Esferas con material oscuro, colocadas aleatoriamente.

 - Plantas: Cilindros verdes pequeños como vegetación decorativa.

 - Criaturas: Modelo de cerdo simple hecho con cubos agrupados.

 - Iluminación: Luz ambiental (AmbientLight) y luz direccional (DirectionalLight) para simular el sol.

## 🎥 Vista previa del mundo

¡Así se ve el mundo generado!

![Vista previa del mundo estilo Minecraft](resultado/mundo.gif)

## ✨ Reflexión sobre la Personalización del Mundo
Este proyecto demuestra cómo con solo formas primitivas y generación procedural se puede construir un mundo visualmente interesante. Al combinar cubos, cilindros, esferas y conos, es posible representar árboles, criaturas y elementos del entorno natural.

La agrupación con Group() permitió organizar de manera modular modelos como los árboles o el cerdo. Aunque se usaron materiales simples, el proyecto está preparado para incorporar texturas físicas realistas con PBR.

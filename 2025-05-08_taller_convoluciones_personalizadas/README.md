# Taller - Filtro Visual: Convoluciones Personalizadas

## 📖 Explicación de la lógica de convolución manual

La **convolución manual** consiste en recorrer cada píxel de la imagen original y aplicar un cálculo local basado en un **kernel** (matriz de pesos) que se superpone sobre una ventana de la imagen.  
El valor final de cada píxel en la imagen resultante se obtiene multiplicando elemento a elemento la región local de la imagen con el kernel, y sumando los productos.

Pasos básicos de la convolución manual:
1. Colocar el centro del kernel sobre cada píxel de la imagen.
2. Multiplicar cada valor del kernel por el valor correspondiente de la imagen.
3. Sumar todos los valores resultantes.
4. Asignar este valor al píxel correspondiente en la nueva imagen.

En la implementación manual utilizamos `NumPy` para hacer las operaciones básicas de multiplicación, suma y control de bordes, replicando la lógica matemática de la convolución.

---

## ⚡ Diferencia con el uso de OpenCV

Cuando usamos `cv2.filter2D()` de OpenCV, todo este proceso de convolución se realiza automáticamente y de manera **mucho más optimizada** internamente.  
OpenCV utiliza implementaciones en C++ altamente eficientes, aceleradas por CPU o GPU cuando es posible, logrando tiempos de procesamiento mucho menores que nuestra versión manual.

**Principales diferencias:**
- **Convolución manual:** más lenta, control total sobre cada paso, ideal para aprender.
- **OpenCV:** más rápida, práctica para proyectos reales, menos exposición a los detalles internos.

---
## Gif:
![Convuluciones](https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExenNmaDMydDZxdzNydm9mazR0eHRtazlzczduYWJnYXFwdHB6NWlvOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/KgoZuUFMOXgoUhGzlV/giphy.gif)

## Enlace al colab:
[Colab](https://colab.research.google.com/drive/1bvvbRZBofHxpYrSUjNLTm7puVn7u30bv?usp=sharing)
## 🎯 Comentarios sobre el aprendizaje y comportamiento visual de los filtros

Durante el taller se observaron comportamientos visuales distintos según el tipo de kernel utilizado:

- **Enfocar (Sharpen):** los bordes y detalles finos de la imagen se volvieron más nítidos, aumentando el contraste local.
- **Suavizado (Blur):** la imagen perdió nitidez y detalles, dando un efecto de desenfoque uniforme.
- **Detección de bordes:** resaltó las transiciones bruscas de intensidad, permitiendo visualizar contornos y formas principales.
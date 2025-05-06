# 🧪 Taller: De Píxeles a Coordenadas - Explorando la Imagen como Matriz

## 🎯 Objetivo
Este taller tiene como propósito comprender cómo una imagen digital puede ser representada y manipulada como una matriz de valores numéricos. Se trabajan directamente los valores de color y brillo, accediendo y modificando regiones específicas de la imagen con slicing de matrices, así como aplicando transformaciones visuales como ajuste de brillo y contraste.

---

## 🧩 Actividades realizadas

### ✅ 1. Carga y visualización de la imagen
Se cargó una imagen en color utilizando `cv2.imread()`. OpenCV lee la imagen en formato BGR, y para mostrarla correctamente con `matplotlib`, fue convertida a formato RGB.

### ✅ 2. Separación de canales de color
Se extrajeron y visualizaron por separado los canales RGB y HSV. Esto permite entender cómo se distribuye la información de color en diferentes modelos.

### ✅ 3. Modificación de regiones con slicing
Se seleccionó un área rectangular de la imagen y se modificó directamente su color. También se copió una región de la imagen a otra ubicación usando operaciones básicas con matrices.

### ✅ 4. Visualización de histogramas
Se calcularon los histogramas de intensidad de cada canal utilizando `cv2.calcHist()` y se graficaron con `matplotlib.pyplot`. Esto permitió visualizar la distribución tonal de los colores.

### ✅ 5. Ajustes de brillo y contraste
Se implementaron dos métodos para modificar brillo y contraste:
- Manualmente mediante la ecuación: `nueva = alpha * imagen + beta`
- Usando la función `cv2.convertScaleAbs()` de OpenCV.

##  Gifs:
### Cargo de imagen y canales RGB y HSV
![Cargo de imagen y canales RGB y HSV](https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjlrdGZ5M3Q3MXp0dXhvMzAzaTFvZW4wMWs2dmo4cnllbHZud293NCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/w5W9kQ7TA9cf45CwLL/giphy.gif)
### Modificar una región específica
![Modificar una región específica](https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWZldWwyaGNwcTJrcWFvdzU0M3BseHdqNzJlemR4ZzJldjZ0OWhmYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/UeSn17IWIpsOkA5qw7/giphy.gif)
### Histogramas de color, brillo y contraste
![Histogramas de color, brillo y contraste](https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWV5N2RuYWo5bmpzN2t0YzQxZmc1dDdsdGVoZTJtd2F3ZG80OWs0ayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ji5fEE7bUXL7PLLN68/giphy.gif)

##  Link colab:
[Colab](https://colab.research.google.com/drive/1TddgTiY-xtAYD8qnLheFTXr4xq4rHY6l?usp=sharing)
---

## 🧠 Aprendizajes clave

- Una imagen digital es una **matriz tridimensional**: [alto, ancho, canales].
- Los **canales de color** pueden manipularse por separado para crear efectos visuales.
- El **slicing de matrices** permite modificar secciones específicas con gran precisión.
- Los **histogramas** revelan información importante sobre el brillo y la cantidad de cada color.
- Los **ajustes de brillo y contraste** pueden mejorar o deteriorar detalles, dependiendo del contexto.

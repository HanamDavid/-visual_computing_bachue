# 🧪 Taller: Simulación de Modelos de Color y Percepción Visual

📅 Fecha  
2025-05-23

---

## 🎯 Objetivo del Taller

El objetivo principal de este taller fue explorar distintos modelos de color (RGB, HSV y CIE Lab), comprender sus diferencias y simular condiciones visuales alteradas como daltonismo y baja iluminación. Además, se aplicaron transformaciones sobre los canales de color para generar efectos visuales personalizados.

---

## 🧠 Conceptos Aprendidos

- Modelos de color: RGB, HSV, CIE Lab.
- Manipulación de canales individuales.
- Simulación visual: daltonismo y baja luz.
- Filtros personalizados basados en HSV.
- Visualización de imágenes en Python con `matplotlib`.

---

## 🔧 Herramientas y Entornos

- Python
  - `opencv-python`
  - `numpy`
  - `matplotlib`
- Google Colab

---

## 📁 Estructura del Proyecto
2025-05-23_taller_modelos_color_percepcion/
├── python/
├── resultados/
│   ├── parrot_1.gif
│   ├── parrot_2.gif
├── README.md

---

## 🧪 Implementación
### 🔹 Etapas realizadas
1. Preparación de datos
Carga de imagen .jpg y conversión a RGB.

2. Aplicación de modelos
Conversión a HSV y LAB con OpenCV.

3. Simulación visual

 - Daltonismo por matrices de transformación.

 - Oscurecimiento mediante canal V de HSV.

 - Filtros creativos como inversión de matiz y desaturación.

4. Visualización y guardado

## 📊 Resultados Visuales
### Parte 1
![Simulación de visión](https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExaDZrMmpkM3R3MDUxc3k4YmZka2xvazVoZW5mNno2am01d3hkMWRkdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/8vPRbUNMlgvelB8zav/giphy.gif)
### Parte 2
![Simulación de visión](https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMnEwZmd2cXJkbzV1cWlueDk2ajVsaWRiM2hoN2s4cDNibnAyYzdydyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/1BlT2vZoUswkgk0g45/giphy.gif)
### 💬 Reflexión Final
Este taller nos permitió comprender de forma práctica cómo se representan y transforman los colores en distintos espacios como HSV y LAB. Aprendimos cómo afectan estos modelos a la percepción del color y cómo pueden utilizarse para simular condiciones visuales como el daltonismo o la baja iluminación.

La parte más interesante fue simular la protanopía mediante matrices y filtros personalizados en HSV. Fue retador lograr que los cambios se notaran de manera visual clara, y aprender cómo manipular imágenes a nivel de canal resultó clave. Para futuros proyectos, nos gustaría expandir este ejercicio integrando modelos de IA o detección automática de objetos y aplicar estos filtros dinámicamente.

## ✅ Checklist de Entrega

- [x] Carpeta `YYYY-MM-DD_nombre_taller`
- [x] Código limpio y funcional
- [x] GIF incluido con nombre descriptivo (si el taller lo requiere)
- [x] Visualizaciones o métricas exportadas
- [x] README completo y claro
- [x] Commits descriptivos en inglés

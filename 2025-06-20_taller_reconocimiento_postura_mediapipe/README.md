# Reconocimiento de Acciones Simples con Detección de Postura

📅 Fecha  
2025-06-20 – Fecha de entrega o realización

---

🎯 **Objetivo del Taller**  
Implementar el reconocimiento de acciones simples (como sentarse, levantar brazos o caminar frente a cámara) usando MediaPipe Pose para detectar la postura corporal. El objetivo es interpretar acciones humanas a partir de la ubicación de puntos clave del cuerpo y generar una respuesta visual en pantalla.

---

🧠 **Conceptos Aprendidos**

- Detección de landmarks corporales
- Comunicación por gestos
- Procesamiento de video en tiempo real
- Reconocimiento de acciones mediante condiciones espaciales
- Visualización de resultados con OpenCV

---

🔧 **Herramientas y Entornos**

  - `Python`
  - `mediapipe`
  - `opencv-python`
  - `numpy`
- Entorno: Ejecución local en CMD o VSCode

📌 Usa las herramientas según la guía de instalación oficial

---

📁 **Estructura del Proyecto**
```bash
2025-06-20_reconocimiento_postura/
├── python/ 
│ └── posturas.py
├── resultados/ # gifs
├── README.md

```
---

🧪 **Implementación**

🔹 *Etapas realizadas*:

1. Captura de video desde la webcam usando OpenCV.
2. Procesamiento de frames y detección de landmarks con MediaPipe Pose.
3. Aplicación de condiciones lógicas para determinar acciones humanas (sentado, brazos arriba, caminando).
4. Visualización de la acción detectada en tiempo real en pantalla.
---
🔹 *Código relevante*:
```python
if left_wrist.y < nose.y and right_wrist.y < nose.y:
    accion = "¡Brazos arriba!"
elif left_hip.y > left_knee.y and right_hip.y > right_knee.y:
    accion = "Sentado"
elif abs(left_ankle.x - right_ankle.x) > 0.1:
    accion = "Caminando"
```
---
📊 **Resultados Visuales**

![Acción detectada en tiempo real](resultados/posturas.gif)
---

🧩 **Prompts Usados**

 - "Detect if a person is sitting or standing using body landmarks from a live webcam feed"

 - "Recognize if both arms are raised above the head using MediaPipe Pose"

 - "Create a Python script that visualizes detected human actions using OpenCV and Pose Estimation"
---

💬 **Reflexión Final**

Este taller me permitió reforzar el uso de MediaPipe Pose para el reconocimiento de posturas humanas en tiempo real, combinándolo con OpenCV para visualización. Aprendí cómo usar landmarks específicos para inferir acciones simples a través de reglas lógicas basadas en coordenadas y y x.

La parte más interesante fue comprobar cómo condiciones muy simples pueden usarse para entender comportamientos complejos como "caminar" o "sentarse". La integración en tiempo real fue fluida y demuestra el potencial de combinar visión por computadora con interfaces humanas.

Para mejorar este proyecto en el futuro, me gustaría agregar sonidos con pygame, hacer el reconocimiento más robusto con historial de movimientos, y explorar otras acciones como saltar o correr usando modelos de aprendizaje automático.

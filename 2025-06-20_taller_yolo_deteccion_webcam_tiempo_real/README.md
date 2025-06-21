# 🧪 Taller - Detección de Objetos en Tiempo Real con YOLO y Webcam

📅 Fecha  
2025-06-20 – Fecha de realización

---

## 🎯 Objetivo del Taller

El objetivo de este taller es implementar un sistema de detección de objetos en tiempo real utilizando un modelo YOLOv8 preentrenado, con entrada en vivo desde la webcam. Se pretende explorar la eficiencia del modelo, visualizar los objetos detectados en pantalla y calcular los FPS (frames por segundo) como métrica de desempeño del sistema.

---

## 🧠 Conceptos Aprendidos

- Inferencia con modelos de visión por computador (YOLOv8).
- Detección de objetos en tiempo real.
- Visualización con OpenCV.
- Cálculo de métricas de rendimiento (FPS).
- Procesamiento de video cuadro a cuadro.
- Uso de modelos preentrenados.
- Otro: Manipulación de bounding boxes y etiquetas.

---

## 🔧 Herramientas y Entornos

Entorno usado:  
**Python** (ejecución local)

Librerías requeridas:
- `ultralytics` (para YOLOv8)
- `opencv-python`
- `numpy`
- `torch` (se instala como dependencia con ultralytics)

Instalación recomendada:

```bash
pip install ultralytics opencv-python
```

## 📁 Estructura del Proyecto
```bash
2025-06-20_taller_yolo_deteccion_webcam_tiempo_real/
├── python/
│   └── deteccion.py
├── resultados/
│   └── deteccion_objetos.gif
├── README.md

```

## 🧪 Implementación

### 🔹 Etapas realizadas
 - Preparación de escena: Activación de la webcam del equipo.

 - Carga del modelo: Se cargó el modelo YOLOv8 nano (yolov8n.pt) usando ultralytics.

 - Detección cuadro a cuadro: Se aplicó el modelo sobre cada frame capturado.

 - Visualización: Se mostraron las cajas, etiquetas, confianza y FPS sobre el video en tiempo real.

 - Finalización: Se habilitó la tecla q para cerrar el programa y liberar recursos.

### 🔹 Código relevante
```python
from ultralytics import YOLO
import cv2, time

model = YOLO('yolov8n.pt')
cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()
    start_time = time.time()
    results = model.predict(source=frame, conf=0.5, stream=True)

    for r in results:
        for box in r.boxes:
            x1, y1, x2, y2 = map(int, box.xyxy[0])
            label = model.names[int(box.cls[0])]
            conf = float(box.conf[0])
            cv2.rectangle(frame, (x1, y1), (x2, y2), (0,255,0), 2)
            cv2.putText(frame, f'{label} {conf:.2f}', (x1, y1-10), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0,255,0), 2)

    fps = 1 / (time.time() - start_time)
    cv2.putText(frame, f'FPS: {fps:.2f}', (10, 25), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 0, 255), 2)
    cv2.imshow("YOLOv8 Detection", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
```

## 📊 Resultados Visuales
![Deteccion de objetos en tiempo real](resultados/deteccion_objetos.gif)

## 🧩 Prompts Usados

- "Detect multiple objects such as persons, cars, and phones from video input using a pre-trained model."
- "How to display bounding boxes and class labels on live video using OpenCV in Python?"
- "Measure and visualize the inference FPS during real-time object detection."
- "Use YOLOv8 to filter detections and highlight only specific classes like 'person' or 'cell phone'."

## 💬 Reflexión Final
Este taller me permitió entender cómo implementar detección de objetos en tiempo real utilizando modelos preentrenados como YOLOv8. Aprendí cómo se estructuran los resultados de la detección (bounding boxes, clases, confianza) y cómo visualizarlos con OpenCV sobre una señal de video en vivo.

La parte más interesante fue medir los FPS y ver cómo afecta el rendimiento dependiendo del tamaño del modelo o la resolución del video. Lo más retador fue interpretar correctamente la estructura del resultado (r.boxes) para extraer y mostrar etiquetas con precisión.

En futuros proyectos me gustaría probar esto con detección personalizada (entrenar YOLO con mis propios datos) y aplicarlo en el proyecto de la materia.

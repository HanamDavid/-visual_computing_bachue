# deteccion.py

from ultralytics import YOLO
import cv2
import numpy as np

modelo = YOLO('yolov8n.pt')

def detectar(frame):
    resultados = modelo(frame, verbose=False)[0]
    personas = []
    conteos = {}

    frame_dibujado = frame.copy()

    for box in resultados.boxes:
        clase = int(box.cls[0])
        confianza = float(box.conf[0])
        nombre_clase = modelo.names[clase]

        # Conteo por clase
        conteos[nombre_clase] = conteos.get(nombre_clase, 0) + 1

        # Dibujar BBox
        x1, y1, x2, y2 = map(int, box.xyxy[0])
        cv2.rectangle(frame_dibujado, (x1, y1), (x2, y2), (0, 255, 0), 2)
        cv2.putText(frame_dibujado, f'{nombre_clase} {confianza:.2f}', (x1, y1 - 5),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 1)

        # Solo guardamos personas para alertas
        if nombre_clase == 'person':
            personas.append({
                'bbox': (x1, y1, x2, y2),
                'confianza': confianza,
                'clase': nombre_clase
            })

    return personas, conteos, frame_dibujado


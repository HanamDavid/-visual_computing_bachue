# deteccion.py

import cv2
from ultralytics import YOLO
from datetime import datetime
import os

def detectar_y_guardar(imagen_path, output_dir):
    os.makedirs(output_dir, exist_ok=True)

    # Cargar modelo YOLOv8 (pre-entrenado)
    modelo = YOLO("yolov8n.pt")

    # Leer imagen
    img = cv2.imread(imagen_path)

    # Ejecutar detección
    resultados = modelo(img)[0]

    # Anotar detecciones en la imagen
    for resultado in resultados.boxes.data.tolist():
        x1, y1, x2, y2, conf, cls = resultado
        x1, y1, x2, y2 = map(int, [x1, y1, x2, y2])
        label = modelo.names[int(cls)]
        cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 2)
        cv2.putText(img, f"{label} {conf:.2f}", (x1, y1 - 5),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

    # Guardar imagen anotada
    annotated_path = os.path.join(output_dir, "deteccion.png")
    cv2.imwrite(annotated_path, img)

    # Exportar resultados como JSON
    timestamp = datetime.now().isoformat()
    objetos = []
    for resultado in resultados.boxes.data.tolist():
        x1, y1, x2, y2, conf, cls = resultado
        objetos.append({
            "class": modelo.names[int(cls)],
            "confidence": round(float(conf), 2),
            "x": int(x1),
            "y": int(y1),
            "w": int(x2 - x1),
            "h": int(y2 - y1)
        })

    datos_json = {
        "timestamp": timestamp,
        "objects": objetos
    }

    return datos_json


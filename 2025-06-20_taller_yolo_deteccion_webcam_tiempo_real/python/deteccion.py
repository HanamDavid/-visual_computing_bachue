# ===========================================
# 🧪 Taller - Detección de Objetos en Tiempo Real con YOLOv8
# Requisitos: pip install ultralytics opencv-python
# ===========================================

import cv2
import time
from ultralytics import YOLO

# -------------------------------------------
# 1. Cargar el modelo YOLOv8 (puedes usar yolov8n, yolov8s, etc.)
# -------------------------------------------
model = YOLO('yolov8n.pt')  # Usa la versión más liviana para mayor velocidad

# -------------------------------------------
# 2. Inicializar la captura de la cámara
# -------------------------------------------
cap = cv2.VideoCapture(0)

# Verificar si la cámara está abierta correctamente
if not cap.isOpened():
    print("❌ Error al abrir la cámara")
    exit()

# -------------------------------------------
# 3. Bucle principal: detección en tiempo real
# -------------------------------------------
while True:
    ret, frame = cap.read()
    if not ret:
        break

    start_time = time.time()

    # Detección con el modelo
    results = model.predict(source=frame, conf=0.5, stream=True)

    # Procesar resultados
    for r in results:
        for box in r.boxes:
            cls = int(box.cls[0])  # clase detectada (como número)
            conf = float(box.conf[0])  # confianza
            label = model.names[cls]  # nombre de la clase
            x1, y1, x2, y2 = map(int, box.xyxy[0])  # coordenadas del bounding box

            # Dibujar la caja y la etiqueta
            cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
            cv2.putText(frame, f'{label} {conf:.2f}', (x1, y1 - 10),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 0), 2)

    # Calcular FPS
    end_time = time.time()
    fps = 1 / (end_time - start_time)

    # Mostrar los FPS en la esquina superior izquierda
    cv2.putText(frame, f'FPS: {fps:.2f}', (10, 25),
                cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 0, 255), 2)

    # Mostrar el frame con detecciones
    cv2.imshow("YOLOv8 Detection", frame)

    # Presionar 'q' para salir
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# -------------------------------------------
# 4. Liberar recursos
# -------------------------------------------
cap.release()
cv2.destroyAllWindows()

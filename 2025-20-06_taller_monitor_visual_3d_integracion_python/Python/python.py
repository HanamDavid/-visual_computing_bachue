import cv2
import asyncio
import websockets
import json
from ultralytics import YOLO

# Cargar modelo YOLO
model = YOLO("yolov8n.pt")  # Asegúrate de tener este archivo

# Inicializar cámara
cap = cv2.VideoCapture(0)

# Lista de clientes conectados
clients = set()

async def detectar_y_enviar():
    while True:
        ret, frame = cap.read()
        if not ret:
            continue

        # Detectar con YOLO
        results = model(frame, verbose=False)[0]
        persons = [b for b in results.boxes if int(b.cls) == 0]
        count = len(persons)

        biggest = None
        if persons:
            biggest = max(persons, key=lambda b: b.xywh[0][2] * b.xywh[0][3])
            x, y, w, h = map(float, biggest.xywh[0])
            bbox = {"x": x, "y": y, "w": w, "h": h}
        else:
            bbox = None

        # JSON a enviar
        data = {
            "personas": count,
            "bbox": bbox
        }

        msg = json.dumps(data)
        print("Enviando JSON:", msg)  # 👈 Mostrar en consola

        # Enviar a todos los clientes conectados
        if clients:
            await asyncio.gather(*[client.send(msg) for client in clients])

        # Mostrar ventana local (opcional)
        cv2.imshow("YOLO Detection", frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

# Manejo de clientes WebSocket
async def handler(websocket, path):
    clients.add(websocket)
    try:
        await websocket.wait_closed()
    finally:
        clients.remove(websocket)

# Iniciar servidor
async def main():
    server = websockets.serve(handler, "localhost", 8765)
    await asyncio.gather(server, detectar_y_enviar())

# Ejecutar todo
asyncio.run(main())

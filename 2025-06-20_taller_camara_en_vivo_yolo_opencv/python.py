import cv2
from ultralytics import YOLO

# Cargar modelo YOLOv5 (puede ser yolov5n, yolov5s, etc.)
model = YOLO('yolov5s.pt')

# Inicializar captura de video
cap = cv2.VideoCapture(0)

# Filtro actual: 0=original, 1=grises, 2=binarización, 3=bordes
filtro = 0
paused = False
save_count = 0

print("Controles:")
print("  F - Cambiar filtro")
print("  P - Pausar/reanudar")
print("  S - Guardar imagen")
print("  Q - Salir")

while True:
    if not paused:
        ret, frame = cap.read()
        if not ret:
            break

        frame_yolo = frame.copy()
        resultados = model.predict(frame_yolo, verbose=False)[0]

        # Dibujar cajas
        for r in resultados.boxes:
            x1, y1, x2, y2 = map(int, r.xyxy[0])
            conf = r.conf[0]
            cls = int(r.cls[0])
            label = f"{model.names[cls]} {conf:.2f}"
            cv2.rectangle(frame_yolo, (x1, y1), (x2, y2), (0, 255, 0), 2)
            cv2.putText(frame_yolo, label, (x1, y1 - 5),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 1)

        # Aplicar filtros
        if filtro == 0:
            filtro_aplicado = frame.copy()
        elif filtro == 1:
            filtro_aplicado = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        elif filtro == 2:
            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            _, filtro_aplicado = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY)
        elif filtro == 3:
            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            filtro_aplicado = cv2.Canny(gray, 100, 200)

        # Mostrar ventanas
        cv2.imshow('YOLOv5 Detección', frame_yolo)
        titulo_filtro = ['Original', 'Grises', 'Binarización', 'Bordes'][filtro]
        cv2.imshow(f'Filtro: {titulo_filtro}', filtro_aplicado)

    # Controles
    key = cv2.waitKey(1) & 0xFF
    if key == ord('q'):
        break
    elif key == ord('f'):
        filtro = (filtro + 1) % 4
    elif key == ord('p'):
        paused = not paused
    elif key == ord('s'):
        cv2.imwrite(f'captura_{save_count}.png', filtro_aplicado)
        print(f'Imagen guardada como captura_{save_count}.png')
        save_count += 1

cap.release()
cv2.destroyAllWindows()

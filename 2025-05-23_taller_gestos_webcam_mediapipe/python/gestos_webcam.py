import cv2
import mediapipe as mp
import numpy as np
import math

# Inicializar MediaPipe y cámara
mp_hands = mp.solutions.hands
mp_drawing = mp.solutions.drawing_utils
hands = mp_hands.Hands(max_num_hands=1, min_detection_confidence=0.7)
cap = cv2.VideoCapture(0)

# Variables
color_fondo = (0, 0, 0)
objeto_pos = [300, 300]
escena = 1

# IDs de las puntas de los dedos
dedos_ids = [4, 8, 12, 16, 20]

def contar_dedos(landmarks):
    dedos = []

    # Pulgar (caso especial: comparar x en vez de y)
    if landmarks[4].x < landmarks[3].x:
        dedos.append(1)
    else:
        dedos.append(0)

    # Resto de dedos
    for tip_id in [8, 12, 16, 20]:
        if landmarks[tip_id].y < landmarks[tip_id - 2].y:
            dedos.append(1)
        else:
            dedos.append(0)
    
    return dedos

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # Voltear y convertir a RGB
    frame = cv2.flip(frame, 1)
    rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = hands.process(rgb)

    if results.multi_hand_landmarks:
        for hand_landmarks in results.multi_hand_landmarks:
            lm = hand_landmarks.landmark
            dedos = contar_dedos(lm)
            total_dedos = sum(dedos)

            # 🎨 Cambiar color de fondo según cantidad de dedos
            colores = {
                0: (0, 0, 0),
                1: (0, 0, 255),
                2: (0, 255, 0),
                3: (255, 0, 0),
                4: (0, 255, 255),
                5: (255, 255, 255)
            }
            color_fondo = colores.get(total_dedos, (50, 50, 50))

            # ✋ Cambiar de escena si palma abierta
            if total_dedos == 5:
                escena = (escena % 3) + 1  # Cambia entre escenas 1, 2 y 3

            # 👉 Mover objeto con el dedo índice (landmark 8)
            h, w, _ = frame.shape
            index_x = int(lm[8].x * w)
            index_y = int(lm[8].y * h)
            objeto_pos = [index_x, index_y]

            # 📏 Calcular distancia entre pulgar e índice
            pulgar_x = int(lm[4].x * w)
            pulgar_y = int(lm[4].y * h)
            distancia = int(math.hypot(index_x - pulgar_x, index_y - pulgar_y))

            # Dibujar distancia
            cv2.line(frame, (index_x, index_y), (pulgar_x, pulgar_y), (255, 255, 255), 2)
            cv2.putText(frame, f"Dist: {distancia}", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (255,255,255), 2)

            # Dibujar la mano
            mp_drawing.draw_landmarks(frame, hand_landmarks, mp_hands.HAND_CONNECTIONS)

    # Fondo con color dinámico
    fondo = np.full_like(frame, color_fondo, dtype=np.uint8)
    frame = cv2.addWeighted(frame, 0.6, fondo, 0.4, 0)

    # 🎮 Dibujar objeto en pantalla
    cv2.circle(frame, tuple(objeto_pos), 30, (0, 100, 255), -1)

    # Mostrar escena actual
    cv2.putText(frame, f"Escena {escena}", (10, 470), cv2.FONT_HERSHEY_SIMPLEX, 1, (0,0,0), 2)

    # Mostrar el resultado
    cv2.imshow("Control con Gestos - MediaPipe", frame)

    # Salir con la tecla ESC
    if cv2.waitKey(1) & 0xFF == 27:
        break

cap.release()
cv2.destroyAllWindows()

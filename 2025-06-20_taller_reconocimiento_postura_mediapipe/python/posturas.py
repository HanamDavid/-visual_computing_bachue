
import cv2
import mediapipe as mp
import numpy as np

# Inicializar MediaPipe Pose
mp_pose = mp.solutions.pose
pose = mp_pose.Pose()
mp_drawing = mp.solutions.drawing_utils

# Iniciar captura de video
cap = cv2.VideoCapture(0)

def get_landmark_coords(landmarks, idx, frame_height, frame_width):
    landmark = landmarks[idx]
    return int(landmark.x * frame_width), int(landmark.y * frame_height)

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # Espejo (opcional)
    frame = cv2.flip(frame, 1)
    
    # Convertir a RGB
    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = pose.process(rgb_frame)

    # Dimensiones del frame
    h, w, _ = frame.shape

    # Acción detectada
    accion = ""

    if results.pose_landmarks:
        lm = results.pose_landmarks.landmark

        # Obtener coordenadas necesarias
        nose_y = lm[mp_pose.PoseLandmark.NOSE].y
        lw_y = lm[mp_pose.PoseLandmark.LEFT_WRIST].y
        rw_y = lm[mp_pose.PoseLandmark.RIGHT_WRIST].y

        lhip_y = lm[mp_pose.PoseLandmark.LEFT_HIP].y
        rhip_y = lm[mp_pose.PoseLandmark.RIGHT_HIP].y
        lknee_y = lm[mp_pose.PoseLandmark.LEFT_KNEE].y
        rknee_y = lm[mp_pose.PoseLandmark.RIGHT_KNEE].y

        lankle_x = lm[mp_pose.PoseLandmark.LEFT_ANKLE].x
        rankle_x = lm[mp_pose.PoseLandmark.RIGHT_ANKLE].x

        # Condiciones lógicas
        if lw_y < nose_y and rw_y < nose_y:
            accion = "¡Brazos arriba!"
        elif lhip_y > lknee_y and rhip_y > rknee_y:
            accion = "Sentado"
        elif abs(lankle_x - rankle_x) > 0.1:  # umbral básico para alternancia
            accion = "Caminando"
        else:
            accion = "De pie"

        # Dibujar pose
        mp_drawing.draw_landmarks(frame, results.pose_landmarks, mp_pose.POSE_CONNECTIONS)

    # Mostrar acción detectada
    # Mostrar acción detectada con fondo azul claro
    text = f"Accion: {accion}"
    (font_w, font_h), _ = cv2.getTextSize(text, cv2.FONT_HERSHEY_SIMPLEX, 1, 2)
    x, y = 10, 40

    # Dibujar rectángulo azul claro (BGR: 255, 230, 180)
    cv2.rectangle(frame, (x - 10, y - 30), (x - 10 + font_w + 20, y + 10), (255, 220, 180), -1)

    # Texto en negro
    cv2.putText(frame, text, (x, y), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 0), 2)

    cv2.imshow("Reconocimiento de Acciones", frame)
    
    # Salir con 'q'
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Liberar recursos
cap.release()
cv2.destroyAllWindows()

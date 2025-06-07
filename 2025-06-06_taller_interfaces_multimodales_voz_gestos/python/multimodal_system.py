import tkinter as tk
import cv2
import mediapipe as mp
import threading
import time
import speech_recognition as sr
from gtts import gTTS
from playsound import playsound
import os

# --- Variables Globales ---
last_gesture = "NONE" # Almacena el último gesto detectado (ej. "OPEN_HAND", "TWO_FINGERS")
last_voice_command = "NONE" # Almacena el último comando de voz reconocido
exit_flag = threading.Event() # Bandera para controlar la terminación de hilos

# Estado del objeto en la UI
object_color = "blue"
object_size = 50
object_rotation = 0
object_visible = True
object_x, object_y = 150, 150 # Posición inicial

# Configuración de MediaPipe
mp_hands = mp.solutions.hands
mp_drawing = mp.solutions.drawing_utils

# Configuración de Audio para SpeechRecognition
# ¡Asegúrate de que este DEVICE_INDEX sea el que funciona para ti!
# Por ejemplo, si tu webcam era ID 10, usa 10. Si tus auriculares eran ID 9, usa 9.
MIC_DEVICE_INDEX = 10 # <--- ¡CAMBIA ESTE VALOR AL ID DE TU MICRÓFONO FUNCIONAL!


# --- Funciones de Retroalimentación Auditiva ---
def _speak_in_thread(text):
    """Función interna que realmente reproduce el audio."""
    try:
        tts = gTTS(text=text, lang='es')
        filename = "temp_speech.mp3"
        tts.save(filename)
        playsound(filename)
        os.remove(filename) # Limpia el archivo temporal
    except Exception as e:
        print(f"Error al reproducir audio: {e}")

def speak(text):
    """Inicia la reproducción de voz en un nuevo hilo."""
    # Creamos un nuevo hilo para la función de reproducción
    speech_thread = threading.Thread(target=_speak_in_thread, args=(text,))
    speech_thread.start() # Iniciamos el hilo, no bloquea el hilo principal

# --- Hilo 1: Detección de Gestos (Video) ---
def gesture_detection_thread(canvas, obj_id, cap):
    global last_gesture, object_color, object_size, object_rotation, object_visible, object_x, object_y

    with mp_hands.Hands(min_detection_confidence=0.7, min_tracking_confidence=0.7) as hands:
        while not exit_flag.is_set():
            ret, frame = cap.read()
            if not ret:
                continue

            frame = cv2.flip(frame, 1) # Voltear horizontalmente
            rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            results = hands.process(rgb_frame)

            current_gesture = "NONE"
            if results.multi_hand_landmarks:
                for hand_landmarks in results.multi_hand_landmarks:
                    # Dibujar los puntos de la mano
                    mp_drawing.draw_landmarks(frame, hand_landmarks, mp_hands.HAND_CONNECTIONS)

                    # Simplemente verifica si la mano está abierta (todos los dedos arriba)
                    # o si son dos dedos (índice y medio)
                    thumb_tip = hand_landmarks.landmark[mp_hands.HandLandmark.THUMB_TIP]
                    index_tip = hand_landmarks.landmark[mp_hands.HandLandmark.INDEX_FINGER_TIP]
                    middle_tip = hand_landmarks.landmark[mp_hands.HandLandmark.MIDDLE_FINGER_TIP]
                    ring_tip = hand_landmarks.landmark[mp_hands.HandLandmark.RING_FINGER_TIP] # <--- Verifica este
                    pinky_tip = hand_landmarks.landmark[mp_hands.HandLandmark.PINKY_TIP] # <--- Verifica este

                    wrist = hand_landmarks.landmark[mp_hands.HandLandmark.WRIST]

                    # Detección simplificada:
                    # Mano abierta: Si todos los dedos están por encima de la muñeca (o más allá de la base del dedo)
                    if (index_tip.y < wrist.y and middle_tip.y < wrist.y and
                        ring_tip.y < wrist.y and pinky_tip.y < wrist.y and
                        thumb_tip.x < wrist.x if hand_landmarks.landmark[mp_hands.HandLandmark.WRIST].x < hand_landmarks.landmark[mp_hands.HandLandmark.PINKY_MCP].x else thumb_tip.x > wrist.x): # Dedo gordo abierto
                        current_gesture = "OPEN_HAND"
                    # Dos dedos (índice y medio):
                    elif index_tip.y < wrist.y and middle_tip.y < wrist.y and \
                         ring_tip.y > wrist.y and pinky_tip.y > wrist.y:
                        current_gesture = "TWO_FINGERS"
                    else:
                        current_gesture = "OTHER_GESTURE"

            if current_gesture != last_gesture:
                last_gesture = current_gesture
                # print(f"Gesto detectado: {last_gesture}") # Para depuración


            # --- Lógica de Interacción Multimodal (Solo si se detecta un gesto activo) ---
            if last_gesture == "OPEN_HAND":
                # Mover el objeto con la mano abierta (ej. seguir la punta del dedo índice)
                if results.multi_hand_landmarks:
                    index_finger_x = int(index_tip.x * frame.shape[1])
                    index_finger_y = int(index_tip.y * frame.shape[0])
                    # Suavizar el movimiento del objeto para que no sea tan brusco
                    object_x = int(object_x * 0.8 + index_finger_x * 0.2)
                    object_y = int(object_y * 0.8 + index_finger_y * 0.2)


            # Actualizar el dibujo del objeto en el canvas de Tkinter
            if object_visible:
                # Clear previous drawings if any, to avoid ghosting
                canvas.delete(obj_id)
                # Redibujar como un rectángulo, para simplificar rotación y tamaño
                x1, y1 = object_x - object_size/2, object_y - object_size/2
                x2, y2 = object_x + object_size/2, object_y + object_size/2

                # Rotación simple (visual, no real en el rectángulo de Tkinter directamente)
                # En Tkinter, rotar un rectángulo es más complejo, requeriría dibujar líneas
                # Por simplicidad, solo actualizamos color, tamaño y posición
                obj_id = canvas.create_rectangle(x1, y1, x2, y2,
                                                fill=object_color,
                                                outline="black",
                                                width=2)
                # Si quieres el óvalo:
                # obj_id = canvas.create_oval(x1, y1, x2, y2,
                #                              fill=object_color,
                #                              outline="black",
                #                              width=2)

            else:
                canvas.delete(obj_id) # Ocultar el objeto

            # Mostrar el frame de la webcam en la UI de Tkinter
            cv2image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGBA)
            img = tk.PhotoImage(data=cv2.imencode('.png', cv2image)[1].tobytes())
            canvas.img = img # Keep a reference to prevent garbage collection
            canvas.create_image(0, 0, image=img, anchor=tk.NW)


            # Pequeña pausa para no saturar el CPU
            time.sleep(0.01)

        print("Hilo de gestos terminado.")
        cap.release()


# --- Hilo 2: Reconocimiento de Voz ---
def voice_recognition_thread():
    global last_voice_command, exit_flag, object_color, object_size, object_rotation, object_visible

    r = sr.Recognizer()
    with sr.Microphone(device_index=MIC_DEVICE_INDEX) as source: # <-- ¡Usamos el ID del micrófono aquí!
        r.adjust_for_ambient_noise(source)
        print(f"[Voz] Umbral de energía de audio ajustado: {r.energy_threshold}")
        print("[Voz] Hilo de voz iniciado. Esperando comandos...")
        # speak("Sistema de voz iniciado. Di comandos como 'cambiar', 'rotar', 'agrandar' junto con un gesto.")

        while not exit_flag.is_set():
            try:
                # Clear any previous command before listening again
                last_voice_command = "NONE"

                # Listen for audio with a timeout. This is crucial for continuous listening.
                # If no speech is detected within 'timeout' seconds, it will raise sr.WaitTimeoutError.
                # 'phrase_time_limit' ensures that long pauses within a phrase don't cause issues.
                print("[Voz] Escuchando...") # Added for debugging
                audio = r.listen(source, timeout=4, phrase_time_limit=3) # Reduced timeout slightly

                # If audio is detected, try to recognize it
                command = r.recognize_google(audio, language='es-ES').lower()
                print(f"[Voz] Comando reconocido: {command}") # Changed message for clarity
                last_voice_command = command

                # Process the recognized command and current gesture
                process_multimodal_input(command, last_gesture)

            except sr.WaitTimeoutError:
                # This is expected if no one is speaking. We just continue the loop to listen again.
                # print("[Voz] Tiempo de espera agotado, no se detectó voz.") # Uncomment for more verbose logging
                pass
            except sr.UnknownValueError:
                # Audio was detected, but could not be understood.
                print("[Voz] No pude entender el audio.")
                pass
            except sr.RequestError as e:
                # Error contacting Google Speech Recognition API (e.g., no internet).
                print(f"[Voz] Error de conexión al servicio de Google Speech: {e}. Reintentando en 2 segundos...")
                time.sleep(2) # Wait before retrying to avoid spamming the API
                # The loop will automatically continue.
            except Exception as e:
                # Catch any other unexpected errors that might occur.
                print(f"[Voz] Error inesperado en el hilo de reconocimiento de voz: {e}")
                # A brief pause to prevent rapid error cycling if something is fundamentally wrong.
                time.sleep(1)
                # The loop will automatically continue.

        print("Hilo de voz terminado.")

# --- Lógica de Fusión Multimodal ---
def process_multimodal_input(voice_cmd, gesture):
    global object_color, object_size, object_rotation, object_visible

    response = ""

    # Comandos para cambiar el color
    if "cambiar" in voice_cmd or "color" in voice_cmd:
        if gesture == "OPEN_HAND":
            object_color = "red"
            response = "Objeto rojo."
        elif gesture == "TWO_FINGERS":
            object_color = "green"
            response = "Objeto verde."
        else:
            response = "Para cambiar color, haz el gesto de mano abierta o dos dedos."

    # Comandos de rotación (solo si hay un gesto específico, o un gesto general que no sea mano abierta para mover)
    elif "rotar" in voice_cmd or "girar" in voice_cmd:
        if gesture == "TWO_FINGERS":
            object_rotation = (object_rotation + 45) % 360
            response = f"Objeto rotado {object_rotation} grados."
        else:
            response = "Para rotar, haz el gesto de dos dedos."

    # Comandos de tamaño
    elif "agrandar" in voice_cmd or "crecer" in voice_cmd:
        if gesture == "OPEN_HAND": # O algún otro gesto significativo
            object_size = min(object_size + 10, 200)
            response = "Objeto más grande."
        else:
            response = "Para agrandar, haz el gesto de mano abierta."
    elif "achicar" in voice_cmd or "reducir" in voice_cmd:
        if gesture == "OPEN_HAND": # O algún otro gesto significativo
            object_size = max(object_size - 10, 10)
            response = "Objeto más pequeño."
        else:
            response = "Para achicar, haz el gesto de mano abierta."

    # Comandos de visibilidad
    elif "mostrar" in voice_cmd or "aparecer" in voice_cmd:
        if gesture != "NONE": # Cualquier gesto para mostrar
            object_visible = True
            response = "Objeto visible."
        else:
            response = "Para mostrar, haz un gesto."
    elif "ocultar" in voice_cmd or "desaparecer" in voice_cmd:
        if gesture != "NONE": # Cualquier gesto para ocultar
            object_visible = False
            response = "Objeto oculto."
        else:
            response = "Para ocultar, haz un gesto."

    # Comando de salida
    elif "salir" in voice_cmd or "terminar" in voice_cmd or "adiós" in voice_cmd:
        response = "Saliendo del programa. Adiós."
        exit_flag.set() # Activa la bandera para terminar los hilos

    # Si hay una respuesta, la decimos
    if response:
        print(f"[Sistema] {response}")
        speak(response)
    # else:
    #     print(f"[Sistema] Comando de voz '{voice_cmd}' recibido con gesto '{gesture}', pero sin acción definida.")


# --- Configuración de la UI (Tkinter) ---
def setup_ui(root):
    root.title("Taller de Interfaces Multimodales (Voz y Gestos)")
    root.geometry("640x480") # Tamaño de la ventana para el video
    root.resizable(False, False)

    canvas = tk.Canvas(root, width=640, height=480, bg="lightgray")
    canvas.pack()

    # Objeto inicial (ej. un rectángulo)
    obj_id = canvas.create_rectangle(object_x - object_size/2, object_y - object_size/2,
                                    object_x + object_size/2, object_y + object_size/2,
                                    fill=object_color, outline="black", width=2)
    # Si prefieres un óvalo:
    # obj_id = canvas.create_oval(object_x - object_size/2, object_y - object_size/2,
    #                             object_x + object_size/2, object_y + object_size/2,
    #                             fill=object_color, outline="black", width=2)

    return canvas, obj_id


# --- Función Principal ---
def main():
    global MIC_DEVICE_INDEX # Para usar el ID de micrófono configurado

    # Puedes comentar o quitar esta línea si el micrófono de tu webcam es 10 y no usas el USB headset
    # MIC_DEVICE_INDEX = 10 # <-- Asegúrate de que este sea el ID correcto de tu micrófono

    # Inicializar la cámara
    cap = cv2.VideoCapture(0) # 0 para la webcam por defecto
    if not cap.isOpened():
        print("Error: No se pudo abrir la cámara.")
        exit_flag.set() # Establece la bandera de salida si la cámara no se abre
        return

    # Configurar la UI de Tkinter
    root = tk.Tk()
    canvas, obj_id = setup_ui(root)

    # Iniciar hilos
    gesture_thread = threading.Thread(target=gesture_detection_thread, args=(canvas, obj_id, cap))
    voice_thread = threading.Thread(target=voice_recognition_thread)

    gesture_thread.start()
    voice_thread.start()

    # Configurar el cierre de la aplicación
    def on_closing():
        print("Cerrando aplicación...")
        speak("Cerrando aplicación. Adiós.")
        exit_flag.set() # Activa la bandera para que los hilos terminen
        root.destroy() # Cierra la ventana de Tkinter

    root.protocol("WM_DELETE_WINDOW", on_closing)

    # Ejecutar el bucle principal de Tkinter
    root.mainloop()

    # Esperar a que los hilos terminen (opcional, para una salida limpia)
    gesture_thread.join()
    voice_thread.join()
    print("Aplicación terminada limpiamente.")

if __name__ == "__main__":
    main()

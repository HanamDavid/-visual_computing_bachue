# Taller - Obras Interactivas: Pintando con Voz y Gestos

## Python
En este taller se desarrolló una aplicación interactiva que combina visión por computadora y reconocimiento de voz para crear un lienzo digital controlado por gestos de la mano y comandos hablados. Utilizando MediaPipe Hands se detectó la posición del dedo índice para simular un pincel sobre la pantalla, mientras que con la librería speech_recognition se interpretaron comandos simples como "rojo", "verde", "limpiar" o "guardar" para cambiar el color del pincel, borrar el lienzo o guardar la obra. Todo se integró en tiempo real con OpenCV, permitiendo una experiencia creativa sin necesidad de interfaces físicas.

### 📸 Capturas o GIFs
![Video de WhatsApp 2025-06-20 a las 22 06 34_8347a271 (1)](https://github.com/user-attachments/assets/b42e1833-744e-4fbb-a417-f4f64790ae3f)


### 🎯 Codigo Relevante
    
    # MediaPipe Hands
    mp_hands = mp.solutions.hands
    hands = mp_hands.Hands(max_num_hands=1)
    mp_draw = mp.solutions.drawing_utils
    
    # Reconocimiento de voz (funciona en hilo separado)
    def escuchar_comandos():
        global color, canvas, drawing
        recognizer = sr.Recognizer()
        mic = sr.Microphone()
        with mic as source:
            recognizer.adjust_for_ambient_noise(source)
        while True:
            try:
                with mic as source:
                    print("Escuchando comando de voz...")
                    audio = recognizer.listen(source, timeout=5)
                texto = recognizer.recognize_google(audio, language="es-ES").lower()
                print("Comando reconocido:", texto)
    
                if "rojo" in texto:
                    color = (0, 0, 255)
                elif "verde" in texto:
                    color = (0, 255, 0)
                elif "azul" in texto:
                    color = (255, 0, 0)
                elif "limpiar" in texto:
                    canvas[:] = 0
                elif "guardar" in texto:
                    cv2.imwrite("obra.png", canvas)
                    print("Imagen guardada como obra.png")
                elif "pincel" in texto:
                    drawing = not drawing
    
            except sr.UnknownValueError:
                print("No se entendió el comando.")
            except sr.WaitTimeoutError:
                continue
            except Exception as e:
                print("Error de voz:", e)
    
    # Lanzar hilo de voz
    threading.Thread(target=escuchar_comandos, daemon=True).start()
    
    # Activar webcam
    cap = cv2.VideoCapture(0)
    prev_x, prev_y = 0, 0
    
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        frame = cv2.flip(frame, 1)
        h, w, _ = frame.shape
    
        # Detección de manos
        rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        result = hands.process(rgb)
    
        if result.multi_hand_landmarks:
            for hand_landmarks in result.multi_hand_landmarks:
                mp_draw.draw_landmarks(frame, hand_landmarks, mp_hands.HAND_CONNECTIONS)
    
                # Coordenadas del dedo índice
                index = hand_landmarks.landmark[mp_hands.HandLandmark.INDEX_FINGER_TIP]
                x, y = int(index.x * w), int(index.y * h)
    
                # Dibujar en el lienzo
                if drawing:
                    if prev_x == 0 and prev_y == 0:
                        prev_x, prev_y = x, y
                    cv2.line(canvas, (prev_x, prev_y), (x, y), color, 5)
                    prev_x, prev_y = x, y
                else:
                    prev_x, prev_y = 0, 0  # reiniciar si no se está dibujando
    
        # Mostrar el lienzo sobre el video
        output = cv2.addWeighted(frame, 0.5, canvas, 0.5, 0)
    
        cv2.imshow("Dibujo con Gestos y Voz", output)
        if cv2.waitKey(1) & 0xFF == 27:  # tecla ESC para salir
            break
    

### Comentarios personales sobre el aprendizaje y dificultades encontradas.

Muy didáctica la manera en que de poco en poco con el taller anterior vamos aprendiendo nociones basicas de esta libreria y el modelo YOLO

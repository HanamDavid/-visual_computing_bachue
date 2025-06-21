#  Taller - Creando un Monitor de Actividad Visual en 3D
En este taller se desarrolló un sistema interactivo que conecta Python con Three.js mediante WebSockets. Se utilizó una webcam para detectar la posición del dedo índice en tiempo real usando MediaPipe, y esa información se transmitió a una escena 3D en el navegador. En Three.js, una esfera se movía dinámicamente según las coordenadas recibidas, demostrando cómo integrar visión por computadora y visualización web en tiempo real.

### 📸 Capturas o GIFs
![2025-06-20 23-41-30](https://github.com/user-attachments/assets/1c9556fa-06b8-425e-b9b2-1b355fe0f9ab)

## Python
### 🎯 Codigo Relevante
    
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


### Comentarios personales sobre el aprendizaje y dificultades encontradas.
Se encontraron dificultades para hacer la conexion entre las dos partes para el envio de datos 

## Three.Js
### 🎯 Codigo Relevante

      <script type="module">
        import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.1/build/three.module.js';
    
        // Crear la escena y cámara
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;
    
        // Renderizador
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
    
        // Objeto representando a la persona más grande
        const geometry = new THREE.BoxGeometry(1, 1, 0.1);
        const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        const box = new THREE.Mesh(geometry, material);
        scene.add(box);
    
        // Texto en pantalla para conteo
        const countDiv = document.createElement("div");
        countDiv.style.position = "absolute";
        countDiv.style.top = "10px";
        countDiv.style.left = "10px";
        countDiv.style.color = "white";
        countDiv.style.fontSize = "20px";
        countDiv.style.fontFamily = "monospace";
        countDiv.textContent = "Esperando datos...";
        document.body.appendChild(countDiv);
    
        // Animación de la escena
        function animate() {
          requestAnimationFrame(animate);
          renderer.render(scene, camera);
        }
        animate();
    
        // WebSocket
        const ws = new WebSocket("ws://127.0.0.1:8765");
    
    
        ws.onopen = () => {
          console.log("✅ WebSocket conectado");
        };
    
        ws.onmessage = (event) => {
          const data = JSON.parse(event.data);
          console.log("📦 Datos recibidos:", data);
    
          countDiv.textContent = `👥 Personas detectadas: ${data.personas}`;
    
          if (data.bbox) {
            // Normalizar posición (asumiendo cámara 640x480)
            const x = (data.bbox.x - 320) / 320;
            const y = -(data.bbox.y - 240) / 240;
            box.position.set(x * 2, y * 2, 0);
    
            // Escalar el cubo según el tamaño del bounding box
            box.scale.set(data.bbox.w / 100, data.bbox.h / 100, 1);
            box.visible = true;
          } else {
            box.visible = false;
          }
        };
    
        ws.onerror = (err) => {
          console.error("❌ Error en WebSocket:", err);
        };
    
        ws.onclose = () => {
          console.warn("⚠️ WebSocket cerrado");
          countDiv.textContent = "🔌 Conexión perdida";
        };
    


### Comentarios personales sobre el aprendizaje y dificultades encontradas.
Se encontraron dificultades para hacer la conexion entre las dos partes para el envio de datos


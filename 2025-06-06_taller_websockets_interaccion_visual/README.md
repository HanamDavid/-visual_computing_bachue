# Taller de Jerarquías y Transformaciones

### 📸 Capturas o GIFs
![2025-06-05 19-21-53](https://github.com/user-attachments/assets/639676ac-021d-4d00-8cbf-62ca36ec41b3)

## Python
Se implementa un servidor WebSocket en Python que, cada 0.5 segundos, envía a los clientes conectados un mensaje JSON con una posición aleatoria en el plano (x, y, 0) y un color hexadecimal aleatorio, permitiendo así la transmisión de datos en tiempo real para aplicaciones interactivas.

 ### 🎯 Codigo Relevante
    import asyncio
    import websockets
    import json
    import random
    
    def random_color():
        # Genera un color hexadecimal aleatorio
        return "#{:02x}{:02x}{:02x}".format(
            random.randint(0, 255),
            random.randint(0, 255),
            random.randint(0, 255)
        )
    
    async def handler(websocket):
        while True:
            x = random.uniform(-5, 5)
            y = random.uniform(-5, 5)
            data = {
                "position": [x, y, 0],
                "color": random_color()
            }
            await websocket.send(json.dumps(data))
            await asyncio.sleep(0.5)
    
    async def main():
        async with websockets.serve(handler, "localhost", 8765):
            await asyncio.Future()  # Run forever
    
    asyncio.run(main())

## Three.Js
En esta parte se define un componente React que se conecta a un servidor WebSocket para recibir en tiempo real la posición y el color de una esfera, y los utiliza para renderizar visualmente esa esfera en un entorno 3D interactivo usando Three.js, permitiendo así la visualización dinámica y actualizada de los datos enviados por el servidor.

### 🎯 Codigo Relevante
    
    export default function App() {
      const [position, setPosition] = useState([0, 0, 0])
      const [color, setColor] = useState('orange')
      const socketRef = useRef(null)
    
      useEffect(() => {
        const socket = new WebSocket('ws://localhost:8765')
        socketRef.current = socket
    
        socket.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data)
            // data: { position: [x, y, z], color: "#RRGGBB" }
            if (data.position) setPosition(data.position)
            if (data.color) setColor(data.color)
          } catch (e) {
            console.error('Error parsing message', e)
          }
        }
    
        socket.onerror = (err) => {
          console.error('WebSocket error:', err)
        }
    
        return () => {
          socket.close()
        }
      }, [])

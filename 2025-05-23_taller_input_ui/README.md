# Taller input UI Unity y Three.Js

## Three.Js

Para crear interfaces gráficas en React Three Fiber, se recomienda usar la librería @react-three/drei, que permite insertar elementos HTML en el espacio 3D mediante el componente <Html />, ideal para botones, textos o formularios flotantes sobre objetos 3D. También se puede usar leva para crear paneles interactivos con sliders y switches que controlan propiedades como posición, rotación o color. Estas herramientas permiten integrar controles intuitivos directamente en la escena 3D o como superposición fija en pantalla con react-dom, mejorando la interactividad sin salir del entorno gráfico.

### 📸 Capturas o GIFs
![2025-05-23 20-10-29](https://github.com/user-attachments/assets/1158e0c7-ecd0-4bd0-9e10-6916210628af)


### 🎯 Codigo Relevante

    import React, { useRef, useState, useEffect } from 'react'
    import { Canvas, useFrame } from '@react-three/fiber'
    import { OrbitControls } from '@react-three/drei'
    
    function InteractiveCube() {
      const meshRef = useRef()
      const [hovered, setHovered] = useState(false)
      const [position, setPosition] = useState([0, 0, 0])
    
      useEffect(() => {
        const handleKeyDown = (e) => {
          if (e.key === 'r') setPosition([0, 0, 0])
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
      }, [])
    
      useFrame(() => {
        if (hovered && meshRef.current) {
          meshRef.current.rotation.y += 0.01
        }
      })
    
      return (
        <mesh
          ref={meshRef}
          position={position}
          scale={[2.5, 2.5, 2.5]}
          onClick={() => setPosition([Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1])}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <boxGeometry />
          <meshStandardMaterial color={hovered ? 'orange' : 'skyblue'} />
        </mesh>
      )
    }
    
    export default function Scene() {
      return (
        <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
          {/* Título HTML */}
          <h1 style={{
            position: 'absolute',
            top: 10,
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '24px',
            fontWeight: 'bold',
            background: 'rgba(255, 255, 255, 0.8)',
            padding: '8px 16px',
            borderRadius: '8px',
            zIndex: 10
          }}>
            Entrada del Usuario e Interfaz UI
          </h1>
    
          {/* Canvas de Three.js */}
          <Canvas
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
            }}
            camera={{ position: [0, 0, 4] }}
          >
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <InteractiveCube />
            <OrbitControls />
          </Canvas>
    
          {/* UI flotante */}
          <div style={{
            position: 'absolute',
            top: 60,
            left: 20,
            background: 'blue',
            padding: 10,
            borderRadius: 8,
            zIndex: 5
          }}>
            <p><strong>Controles:</strong></p>
            <ul>
              <li>Haz clic en el cubo para moverlo.</li>
              <li>Pasa el mouse para hacerlo rotar.</li>
              <li>Presiona <code>r</code> para reiniciar su posición.</li>
            </ul>
          </div>
        </div>
      )
    }

## Unity
En este taller desarrollaste un controlador de cámara en Unity que permite mover la cámara usando las teclas W, A, S y D para desplazarte en el plano horizontal manteniendo una altura constante, y rotarla con el movimiento del mouse para simular una vista libre. Además, implementaste la detección del clic del mouse para ejecutar una acción, integrando conceptos clave de entrada de usuario, control de transformaciones y manejo de vectores para lograr un control de cámara básico pero funcional en un entorno 3D.

### 📸 Capturas o GIFs
![2025-05-23 22-24-08](https://github.com/user-attachments/assets/fe15099e-0a72-4469-922a-916920bbae64)


### 🎯 Codigo Relevante
    using UnityEngine;
    
    public class CameraController : MonoBehaviour
    {
        public float speed = 5.0f;
        public float mouseSensitivity = 2.0f;
    
        float pitch = 0.0f;
        float yaw = 0.0f;
    
        float fixedHeight;
    
        void Start()
        {
            // Guardamos la altura inicial para mantenerla fija
            fixedHeight = transform.position.y;
    
            // Opcional: bloquear cursor
            // Cursor.lockState = CursorLockMode.Locked;
            // Cursor.visible = false;
        }
    
        void Update()
        {
            // Lectura del mouse para rotar la cámara
            float mouseX = Input.GetAxis("Mouse X") * mouseSensitivity;
            float mouseY = Input.GetAxis("Mouse Y") * mouseSensitivity;
    
            yaw += mouseX;
            pitch -= mouseY;
            pitch = Mathf.Clamp(pitch, -90f, 90f);
    
            transform.eulerAngles = new Vector3(pitch, yaw, 0);
    
            // Movimiento con teclado
            float horizontal = Input.GetAxis("Horizontal"); // A, D
            float vertical = Input.GetAxis("Vertical");     // W, S
    
            // Vector de movimiento local (adelante, derecha)
            Vector3 forward = transform.forward;
            Vector3 right = transform.right;
    
            // Proyectamos forward y right en plano horizontal (Y=0)
            forward.y = 0;
            right.y = 0;
            forward.Normalize();
            right.Normalize();
    
            // Movimiento final solo en XZ
            Vector3 moveDirection = forward * vertical + right * horizontal;
    
            // Aplicamos movimiento manteniendo altura constante
            Vector3 newPosition = transform.position + moveDirection * speed * Time.deltaTime;
            newPosition.y = fixedHeight;  // Mantenemos la altura fija
    
            transform.position = newPosition;
    
            // Acción click mouse izquierdo
            if (Input.GetMouseButtonDown(0))
            {
                Debug.Log("Click detectado: Acción realizada");
            }
        }
    }





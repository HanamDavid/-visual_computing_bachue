# Taller de Jerarquías y Transformaciones

## Three.Js

A través de los controles Leva se pudo controlar la velocidad de rotacion, posicion en X y Z. De esta manera atribuyendole estas caracteristicas al padre pudimos visualizar el comportamiento de los hijos.

### 📸 Capturas o GIFs
![2025-05-01 19-00-36](https://github.com/user-attachments/assets/553c4399-4f07-47b8-8275-9cca3156a85e)

### 🎯 Codigo Relevante

    import './App.css'
    import { Canvas, useFrame } from '@react-three/fiber'
    import { OrbitControls } from '@react-three/drei'
    import { useRef } from 'react'
    import { Leva, useControls } from 'leva'
    
    function AnimatedGroup() {
      const groupRef = useRef()
      const childGroupRef = useRef()
    
      // Controles de Leva
      const { rotationSpeed, positionX, positionZ } = useControls({
        rotationSpeed: { value: 0.03, min: 0, max: 0.1, step: 0.01 },
        positionX: { value: 0, min: -5, max: 5, step: 0.1 },
        positionZ: { value: 0, min: -5, max: 5, step: 0.1 },
      })
    
      useFrame(({ clock }) => {
        const t = clock.getElapsedTime()
        // Movimiento circular del grupo principal
        groupRef.current.position.x = positionX + Math.sin(t) * 2
        groupRef.current.position.z = positionZ + Math.cos(t) * 2
        groupRef.current.rotation.y += rotationSpeed
    
        // Rotación adicional para el grupo hijo
        if (childGroupRef.current) {
          childGroupRef.current.rotation.x += 0.02
          childGroupRef.current.rotation.z += 0.02
        }
      })
    
      return (
        <group ref={groupRef}>
          {/* Hijo 1 */}
          <mesh position={[-1.5, 0, 0]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshNormalMaterial />
          </mesh>
          {/* Hijo 2 */}
          <group ref={childGroupRef} position={[1.5, 0, 0]}>
            <mesh>
              <sphereGeometry args={[0.5, 20, 20]} />
              <meshStandardMaterial color="orange" />
            </mesh>
            {/* Hijo de la esfera */}
            <mesh position={[0, 1, 0]}>
              <torusGeometry args={[0.3, 0.1, 16, 100]} />
              <meshStandardMaterial color="green" />
            </mesh>
          </group>
          {/* Hijo 3 */}
          <mesh position={[0, 1.5, 2]}>
            <coneGeometry args={[0.5, 1, 32]} />
            <meshStandardMaterial color="blue" />
          </mesh>
        </group>
      )
    }
    
    function App() {
      return (
        <>
          <h1>3D NIKO</h1>
          <Leva collapsed />
          <div className="canvas-container">
            <Canvas>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <AnimatedGroup />
              <OrbitControls />
            </Canvas>
          </div>
        </>
      )
    }
    
    export default App

### Comentarios personales sobre el aprendizaje y dificultades encontradas.

Muy didáctica la manera en que de poco en poco con el taller anterior vamos aprendiendo nociones basicas de esta libreria

## Unity

Este script permite al usuario modificar la posición en X, la rotación en Y, y la escala en Z de un objeto 3D llamado "Father" usando sliders en una interfaz UI. Cada vez que se modifica un slider, los nuevos valores del objeto se muestran en la consola de Unity usando Debug.Log.

### 📸 Capturas o GIFs
![2025-05-01 21-54-23](https://github.com/user-attachments/assets/c27bbdb6-d49c-4d1d-a578-3704c3555f48)

### 🎯 Codigo Relevante

    using UnityEngine;
    using UnityEngine.UI;

    public class FatherTransformControl : MonoBehaviour
    {
    public Transform father;

    public Slider sliderPosX;
    public Slider sliderRotY;
    public Slider sliderScaleZ;

    void Start()
    {
        // Inicializa sliders
        sliderPosX.value = father.localPosition.x;
        sliderRotY.value = father.localEulerAngles.y;
        sliderScaleZ.value = father.localScale.z;

        // Listeners
        sliderPosX.onValueChanged.AddListener((v) => UpdatePosition());
        sliderRotY.onValueChanged.AddListener((v) => UpdateRotation());
        sliderScaleZ.onValueChanged.AddListener((v) => UpdateScale());

        // Mostrar valores iniciales
        LogTransform("Inicial");
    }

    void UpdatePosition()
    {
        Vector3 pos = father.localPosition;
        pos.x = sliderPosX.value;
        father.localPosition = pos;
        LogTransform("Posición actualizada");
    }

    void UpdateRotation()
    {
        Vector3 rot = father.localEulerAngles;
        rot.y = sliderRotY.value;
        father.localEulerAngles = rot;
        LogTransform("Rotación actualizada");
    }

    void UpdateScale()
    {
        Vector3 scale = father.localScale;
        scale.z = sliderScaleZ.value;
        father.localScale = scale;
        LogTransform("Escala actualizada");
    }

    void LogTransform(string evento)
    {
        Debug.Log($"[{evento}] Pos: {father.localPosition}, Rot: {father.localEulerAngles}, Scale: {father.localScale}");
    }
    }

### Comentarios personales sobre el aprendizaje y dificultades encontradas.

Es una buena introduccion a sistemas mas complejos de jerarquía en Unity

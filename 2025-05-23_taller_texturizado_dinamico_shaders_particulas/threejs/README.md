# 🧪Texturizado Creativo: Materiales Dinámicos con Shaders y Datos

## 📅 Fecha
**2025-05-23**

## 🎯 Objetivo del Taller
Crear una escena interactiva con Three.js que combine:
- Un objeto central con shader dinámico
- Sistema de partículas reactivas
- Efectos visuales disparados por interacción

## 🧠 Conceptos Aprendidos
- Shaders GLSL (vertex y fragment)
- Geometría de partículas con BufferGeometry
- Animación basada en tiempo (uTime)
- Interacción mouse/click en 3D
- Transformaciones de coordenadas UV

## 🔧 Herramientas y Entornos
- Three.js (r148)
- React Three Fiber
- @react-three/drei 

## 📁 Estructura del Proyecto
├── threejs/
├── README.md
## 🧪 Implementación

### 🔹 Etapas realizadas
1. Configuración de escena básica con luces y cámara
2. Desarrollo del shader animado con uTime
3. Implementación de partículas orbitantes
4. Adición de efecto de explosión al hacer clic
5. Optimización con useMemo y useFrame

### 🔹 Código relevante

```glsl
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { CenterObject } from './components/CenterObject'
import { Particles } from './components/Particles'
function App() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls />  {/* Permite mover la cámara con el ratón */}
      <CenterObject />  {/* Objeto central (lo definiremos después) */}
      <Particles />
    </Canvas>
  )
}

export default App


import { useRef, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Shaders (código GLSL)
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform float uTime;
  varying vec2 vUv;
  void main() {
    vec3 color = vec3(
      sin(uTime) * 0.5 + 0.5,  // Canal R (animado)
      vUv.x,                   // Canal G (basado en UV)
      vUv.y                    // Canal B (basado en UV)
    );
    gl_FragColor = vec4(color, 1.0);
  }
`

export function CenterObject() {
  const meshRef = useRef<THREE.Mesh>(null)
  const [exploded, setExploded] = useState(false)

  // Animación: Actualiza uTime en cada fotograma
  useFrame(({ clock }) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial
      material.uniforms.uTime.value = clock.getElapsedTime()
    }
  })

  const handleClick = () => {
    setExploded(true)
    setTimeout(() => setExploded(false), 1000)
  }

  return (
    <group>
      <mesh ref={meshRef} onClick={handleClick}>
        <sphereGeometry args={[1, 32, 32]} />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={{
            uTime: { value: 0 }
          }}
        />
      </mesh>
      {exploded && <ExplosionEffect />}
    </group>
  )
}

function ExplosionEffect() {
  const particles = useMemo(() => {
    const pos = new Float32Array(500 * 3)
    for (let i = 0; i < 500 * 3; i += 3) {
      // Partículas en dirección radial
      const angle = Math.random() * Math.PI * 2
      const radius = Math.random() * 2
      pos[i] = Math.cos(angle) * radius
      pos[i + 1] = Math.sin(angle) * radius
      pos[i + 2] = (Math.random() - 0.5) * 2
    }
    return pos
  }, [])

  return (
    <points position={[0, 0, 0]}>
      <bufferGeometry attach="geometry">
        <bufferAttribute 
          attach="attributes-position" 
          array={particles} 
          itemSize={3} 
          count={500} 
        />
      </bufferGeometry>
      <pointsMaterial 
        attach="material" 
        size={0.2} 
        color="orange" 
        transparent 
        opacity={0.8} 
      />
    </points>
  )
}

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function Particles() {
  const particlesRef = useRef<THREE.Points>(null)
  const count = 1000

  // Posiciones y colores aleatorios
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 10
      col[i] = Math.random() // Colores aleatorios
    }
    return [pos, col]
  }, [count])

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.1
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry attach="geometry">
        <bufferAttribute attach="attributes-position" array={positions} itemSize={3} count={count} />
        <bufferAttribute attach="attributes-color" array={colors} itemSize={3} count={count} />
      </bufferGeometry>
      <pointsMaterial
        attach="material"
        size={0.1}
        vertexColors // Usa colores por partícula
        transparent
        opacity={0.8}
        sizeAttenuation={true}
      />
    </points>
  )
}

```
## 📊 Resultados Visuales
![Efectos](https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHVkZnhrdWMzc2I5MnE1aXBnemQ1Y3B1eGcwc3dzaDVtYzlzZ3poNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/aEWJDaYBgjsPPtSyCV/giphy.gif)

## 🧩 Prompts Usados
- Create a sphere with GLSL shader that pulsates with time"

- Implement a particle explosion effect in Three.js when clicking an object"

- Generate a particle system with random colors orbiting a central object"

## 💬 Reflexión Final
Este taller nos permitió profundizar en el pipeline de renderizado con Three.js, especialmente en cómo los shaders pueden crear efectos visuales complejos con relativamente poco código. La parte más interesante fue descubrir cómo coordinar las animaciones basadas en tiempo (uTime) con las interacciones de usuario.

El efecto más desafiante fue la explosión radial de partículas, ya que requería calcular direcciones en 3D y gestionar el ciclo de vida del efecto. Para futuros proyectos, me gustaría añadir colisiones físicas entre partículas y probar texturas animadas para simular fluidos.

Los conocimientos obtenidos son directamente aplicables a proyectos de visualización de datos, juegos web o instalaciones interactivas donde se requiera feedback visual inmediato.

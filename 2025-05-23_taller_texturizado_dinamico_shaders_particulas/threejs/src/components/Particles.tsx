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
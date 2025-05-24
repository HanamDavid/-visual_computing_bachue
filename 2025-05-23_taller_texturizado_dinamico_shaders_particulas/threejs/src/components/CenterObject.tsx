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
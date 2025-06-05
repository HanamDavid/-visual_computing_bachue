import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Line } from '@react-three/drei'
import { useControls } from 'leva'
import * as THREE from 'three'

function Puntos() {
  return (
    <>
      <mesh position={[-2, 0, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>
      
      <mesh position={[2, 3, 1]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="cyan" />
      </mesh>
    </>
  )
}

function CurvaBezier() {
  const p0 = new THREE.Vector3(-2, 0, 0)
  const p1 = new THREE.Vector3(0, 4, -2)
  const p2 = new THREE.Vector3(2, 3, 1)

  const points = []
  const curve = new THREE.QuadraticBezierCurve3(p0, p1, p2)
  
  for (let i = 0; i <= 100; i++) {
    points.push(curve.getPoint(i / 100))
  }

  return (
    <Line points={points} color="white" lineWidth={2} dashed={false} />
  )
}

function ObjetoInterpolado({ tipo = 'bezier', color = 'orange' }) {
  const meshRef = useRef()
  const { t } = useControls(`${tipo}-controls`, {
    t: { value: 0, min: 0, max: 1, step: 0.01 }
  })

  useFrame(() => {
    if (!meshRef.current) return
    
    const p0 = new THREE.Vector3(-2, 0, 0)
    const p1 = new THREE.Vector3(0, 4, -2)
    const p2 = new THREE.Vector3(2, 3, 1)
    
    if (tipo === 'lineal') {
      const position = new THREE.Vector3()
      position.lerpVectors(p0, p2, t)
      meshRef.current.position.copy(position)
    } else {
      const curve = new THREE.QuadraticBezierCurve3(p0, p1, p2)
      meshRef.current.position.copy(curve.getPoint(t))
    }
    
    const startQuat = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(0, 1, 0), 0
    )
    const endQuat = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(1, 0, 1).normalize(), Math.PI
    )
    
    const rotation = new THREE.Quaternion()
    rotation.slerpQuaternions(startQuat, endQuat, t)
    meshRef.current.quaternion.copy(rotation)
  })

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

export default function App() {
  const { mostrarAmbas } = useControls({
    mostrarAmbas: false
  })

  return (
    <Canvas camera={{ position: [5, 5, 5], fov: 50 }} style={{ width: '100vw', height: '100vh' }}>
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      <Puntos />
      <ObjetoInterpolado tipo="bezier" color="orange" />
      {mostrarAmbas && <ObjetoInterpolado tipo="lineal" color="cyan" />}
      <CurvaBezier />
      
      <gridHelper args={[10, 10]} />
      <axesHelper args={[3]} />
    </Canvas>
  )
}
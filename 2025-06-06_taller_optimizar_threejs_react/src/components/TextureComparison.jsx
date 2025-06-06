import { useTexture } from '@react-three/drei'

export function TextureComparison() {
  const [hdTex, optTex] = useTexture([
    'public/textures/wood_cabinet_worn_long_diff_1k.jpg',
    'public/textures/wood_cabinet_worn_long_diff_1k.webp'
  ])

  return (
    <group position={[0, -2, 0]}>
      <mesh position={[-2, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial map={hdTex} />
      </mesh>
      <mesh position={[2, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial map={optTex} />
      </mesh>
    </group>
  )
}

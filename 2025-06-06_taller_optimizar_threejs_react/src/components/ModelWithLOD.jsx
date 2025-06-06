import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function ModelWithLOD() {
  const highRes = useGLTF('/models/high-res_11th_c_bce_fangding_food_vessel.glb')
  const lowRes = useGLTF('/models/low-poly_fangding_food_vessel.glb')
  
  useGLTF.preload('/models/high-res_11th_c_bce_fangding_food_vessel.glb')
  useGLTF.preload('/models/low-poly_fangding_food_vessel.glb')

  return (
    <mesh>
      <lOD>
        <primitive 
          object={highRes.scene} 
          position={[0, 0, 0]}
          scale={0.5}
          distance={0} // Se muestra cuando está cerca
        />
        <primitive 
          object={lowRes.scene} 
          position={[0, 0, 0]}
          scale={0.5}
          distance={10} // Se muestra cuando está lejos
        />
      </lOD>
    </mesh>
  )
}
import React from 'react';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';
import { useControls } from 'leva';

export default function Scene() {
  const [colorMap, normalMap, roughnessMap, displacementMap] = useLoader(THREE.TextureLoader, [
    '/textures/wood/color.jpg',
    '/textures/wood/normal.jpg',
    '/textures/wood/roughness.jpg',
    '/textures/wood/medieval_wood_disp_1k.png',
  ]);

  // Panel interactivo con leva
  const { roughness, metalness, displacementScale } = useControls({
    roughness: { value: 1, min: 0, max: 1, step: 0.01 },
    metalness: { value: 0, min: 0, max: 1, step: 0.01 },
    displacementScale: { value: 0.05, min: 0, max: 0.2, step: 0.005 },
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />

      {/* Piso */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#777" />
      </mesh>

      {/* Objeto con texturas PBR y leva */}
      <mesh position={[0, 1, 0]} castShadow>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          map={colorMap}
          normalMap={normalMap}
          roughnessMap={roughnessMap}
          displacementMap={displacementMap}
          displacementScale={displacementScale}
          roughness={roughness}
          metalness={metalness}
        />
      </mesh>

      {/* Comparación con material básico */}
     <mesh position={[4, 1,0]} castShadow>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          map={colorMap}
          normalMap={normalMap}
          roughnessMap={roughnessMap}
          displacementMap={displacementMap}
          displacementScale={0}
          roughness={0.5}
          metalness={0.5}
        />
      </mesh>


      <OrbitControls />
    </>
  );
}


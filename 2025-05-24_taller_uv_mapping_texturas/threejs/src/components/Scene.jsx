import React from 'react';
import { OrbitControls } from '@react-three/drei';
import  Model  from './Model';

export default function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 3, 3]} castShadow />

      {/* Piso */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#999" />
      </mesh>

      <Model />
      <OrbitControls />
    </>
  );
}


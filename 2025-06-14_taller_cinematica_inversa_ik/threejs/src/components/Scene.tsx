import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Grid } from '@react-three/drei';
import { RobotArm } from './RobotArm';
import { DraggableTarget } from './DraggableTarget';
import * as THREE from 'three';

export function Scene() {
  const targetPosition = useRef(new THREE.Vector3(2, 2, 0));

  return (
    <Canvas camera={{ position: [5, 5, 5], fov: 75 }} style={{ width: '100%', height: '800px', background: '#222' }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Environment preset="sunset" background />
      <Grid args={[10, 10]} sectionColor="gray" sectionSize={1} />

      <RobotArm targetPosition={targetPosition.current} />

      <DraggableTarget initialPosition={targetPosition.current} />

      <OrbitControls />
    </Canvas>
  );
}

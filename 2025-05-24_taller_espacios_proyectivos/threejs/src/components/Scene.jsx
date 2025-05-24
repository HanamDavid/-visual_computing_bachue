import React, { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import Controls from './Controls';

function RotatingBox({ position, geometry, color }) {
  const ref = useRef();
  useFrame(() => {
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={ref} position={position}>
      {geometry}
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function Scene({ mode }) {
  const { camera } = useThree();
  const positions = [
    new THREE.Vector3(5, 2, 0),
    new THREE.Vector3(-5, 2, 0),
    new THREE.Vector3(0, 2, 5),
    new THREE.Vector3(0, 2, -5),
    new THREE.Vector3(0, 5, 0),
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (index + 1) % positions.length;
      setIndex(nextIndex);
      camera.position.copy(positions[nextIndex]);
      camera.lookAt(0, 0, 0);
    }, 3000);
    return () => clearInterval(interval);
  }, [index, camera]);

  return (
    <>
      <color attach="background" args={['#000']} />

      {/* Tres figuras rotando */}
      <RotatingBox
        position={[0, 0, -1]}
        geometry={<boxGeometry args={[0.5, 0.5, 0.5]} />}
        color="pink"
      />
      <RotatingBox
        position={[1, 0, -3]}
        geometry={<sphereGeometry args={[0.4, 32, 32]} />}
        color="brown"
      />
      <RotatingBox
        position={[-1, 0.5, -5]}
        geometry={<coneGeometry args={[0.4, 1, 32]} />}
        color="teal"
      />

      {/* Luces */}
      <ambientLight intensity={0.5} />
      <pointLight position={[2, 2, 2]} intensity={1} />

      <Controls mode={mode} />
    </>
  );
}

export default Scene;


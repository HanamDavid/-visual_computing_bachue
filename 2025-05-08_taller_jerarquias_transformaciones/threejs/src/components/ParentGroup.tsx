import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import ChildGroup from './ChildGroup';

interface ParentGroupProps {
  rotationSpeed: THREE.Vector3;
  translationSpeed: THREE.Vector3;
}

//We define The group and pass the transformation data as props
const ParentGroup: React.FC<ParentGroupProps> = ({ rotationSpeed, translationSpeed }) => {
  const groupRef = useRef<THREE.Group>(null);
  const position = new THREE.Vector3();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.x += rotationSpeed.x * delta;
      groupRef.current.rotation.y += rotationSpeed.y * delta;
      groupRef.current.rotation.z += rotationSpeed.z * delta;

      position.x += translationSpeed.x * delta;
      position.y += translationSpeed.y * delta;
      position.z += translationSpeed.z * delta;
      groupRef.current.position.copy(position);
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <torusGeometry args={[2, 0.4, 32, 100]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      <ChildGroup />
    </group>
  );
};

export default ParentGroup;

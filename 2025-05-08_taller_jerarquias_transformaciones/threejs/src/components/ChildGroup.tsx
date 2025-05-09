import React from 'react';

//Here we have the childGroup with all the figures that are linked to the black torus
const ChildGroup: React.FC = () => {
  return (
    <group position={[0, 0, 0]}>
      <mesh>
        <torusGeometry args={[3, 1, 16, 60]} />
        <meshStandardMaterial color="black" />
      </mesh>
      <mesh position={[0, 0, 1 ] } >
        <torusGeometry args={[3, 0.5, 4, 6]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="red" />
      </mesh>
    </group>
  );
};

export default ChildGroup;

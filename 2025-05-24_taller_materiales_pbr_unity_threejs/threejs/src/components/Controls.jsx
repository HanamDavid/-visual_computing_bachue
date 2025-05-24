
import React, { useRef } from 'react';
import { useFrame, extend, useThree } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

extend({ OrbitControls });

function Controls() {
  const { camera, gl } = useThree();
  const controls = useRef();
  useFrame(() => controls.current.update());
  return <orbitControls ref={controls} args={[camera, gl.domElement]} />;
}

export default Controls;

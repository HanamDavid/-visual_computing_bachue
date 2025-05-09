import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { GUI } from 'dat.gui';
import ParentGroup from './ParentGroup';

const Scene: React.FC = () => {
  const [rotationSpeeds] = useState(() => new THREE.Vector3(0.1, 0.2, 0));
  const [translationSpeeds] = useState(() => new THREE.Vector3(0.5, 0, 0));

  // Configuración de dat.GUI
  useEffect(() => {
    const gui = new GUI();
    const rotationFolder = gui.addFolder('Rotación Padre');
    rotationFolder.add(rotationSpeeds, 'x', -1, 1).name('Velocidad X');
    rotationFolder.add(rotationSpeeds, 'y', -1, 1).name('Velocidad Y');
    rotationFolder.add(rotationSpeeds, 'z', -1, 1).name('Velocidad Z');

    const translationFolder = gui.addFolder('Traslación Padre');
    translationFolder.add(translationSpeeds, 'x', -2, 2).name('Velocidad X');
    translationFolder.add(translationSpeeds, 'y', -2, 2).name('Velocidad Y');
    translationFolder.add(translationSpeeds, 'z', -2, 2).name('Velocidad Z');

    return () => gui.destroy();
  }, [rotationSpeeds, translationSpeeds]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} />
      <ParentGroup rotationSpeed={rotationSpeeds} translationSpeed={translationSpeeds} />
      <OrbitControls />
    </>
  );
};

export default Scene;

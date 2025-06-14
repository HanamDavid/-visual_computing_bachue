import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { useControls } from 'leva';
import * as THREE from 'three';

function MyBox() {
  const meshRef = useRef();

  const {
    scale,
    color,
    autoRotate,
    lightIntensity,
    lightColor
  } = useControls({
    scale: {
      value: 1,
      min: 0.1,
      max: 3,
      step: 0.01,
      label: 'Escala del Cubo' // Etiqueta para el slider de escala
    },
    color: {
      value: '#ff0000',
      label: 'Color del Cubo' // Etiqueta para el selector de color
    },
    autoRotate: {
      value: false,
      label: 'Rotación Automática' // Etiqueta para el botón/toggle de rotación
    },
    lightIntensity: {
      value: 1,
      min: 0,
      max: 5,
      step: 0.1,
      label: 'Intensidad de Luz' // Etiqueta para el slider de intensidad de luz
    },
    lightColor: {
      value: '#ffffff',
      label: 'Color de Luz' // Etiqueta para el selector de color de luz
    }
  });

  useFrame(() => {
    if (meshRef.current) {
      if (autoRotate) {
        meshRef.current.rotation.x += 0.01;
        meshRef.current.rotation.y += 0.01;
      }
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={lightIntensity} color={lightColor} />

      <mesh ref={meshRef}>
        <boxGeometry args={[1, 1, 1]} /> {/* Geometría del cubo */}
        <meshStandardMaterial color={color} /> {/* Material con el color del control */}
      </mesh>
    </>
  );
}

// Componente de la Escena 3D
export default function Scene() {
  return (
    <Canvas>
      <Environment preset="city" />
      <OrbitControls />
      <MyBox />
    </Canvas>
  );
}


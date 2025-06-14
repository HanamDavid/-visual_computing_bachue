import React, { useRef, useState } from 'react';
import { useThree } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

export function DraggableTarget({ initialPosition }) {
  const meshRef = useRef();
  const { camera, gl } = useThree();
  const [dragging, setDragging] = useState(false);

  const onPointerDown = (event) => {
    event.stopPropagation();
    setDragging(true);
    gl.domElement.style.cursor = 'grabbing';
  };

  const onPointerUp = () => {
    setDragging(false);
    gl.domElement.style.cursor = 'grab';
  };

  const onPointerMove = (event) => {
    if (!dragging) return;
    event.stopPropagation();

    // Obtener la posición en el espacio 3D
    const plane = new THREE.Plane();
    const normal = new THREE.Vector3().setFromMatrixColumn(camera.matrixWorld, 2).negate(); // Dirección de la cámara
    plane.setFromNormalAndCoplanarPoint(normal, meshRef.current.position);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    );
    raycaster.setFromCamera(mouse, camera);

    const intersection = new THREE.Vector3();
    raycaster.ray.intersectPlane(plane, intersection);

    if (intersection) {
      meshRef.current.position.copy(intersection);
      // Actualiza directamente el objeto THREE.Vector3 pasado por prop
      initialPosition.copy(intersection);
    }
  };

  return (
    <Sphere
      ref={meshRef}
      args={[0.2, 32, 32]}
      position={initialPosition}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerMove={onPointerMove}
      onPointerOver={() => gl.domElement.style.cursor = 'grab'}
      onPointerOut={() => { if (!dragging) gl.domElement.style.cursor = 'auto'; }}
    >
      <meshStandardMaterial color="red" />
    </Sphere>
  );
}

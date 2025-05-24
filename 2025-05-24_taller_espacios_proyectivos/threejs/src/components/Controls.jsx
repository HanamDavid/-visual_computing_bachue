import { useRef, useEffect } from 'react';
import { useFrame, useThree, extend } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

extend({ OrbitControls });

function Controls({ mode }) {
  const { gl, set, scene, camera } = useThree();
  const controls = useRef();

  useEffect(() => {
    let newCamera;

    if (mode === 'orto') {
      const aspect = gl.domElement.clientWidth / gl.domElement.clientHeight;
      const frustumSize = 10;
      newCamera = new THREE.OrthographicCamera(
        (frustumSize * aspect) / -2,
        (frustumSize * aspect) / 2,
        frustumSize / 2,
        frustumSize / -2,
        0.1,
        100
      );
    } else {
      newCamera = new THREE.PerspectiveCamera(75, gl.domElement.clientWidth / gl.domElement.clientHeight, 0.1, 100);
    }

    newCamera.position.set(0, 0, 0.1); // Desde el centro hacia fuera
    set({ camera: newCamera }); // actualizamos el sistema con la nueva cámara
    newCamera.lookAt(scene.position);

    controls.current = new OrbitControls(newCamera, gl.domElement);
    controls.current.update();

    return () => {
      controls.current?.dispose();
    };
  }, [mode, gl, scene, set]);

  useFrame(() => controls.current?.update());

  return null;
}

export default Controls;


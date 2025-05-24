import { useLoader } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { useControls } from 'leva';
import * as THREE from 'three';

export default function Model() {
  const gltf = useGLTF('/models/model.glb');
  const colorMap = useLoader(THREE.TextureLoader, '/textures/Rock053_1K-JPG_Color.jpg');

  // Leva UI controls
  const { repeatX, repeatY, offsetX, offsetY, rotation } = useControls('UV Mapping', {
    repeatX: { value: 1, min: 0.1, max: 5, step: 0.1 },
    repeatY: { value: 1, min: 0.1, max: 5, step: 0.1 },
    offsetX: { value: 0, min: -1, max: 1, step: 0.01 },
    offsetY: { value: 0, min: -1, max: 1, step: 0.01 },
    rotation: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
  });

  // Apply dynamic UV transform
  colorMap.wrapS = colorMap.wrapT = THREE.RepeatWrapping;
  colorMap.repeat.set(repeatX, repeatY);
  colorMap.offset.set(offsetX, offsetY);
  colorMap.rotation = rotation;
  colorMap.needsUpdate = true;

  return (
    <primitive
      object={gltf.scene}
      dispose={null}
      onUpdate={(obj) => {
        obj.traverse((child) => {
          if (child.isMesh) {
            child.material = new THREE.MeshStandardMaterial({
              map: colorMap,
              roughness: 0.6,
              metalness: 0.2,
            });
            child.material.needsUpdate = true;
          }
        });
      }}
    />
  );
}


import React, { useEffect } from 'react';
import { useLoader, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function Comp( {transform, onModelInfo}) {
  const { scene } = useThree();
  const gltf = useLoader(GLTFLoader, './model/scene.gltf');

  useEffect(() => {
  if (!gltf) return;

  const model = gltf.scene.clone(true);

  let vertexCount = 0;
  let faceCount = 0;
  let meshCount = 0;

  model.traverse((node) => {
    if (node.isMesh && node.geometry) {
      meshCount++;
      const geom = node.geometry.index
        ? node.geometry.toNonIndexed()
        : node.geometry;

      vertexCount += geom.attributes.position.count;
      faceCount += geom.attributes.position.count / 3;
    }
  });

  onModelInfo?.({
    vertices: vertexCount,
    faces: Math.round(faceCount),
    meshes: meshCount
  });

    }, [gltf]);

  useEffect(() => {
    if (!gltf) return;

    const model = gltf.scene.clone(true);
    model.position.set(0, -1, 0);
    model.scale.set(1, 1,1);

    if (transform) {
      transform(model);
    }

    scene.add(model);

    return () => {
      scene.remove(model);
    };
  }, [gltf, scene, transform]);

  return null;
}

export default Comp;


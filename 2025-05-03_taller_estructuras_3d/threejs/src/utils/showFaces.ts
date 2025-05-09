import * as THREE from 'three';

export function showFaces(model, color = 0xffffff) {
  const faceGroup = new THREE.Group();

  model.traverse((node) => {
    if (node.isMesh && node.geometry) {
      // Restaurar wireframe del material original si fue modificado
      if (Array.isArray(node.material)) {
        node.material.forEach((mat) => {
          if (mat && 'wireframe' in mat) mat.wireframe = false;
        });
      } else if (node.material && 'wireframe' in node.material) {
        node.material.wireframe = false;
      }

      // Crear mesh con material nuevo encima
      const geometry = node.geometry.clone();
      const material = new THREE.MeshBasicMaterial({
        color,
        wireframe: false,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 1.0,
        depthTest: false, // hace que se vea por encima
      });

      const faceMesh = new THREE.Mesh(geometry, material);
      faceMesh.position.copy(node.position);
      faceMesh.rotation.copy(node.rotation);
      faceMesh.scale.copy(node.scale);

      faceGroup.add(faceMesh);
    }
  });

  faceGroup.position.copy(model.position);
  faceGroup.rotation.copy(model.rotation);
  faceGroup.scale.copy(model.scale);

  return faceGroup;
}


// utils/setWireframe.js

export function showEdges(model) {
  model.traverse((node) => {
    if (node.isMesh) {
      node.castShadow = true;
      node.receiveShadow = true;

      // Soporte para múltiples materiales
      if (Array.isArray(node.material)) {
        node.material.forEach((mat) => (mat.wireframe = true));
      } else if (node.material) {
        node.material.wireframe = true;
      }
    }
  });
}



import * as THREE from 'three';

export function showVertices(model, color = 0x333333, size = 0.3) {
  model.traverse((node) => {
    if (node.isMesh && node.geometry) {
      // Oculta el mesh original
      node.visible = false;

      const geometry = node.geometry.index
        ? node.geometry.toNonIndexed()
        : node.geometry.clone();

      const material = new THREE.PointsMaterial({
                color,size
      });

      const points = new THREE.Points(geometry, material);
      points.name = 'pointsOnlyOverlay';

      node.parent?.add(points);
    }
  });
}


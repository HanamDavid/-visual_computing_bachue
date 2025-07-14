// Configuración inicial
// Inicialización de escena, cámara y renderizador
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(20, 20, 20);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// Controles
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// Materiales básicos (sin PBR todavía)
const materials = {
  grass: new THREE.MeshStandardMaterial({ color: 0x4daf4a, roughness: 0.8 }),
  dirt: new THREE.MeshStandardMaterial({ color: 0x8b4513, roughness: 0.9 }),
  wood: new THREE.MeshStandardMaterial({ color: 0x5e2c04, roughness: 0.7 }),
  leaves: new THREE.MeshStandardMaterial({
    color: 0x00aa00,
    roughness: 0.9,
    transparent: true,
    opacity: 0.8,
  }),
  stone: new THREE.MeshStandardMaterial({ color: 0x777777, roughness: 1 }),
  flower: new THREE.MeshStandardMaterial({ color: 0xff69b4 }),
  pigSkin: new THREE.MeshStandardMaterial({ color: 0xffc0cb }),
  eye: new THREE.MeshStandardMaterial({ color: 0x000000 }),
};

// Crear terreno voxel
function createTerrain(size) {
  const terrain = new THREE.Group();
  for (let x = -size / 2; x < size / 2; x++) {
    for (let z = -size / 2; z < size / 2; z++) {
      const height = Math.floor(Math.random() * 3) + 1;
      for (let y = 0; y < height; y++) {
        const block = new THREE.Mesh(
          new THREE.BoxGeometry(1, 1, 1),
          y === height - 1 ? materials.grass : materials.dirt
        );
        block.position.set(x, y, z);
        block.castShadow = true;
        block.receiveShadow = true;
        terrain.add(block);
      }
    }
  }
  return terrain;
}

// Crear árbol procedural
function createTree(x, y, z) {
  const tree = new THREE.Group();
  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.3, 0.3, 2, 8),
    materials.wood
  );
  trunk.position.set(x, y + 1, z);
  trunk.castShadow = true;

  const leaves = new THREE.Mesh(
    new THREE.SphereGeometry(1.5, 8, 8),
    materials.leaves
  );
  leaves.position.set(x, y + 3, z);

  tree.add(trunk);
  tree.add(leaves);
  return tree;
}

// Crear roca decorativa
function createRock(x, y, z) {
  const rock = new THREE.Mesh(
    new THREE.SphereGeometry(Math.random() * 0.5 + 0.3, 6, 6),
    materials.stone
  );
  rock.position.set(x, y, z);
  return rock;
}

// Crear planta decorativa
function createPlant(x, y, z) {
  const stem = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.05, 0.4),
    materials.flower
  );
  stem.position.set(x, y, z);
  return stem;
}

// Crear objeto decorativo con forma primitiva
function createPrimitive(type, position, material) {
  let geometry;
  switch (type) {
    case "cone":
      geometry = new THREE.ConeGeometry(0.5, 1.5, 8);
      break;
    case "torus":
      geometry = new THREE.TorusGeometry(0.4, 0.15, 8, 16);
      break;
    case "sphere":
      geometry = new THREE.SphereGeometry(0.5, 8, 8);
      break;
    default:
      geometry = new THREE.BoxGeometry(1, 1, 1);
  }
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.copy(position);
  return mesh;
}

// Crear animal (cerdito)
function createPig(x, y, z) {
  const pig = new THREE.Group();

  const body = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 1, 1),
    materials.pigSkin
  );
  body.position.set(x, y + 0.5, z);

  const head = new THREE.Mesh(
    new THREE.BoxGeometry(0.8, 0.8, 0.8),
    materials.pigSkin
  );
  head.position.set(x + 1.15, y + 0.5, z);

  const eye1 = new THREE.Mesh(new THREE.SphereGeometry(0.1), materials.eye);
  eye1.position.set(x + 1.4, y + 0.7, z - 0.2);
  const eye2 = eye1.clone();
  eye2.position.z = z + 0.2;

  const legGeometry = new THREE.BoxGeometry(0.3, 0.5, 0.3);
  const legs = [
    [-0.5, 0, -0.3],
    [0.5, 0, -0.3],
    [-0.5, 0, 0.3],
    [0.5, 0, 0.3],
  ];
  legs.forEach((offset) => {
    const leg = new THREE.Mesh(legGeometry, materials.pigSkin);
    leg.position.set(x + offset[0], y, z + offset[2]);
    pig.add(leg);
  });

  pig.add(body, head, eye1, eye2);
  return pig;
}

// Iluminación básica
function setupLighting() {
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(50, 100, 50);
  directionalLight.castShadow = true;
  scene.add(directionalLight);
}

// Inicializar todo
function init() {
  setupLighting();
  const terrain = createTerrain(20);
  scene.add(terrain);

  // Árboles
  for (let i = 0; i < 10; i++) {
    const x = Math.random() * 20 - 10;
    const z = Math.random() * 20 - 10;
    scene.add(createTree(x, 2, z));
  }

  // Rocas y plantas
  for (let i = 0; i < 10; i++) {
    const x = Math.random() * 20 - 10;
    const z = Math.random() * 20 - 10;
    scene.add(createRock(x, 2, z));
    scene.add(createPlant(x, 2, z));
  }

  // Cerditos
  for (let i = 0; i < 3; i++) {
    const x = Math.random() * 20 - 10;
    const z = Math.random() * 20 - 10;
    scene.add(createPig(x, 2, z));
  }

  // Objetos decorativos
  scene.add(
    createPrimitive("cone", new THREE.Vector3(5, 2, 5), materials.wood)
  );
  scene.add(
    createPrimitive("torus", new THREE.Vector3(-5, 2, -5), materials.stone)
  );
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

init();
animate();

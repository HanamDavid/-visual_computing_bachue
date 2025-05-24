# Taller Modelado Procedural Básico

## Three.Js

En este taller se construyó una escena 3D interactiva usando React Three Fiber, donde se distribuyeron varias cajas en el espacio y se implementó una cámara conmutada entre perspectiva y ortográfica. Se integraron controles de órbita para manipular la vista en tiempo real y se añadió un panel informativo que muestra dinámicamente los parámetros clave de la cámara activa, como el tipo, el campo de visión, los planos de recorte y los límites del encuadre, lo cual facilita la comprensión visual del comportamiento de cada tipo de cámara.

### 📸 Capturas o GIFs
![2025-05-23 19-36-52](https://github.com/user-attachments/assets/6b2332b4-0329-484d-9a5a-34aa17494a5a)


### 🎯 Codigo Relevante

    // Título superpuesto
    function Title() {
      return (
        <h1 style={{
          position: 'absolute',
          top: '20px',
          width: '100%',
          textAlign: 'center',
          fontSize: '3rem',
          color: 'white',
          textShadow: '2px 2px 6px black',
          zIndex: 10
        }}>
          Taller modelado procedural básico
        </h1>
      );
    }
    
    // Cubos en cuadrícula
    function GridOfBoxes() {
      const size = 5;
      const spacing = 2;
      const boxes = useMemo(() => {
        const arr = [];
        for (let x = -size; x <= size; x++) {
          for (let z = -size; z <= size; z++) {
            arr.push([x * spacing, 0, z * spacing]);
          }
        }
        return arr;
      }, []);
    
      return boxes.map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="orange" />
        </mesh>
      ));
    }
    
    // Esferas en espiral
    function SpiralOfSpheres() {
      const spheres = useMemo(() => {
        const arr = [];
        const count = 100;
        for (let i = 0; i < count; i++) {
          const angle = i * 0.2;
          const radius = i * 0.1;
          const x = Math.cos(angle) * radius;
          const y = i * 0.1;
          const z = Math.sin(angle) * radius;
          arr.push([x, y, z]);
        }
        return arr;
      }, []);
    
      return spheres.map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color="skyblue" />
        </mesh>
      ));
    }
    
    // Deformación animada de un plano
    function DeformedPlane() {
      const ref = useRef();
    
      useFrame(() => {
        if (ref.current) {
          const time = performance.now() * 0.001;
          const posAttr = ref.current.geometry.attributes.position;
          for (let i = 0; i < posAttr.count; i++) {
            const x = posAttr.getX(i);
            const z = posAttr.getZ(i);
            const y = Math.sin(x * 2 + time) * Math.cos(z * 2 + time);
            posAttr.setY(i, y);
          }
          posAttr.needsUpdate = true;
        }
      });
    
      return (
        <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
          <planeGeometry args={[20, 20, 100, 100]} />
          <meshStandardMaterial color="lightgreen" wireframe />
        </mesh>
      );
    }
    
    // Árbol fractal recursivo
    function FractalBranch({ depth = 0, maxDepth = 4, length = 2, scale = 0.7 }) {
      const ref = useRef();
    
      useFrame(() => {
        if (ref.current) {
          ref.current.rotation.y += 0.002;
        }
      });
    
      if (depth > maxDepth) return null;
    
      const childProps = {
        depth: depth + 1,
        maxDepth,
        length: length * scale,
        scale,
      };
    
      return (
        <group ref={ref}>
          <mesh position={[0, length / 2, 0]}>
            <cylinderGeometry args={[0.1, 0.2, length, 8]} />
            <meshStandardMaterial color="brown" />
          </mesh>
          <group position={[0, length, 0]}>
            <group rotation={[0.5, 0, 0]}>
              <FractalBranch {...childProps} />
            </group>
            <group rotation={[-0.5, 0, 0]}>
              <FractalBranch {...childProps} />
            </group>
            <group rotation={[0, 0.5, 0]}>
              <FractalBranch {...childProps} />
            </group>
            <group rotation={[0, -0.5, 0]}>
              <FractalBranch {...childProps} />
            </group>
          </group>
        </group>
      );
    }
    
    // Componente principal
    export default function App() {
      return (
        <div style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>
          <Title />
          <Canvas camera={{ position: [0, 10, 25], fov: 60 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 20, 10]} />
            <GridOfBoxes />
            <SpiralOfSpheres />
            <DeformedPlane />
            <FractalBranch />
          </Canvas>
        </div>
      );
    }

## Unity

En este taller creamos un script en Unity usando C# que genera primitivas 3D (cubos y cilindros) y les aplica transformaciones de posición, rotación y escala. Los cubos se organizan en una rejilla y los cilindros en una espiral, y además incorporamos animaciones para que estas transformaciones ocurran progresivamente durante la ejecución del juego, usando corutinas para controlar el tiempo y Lerp para suavizar los movimientos.

### 📸 Capturas o GIFs

![2025-05-23 21-42-15](https://github.com/user-attachments/assets/555430b1-5275-4c9a-9e5e-24e80ae98b72)

### 🎯 Codigo Relevante

    using UnityEngine;
    using System.Collections;
    using System.Collections.Generic;
    
    public class AnimatedPrimitives : MonoBehaviour
    {
        [Header("Cube Grid")]
        public int gridRows = 3;
        public int gridCols = 3;
        public float gridSpacing = 2f;
        public float cubeDelay = 0.1f;
    
        [Header("Cylinder Spiral")]
        public int spiralCount = 20;
        public float spiralRadius = 0.5f;
        public float spiralHeightIncrement = 0.5f;
        public float spiralAngleIncrement = 30f;
        public float cylinderDelay = 0.1f;
    
        private List<Transform> animatedCylinders = new List<Transform>();
    
        void Start()
        {
            StartCoroutine(GenerateCubeGrid());
            StartCoroutine(GenerateCylinderSpiral());
        }
    
        IEnumerator GenerateCubeGrid()
        {
            for (int row = 0; row < gridRows; row++)
            {
                for (int col = 0; col < gridCols; col++)
                {
                    GameObject cube = GameObject.CreatePrimitive(PrimitiveType.Cube);
                    cube.name = $"Cube_{row}_{col}";
    
                    // Posición inicial fuera de la rejilla
                    cube.transform.position = Vector3.zero;
    
                    // Destino
                    Vector3 targetPos = new Vector3(col * gridSpacing, 0, row * gridSpacing);
                    StartCoroutine(AnimateTransform(cube.transform, targetPos, Quaternion.Euler(0, (row + col) * 15f, 0), new Vector3(1, 1, 1), 1f));
    
                    yield return new WaitForSeconds(cubeDelay);
                }
            }
        }
    
        IEnumerator GenerateCylinderSpiral()
        {
            for (int i = 0; i < spiralCount; i++)
            {
                GameObject cylinder = GameObject.CreatePrimitive(PrimitiveType.Cylinder);
                cylinder.name = $"Cylinder_{i}";
    
                // Posición inicial
                cylinder.transform.position = Vector3.zero;
    
                // Cálculo destino
                float angle = i * spiralAngleIncrement * Mathf.Deg2Rad;
                float x = Mathf.Cos(angle) * spiralRadius * i;
                float z = Mathf.Sin(angle) * spiralRadius * i;
                float y = i * spiralHeightIncrement;
    
                Vector3 targetPos = new Vector3(x, y, z);
                Quaternion targetRot = Quaternion.Euler(i * 10f, i * 15f, 0);
                Vector3 targetScale = new Vector3(1, 1 + 0.1f * i, 1);
    
                StartCoroutine(AnimateTransform(cylinder.transform, targetPos, targetRot, targetScale, 1f));
                animatedCylinders.Add(cylinder.transform);
    
                yield return new WaitForSeconds(cylinderDelay);
            }
        }
    
        IEnumerator AnimateTransform(Transform t, Vector3 targetPos, Quaternion targetRot, Vector3 targetScale, float duration)
        {
            Vector3 startPos = t.position;
            Quaternion startRot = t.rotation;
            Vector3 startScale = t.localScale;
    
            float elapsed = 0f;
    
            while (elapsed < duration)
            {
                float tFactor = elapsed / duration;
                t.position = Vector3.Lerp(startPos, targetPos, tFactor);
                t.rotation = Quaternion.Slerp(startRot, targetRot, tFactor);
                t.localScale = Vector3.Lerp(startScale, targetScale, tFactor);
    
                elapsed += Time.deltaTime;
                yield return null;
            }
    
            t.position = targetPos;
            t.rotation = targetRot;
            t.localScale = targetScale;
        }
    }

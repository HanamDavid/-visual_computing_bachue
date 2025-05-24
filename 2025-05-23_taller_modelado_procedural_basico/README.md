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


### 📸 Capturas o GIFs


### 🎯 Codigo Relevante

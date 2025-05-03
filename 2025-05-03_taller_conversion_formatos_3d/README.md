# Taller - Importando el Mundo: Visualización y Conversión de Formatos 3D
## Python
En este taller se utiliza la biblioteca trimesh para cargar y analizar modelos 3D en formatos .obj, .stl y .gltf. Se cargan los modelos Heart_Shaped_Box, gift_box, y una escena GLTF (box.gltf). Para el modelo GLTF, se extraen las mallas individuales de la escena. Luego, se define una función mostrar_info que imprime propiedades clave de cada modelo, como el número de caras, vértices, volumen aproximado, y si el modelo está cerrado (watertight). Finalmente, se muestran las propiedades de los modelos .obj y .stl, así como de cada malla contenida en la escena GLTF, proporcionando un análisis detallado de las características geométricas de los modelos.

### 📸 Capturas o GIFs
![Untitled ‑ Made with FlexClip](https://github.com/user-attachments/assets/2909e481-beda-4d34-ad1d-980ffcec9fc2)

### 🎯 Codigo Relevante

    # Función para mostrar propiedades
    def mostrar_info(mesh, nombre):
        print(f"\n🔹 Modelo: {nombre}")
        print(f"  📦 Tipo: {type(mesh)}")
        print(f"  🔺 Número de caras: {len(mesh.faces)}")
        print(f"  🔘 Número de vértices: {len(mesh.vertices)}")
        print(f"  🧾 Bounding box extents: {mesh.extents}")
        print(f"  🧭 Centroide: {mesh.centroid}")
        print(f"  📐 Volumen (aprox): {mesh.volume:.2f}")
        print(f"  🧱 ¿Está cerrado (watertight)?: {mesh.is_watertight}")
    
    # Mostrar propiedades
    mostrar_info(mesh_heart, "Heart Shape (.obj)")
    mostrar_info(mesh_gift, "Gift Box (.stl)")
    
    # Mostrar propiedades de cada malla en la escena GLTF
    for i, mesh in enumerate(meshes_box):
        mostrar_info(mesh, f"Box (.gltf) - Malla {i+1}")

### Comentarios personales sobre el aprendizaje y dificultades encontradas.
Se presentaron bastantes dificultades para cargar los diferentes tipos de objetos en collab por lo que se requerian instalar varias librerias y hacer un guardado diferente para el objeto .gltf

## Three.js
En este taller, se desarrolló una aplicación en React utilizando @react-three/fiber para renderizar modelos 3D en formatos GLTF, OBJ y STL. Se implementaron componentes para cargar y mostrar cada modelo, ajustando sus escalas y posiciones para una visualización adecuada. Además, se añadieron botones para alternar entre los modelos y se integró OrbitControls de @react-three/drei para permitir la exploración interactiva de los modelos mediante rotación, zoom y paneo. Esto resultó en una aplicación funcional y dinámica para visualizar modelos 3D.

### 📸 Capturas o GIFs
![2025-05-02 19-50-04](https://github.com/user-attachments/assets/eab35dfa-b4ca-4c89-b8b0-ecc07baacb89)

### 🎯 Codigo Relevante

    function ModelGLTF() {
      const { scene } = useGLTF('/src/assets/box.gltf')
      scene.scale.set(1, 1, 1) // Escala completa
      scene.position.set(0, 0, 0) // Ajusta la posición
      return <primitive object={scene} />
    }
    
    function ModelOBJ() {
      const obj = useLoader(OBJLoader, '/src/assets/Heart_box.obj')
      obj.scale.set(0.3, 0.3, 0.3) // Ajusta la escala (reduce al 10%)
      obj.position.set(0, 0, 0) // Ajusta la posición
      return <primitive object={obj} />
    }
    
    function ModelSTL() {
      const geometry = useLoader(STLLoader, '/src/assets/gift_box.stl')
      const material = new MeshStandardMaterial({ color: 'orange' })
      return (
        <mesh geometry={geometry} material={material} position={[0, 1.5, 0]} scale={[0.1, 0.1, 0.1]} />
      )
    }
### Comentarios personales sobre el aprendizaje y dificultades encontradas.
Se encontraron bastantes problemas para agregar los 3 objetos por lo que muchas veces colisionaban uno con otro enotonces no aparecia en pantalla

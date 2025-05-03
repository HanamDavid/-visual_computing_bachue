# Taller - Escenas Paramétricas: Creación de Objetos desde Datos

## Three.Js

En este taller, se creó una escena 3D interactiva utilizando React y la biblioteca @react-three/fiber, donde se parametrizaron objetos 3D a partir de un array de datos que define su posición, escala, color y rotación. Se implementó un componente reutilizable para cargar modelos GLTF y se usó map() para renderizar dinámicamente múltiples objetos en la escena. Además, se añadió una interfaz con una leva (slider) para controlar la escala global de los objetos en tiempo real, permitiendo una experiencia adaptativa e interactiva.
### 📸 Capturas o GIFs
![2025-05-02 22-43-16](https://github.com/user-attachments/assets/5d2827f5-f2b5-4110-a1f9-0fb9bae38f91)

### 🎯 Codigo Relevante
    // Datos para parametrizar los objetos
    const objectData = [
      { id: 1, type: 'GLTF', position: [0, 0, 0], scale: 1, color: 'red', rotation: [0, 0, 0] },
      { id: 2, type: 'GLTF', position: [2, 0, 0], scale: 0.8, color: 'blue', rotation: [0, Math.PI / 4, 0] },
      { id: 3, type: 'GLTF', position: [-2, 0, 0], scale: 1.2, color: 'green', rotation: [0, Math.PI / 2, 0] },
    ]
    
    function ModelGLTF({ position, scale, color, rotation }) {
      const { scene } = useGLTF('/src/assets/box.gltf')
      scene.scale.set(scale, scale, scale)
      scene.position.set(...position)
      scene.rotation.set(...rotation)
      scene.traverse((child) => {
        if (child.isMesh) {
          child.material.color.set(color)
        }
      })
      return <primitive object={scene} />
    }

## Python

En este taller trabajamos en la generación y manipulación de primitivas 3D (cubos, esferas, cilindros) en un entorno interactivo usando Python y bibliotecas como vedo, trimesh, open3d y numpy. Comenzamos creando puntos en el espacio 3D, desde los cuales generamos formas básicas con propiedades variables (como tamaño, color y tipo de figura) mediante bucles y condicionales. Luego, exploramos diversas formas de exportar la escena o los objetos generados a formatos estándar como .OBJ, .STL, .GLTF y .PLY, resolviendo incompatibilidades entre estructuras de datos y formatos requeridos por cada biblioteca. Todo esto fue implementado y visualizado en Google Colab.

### 📸 Capturas o GIFs
![descarga1](https://github.com/user-attachments/assets/e61b4175-1d42-42ee-ad95-52bc44dceac6)

### 🎯 Codigo Relevante
     # Función para calcular distancia al origen
    def distancia(p):
        return np.linalg.norm(p)
    
    # Lista de puntos 3D
    puntos = np.array([
        [0, 0, 0],
        [1, 2, 0],
        [-2, -1, 1],
        [3, 0, 2],
        [0, -2, -1],
        [1, -1, 3],
        [-1, 3, -2]
    ])
    
    # Crear lista de primitivas
    primitivas = []
    
    for i, punto in enumerate(puntos):
        d = distancia(punto)
        size = 0.2 + (d / 5)  # tamaño variable

    # Color según altura (z)
    if punto[2] > 1:
        color = 'orange'
    elif punto[2] > 0:
        color = 'red'
    else:
        color = 'cyan'

    # Elegir forma
    if i % 3 == 0:
        prim = vedo.Sphere(pos=punto, r=size).c(color)
    elif i % 3 == 1:
        prim = vedo.Cube(pos=punto, side=size*2).c(color)
    else:
        prim = vedo.Cylinder(pos=punto, r=size/2, height=size*3).c(color)
        prim.pos(punto)

    primitivas.append(prim)
    
### Comentarios personales sobre el aprendizaje y dificultades encontradas.

Se encontraron bastantes dificultades para exportar los objetos a los formatos requeridos, se tuvo que resolver las diferentes incompatibilidades para poder realizarse

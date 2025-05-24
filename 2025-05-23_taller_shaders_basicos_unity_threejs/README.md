# Taller de Shaders basico en Unity y Three.js

## Three.Js

En este taller se desarrolló una escena interactiva en 3D utilizando React Three Fiber, donde se implementó una esfera central animada mediante un shader personalizado. El shader fue creado con @react-three/drei y emplea GLSL para generar un efecto de pulso dinámico basado en el tiempo. Además, se configuró el entorno para que el lienzo 3D ocupara toda la pantalla y se añadió un título fijo en la parte superior, brindando una experiencia visual atractiva y centrada en el uso creativo de materiales personalizados en WebGL.

### 📸 Capturas o GIFs
![2025-05-23 20-57-54](https://github.com/user-attachments/assets/2f52dd1e-1012-427a-bcaa-db68d606ec53)


### 🎯 Codigo Relevante

    // Define el shader material personalizado
    const MyShaderMaterial = shaderMaterial(
      {
        uTime: 0,
        uColor: new THREE.Color(0.2, 0.6, 1.0)
      },
      // Vertex Shader
      `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
      `,
      // Fragment Shader
      `
      uniform float uTime;
      uniform vec3 uColor;
      varying vec2 vUv;
    
      void main() {
        float pulse = sin(uTime + vUv.x * 10.0) * 0.5 + 0.5;
        gl_FragColor = vec4(uColor * pulse, 1.0);
      }
      `
    )
    
    extend({ MyShaderMaterial })
    
    function AnimatedSphere() {
      const ref = React.useRef()
      useFrame((state) => {
        if (ref.current) {
          ref.current.uTime = state.clock.getElapsedTime()
        }
      })
    
      return (
        <mesh>
          <sphereGeometry args={[2, 64, 64]} />
          <myShaderMaterial ref={ref} />
        </mesh>
      )
    }

## Unity

### 📸 Capturas o GIFs

### 🎯 Codigo Relevante

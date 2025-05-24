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
En el taller se creó una escena en Unity con un objeto 3D al que se le asignó un shader personalizado. Este shader fue diseñado para modificar el color del objeto en función de la posición vertical de sus vértices, generando un gradiente de color, y además incorpora un componente dinámico que cambia el color con el tiempo mediante una oscilación. Se implementó tanto usando Shader Graph como con un shader escrito en HLSL, logrando un efecto visual dinámico y personalizado que demuestra cómo manipular colores y tiempos en shaders dentro de Unity.

### 📸 Capturas o GIFs
https://github.com/user-attachments/assets/269452af-d498-4e14-8b1d-52061b157da6


### 🎯 Codigo Relevante
    Shader "Custom/VertexColorTime"
    {
        Properties
        {
            _Color1 ("Color Base", Color) = (1,0,0,1)
            _Color2 ("Color Top", Color) = (0,0,1,1)
        }
        SubShader
        {
            Tags { "RenderType"="Opaque" }
            LOD 100
    
            Pass
            {
                CGPROGRAM
                #pragma vertex vert
                #pragma fragment frag
    
                #include "UnityCG.cginc"
    
                fixed4 _Color1;
                fixed4 _Color2;
    
                struct appdata
                {
                    float4 vertex : POSITION;
                };
    
                struct v2f
                {
                    float4 pos : SV_POSITION;
                    float3 localPos : TEXCOORD0;
                };
    
                v2f vert (appdata v)
                {
                    v2f o;
                    o.pos = UnityObjectToClipPos(v.vertex);
                    o.localPos = v.vertex.xyz;
                    return o;
                }
    
                fixed4 frag (v2f i) : SV_Target
                {
                    // gradiente vertical basado en y local
                    float t = saturate(i.localPos.y + 0.5); // ajusta para que vaya 0 a 1
    
                    // color interpolado según altura
                    fixed4 col = lerp(_Color1, _Color2, t);
    
                    // componente que cambia con el tiempo
                    float timeFactor = (sin(_Time.y * 3.0) + 1) * 0.5;
    
                    col.rgb *= timeFactor;
    
                    return col;
                }
                ENDCG
            }
        }
    }

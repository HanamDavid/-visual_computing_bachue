# Taller - Cinemática Directa: Animando Brazos Robóticos o Cadenas Articuladas

## Three.Js
En esta parte del taller se implementó la simulación visual de un brazo robótico planar de tres eslabones utilizando React y la librería @react-three/fiber. Se programó la cinemática directa para calcular la posición del extremo del brazo en función de los ángulos de sus articulaciones, permitiendo tanto la animación automática como el control manual de los ángulos mediante sliders. Además, se visualizó la trayectoria recorrida por el extremo del brazo usando una línea que almacena y dibuja sus posiciones, logrando así una representación interactiva y didáctica del movimiento del manipulador.

### 📸 Capturas o GIFs
![2025-06-05 18-52-49](https://github.com/user-attachments/assets/76a260e2-8e9a-4e72-ad38-c952215352e3)


### 🎯 Codigo Relevante

        function Arm({ angles, setAngles, trace }) {
          const group1 = useRef()
          const group2 = useRef()
          const group3 = useRef()
          const [positions, setPositions] = useState([])
        
          useFrame((state) => {
            // Si no hay interacción manual, animar automáticamente
            if (!angles.manual) {
              const t = state.clock.elapsedTime
              setAngles({
                theta1: Math.sin(t) * 0.5,
                theta2: Math.cos(t) * 0.5,
                theta3: Math.sin(t * 1.5) * 0.5,
                manual: false,
              })
            }
        
            // Aplicar rotaciones progresivas
            if (group1.current) group1.current.rotation.z = angles.theta1
            if (group2.current) group2.current.rotation.z = angles.theta2
            if (group3.current) group3.current.rotation.z = angles.theta3
        
            // Calcular posición del extremo y guardar para la traza
            if (trace) {
              // Cinemática directa simple para 3 eslabones de longitud 2
              const l = 2
              const a1 = angles.theta1
              const a2 = angles.theta2
              const a3 = angles.theta3
              const x =
                l * Math.cos(a1) +
                l * Math.cos(a1 + a2) +
                l * Math.cos(a1 + a2 + a3)
              const y =
                l * Math.sin(a1) +
                l * Math.sin(a1 + a2) +
                l * Math.sin(a1 + a2 + a3)
              setPositions((prev) =>
                prev.length > 500
                  ? [...prev.slice(1), [x + 1, y, 0]]
                  : [...prev, [x + 1, y, 0]]
              )
            }
          })
        
          return (
            <>
              <group ref={group1}>
                {/* Primer eslabón */}
                <mesh position={[1, 0, 0]}>
                  <boxGeometry args={[2, 0.4, 0.4]} />
                  <meshStandardMaterial color="orange" />
                </mesh>
                <group ref={group2} position={[2, 0, 0]}>
                  {/* Segundo eslabón */}
                  <mesh position={[1, 0, 0]}>
                    <boxGeometry args={[2, 0.4, 0.4]} />
                    <meshStandardMaterial color="skyblue" />
                  </mesh>
                  <group ref={group3} position={[2, 0, 0]}>
                    {/* Tercer eslabón */}
                    <mesh position={[1, 0, 0]}>
                      <boxGeometry args={[2, 0.4, 0.4]} />
                      <meshStandardMaterial color="limegreen" />
                    </mesh>
                  </group>
                </group>
              </group>
              {/* Línea de traza */}
              {trace && positions.length > 1 && (
                <Line
                  points={positions}
                  color="hotpink"
                  lineWidth={2}
                  dashed={false}
                />
              )}
            </>
          )
        }

### Comentarios personales sobre el aprendizaje y dificultades encontradas.
Se presentaron diversos problemas para definir la funcion que traza la trayectoria realizada por el brazo

## Unity

En esta parte del taller se construyó un brazo robótico jerárquico en Unity, compuesto por objetos primitivos organizados en una estructura. Se implementó un script en C# para aplicar rotaciones encadenadas a cada articulación, utilizando funciones seno para animaciones suaves o sliders de UI para control manual de los ángulos. Además, se visualizó la trayectoria del extremo del brazo (la pinza) en tiempo real mediante Debug.DrawLine(), lo que permitió observar el movimiento generado por las transformaciones jerárquicas en la escena.

### 📸 Capturas o GIFs
![2025-06-05 18-21-30](https://github.com/user-attachments/assets/f32eb6ca-ff5a-4246-9366-7bfadd72a043)


### 🎯 Codigo Relevante
        void Start()
        {
            // Inicializa la primera posición del extremo
            if (pinza != null)
                ultimoPunto = pinza.position;
        }
    
        void Update()
        {
            // Lee ángulos desde sliders o genera animación con seno
            float baseAngle = baseSlider ? baseSlider.value : Mathf.Sin(Time.time) * 45f;
            float brazo1Angle = brazo1Slider ? brazo1Slider.value : Mathf.Sin(Time.time + 1) * 30f;
            float brazo2Angle = brazo2Slider ? brazo2Slider.value : Mathf.Sin(Time.time + 2) * 30f;
    
            // Aplica rotaciones locales
            if (baseObj) baseObj.localRotation = Quaternion.Euler(0, baseAngle, 0);
            if (brazo1) brazo1.localRotation = Quaternion.Euler(brazo1Angle, 0, 0);
            if (brazo2) brazo2.localRotation = Quaternion.Euler(brazo2Angle, 0, 0);
    
            // Dibuja línea desde último punto hasta nueva posición de la pinza
            if (pinza != null)
            {
                Vector3 nuevoPunto = pinza.position;
                Debug.DrawLine(ultimoPunto, nuevoPunto, Color.red, 1.0f); // se borra luego de 1s
                ultimoPunto = nuevoPunto;
            }
        }
    }

### Comentarios personales sobre el aprendizaje y dificultades encontradas.

Se encontraron un poco de dificultades sobre que figuras implementar para la representacion de un pinza

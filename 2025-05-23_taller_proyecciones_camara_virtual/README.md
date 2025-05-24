# Taller - Proyecciones 3D: Cómo ve una Cámara Virtual

## Unity

En este taller configuramos una escena en Unity que permite alternar entre los modos de cámara perspectiva y ortográfico usando un botón, y ajustar visualmente el campo de visión o tamaño ortográfico con un slider. Esto nos permitió observar cómo cambian las proporciones y ángulos en pantalla al cambiar el tipo de proyección, facilitando la comprensión de ambos modos de cámara en aplicaciones 3D.

### 📸 Capturas o GIFs

![2025-05-23 13-14-32](https://github.com/user-attachments/assets/9392967b-3d9c-4a04-a135-b86398b0da2c)

### 🎯 Codigo Relevante

    using UnityEngine;
    using UnityEngine.UI;
    
    public class CameraController : MonoBehaviour
    {
        public Camera mainCamera;
        public Button toggleModeButton;
        public Slider sizeSlider;
        public Text modeLabel;
    
        private void Start()
        {
            toggleModeButton.onClick.AddListener(ToggleCameraMode);
            sizeSlider.onValueChanged.AddListener(UpdateSizeSlider);
    
            sizeSlider.minValue = 1f;
            sizeSlider.maxValue = 20f;
    
            UpdateUI();
        }
    
        void ToggleCameraMode()
        {
            mainCamera.orthographic = !mainCamera.orthographic;
            UpdateUI();
        }
    
        void UpdateSizeSlider(float value)
        {
            if (mainCamera.orthographic)
                mainCamera.orthographicSize = value;
            else
                mainCamera.fieldOfView = value;
        }
    
        void UpdateUI()
        {
            if (mainCamera.orthographic)
            {
                sizeSlider.minValue = 1f;
                sizeSlider.maxValue = 20f;
                sizeSlider.value = mainCamera.orthographicSize;
            }
            else
            {
                sizeSlider.minValue = 30f;
                sizeSlider.maxValue = 100f;
                sizeSlider.value = mainCamera.fieldOfView;
            }
    
            if (modeLabel != null)
                modeLabel.text = mainCamera.orthographic ? "Modo: Ortográfico" : "Modo: Perspectiva";
        }
    }

## Three.Js

En este taller se construyó una escena 3D interactiva usando React Three Fiber, donde se distribuyeron varias cajas en el espacio y se implementó una cámara conmutada entre perspectiva y ortográfica. Se integraron controles de órbita para manipular la vista en tiempo real y se añadió un panel informativo que muestra dinámicamente los parámetros clave de la cámara activa, como el tipo, el campo de visión, los planos de recorte y los límites del encuadre, lo cual facilita la comprensión visual del comportamiento de cada tipo de cámara.

### 📸 Capturas o GIFs

![2025-05-23 19-14-22](https://github.com/user-attachments/assets/a50f24bc-6c33-4857-85d6-c7392725699f)

### 🎯 Codigo Relevante
    
    function Boxes() {
      const positions = [
        [0, 0, 0],
        [2, 1, -3],
        [-2, -1, -6],
        [3, -2, -10],
        [-3, 2, -15]
      ]
      return positions.map((pos, i) => (
        <mesh position={pos} key={i}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={`hsl(${i * 60}, 80%, 60%)`} />
        </mesh>
      ))
    }
    
    // Componente que configura cámaras y actualiza info
    function CameraControls({ usePerspective, onUpdate }) {
      const perspectiveRef = useRef()
      const orthoRef = useRef()
    
      // Actualizar info de la cámara en cada frame
      useFrame(({ size }) => {
        const camera = usePerspective ? perspectiveRef.current : orthoRef.current
        if (!camera) return
    
        const info = {
          tipo: usePerspective ? 'Perspectiva' : 'Ortográfica'
        }
    
        if (usePerspective) {
          info.fov = camera.fov.toFixed(2)
          info.aspect = camera.aspect.toFixed(2)
          info.near = camera.near.toFixed(2)
          info.far = camera.far.toFixed(2)
        } else {
          info.left = camera.left.toFixed(2)
          info.right = camera.right.toFixed(2)
          info.top = camera.top.toFixed(2)
          info.bottom = camera.bottom.toFixed(2)
          info.near = camera.near.toFixed(2)
          info.far = camera.far.toFixed(2)
        }
    
        onUpdate(info)
      })
    
      return (
        <>
          {usePerspective ? (
            <PerspectiveCamera
              ref={perspectiveRef}
              makeDefault
              position={[0, 0, 10]}
              fov={60}
            />
          ) : (
            <OrthographicCamera
              ref={orthoRef}
              makeDefault
              position={[0, 0, 10]}
              zoom={50}
            />
          )}
          <OrbitControls />
        </>
      )
    }
    
    function App() {
      const [usePerspective, setUsePerspective] = useState(true)
      const [cameraInfo, setCameraInfo] = useState({})
    
      return (
        <>
          <h1>Taller Cámara Virtual</h1>
          <div className="controls">
            <button onClick={() => setUsePerspective(v => !v)}>
              Usar cámara {usePerspective ? 'Ortográfica' : 'Perspectiva'}
            </button>
          </div>
    
          <div className="info-panel">
            <strong>Tipo de cámara:</strong> {cameraInfo.tipo} <br />
            {cameraInfo.fov && <div><strong>fov:</strong> {cameraInfo.fov}</div>}
            {cameraInfo.aspect && <div><strong>aspect:</strong> {cameraInfo.aspect}</div>}
            {cameraInfo.left && <div><strong>left:</strong> {cameraInfo.left}</div>}
            {cameraInfo.right && <div><strong>right:</strong> {cameraInfo.right}</div>}
            {cameraInfo.top && <div><strong>top:</strong> {cameraInfo.top}</div>}
            {cameraInfo.bottom && <div><strong>bottom:</strong> {cameraInfo.bottom}</div>}
            <div><strong>near:</strong> {cameraInfo.near}</div>
            <div><strong>far:</strong> {cameraInfo.far}</div>
          </div>
    
          <Canvas style={{ height: 500, background: '#222' }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 10, 7]} intensity={1} />
            <CameraControls usePerspective={usePerspective} onUpdate={setCameraInfo} />
            <Boxes />
          </Canvas>
        </>
      )
    }
    
    export default App



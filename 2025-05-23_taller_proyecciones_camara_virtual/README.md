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


### 📸 Capturas o GIFs


### 🎯 Codigo Relevante


### Comentarios personales sobre el aprendizaje y dificultades encontradas.



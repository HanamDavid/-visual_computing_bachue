# Taller - Cinemática Directa: Animando Brazos Robóticos o Cadenas Articuladas

## Three.Js


### 📸 Capturas o GIFs


### 🎯 Codigo Relevante



### Comentarios personales sobre el aprendizaje y dificultades encontradas.


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

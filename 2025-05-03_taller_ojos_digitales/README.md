# 🟣 Esfera Interactiva en Movimiento con Unity

Este proyecto es una simulación animada en Unity donde una esfera se desplaza en círculos, rota en dos ejes y modifica dinámicamente su tamaño. Además, se incluye una cámara que puede rotar en incrementos de 90° con solo presionar las teclas `A` o `D`, permitiendo observar la escena desde diferentes ángulos.

## 🛠️ Tecnologías
- Unity (motor de desarrollo)
- C# (scripting)
- Editor de entrada de teclado para control de cámara

## ✨ Funcionalidades
- 🔄 Movimiento circular continuo de la esfera
- 🌀 Rotación simultánea sobre los ejes X e Y
- 🔍 Cambios dinámicos de escala una vez completado el movimiento
- ⏱️ Simulación con duración controlada
- 🎮 Rotación de cámara con teclas `A` y `D`

## 🎯 Comportamiento general
La esfera comienza rotando y desplazándose en un patrón circular sobre el plano XZ. Durante los primeros segundos, se mueve en círculos mientras rota de forma constante sobre dos ejes. Una vez finalizado este ciclo de movimiento (tras un tiempo definido), la esfera se detiene en una posición específica y comienza a oscilar su tamaño de forma rítmica, creando un efecto visual de respiración o pulsación.

## 🎮 Controles
- `A`: Girar la cámara 90° a la izquierda
- `D`: Girar la cámara 90° a la derecha

## 🖥️ Cómo usar el proyecto
- Abre el proyecto en Unity (versión recomendada: 2021.3 o superior)
-  Asegúrate de que los scripts `Movement.cs` y `camRotation.cs` estén asignados correctamente a sus respectivos objetos
- Ejecuta la escena desde el editor
- Observa el comportamiento de la esfera y prueba rotar la cámara con A y D

## 📸 Capturas o GIFs
- ![Taller1_Unity](https://github.com/user-attachments/assets/52299d05-036f-4eb8-bb62-901f5315db0d)


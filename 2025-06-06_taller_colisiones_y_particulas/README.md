# 🧪 Taller de Colisiones y Partículas en Unity

📅 Fecha  
2025-06-06

---

## 🎯 Objetivo del Taller  
Implementar un sistema de detección de colisiones en Unity que active efectos de partículas, explorando el sistema de físicas y la generación de efectos visuales interactivos.

---

## 🧠 Conceptos Aprendidos  
- **Detección de colisiones** con `OnCollisionEnter`  
- **Sistemas de partículas** (configuración de duración, tamaño y color)  
- **Física en Unity** (Rigidbody, Colliders)  
- **Control programático** de efectos visuales  
- Otro: Activación de eventos por colisión  

---

## 🔧 Herramientas y Entornos  
- **Unity** (versión LTS 2022.3.6f1)  
- **Visual Studio** (para edición de scripts C#)  

---

## 📁 Estructura del Proyecto  
```bash
2025-06-06_taller_colisiones_y_particulas/
├── unity/
│   └── Assets/
│       ├── Scripts/
│       ├── Prefabs/
│       └── Scenes/
├── README.md
```
---
## 🧪 Implementación  

### 🔹 Etapas realizadas  
1. **Preparación de escena**: Creación de suelo y objetos físicos.  
2. **Configuración de partículas**: Diseño del efecto visual.  
3. **Programación**: Script para detectar colisiones y activar partículas.  
4. **Pruebas**: Ajuste de parámetros físicos y visuales.  

### 🔹 Código relevante  
```csharp
using UnityEngine;

public class ColisionParticulas : MonoBehaviour
{
    public ParticleSystem efecto;

    private void OnCollisionEnter(Collision collision)
    {
        if (efecto != null)
        {
            efecto.transform.position = collision.contacts[0].point;
            efecto.Play();
        }
    }
}
```

### 📊 Resultados Visuales

![Simulación de colisiones en Unity](https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExc2RwZGRpMjF6aGpuY2xuNm9ndXExdWo5cTIzenMyYmY3Ynd1NHVudyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/m9YGIbPG4rAuypsjX6/giphy.gif)
---

### ✅ Descripción del Comportamiento
- Los objetos con Rigidbody caen por gravedad.

- Al colisionar, se instancia un sistema de partículas en el punto de contacto.

- El color de las partículas es diferente por objeto.
---

## 💬 Reflexión Final
Este taller me permitió comprender cómo Unity maneja las colisiones físicas y cómo vincularlas a eventos visuales. La parte más compleja fue ajustar los parámetros del sistema de partículas para lograr un efecto natural.

En futuros proyectos, podría:

- Añadir sonidos al detectar colisiones.

- Activar animaciones en los objetos al chocar.

- Implementar luces que cambien de color durante el impacto.

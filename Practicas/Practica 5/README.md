# 📝 Informe Comparativo – Dispositivos de Realidad Extendida (XR)

**Taller:** Exploración de Dispositivos de Realidad Extendida  
**Grupo:** Nicolas Arciniegas, Juan Guarnizo, Lizeth Mariana Garcia, Diego Alvarez  
**Fecha:**  5 Julio 2025

---

## 1. Introducción

Este informe resume la exploración práctica realizada durante el taller de XR, donde se analizaron cinco dispositivos: **HoloLens 1, HoloLens 2, Magic Leap 1, Meta Quest Pro y Apple Vision Pro**. El objetivo fue conocer sus características técnicas, capacidades de interacción y posibles aplicaciones, a partir de sesiones de prueba guiadas.

---

## 2. Tabla Comparativa de Especificaciones

| Característica             | HoloLens 1         | HoloLens 2         | Magic Leap 1       | Meta Quest Pro     | Apple Vision Pro        |
|---------------------------|--------------------|--------------------|--------------------|--------------------|--------------------------|
| Lanzamiento               | 2016               | 2019               | 2018               | 2022               | 2024                     |
| Tipo de XR                | AR (MR)            | AR (MR)            | AR (MR)            | MR / VR            | MR (AR + VR)             |
| Sistema Operativo         | Windows Holographic| Windows Holographic| Lumin OS           | Android modificado | visionOS                 |
| Resolución por ojo        | 1268 x 720         | 2048 x 1080        | 1280 x 960         | 1800 x 1920        | 4K por ojo *(no probado)* |
| Interacción principal     | Gestos, voz        | Gestos, voz        | Controlador, gestos| Manos, voz, control| Ojos, manos, voz         |
| Seguimiento ocular        | No                 | Sí                 | Sí                 | Parcial            | Sí *(no probado)*        |
| SDK / Desarrollo          | Unity, MRTK        | Unity, MRTK        | Unity, Lumin SDK   | Unity, Meta SDK    | RealityKit, Unity *(no probado)* |

---

## 3. Observaciones por Dispositivo

### 🔹 HoloLens 1

- **Ventajas**:
  - Buen reconocimiento de gestos básicos.
  - Estable para aplicaciones sencillas.
  - Ideal para uso educativo y prototipos básicos.
- **Limitaciones**:
  - Campo de visión muy reducido.
  - Interfaz algo rígida y menos intuitiva.
  - Problemas de latencia al ejecutar escenas pesadas.

### 🔹 HoloLens 2

- **Ventajas**:
  - Mayor campo de visión y resolución mejorada.
  - Excelente seguimiento de manos con articulación completa.
  - Interfaz natural: tocar hologramas, moverlos, escalarlos.
- **Limitaciones**:
  - Sensible a la iluminación ambiental.
  - Configuración inicial algo lenta.

### 🔹 Magic Leap 1

- **Ventajas**:
  - Muy cómodo y liviano para uso prolongado.
  - Buen reconocimiento espacial del entorno.
  - Controlador con retroalimentación táctil facilita la navegación.
- **Limitaciones**:
  - Problemas ocasionales con el seguimiento de posición en espacios grandes.
  - Ecosistema limitado: algunas apps desactualizadas.
  - Interfaz menos intuitiva que HoloLens 2.

### 🔹 Meta Quest Pro

- **Ventajas**:
  - Seguimiento facial parcial (expresiones, mirada).
  - Ideal para contenido mixto y realidad virtual inmersiva.
- **Limitaciones**:
  - Más pesado que los otros dispositivos.
  - Software Meta Horizon aún en desarrollo, con bugs.
  - Mayor consumo energético (batería dura ~1.5 h en uso intensivo).

### 🔸 Apple Vision Pro

> ⚠️ **No se logró realizar una prueba directa debido a limitaciones de disponibilidad y tiempo.**  
> Se recopilaron datos técnicos y opiniones de terceros.

- **Lo que se sabe**:
  - Innovador seguimiento ocular y control por mirada.
  - Interfaz completamente basada en visionOS, sin controladores.
  - Alta calidad visual y passthrough a nivel casi fotorrealista.
  - Muy costoso y dependiente del ecosistema Apple.

---

## 4. Evaluación por Categorías

| Categoría                     | Mejor Evaluado             |
|------------------------------|----------------------------|
| **Interacción Natural**      | HoloLens 2                 |
| **Comodidad**                | Magic Leap 1               |
| **Calidad Visual**           | Meta Quest Pro             |
| **Facilidad de Uso**         | Meta Quest Pro / HoloLens 2|
| **Aplicaciones Industriales**| HoloLens 2                 |
| **Aplicaciones Educativas**  | HoloLens 1 / Magic Leap    |
| **Mejor para prototipado XR**| Meta Quest Pro             |

---

## 5. Evidencias
![Evidencias](evidencias/evidencia1.jpg)
---
## 6. Conclusión

Este taller permitió comparar de forma práctica distintos enfoques en diseño e interacción XR. Mientras **HoloLens 2** se destaca por su capacidad de interacción precisa y su foco industrial, **Magic Leap 1** sorprende por su comodidad, y **Meta Quest Pro** por su potencia en realidad mixta y virtual.

El **Apple Vision Pro** se perfila como un competidor fuerte en el ámbito XR, aunque su alto precio y ecosistema cerrado limitan su adopción en ambientes académicos y de prototipado rápido.

---

## 7. Recomendaciones

- Para proyectos educativos: **Magic Leap 1** por su ligereza y facilidad de uso.
- Para desarrollo de aplicaciones industriales: **HoloLens 2** por su precisión.
- Para prototipos mixtos (VR + AR): **Meta Quest Pro**, siempre que el peso no sea un problema

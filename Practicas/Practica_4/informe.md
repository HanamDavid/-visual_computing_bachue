# 📄 Informe Técnico: Detección y Análisis Visual con YOLOv8

**Fecha:** 2025-07-14
**Proyecto:** Taller Visual - Integración de Detección y Análisis con YOLOv8
**Autor:** *(Agregar tu nombre aquí)*

---

## 🎯 Objetivo General

Desarrollar una herramienta computacional basada en visión artificial que permita detectar, filtrar, analizar y visualizar objetos en imágenes mediante el modelo YOLOv8. Este sistema busca proporcionar una base sólida para tareas de inspección visual inteligente y generación de datos estructurados a partir de imágenes.

---

## 🧰 Tecnologías y Librerías Utilizadas

- `ultralytics` (YOLOv8): Para la detección de objetos en imágenes.
- `OpenCV`: Manipulación de imágenes.
- `Matplotlib`: Visualización de resultados.
- `Pandas`: Análisis y almacenamiento tabular de resultados.
- `NumPy`: Procesamiento numérico.
- `Google Colab`: Entorno de ejecución y visualización.
- `torch`: Manejo de tensores.

---

## 🧠 Descripción del Flujo de Trabajo

1. **Carga de Imagen**
   El usuario selecciona e ingresa una imagen mediante `files.upload()` en Colab.

2. **Detección con YOLOv8**
   Se ejecuta la detección usando el modelo preentrenado de YOLOv8, que retorna:
   - Cajas delimitadoras (`xyxy`)
   - Nombres e IDs de clases detectadas
   - Confianzas

3. **Filtrado de Clases Deseadas**
   Se seleccionan clases específicas (e.g., `sheep`, `zebra`) para su análisis posterior. Las detecciones se comparan con estas clases y se marca en un "checklist" si cumplen.

4. **Construcción de Tabla Resumen**
   Se crea un `DataFrame` con la información estructurada de cada detección:
   - ID de Detección
   - Clase y Nombre
   - Confianza
   - Coordenadas de la caja
   - Indicador de clase deseada

5. **Visualización de Resultados**
   Se dibujan las cajas sobre la imagen original, incluyendo etiquetas y nivel de confianza. Las detecciones filtradas se visualizan en verde.

6. **Exportación a CSV**
   Las detecciones filtradas se exportan como `filtered_detections.csv` para análisis externo o integraciones futuras.

---

## 📸 Evidencia Visual del Proceso

### 1. Imagen Original y Resultado de Detección

```python
# Muestra con matplotlib
plt.imshow(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))
```


---

### 2. Tabla de Detecciones (con Checklist)

```python
display(df)
```

| ID | Clase | Confianza | ¿Deseada? |
|----|-------|-----------|-----------|
| 0  | sheep | 0.87      | ✅ Yes    |
| 1  | dog   | 0.90      | ❌ No     |

---

## 📊 Resultados Almacenados

El sistema exporta automáticamente los resultados filtrados en un archivo CSV con el siguiente formato:

```csv
x_min, y_min, x_max, y_max, confidence, class_id
154, 66, 312, 230, 0.87, 19
...
```

---

## 🧠 Reflexión y Observaciones

El modelo YOLOv8 proporciona detecciones rápidas y precisas en imágenes modernas y de buena resolución. Sin embargo, se observaron limitaciones importantes al trabajar con imágenes fuera del dominio del dataset de entrenamiento:

### 🔍 Ambigüedad en Imágenes No Convencionales

Cuando se utilizaron imágenes de arte antiguo como **íconos bizantinos** o **arte rupestre**, el modelo presentó dificultades para identificar objetos relevantes.

Por ejemplo veamos el siguiente icono el cual detecto como un reloj
![Icono input](/imagenes/icon.png)
![Icono input](/imagenes/icon_results.png)
O la siguiente imagen de toros donde detecto una zebra
![Toros](/imagenes/toros.png)
Con imagenes contemporaneas si funcionan bien ambos metodos
![Imagen de libro](/imagenes/farsi.png)

**Interpretación:**
Esto sugiere que el modelo está entrenado principalmente con imágenes contemporáneas (fotografías de objetos en contextos modernos), y por tanto:

- Tiene poca representación de estilos visuales históricos, pictóricos o no fotográficos.
- Es necesario ampliar el set de entrenamiento con imágenes diversas cultural y temporalmente.
- Modelos basados en representaciones latentes más abstractas pueden ser necesarios para lograr una generalización más sólida.

---

## 🧩 Conclusiones

- El sistema propuesto cumple su propósito de analizar y procesar imágenes desde detección hasta visualización.
- La arquitectura es flexible y puede escalarse a otros usos, como generación automática de datasets, vigilancia visual o procesamiento de imágenes artísticas.
- Se evidencia la importancia de **evaluar los modelos con datos fuera del dominio**, para detectar sesgos y oportunidades de mejora.
- Incluir modelos como SAM (Segment Anything) podría enriquecer el análisis con segmentaciones más precisas por pixel.

---

## ✅ Posibles Extensiones Futuras

- Integrar modelo SAM para obtener máscaras por píxel.
- Permitir anotación manual posterior sobre las detecciones.
- Incluir mapeo geográfico de los objetos detectados en imágenes satelitales.
- Entrenamiento personalizado con datasets históricos o artísticos.

---

**Fin del Informe**

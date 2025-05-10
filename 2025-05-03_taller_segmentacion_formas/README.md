# Taller de Segmentacion de formas

Se realizó la segmentación binaria mediante umbral fijo y umbral adaptativo, facilitando la separación de objetos del fondo. A partir de la imagen binaria, se detectaron los contornos usando cv2.findContours(), y sobre la imagen original se visualizaron los contornos, los centros de masa de cada forma calculados con cv2.moments(), y los rectángulos delimitadores (bounding boxes) con cv2.boundingRect(). Finalmente, todos estos elementos fueron dibujados sobre la imagen original para facilitar su análisis visual.

### 📸 Capturas o GIFs
![Untitled ‑ Made with FlexClip](https://github.com/user-attachments/assets/c5ce7ccc-7cd1-4f8e-8dbc-0effd348bb25)


### 🎯 Codigo Relevante

    umbral = 165
    _, img_binaria = cv2.threshold(img_np, umbral, 255, cv2.THRESH_BINARY) # Aplicar umbral fijo

    img_adaptativa = cv2.adaptiveThreshold(
    img_np,                  # imagen en escala de grises
    255,                     # valor máximo a asignar si cumple condición
    cv2.ADAPTIVE_THRESH_MEAN_C,  # método (puedes probar también GAUSSIAN_C)
    cv2.THRESH_BINARY,       # tipo de umbralización
    15,                      # tamaño del bloque (debe ser impar)
    2                        # constante que se resta del promedio
    )
    
    # Detectar contornos
    contornos, _ = cv2.findContours(img_redimensionada, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    # Calcular centro de masa (usando imagen binaria como máscara booleana)
    centro_masa = center_of_mass(img_redimensionada > 0)

    img_contorno = cv2.cvtColor(img_binaria, cv2.COLOR_GRAY2BGR)  # Convertir a BGR para dibujar en color
    cv2.drawContours(img_contorno, contornos, -1, (0, 255, 0), 2)  # Dibuja todos los contornos en verde

    # Dibujar centro de masa (círculo rojo)
    ax.plot(centro_masa[1], centro_masa[0], 'ro', markersize=6)
    
    # Dibujar bounding boxes
    for contorno in contornos:
        x, y, w, h = cv2.boundingRect(contorno)
        rect = plt.Rectangle((x, y), w, h, edgecolor='lime', facecolor='none', linewidth=1.5)
        ax.add_patch(rect)
    
### ✅ Descripción general de los prompts usados (si aplican).
[link chat: https://chatgpt.com/share/68144eaf-7fd4-800a-b772-7b3f6b034457](https://chatgpt.com/share/6814f58d-2170-800a-84e2-3ae71c637a9c)
Se realizó los prompts para ayuda en implementacion de segmentaciones, manejo de contornos y deteccion de centro de masa y bounding boxes

### Comentarios personales sobre el aprendizaje y dificultades encontradas.

Para hallar el centro de masa tuve que investigar mas a fondo en foros e incluso incluir la libreria  from scipy.ndimage import center_of_mass

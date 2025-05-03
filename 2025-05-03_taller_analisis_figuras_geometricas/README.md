# Taller Imagen Matriz Pixeles

En este taller se trabajó con procesamiento de imágenes utilizando OpenCV en Google Colab. Se comenzó cargando una imagen en color y visualizando sus canales RGB y HSV por separado. Luego, se modificaron regiones específicas de la imagen mediante slicing, cambiando colores y sustituyendo áreas. Se calculó y graficó el histograma de intensidades en escala de grises y por canal de color para analizar la distribución tonal. Finalmente, se aplicaron ajustes manuales de brillo y contraste usando una ecuación lineal, visualizando los efectos de manera comparativa.

### 📸 Capturas o GIFs
![Untitled ‑ Made with FlexClip](https://github.com/user-attachments/assets/8a398939-84f6-4f7a-a82d-56a6d061a59e)

### 🎯 Codigo Relevante

    # Separar canales RGB
    R, G, B = cv2.split(imagen_rgb)
    
    # Convertir a HSV y separar canales
    imagen_hsv = cv2.cvtColor(imagen_bgr, cv2.COLOR_BGR2HSV)
    H, S, V = cv2.split(imagen_hsv)

    # --- Cambiar el color de un área rectangular ---
    # Coordenadas del rectángulo: fila_inicio:fila_fin, columna_inicio:columna_fin
    modificada[500:600, 100:200] = [255, 0, 0]  # Rojo (en RGB)
    
    # --- Sustituir una región por otra parte de la imagen ---
    # Seleccionar una región origen
    region_origen = imagen_rgb[1405:1615, 200:600]
    
    # Pegar la región en otra ubicación (asegúrate de que encaje en tamaño)
    modificada[50:260, 250:650] = region_origen

    # --- Histograma en escala de grises usando cv2.calcHist ---
    hist_gris = cv2.calcHist([imagen_gris], [0], None, [256], [0, 256])
    
    # --- Histogramas de R, G, B ---
    colors = ('r', 'g', 'b')
    for i, color in enumerate(colors):
        hist = cv2.calcHist([imagen_rgb], [i], None, [256], [0, 256])

    # Ajuste manual de brillo y contraste
    def ajustar_brillo_contraste(img, alpha, beta):
        # Convertimos a float32 para evitar saturación en el cálculo
        img_float = img.astype(np.float32)

    # Aplicar la fórmula
    img_ajustada = alpha * img_float + beta

    # Recortar valores fuera del rango [0, 255] y convertir de nuevo a uint8
    img_ajustada = np.clip(img_ajustada, 0, 255).astype(np.uint8)
    
    return img_ajustada

    # Parámetros
    alpha = 1.5  # contraste (1.0 = sin cambio)
    beta = 1   # brillo (0 = sin cambio)
    
    # Aplicar ajuste
    imagen_ajustada = ajustar_brillo_contraste(imagen_rgb, alpha, beta)

### ✅ Descripción general de los prompts usados (si aplican).
link chat: [https://chatgpt.com/share/68144eaf-7fd4-800a-b772-7b3f6b034457](https://chatgpt.com/share/6815045f-c454-800a-bd8a-e36501e72350)
Se realizó los prompts para ayuda en la carga de la imagen, identificar canales RGB y HSV, sustitucion y cambio de color de regiones especificas, calcular historigramas y aplicar formulas para el ajuste manual de brillo y contraste

### Comentarios personales sobre el aprendizaje y dificultades encontradas.

Hubo una dificultad encontrada al momento de realizar el ajuste manual del brillo y contraste de la imagen, se realizaron muchas pruebas y errores para variar los parametros alpha(contraste) y beta(brillo)

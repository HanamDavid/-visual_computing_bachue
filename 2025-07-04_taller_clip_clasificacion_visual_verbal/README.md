# Taller - Visual y Verbal: Clasificación de Imágenes con CLIP

## Python
En este taller se trabajó con el modelo CLIP de OpenAI para realizar clasificación de imágenes utilizando descripciones en lenguaje natural. Se instalaron las librerías necesarias, se cargó el modelo CLIP y se preparó una imagen junto con un conjunto de etiquetas de texto. Luego, se procesó la imagen y las etiquetas para obtener sus representaciones (embeddings), se calcularon las similitudes y se mostraron las probabilidades asociadas a cada etiqueta, determinando cuál descripción se ajustaba mejor al contenido visual de la imagen. Finalmente, se visualizaron los resultados y se propuso experimentar con descripciones más detalladas para mejorar la precisión del modelo.

### 📸 Capturas o GIFs
![Figure_1](https://github.com/user-attachments/assets/59d28cc6-9965-4ae7-911c-1f466820b0e4)
![Figure_2](https://github.com/user-attachments/assets/31208480-5553-41d7-bd55-899a3873efe8)
![Figure_3](https://github.com/user-attachments/assets/e4b24d41-2954-460a-90a6-09e0072052e8)

### 🎯 Codigo Relevante
    import clip
    import torch
    from PIL import Image
    
    device = "cuda" if torch.cuda.is_available() else "cpu"
    model, preprocess = clip.load("ViT-B/32", device=device)
    
    # Cargar y preprocesar la imagen relevante
    image_path = "C:\\Users\\nicoa\\Downloads\\gato_perro.jpg"  
    image = preprocess(Image.open(image_path)).unsqueeze(0).to(device)
    
    text_labels = ["cat", "dog"]
    text = clip.tokenize(text_labels).to(device)
    
    with torch.no_grad():
        image_features = model.encode_image(image)
        text_features = model.encode_text(text)
        logits_per_image, logits_per_text = model(image, text)
        probs = logits_per_image.softmax(dim=-1).cpu().numpy()
    
    
    import matplotlib.pyplot as plt
    
    # Mostrar imagen
    plt.imshow(Image.open(image_path))
    plt.axis('off')
    plt.title("Imagen cargada")
    plt.show()
    
    # Mostrar resultados
    for label, prob in zip(text_labels, probs[0]):
        print(f"{label}: {prob:.4f}")
    
    # Mostrar predicción más probable
    pred = text_labels[probs[0].argmax()]
    print(f"\nPredicción más probable: {pred}")

### Comentarios personales sobre el aprendizaje y dificultades encontradas.
Se encontraron dificultades encontrando imagenes con la suficiente resolucion para hacer la identificacion de los animales señalados, se intento con imagenes propias con baja resolucion y presentaba fallas


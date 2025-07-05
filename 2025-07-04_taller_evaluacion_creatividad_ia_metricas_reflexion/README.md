# Taller - Evaluando la Creatividad Artificial: Métricas y Reflexión

## Python

En este taller se exploró la relación entre texto e imagen en creaciones generadas por inteligencia artificial. Se cargaron imágenes previamente generadas con prompts usando modelos como DALL·E o Stable Diffusion, y se aplicaron métricas automáticas como CLIPScore, que mide qué tan bien la imagen representa el texto original. Opcionalmente, se analizó la simetría visual mediante comparaciones de las mitades izquierda y derecha de la imagen. También se compararon distintas imágenes generadas con el mismo prompt para evaluar coherencia, creatividad y posibles elementos absurdos. Finalmente, se reflexionó sobre el papel humano en la generación de estas imágenes y los límites de usar métricas para evaluar arte y creatividad.

### 📸 Capturas o GIFs
![img_1](https://github.com/user-attachments/assets/819088f8-b960-4bbf-9a5a-a13d95c8aacb)
![img_2](https://github.com/user-attachments/assets/148b6004-a54e-4de5-8ccf-75c30a434a6b)
![img_3](https://github.com/user-attachments/assets/9c979ae6-5eaf-4a32-ac9f-12df1ae679a8)


### 🎯 Codigo Relevante
    import clip
    import torch
    from PIL import Image
    import os
    
    # Cargar modelo CLIP
    model, preprocess = clip.load("ViT-B/32")
    device = "cuda" if torch.cuda.is_available() else "cpu"
    model.to(device)
    
    # Ruta a la carpeta de Descargas (ajustada para tu caso)
    base_path = os.path.expanduser("C:/Users/nicoa/Downloads/")
    
    # Lista de imágenes y sus prompts correspondientes
    data = [
        ("img_1.png", "a surreal dreamscape with floating cities"),
        ("img_2.png", "a futuristic city in the desert"),
        ("img_3.png", "a cat reading a newspaper in a café"),
    ]
    
    # Procesar cada imagen
    for filename, prompt in data:
        img_path = os.path.join(base_path, filename)
    
        if not os.path.exists(img_path):
            print(f"[ERROR] Imagen no encontrada: {img_path}")
            continue
    
        image = preprocess(Image.open(img_path)).unsqueeze(0).to(device)
        text = clip.tokenize([prompt]).to(device)
    
        with torch.no_grad():
            image_features = model.encode_image(image)
            text_features = model.encode_text(text)
            similarity = torch.cosine_similarity(image_features, text_features).item()
    
        print(f"CLIPScore para '{filename}' ({prompt}): {similarity:.4f}")
    
### Comentarios personales sobre el aprendizaje y dificultades encontradas.

Se deberian hacer mas reflexiones en cuanto a la creatividad y el trabajo que uno hace en este uso de herramientas de IA

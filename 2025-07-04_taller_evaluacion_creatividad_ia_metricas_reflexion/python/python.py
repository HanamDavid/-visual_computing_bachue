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


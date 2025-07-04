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

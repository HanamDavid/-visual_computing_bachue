# Taller stable diffusion diffusers

## Python
En este taller se utilizó el modelo preentrenado Stable Diffusion v1.5 mediante la biblioteca diffusers de Hugging Face en Google Colab. Primero se cargó el modelo en GPU para optimizar su rendimiento. Luego, se generaron imágenes a partir de prompts textuales, ajustando parámetros clave como el número de pasos de inferencia (num_inference_steps) y la fidelidad al texto (guidance_scale).

Posteriormente, se exploraron variaciones estilísticas en las imágenes, aplicando distintos estilos como "oil painting", "cyberpunk", "photorealistic", entre otros. Para cada estilo, se generó una variante visual de una misma escena, permitiendo observar cómo el estilo influye en la salida del modelo.

Hasta este punto, se logró una comprensión práctica del proceso de generación de imágenes, la personalización del prompt y cómo pequeños cambios pueden impactar fuertemente el resultado visual.

### 📸 Capturas o GIFs
-Prompt #1
![imagen1](https://github.com/user-attachments/assets/6f19d808-29b2-47af-9e93-6410001a6120)

-Prompt #2
![imagen2](https://github.com/user-attachments/assets/31292f77-d222-48f3-b1f2-723116cbadab)

-Prompt #3
![imagen3](https://github.com/user-attachments/assets/f48415c7-a568-411f-8178-0efaffbb30a6)

### 🎯 Codigo Relevante
    prompt = "A surreal futuristic city in the clouds, digital art"
    image = pipe(prompt, num_inference_steps=50, guidance_scale=7.5).images[0]
    image.save("output.png")
    image


    prompt = "Cyberpunk samurai in a neon-lit Tokyo street, cinematic style"

    image = pipe(
        prompt,
        num_inference_steps=40,    # Menor pasos = más rápido, pero menos calidad
        guidance_scale=8.0         # Más alto = más fiel al prompt, pero menos creatividad
    ).images[0]
    
    image.save("cyberpunk_samurai.png")
    image

    styles = ["oil painting", "cyberpunk", "photorealistic", "low poly", "watercolor"]
    base_prompt = "A lonely astronaut on an alien planet"
    
    images = []
    for style in styles:
        styled_prompt = f"{base_prompt}, {style}"
        img = pipe(styled_prompt, num_inference_steps=30, guidance_scale=7.5).images[0]
        images.append(img)
    
    import matplotlib.pyplot as plt
    
    fig, axs = plt.subplots(1, len(images), figsize=(20, 5))
    for i, img in enumerate(images):
        axs[i].imshow(img)
        axs[i].axis("off")
        axs[i].set_title(styles[i])
    plt.tight_layout()
    plt.show()
    
### Comentarios personales sobre el aprendizaje y dificultades encontradas.

No sabia que estos modelos existian de una manera mas tecnica para poder manipular

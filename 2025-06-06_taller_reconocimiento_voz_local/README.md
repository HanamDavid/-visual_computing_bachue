# Taller - Voz al Código: Comandos por Reconocimiento de Voz Local

## Python

En este taller se desarrolló una aplicación en Python que permite capturar audio desde el micrófono y realizar reconocimiento de voz local utilizando el motor offline CMU Sphinx, sin necesidad de conexión a Internet. Se definió un conjunto de comandos básicos ("red", "blue", "Turn", "begin", "stop") que, al ser reconocidos por el sistema, se traducen en acciones visuales dentro de una interfaz gráfica construida con tkinter. Estas acciones incluyen cambios de color y movimiento de un rectángulo en pantalla, lo que demuestra la integración entre el reconocimiento de voz y la retroalimentación visual en tiempo real.


### 📸 Capturas o GIFs
![2025-06-04 22-32-42](https://github.com/user-attachments/assets/c4206ecb-85eb-4495-ab4c-624b87ab2834)


### 🎯 Codigo Relevante

    def reconocer_comandos(self):
            r = sr.Recognizer()
            with sr.Microphone() as source:
                while True:
                    print("🎙️ Escuchando comando...")
                    r.adjust_for_ambient_noise(source)
                    audio = r.listen(source)
    
                    try:
                        texto = r.recognize_sphinx(audio, language="es-ES").lower()
                        print(f"🔍 Reconocido: {texto}")
                        self.root.after(0, self.ejecutar_accion, texto)
                    except sr.UnknownValueError:
                        print("😕 No se entendió el audio.")
                    except sr.RequestError as e:
                        print(f"❌ Error con Sphinx: {e}")

### Comentarios personales sobre el aprendizaje y dificultades encontradas.

Se encontraron dificultades para el reconocimiento de voz, mejoró con el uso de reconocimiento en ingles

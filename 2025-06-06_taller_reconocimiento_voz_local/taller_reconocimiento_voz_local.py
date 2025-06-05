import tkinter as tk
import speech_recognition as sr
import threading

# Diccionario de comandos y acciones
comandos_validos = {
    "rojo": "cambiar_color_rojo",
    "azul": "cambiar_color_azul",
    "girar": "girar_objeto",
    "iniciar": "iniciar_animacion",
    "detener": "detener_animacion"
}

class InterfazVoz:
    def __init__(self, root):
        self.root = root
        self.root.title("Reconocimiento de voz")

        # Crear un canvas con un rectángulo
        self.canvas = tk.Canvas(root, width=400, height=400, bg="white")
        self.canvas.pack()

        self.rect = self.canvas.create_rectangle(150, 150, 250, 250, fill="gray")

        self.animar = False
        self.angulo = 0

        # Hilo para reconocimiento continuo
        self.hilo_voz = threading.Thread(target=self.reconocer_comandos)
        self.hilo_voz.daemon = True
        self.hilo_voz.start()

        self.animar_rectangulo()

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

    def ejecutar_accion(self, comando):
        accion = comandos_validos.get(comando)
        if accion:
            getattr(self, accion)()

    def cambiar_color_rojo(self):
        self.canvas.itemconfig(self.rect, fill="red")

    def cambiar_color_azul(self):
        self.canvas.itemconfig(self.rect, fill="blue")

    def girar_objeto(self):
        self.angulo += 45

    def iniciar_animacion(self):
        self.animar = True

    def detener_animacion(self):
        self.animar = False

    def animar_rectangulo(self):
        if self.animar:
            self.canvas.move(self.rect, 5, 0)
            x1, y1, x2, y2 = self.canvas.coords(self.rect)
            if x2 > 400:
                self.canvas.move(self.rect, -400, 0)
        self.root.after(50, self.animar_rectangulo)

# Ejecutar la interfaz
if __name__ == "__main__":
    root = tk.Tk()
    app = InterfazVoz(root)
    root.mainloop()


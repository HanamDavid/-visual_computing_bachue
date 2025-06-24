# panel.py
import tkinter as tk
from tkinter import ttk
import matplotlib.pyplot as plt
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg


class MonitoringPanel:
    def __init__(self, master, on_stop=None):
        self.master = master
        self.master.title("Panel de Monitoreo")
        self.master.geometry("500x450")

        self.on_stop = on_stop

        # Estado general
        self.status_label = ttk.Label(master, text="Estado del sistema:", font=("Helvetica", 12))
        self.status_label.pack(pady=10)

        self.status_value = ttk.Label(master, text="Inactivo", font=("Helvetica", 16, "bold"), foreground="gray")
        self.status_value.pack(pady=5)

        # Indicador de persona
        self.person_label = ttk.Label(master, text="Persona: No detectada", font=("Helvetica", 14), foreground="blue")
        self.person_label.pack(pady=10)

        # Botón de cierre
        self.stop_button = ttk.Button(master, text="Detener sistema", command=self.stop_system)
        self.stop_button.pack(pady=5)

        # Gráfico de barras
        self.figure, self.ax = plt.subplots(figsize=(4.5, 3))
        self.canvas = FigureCanvasTkAgg(self.figure, master)
        self.canvas.get_tk_widget().pack(fill=tk.BOTH, expand=True)

    def stop_system(self):
        if self.on_stop:
            self.on_stop()
        self.master.quit()

    def set_status(self, status, color="black"):
        self.status_value.config(text=status, foreground=color)

    def update_person_detection(self, detected):
        if detected:
            self.person_label.config(text="Persona: Detectada", foreground="green")
            self.set_status("¡Alerta: Persona detectada!", color="red")
        else:
            self.person_label.config(text="Persona: No detectada", foreground="blue")
            self.set_status("Vigilando...", color="black")

    def update_data(self, data):
        self.ax.clear()
        labels = list(data.keys())
        values = list(data.values())
        self.ax.bar(labels, values, color='skyblue')
        self.ax.set_title("Conteo de Objetos Detectados")
        self.ax.set_ylabel("Cantidad")
        self.canvas.draw()


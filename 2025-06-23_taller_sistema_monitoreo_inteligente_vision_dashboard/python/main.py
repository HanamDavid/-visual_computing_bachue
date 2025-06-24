# main.py

import threading
import time
import cv2
from datetime import datetime
import pandas as pd
import os
import tkinter as tk

from panel import MonitoringPanel
from deteccion import detectar

# Flags de control
deteccion_activa = True
ruta_logs = "../logs"
ruta_capturas = "../capturas"
os.makedirs(ruta_logs, exist_ok=True)
os.makedirs(ruta_capturas, exist_ok=True)

# CSV para logging
LOG_FILE = os.path.join(ruta_logs, "eventos.csv")
if not os.path.exists(LOG_FILE):
    with open(LOG_FILE, "w") as f:
        f.write("timestamp,evento,clase,confianza\n")

def log_evento(evento, clase, confianza):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOG_FILE, "a") as f:
        f.write(f"{timestamp},{evento},{clase},{confianza:.2f}\n")

def guardar_captura(frame):
    nombre = datetime.now().strftime("%Y%m%d_%H%M%S") + ".jpg"
    ruta = os.path.join(ruta_capturas, nombre)
    cv2.imwrite(ruta, frame)

def loop_deteccion(panel):
    global deteccion_activa

    cap = None
    persona_detectada_anterior = False

    try:
        cap = cv2.VideoCapture(0)
        if not cap.isOpened():
            raise RuntimeError("No se pudo abrir la cámara")

        while deteccion_activa:
            ret, frame = cap.read()
            if not ret:
                continue

            personas, conteos, frame_con_dibujos = detectar(frame)

            # Mostrar la imagen con BBoxes en una ventana
            cv2.imshow("Vista en vivo", frame_con_dibujos)
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

            # Actualizar panel con conteo
            panel.update_data(conteos)

            hay_persona = len(personas) > 0
            panel.update_person_detection(hay_persona)

            if hay_persona and not persona_detectada_anterior:
                for p in personas:
                    log_evento("Persona detectada", p["clase"], p["confianza"])
                guardar_captura(frame)
                log_evento("Captura guardada", "person", personas[0]["confianza"])

            persona_detectada_anterior = hay_persona

            time.sleep(0.05)

    finally:
        if cap:
            cap.release()
        cv2.destroyAllWindows()

def detener():
    global deteccion_activa
    deteccion_activa = False

def main():
    root = tk.Tk()
    panel = MonitoringPanel(root, on_stop=detener)

    hilo = threading.Thread(target=loop_deteccion, args=(panel,))
    hilo.start()

    root.mainloop()
    hilo.join()

if __name__ == "__main__":
    main()


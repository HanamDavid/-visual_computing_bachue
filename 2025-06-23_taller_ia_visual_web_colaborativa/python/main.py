
from deteccion import detectar_y_guardar
from utils import guardar_json, guardar_csv
import os

INPUT_IMAGE = "test.jpg"
OUTPUT_DIR = "../resultados"

if __name__ == "__main__":
    resultados = detectar_y_guardar(INPUT_IMAGE, OUTPUT_DIR)

    # Guardar JSON
    json_path = os.path.join(OUTPUT_DIR, "resultados.json")
    guardar_json(resultados, json_path)

    # Guardar resumen CSV
    csv_path = os.path.join(OUTPUT_DIR, "resumen.csv")
    guardar_csv(resultados, csv_path)

    print("✅ Procesamiento completado.")


# app.py

from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os

from deteccion import detectar_y_guardar
from utils import guardar_json, guardar_csv

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

OUTPUT_DIR = "../resultados"

@app.post("/upload")
async def upload_image(file: UploadFile = File(...)):
    temp_path = "temp_image.jpg"
    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    resultados = detectar_y_guardar(temp_path, OUTPUT_DIR)

    guardar_json(resultados, os.path.join(OUTPUT_DIR, "resultados.json"))
    guardar_csv(resultados, os.path.join(OUTPUT_DIR, "resumen.csv"))

    os.remove(temp_path)

    return JSONResponse({
        "status": "ok",
        "image_url": "/static/deteccion.png",
        "json_data": resultados
    })

from fastapi.staticfiles import StaticFiles

# Montar carpeta de resultados como archivos estáticos
app.mount("/static", StaticFiles(directory="../resultados"), name="static")


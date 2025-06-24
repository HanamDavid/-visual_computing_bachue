# utils.py

import json
import csv
import os

def guardar_json(data, output_path):
    with open(output_path, 'w') as f:
        json.dump(data, f, indent=2)

def guardar_csv(data_json, output_path):
    with open(output_path, 'w', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(["class", "confidence", "x", "y", "w", "h"])
        for obj in data_json["objects"]:
            writer.writerow([
                obj["class"], obj["confidence"],
                obj["x"], obj["y"], obj["w"], obj["h"]
            ])


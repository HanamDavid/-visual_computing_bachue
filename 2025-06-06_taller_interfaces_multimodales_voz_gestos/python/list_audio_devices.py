import pyaudio

print("--- Buscando Dispositivos de Audio... ---")

try:
    p = pyaudio.PyAudio()
    info = p.get_host_api_info_by_index(0)
    num_devices = info.get('deviceCount')

    print(f"Total de dispositivos encontrados: {num_devices}\n")

    found_input_device = False
    for i in range(0, num_devices):
        device_info = p.get_device_info_by_host_api_device_index(0, i)

        # Solo mostramos dispositivos que tienen canales de entrada (micrófonos)
        if device_info.get('maxInputChannels') > 0:
            found_input_device = True
            print(f"  ID: {device_info.get('index')}")
            print(f"  Nombre: {device_info.get('name')}")
            print(f"  Canales de Entrada: {device_info.get('maxInputChannels')}")
            print(f"  Tasa de Muestreo por defecto: {device_info.get('defaultSampleRate')} Hz")
            print("  ---------------------------------")

    if not found_input_device:
        print("¡Atención! No se encontraron dispositivos con canales de entrada (micrófonos).")
        print("Asegúrate de que tu micrófono esté conectado y reconocido por el sistema.")

except Exception as e:
    print(f"Ocurrió un error al listar dispositivos de audio: {e}")
    print("Asegúrate de que PyAudio esté instalado correctamente y de que las librerías de PortAudio estén presentes en tu sistema (ej. `portaudio` en Arch Linux).")

finally:
    if 'p' in locals() and p: # Asegurarse de que p fue inicializado
        p.terminate()
    print("\n--- Fin de la lista de dispositivos ---")

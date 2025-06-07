import speech_recognition as sr
import time

def recognize_speech_from_mic(timeout=5, phrase_time_limit=3):
    # Inicializa el reconocedor
    r = sr.Recognizer()

    # Usa el micrófono como fuente de audio
    with sr.Microphone(device_index=10) as source:
        print("Ajustando el ruido ambiental, por favor espera...")
        r.adjust_for_ambient_noise(source) # Ajusta para el ruido ambiental
            # --- AGREGA ESTA LÍNEA AQUÍ ---
        print(f"Umbral de energía de audio ajustado: {r.energy_threshold}")
        # --- HASTA AQUÍ ---
        print("¡Listo! Di algo...")

        try:
            # Escucha el audio del micrófono
            audio = r.listen(source, timeout=timeout, phrase_time_limit=phrase_time_limit)
        except sr.WaitTimeoutError:
            print("No se detectó voz en el tiempo esperado.")
            return None
        except Exception as e:
            print(f"Error al escuchar el micrófono: {e}")
            return None

    # Intenta reconocer el audio
    try:
        # Usar Google Speech Recognition (requiere conexión a internet)
        # language='es-ES' especifica el idioma español de España
        text = r.recognize_google(audio, language='es-ES')
        print(f"Dijiste: \"{text}\"")
        return text.lower() # Devuelve el texto en minúsculas
    except sr.UnknownValueError:
        print("No se pudo entender el audio. Intenta hablar más claro o con menos ruido.")
        return None
    except sr.RequestError as e:
        print(f"Error al solicitar resultados del servicio de Google Speech Recognition; verifica tu conexión a internet: {e}")
        return None
    except Exception as e:
        print(f"Error inesperado durante el reconocimiento: {e}")
        return None

if __name__ == "__main__":
    print("--- Prueba de Reconocimiento de Voz ---")
    print("Di 'salir' para terminar el programa.")

    while True:
        command = recognize_speech_from_mic()
        if command and "salir" in command:
            print("Saliendo de la prueba de reconocimiento de voz.")
            break
        time.sleep(0.5) # Pequeña pausa para no sobrecargar el bucle

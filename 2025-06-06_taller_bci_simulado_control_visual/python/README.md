## 🧪 Taller - BCI Simulado: Señales Mentales Artificiales para Control Visual

## 📅 Fecha
2025-06-06 

## 🎯 Objetivo del Taller
Simular el comportamiento de interfaces BCI usando datos generados para entender el procesamiento básico de señales EEG, aplicando filtros y condicionales lógicos para traducir actividad cerebral simulada en acciones visuales.

## 🧠 Conceptos Aprendidos
- Procesamiento de señales EEG
- Filtrado digital (pasa banda)
- Análisis espectral (potencia en bandas de frecuencia)
- Umbralización para detección de estados cognitivos
- Visualización interactiva de datos biomédicos
- Integración señal-visualización

## 🔧 Herramientas y Entornos
- Python (numpy, pandas, matplotlib, scipy.signal)
- Jupyter Notebook / Google Colab

## 📁 Estructura del Proyecto
```bash
2025-06-06_taller_bci_simulado_control_visual/
├── python/
├── README.md
```
## 🧪 Implementación

### 🔹 Etapas realizadas
1. Generación de señales EEG sintéticas con componentes Alpha, Beta y ruido
2. Diseño e implementación de filtro pasa banda (8-12 Hz)
3. Cálculo de potencia en banda Alpha y detección de estados de atención
4. Visualización estática de resultados

### 🔹 Código relevante
```python
# Filtrado pasa banda para Alpha (8-12 Hz)
nyquist = 0.5 * fs
low, high = 8/nyquist, 12/nyquist
b, a = signal.butter(4, [low, high], btype='band')
alpha_filtered = signal.filtfilt(b, a, eeg_signal)

# Detección de atención (umbral dinámico)
threshold = np.percentile(alpha_power, 75)
attention_state = alpha_power > threshold
```

## 📊 Resultados Visuales
![Simulación BCI en acción](https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHF5d3l3NnRiMG1xeXJyb2RkY20zN3k3bTd6NGFxMDBvZHJjcTl0cyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Phe392uCfeVZMn3UFN/giphy.gif)
## 🧩 Prompts Usados

 - "Genera código Python para simular señales EEG con componentes Alpha y Beta"

 - "Cómo implementar un filtro pasa banda con scipy para frecuencias 8-12 Hz"

## 💬 Reflexión Final

Este taller me permitió comprender los fundamentos del procesamiento de señales EEG y su aplicación en interfaces cerebro-computadora. La parte más interesante fue diseñar el sistema de umbralización adaptativa para detectar estados de atención, donde aprendí a balancear sensibilidad y especificidad.

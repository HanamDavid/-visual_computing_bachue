🧪 Taller: Implementación del Filtro de Kalman

📅 Fecha 2025-06-06 – Fecha de entrega o realización

🎯 Objetivo del Taller

Este taller tuvo como objetivo principal implementar el Filtro de Kalman para estimar una variable oculta (la posición y velocidad real de un objeto) a partir de mediciones observables y ruidosas. Se buscó introducir conceptos de inferencia estadística y procesamiento secuencial de señales, fundamentales en áreas como la visión por computador y la robótica.

🧠 Conceptos AprendidosSe aplicaron y reforzaron los siguientes conceptos:

[ ] Transformaciones geométricas (aplicadas en el modelo de movimiento 2D)

[ ] Procesamiento de señales secuenciales[x] Inferencia estadística

[x] Filtro de Kalman (predicción y corrección)

[x] Ruido del proceso (Q) y ruido de medición (R)

[x] Análisis de Error Cuadrático Medio (MSE)[ ]

Otro: Modelado de sistemas dinámicos simples (movimiento de velocidad constante)

🔧 Herramientas y Entornos

Las herramientas y entornos usados fueron:

Pythonnumpy: Para operaciones numéricas y matriciales.

matplotlib: Para la visualización de datos y resultados.


🧪 ImplementaciónLa implementación se realizó en un script de Python (kalman.py) que abarca la simulación de datos, la aplicación del filtro de Kalman y la visualización de los resultados.

🔹 Etapas realizadas

Generación de datos sintéticos: Se crearon trayectorias "reales" en 1D y 2D, a las que se les añadió ruido para simular mediciones ruidosas.

Implementación del Filtro de Kalman: Se desarrollaron funciones separadas para el filtro de Kalman 1D (estimación de posición) y 2D (estimación de posición y velocidad).

Aplicación del filtro: El filtro de Kalman se aplicó a las mediciones ruidosas para estimar la variable oculta (posición real).

Visualización: Se generaron gráficos comparando la señal real, la señal observada y la señal estimada por el filtro de Kalman.

Análisis de errores: Se calculó el Error Cuadrático Medio (MSE) para cuantificar la mejora en la precisión de la estimación del filtro.

🔹 Código relevante 

El corazón de la implementación del filtro de Kalman reside en sus pasos de predicción y corrección, ejemplificados en la función 
```
kalman_filter_2d:# --- Paso de Predicción ---
# Predicción de la estimación del estado: x_hat_prior = F @ x_hat
x_hat_prior = F @ x_hat
# Predicción de la covarianza del error: P_prior = F @ P @ F.T + Q_matrix
P_prior = F @ P @ F.T + Q_matrix

# --- Paso de Actualización (Corrección) ---
# Innovación o residuo de medición: y = z - H @ x_hat_prior
y = z - (H @ x_hat_prior)
# Ganancia de Kalman: K = P_prior @ H.T @ np.linalg.inv(S)
K = P_prior @ H.T @ np.linalg.inv(S)

# Actualización de la estimación del estado: x_hat = x_hat_prior + K @ y
x_hat = x_hat_prior + (K @ y)
# Actualización de la covarianza del error: P = (I - K @ H) @ P_prior
P = (np.eye(F.shape[0]) - K @ H) @ P_prior
```
📊 Resultados Visuales
El taller genera gráficos PNG que visualizan el rendimiento del filtro de Kalman.

📌 Nota sobre GIF animado:El taller genera imágenes estáticas (.png) de los resultados del filtro. Se presentan los PNGs de los resultados finales.

Gráfico 1D: Estimación de Posición Image of Gráfico 1D: Estimación de Posición

Gráfico 2D: Estimación de TrayectoriaImage of Gráfico 2D: Estimación de Trayectoria



💬 Reflexión Final

Este taller fue una excelente oportunidad para profundizar en los principios del Filtro de Kalman, un algoritmo fundamental en el procesamiento de señales y la robótica. Lo más interesante fue observar cómo, a pesar de la alta variabilidad en las mediciones ruidosas, el filtro es capaz de inferir una trayectoria mucho más suave y cercana a la verdad gracias a la combinación inteligente de un modelo de proceso y las observaciones.La parte más compleja, aunque gratificante, fue la correcta configuración de las matrices de covarianza de ruido (Q y R) y la matriz de transición de estado (F) para el modelo 2D, ya que un ajuste inadecuado puede llevar a estimaciones subóptimas o divergencia. Mejoraría este aspecto añadiendo un análisis de sensibilidad a los parámetros del ruido para comprender mejor su impacto. Aplicaría este conocimiento en futuros proyectos de robótica móvil para la localización y mapeo concurrente (SLAM) o en sistemas de seguimiento de objetos en tiempo real.

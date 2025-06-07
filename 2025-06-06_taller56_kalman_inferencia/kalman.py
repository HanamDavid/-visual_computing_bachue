import numpy as np
import matplotlib.pyplot as plt

# --- Configuración de Simulación y Filtro ---
# Parámetros para la simulación de datos
NUM_STEPS = 100  # Número de pasos de tiempo

# Parámetros del ruido
PROCESS_NOISE_STD_1D = 0.1  # Desviación estándar del ruido del proceso (Q para 1D)
MEASUREMENT_NOISE_STD_1D = 1.0 # Desviación estándar del ruido de medición (R para 1D)

PROCESS_NOISE_STD_2D = 0.5  # Desviación estándar del ruido del proceso para 2D (Q)
MEASUREMENT_NOISE_STD_2D = 5.0 # Desviación estándar del ruido de medición para 2D (R)

# --- Implementación del Filtro de Kalman 1D ---
def kalman_filter_1d(observed_measurements, initial_x, initial_P, Q, R):
    """
    Implementación del Filtro de Kalman 1D.

    Args:
        observed_measurements (np.array): Serie de mediciones ruidosas.
        initial_x (float): Estimación inicial de la variable oculta.
        initial_P (float): Covarianza del error de la estimación inicial.
        Q (float): Covarianza del ruido del proceso.
        R (float): Covarianza del ruido de medición.

    Returns:
        list: Lista de las estimaciones filtradas de la variable oculta.
    """
    # Inicialización
    x_hat = initial_x  # Estimación a posteriori de la variable
    P = initial_P      # Covarianza del error a posteriori

    estimates = [] # Lista para almacenar las estimaciones

    for z in observed_measurements:
        # --- Paso de Predicción ---
        # Predicción de la estimación del estado (x_hat_prior = F * x_hat + B * u)
        # En 1D con un modelo de movimiento constante sin control externo (u=0, F=1)
        x_hat_prior = x_hat
        # Predicción de la covarianza del error (P_prior = F * P * F_T + Q)
        # En 1D con F=1, F_T=1
        P_prior = P + Q

        # --- Paso de Actualización (Corrección) ---
        # Cálculo de la ganancia de Kalman (K = P_prior * H_T * (H * P_prior * H_T + R)^-1)
        # En 1D con H=1, H_T=1
        K = P_prior / (P_prior + R)

        # Actualización de la estimación del estado (x_hat = x_hat_prior + K * (z - H * x_hat_prior))
        # En 1D con H=1
        x_hat = x_hat_prior + K * (z - x_hat_prior)

        # Actualización de la covarianza del error (P = (I - K * H) * P_prior)
        # En 1D con I=1, H=1
        P = (1 - K) * P_prior

        estimates.append(x_hat)

    return estimates

# --- Implementación del Filtro de Kalman 2D ---
def kalman_filter_2d(observed_measurements, dt, initial_state, initial_covariance, Q_matrix, R_matrix):
    """
    Implementación del Filtro de Kalman 2D para posición (x, y) y velocidad (vx, vy).

    Args:
        observed_measurements (np.array): Matriz de mediciones ruidosas (N_steps, 2).
        dt (float): Intervalo de tiempo entre mediciones.
        initial_state (np.array): Estado inicial (x, y, vx, vy).
        initial_covariance (np.array): Matriz de covarianza inicial del error (4x4).
        Q_matrix (np.array): Matriz de covarianza del ruido del proceso (4x4).
        R_matrix (np.array): Matriz de covarianza del ruido de medición (2x2).

    Returns:
        np.array: Matriz de las estimaciones filtradas (N_steps, 4).
    """
    # Definición de las matrices del modelo
    # Matriz de Transición de Estado (F): Asume movimiento con velocidad constante
    # [1 0 dt 0]
    # [0 1 0 dt]
    # [0 0 1  0]
    # [0 0 0  1]
    F = np.array([
        [1, 0, dt, 0],
        [0, 1, 0, dt],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
    ])

    # Matriz de Control (B): No se usa control externo en este ejemplo, B = 0
    # Matriz de Observación (H): Medimos solo la posición (x, y)
    # [1 0 0 0]
    # [0 1 0 0]
    H = np.array([
        [1, 0, 0, 0],
        [0, 1, 0, 0]
    ])

    # Inicialización
    x_hat = initial_state         # Estimación a posteriori del estado
    P = initial_covariance        # Matriz de covarianza del error a posteriori

    estimates = np.zeros((NUM_STEPS, 4)) # Almacena las estimaciones del estado completo

    for i, z in enumerate(observed_measurements):
        # --- Paso de Predicción ---
        # Predicción de la estimación del estado: x_hat_prior = F @ x_hat
        x_hat_prior = F @ x_hat
        # Predicción de la covarianza del error: P_prior = F @ P @ F.T + Q
        P_prior = F @ P @ F.T + Q_matrix

        # --- Paso de Actualización (Corrección) ---
        # Innovación o residuo de medición: y = z - H @ x_hat_prior
        y = z - (H @ x_hat_prior)
        # Covarianza de la innovación: S = H @ P_prior @ H.T + R
        S = H @ P_prior @ H.T + R_matrix
        # Ganancia de Kalman: K = P_prior @ H.T @ np.linalg.inv(S)
        K = P_prior @ H.T @ np.linalg.inv(S)

        # Actualización de la estimación del estado: x_hat = x_hat_prior + K @ y
        x_hat = x_hat_prior + (K @ y)
        # Actualización de la covarianza del error: P = (I - K @ H) @ P_prior
        P = (np.eye(F.shape[0]) - K @ H) @ P_prior

        estimates[i, :] = x_hat

    return estimates

# --- Simulación de Datos y Ejecución del Filtro 1D ---
print("--- Ejecutando Filtro de Kalman 1D ---")
# Generar datos simulados 1D
# Posición real (cumsum de ruido aleatorio para simular un movimiento errático)
real_1d = np.cumsum(np.random.normal(0, 0.5, size=NUM_STEPS))
# Ruido de medición
noise_1d = np.random.normal(0, MEASUREMENT_NOISE_STD_1D, size=NUM_STEPS)
# Medición ruidosa
observed_1d = real_1d + noise_1d

# Parámetros iniciales del filtro 1D
initial_x_1d = observed_1d[0] # Se puede inicializar con la primera medición
initial_P_1d = 1.0           # Gran incertidumbre inicial
Q_1d = PROCESS_NOISE_STD_1D**2 # Covarianza del ruido del proceso (cuadrado de la desv. estándar)
R_1d = MEASUREMENT_NOISE_STD_1D**2 # Covarianza del ruido de medición

# Aplicar el filtro de Kalman 1D
estimate_1d = kalman_filter_1d(observed_1d, initial_x_1d, initial_P_1d, Q_1d, R_1d)

# --- Visualización 1D ---
# Crea una nueva figura para el gráfico 1D
plt.figure(figsize=(12, 6))
plt.plot(real_1d, label='Posición Real (1D)', color='blue')
plt.plot(observed_1d, label='Medición Ruidosa (1D)', color='red', alpha=0.7)
plt.plot(estimate_1d, label='Estimación Kalman (1D)', color='green', linewidth=2)
plt.title('Filtro de Kalman 1D: Estimación de Posición')
plt.xlabel('Paso de Tiempo')
plt.ylabel('Posición')
plt.legend()
plt.grid(True)
plt.tight_layout()
plt.savefig('grafico_resultado_1d.png')
# Cierra la figura para que no bloquee el script si se llama plt.show() múltiples veces
plt.close()


# --- Simulación de Datos y Ejecución del Filtro 2D ---
print("\n--- Ejecutando Filtro de Kalman 2D ---")
dt = 1.0 # Intervalo de tiempo

# Generar datos simulados 2D (movimiento con velocidad constante + ruido)
real_states_2d = np.zeros((NUM_STEPS, 4)) # [x, y, vx, vy]
observed_positions_2d = np.zeros((NUM_STEPS, 2)) # [x_obs, y_obs]

# Estado inicial real (x, y, vx, vy)
real_states_2d[0] = np.array([0.0, 0.0, 1.0, 0.5]) # Posición inicial y velocidad inicial

# Matriz de Transición de Estado (F_true) para simular el movimiento real
F_true = np.array([
    [1, 0, dt, 0],
    [0, 1, 0, dt],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
])

for i in range(1, NUM_STEPS):
    # Simular el movimiento real (con un poco de ruido de proceso para hacerlo más realista)
    process_noise_2d = np.random.normal(0, PROCESS_NOISE_STD_2D, size=4)
    real_states_2d[i] = F_true @ real_states_2d[i-1] + process_noise_2d

    # Generar mediciones ruidosas de posición (x, y)
    measurement_noise_2d = np.random.normal(0, MEASUREMENT_NOISE_STD_2D, size=2)
    observed_positions_2d[i] = real_states_2d[i, :2] + measurement_noise_2d

# Parámetros iniciales del filtro 2D
initial_state_2d = np.array([observed_positions_2d[0, 0], observed_positions_2d[0, 1], 0.0, 0.0]) # Inicializar vx, vy a 0
initial_covariance_2d = np.eye(4) * 1000 # Gran incertidumbre inicial para todos los estados

# Matriz de covarianza del ruido del proceso (Q)
# Representa la incertidumbre en el modelo de movimiento
Q_2d = np.eye(4) * PROCESS_NOISE_STD_2D**2 # Mayor ruido en las velocidades
# Ajustar Q para que el ruido de posición y velocidad sean coherentes
# Aquí, un modelo más físico de Q para la velocidad constante sería:
Q_2d[0,0] = Q_2d[1,1] = (dt**3)/3 * PROCESS_NOISE_STD_2D**2
Q_2d[0,2] = Q_2d[1,3] = (dt**2)/2 * PROCESS_NOISE_STD_2D**2
Q_2d[2,0] = Q_2d[3,1] = (dt**2)/2 * PROCESS_NOISE_STD_2D**2
Q_2d[2,2] = Q_2d[3,3] = dt * PROCESS_NOISE_STD_2D**2

# Matriz de covarianza del ruido de medición (R)
R_2d = np.array([
    [MEASUREMENT_NOISE_STD_2D**2, 0],
    [0, MEASUREMENT_NOISE_STD_2D**2]
])

# Aplicar el filtro de Kalman 2D
estimate_states_2d = kalman_filter_2d(observed_positions_2d, dt, initial_state_2d, initial_covariance_2d, Q_2d, R_2d)

# Extraer posiciones estimadas para visualización
estimate_positions_2d = estimate_states_2d[:, :2]

# --- Visualización 2D ---
# Crea una nueva figura para el gráfico 2D
plt.figure(figsize=(12, 8))
plt.plot(real_states_2d[:, 0], real_states_2d[:, 1], label='Posición Real (2D)', color='blue', linestyle='--')
plt.scatter(observed_positions_2d[:, 0], observed_positions_2d[:, 1], label='Mediciones Ruidosas (2D)', color='red', alpha=0.5, s=10)
plt.plot(estimate_positions_2d[:, 0], estimate_positions_2d[:, 1], label='Estimación Kalman (2D)', color='green', linewidth=2)
plt.title('Filtro de Kalman 2D: Estimación de Trayectoria')
plt.xlabel('Posición X')
plt.ylabel('Posición Y')
plt.legend()
plt.grid(True)
plt.tight_layout()
plt.savefig('grafico_resultado_2d.png')
# Cierra la figura para que no bloquee el script si se llama plt.show() múltiples veces
plt.close()


# --- Análisis de Errores ---
print("\n--- Análisis de Errores (Error Cuadrático Medio) ---")

# Error para 1D
mse_observed_1d = np.mean((real_1d - observed_1d)**2)
mse_kalman_1d = np.mean((real_1d - estimate_1d)**2)
print(f"MSE de Medición (1D): {mse_observed_1d:.2f}")
print(f"MSE de Estimación Kalman (1D): {mse_kalman_1d:.2f}")

# Error para 2D (distancia euclidiana)
# Error de la medición con respecto a la verdad
error_observed_2d = np.linalg.norm(real_states_2d[:, :2] - observed_positions_2d, axis=1)
mse_observed_2d = np.mean(error_observed_2d**2)

# Error de la estimación de Kalman con respecto a la verdad
error_kalman_2d = np.linalg.norm(real_states_2d[:, :2] - estimate_positions_2d, axis=1)
mse_kalman_2d = np.mean(error_kalman_2d**2)
print(f"MSE de Medición (2D): {mse_observed_2d:.2f}")
print(f"MSE de Estimación Kalman (2D): {mse_kalman_2d:.2f}")

print("\n--- Comentarios ---")
print("Como se puede observar en los gráficos y en los valores de MSE, el filtro de Kalman reduce")
print("significativamente el ruido de las mediciones, proporcionando una estimación más cercana a la")
print("variable real u oculta.")
print("Para el filtro 2D, se estima no solo la posición sino también la velocidad, aunque solo se")
print("grafica la posición. La estimación de la velocidad es crucial para la precisión de la posición.")

# Finalmente, muestra todos los gráficos que se han creado.
# Esto abrirá las ventanas de los gráficos 1D y 2D a la vez.
plt.show()


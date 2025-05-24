import numpy as np
import matplotlib.pyplot as plt


def proyectar_perspectiva(puntos_3d_homogeneos, d=1.0):
    """
    Calcula la proyección en perspectiva de puntos 3D.
    d: distancia focal (distancia del centro de proyección al plano de imagen).
    """
    P_perspectiva = np.array([
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 1/d, 0]
    ])

    proy_hom = P_perspectiva @ puntos_3d_homogeneos
    proy_hom /= proy_hom[-1, :]

    return proy_hom[:2, :]


# --- Generación de Puntos 3D (el mismo cubo) ---
cubo_vertices = np.array([
    [-1, -1, -1], [ 1, -1, -1], [ 1,  1, -1], [-1,  1, -1],
    [-1, -1,  1], [ 1, -1,  1], [ 1,  1,  1], [-1,  1,  1]
]).T
cubo_homogeneo = np.vstack((cubo_vertices, np.ones((1, cubo_vertices.shape[1]))))


# --- Variación de la Distancia Focal ---
distancias_focales = [0.5, 1.0, 2.0, 5.0] # Diferentes distancias focales para observar el efecto

fig_d = plt.figure(figsize=(16, 4))

for i, d_val in enumerate(distancias_focales):
    puntos_perspectiva_d = proyectar_perspectiva(cubo_homogeneo, d=d_val)

    ax_d = fig_d.add_subplot(1, len(distancias_focales), i + 1)
    ax_d.scatter(puntos_perspectiva_d[0, :], puntos_perspectiva_d[1, :], s=100, color='purple')
    ax_d.set_title(f'Perspectiva d={d_val}')
    ax_d.set_xlabel('X Proyectado')
    ax_d.set_ylabel('Y Proyectado')
    ax_d.set_xlim([-10, 10]) # Ajusta los límites para ver la variación
    ax_d.set_ylim([-10, 10]) # Ajusta los límites para ver la variación
    ax_d.grid(True)
    ax_d.set_aspect('equal', adjustable='box')

plt.tight_layout()
plt.suptitle('Efecto de la Distancia Focal (d) en la Proyección en Perspectiva', y=1.02, fontsize=16)
plt.show()

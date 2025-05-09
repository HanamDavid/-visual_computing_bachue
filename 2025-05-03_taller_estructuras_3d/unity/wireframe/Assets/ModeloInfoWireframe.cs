using UnityEngine;

public class ModeloInfoWireframe : MonoBehaviour
{
    void Start()
    {
        MeshFilter meshFilter = GetComponent<MeshFilter>();

        if (meshFilter != null && meshFilter.mesh != null)
        {
            Mesh mesh = meshFilter.mesh;

            int vertexCount = mesh.vertexCount;
            int triangleCount = mesh.triangles.Length / 3;
            int submeshCount = mesh.subMeshCount;

            Debug.Log($"Número de vértices: {vertexCount}");
            Debug.Log($"Número de triángulos: {triangleCount}");
            Debug.Log($"Número de sub-mallas: {submeshCount}");
        }
        else
        {
            Debug.LogError("No se encontró un MeshFilter o una malla en este objeto.");
        }
    }

    // Para activar/desactivar el modo wireframe mediante Gizmos en el Editor
    private bool wireframeEnabled = true;

    private void OnDrawGizmos()
    {
        if (wireframeEnabled)
        {
            MeshFilter meshFilter = GetComponent<MeshFilter>();
            if (meshFilter != null && meshFilter.mesh != null)
            {
                Gizmos.color = Color.yellow;
                Gizmos.DrawWireMesh(meshFilter.mesh, transform.position, transform.rotation, transform.localScale);
            }
        }
    }

    // Función para activar/desactivar el wireframe desde un script externo (o UI)
    public void ToggleWireframe(bool enable)
    {
        wireframeEnabled = enable;
        UnityEditor.SceneView.RepaintAll();
    }
}
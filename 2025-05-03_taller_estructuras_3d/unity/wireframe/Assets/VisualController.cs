using UnityEngine;
using UnityEngine.UI;

public class VisualizacionController : MonoBehaviour
{
    public ModeloInfoWireframe modeloInfoScript; 
    public Button solid;
    public Button wireframe;

    void Start()
    {
  
        if (modeloInfoScript == null)
        {
            Debug.LogError("El script ModeloInfo no está asignado al VisualizacionController.");
            enabled = false; 
            return;
        }


        if (solid != null)
        {
            solid.onClick.AddListener(() => SetSolidView());
        }
        else
        {
            Debug.LogError("El botón 'Sólido' no está asignado.");
        }

        if (wireframe != null)
        {
            wireframe.onClick.AddListener(() => SetWireframeView());
        }
        else
        {
            Debug.LogError("El botón 'Wireframe' no está asignado.");
        }

    }

    public void SetSolidView()
    {
        if (modeloInfoScript != null)
        {
            modeloInfoScript.ToggleWireframe(false);
        }
    }

    public void SetWireframeView()
    {
        if (modeloInfoScript != null)
        {
            modeloInfoScript.ToggleWireframe(true);
        }
    }
}
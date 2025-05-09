using UnityEngine;
using UnityEngine.UI;
using TMPro; // Necesario para TextMeshPro

public class ControlPadre : MonoBehaviour
{
    public Slider sliderPosX;
    public Slider sliderPosY;
    public Slider sliderPosZ;

    public Slider sliderRotX;
    public Slider sliderRotY;
    public Slider sliderRotZ;

    public Slider sliderScaleX;
    public Slider sliderScaleY;
    public Slider sliderScaleZ;

    public TMP_Text textoValores;

    public float velocidadAnimacion = 1f;
    private bool animando = false;
    private float tiempoAnimacion = 0f;
    private Vector3 posicionInicial;
    private Quaternion rotacionInicial;
    private Vector3 escalaInicial;

    public Button botonAnimar;
    public Button botonPausa;
    private bool animacionPausada = false;

    void Start()
    {
        if (sliderPosX == null || sliderPosY == null || sliderPosZ == null ||
            sliderRotX == null || sliderRotY == null || sliderRotZ == null ||
            sliderScaleX == null || sliderScaleY == null || sliderScaleZ == null ||
            textoValores == null || botonAnimar == null || botonPausa == null)
        {
            Debug.LogError("Algunos elementos de la UI no están asignados al script ControlPadre.");
            enabled = false; // Deshabilitar el script para evitar errores
            return;
        }

        // Inicializar los sliders con los valores iniciales del padre
        sliderPosX.value = transform.position.x;
        sliderPosY.value = transform.position.y;
        sliderPosZ.value = transform.position.z;

        sliderRotX.value = transform.eulerAngles.x;
        sliderRotY.value = transform.eulerAngles.y;
        sliderRotZ.value = transform.eulerAngles.z;

        sliderScaleX.value = transform.localScale.x;
        sliderScaleY.value = transform.localScale.y;
        sliderScaleZ.value = transform.localScale.z;

        // Añadir listeners a los sliders para actualizar la transformación del padre
        sliderPosX.onValueChanged.AddListener(value => UpdatePosition(new Vector3(value, transform.position.y, transform.position.z)));
        sliderPosY.onValueChanged.AddListener(value => UpdatePosition(new Vector3(transform.position.x, value, transform.position.z)));
        sliderPosZ.onValueChanged.AddListener(value => UpdatePosition(new Vector3(transform.position.x, transform.position.y, value)));

        sliderRotX.onValueChanged.AddListener(value => UpdateRotation(new Vector3(value, transform.eulerAngles.y, transform.eulerAngles.z)));
        sliderRotY.onValueChanged.AddListener(value => UpdateRotation(new Vector3(transform.eulerAngles.x, value, transform.eulerAngles.z)));
        sliderRotZ.onValueChanged.AddListener(value => UpdateRotation(new Vector3(transform.eulerAngles.x, transform.eulerAngles.y, value)));

        sliderScaleX.onValueChanged.AddListener(value => UpdateScale(new Vector3(value, transform.localScale.y, transform.localScale.z)));
        sliderScaleY.onValueChanged.AddListener(value => UpdateScale(new Vector3(transform.localScale.x, value, transform.localScale.z)));
        sliderScaleZ.onValueChanged.AddListener(value => UpdateScale(new Vector3(transform.localScale.x, transform.localScale.y, value)));

        // Inicializar para la animación
        posicionInicial = transform.position;
        rotacionInicial = transform.rotation;
        escalaInicial = transform.localScale;

        // Configurar listeners para los botones de animación
        botonAnimar.onClick.AddListener(ToggleAnimacion);
        botonPausa.onClick.AddListener(TogglePausaAnimacion);

        // Inicialmente el botón de pausa debería estar deshabilitado
        botonPausa.interactable = false;
    }

    void Update()
    {
        // Mostrar los valores actuales en la interfaz o consola
        if (textoValores != null)
        {
            textoValores.text = "Pos: " + transform.position.ToString("F2") + "\n" +
                             "Rot: " + transform.eulerAngles.ToString("F2") + "\n" +
                             "Esc: " + transform.localScale.ToString("F2");
        }
        else
        {
            Debug.Log("Pos: " + transform.position.ToString("F2") +
                      " Rot: " + transform.eulerAngles.ToString("F2") +
                      " Esc: " + transform.localScale.ToString("F2"));
        }

        // Controlar la animación
        if (animando && !animacionPausada)
        {
            tiempoAnimacion += Time.deltaTime * velocidadAnimacion;
            float t = Mathf.Sin(tiempoAnimacion) * 0.5f + 0.5f; // Valor entre 0 y 1 para un movimiento de ida y vuelta

            // Puedes animar posición, rotación y escala por separado o combinados
            transform.position = Vector3.Lerp(posicionInicial + new Vector3(2f, 1f, 0f), posicionInicial + new Vector3(-2f, -1f, 0f), t);
            transform.rotation = Quaternion.Slerp(rotacionInicial, Quaternion.Euler(45f, 90f, 0f), t);
            transform.localScale = Vector3.Lerp(escalaInicial, escalaInicial * 1.5f, t);
        }
    }

    void UpdatePosition(Vector3 newPosition)
    {
        transform.position = newPosition;
    }

    void UpdateRotation(Vector3 newRotation)
    {
        transform.eulerAngles = newRotation;
    }

    void UpdateScale(Vector3 newScale)
    {
        transform.localScale = newScale;
    }

    void ToggleAnimacion()
    {
        animando = !animando;
        animacionPausada = false; // Si se inicia la animación, se despausa
        tiempoAnimacion = 0f; // Reiniciar el tiempo de animación al iniciar
        botonPausa.interactable = animando; // Habilitar el botón de pausa si la animación está activa
        if (animando)
        {
            // Guardar el estado actual como inicial para la animación
            posicionInicial = transform.position;
            rotacionInicial = transform.rotation;
            escalaInicial = transform.localScale;
        }
    }

    void TogglePausaAnimacion()
    {
        animacionPausada = !animacionPausada;
    }
}
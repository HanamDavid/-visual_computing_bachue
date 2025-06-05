using UnityEngine;
using UnityEngine.UI;

public class BrazoRobotico : MonoBehaviour
{
    public Transform baseObj;
    public Transform brazo1;
    public Transform brazo2;
    public Transform pinza;

    public Slider baseSlider;
    public Slider brazo1Slider;
    public Slider brazo2Slider;

    private Vector3 ultimoPunto;

    void Start()
    {
        // Inicializa la primera posición del extremo
        if (pinza != null)
            ultimoPunto = pinza.position;
    }

    void Update()
    {
        // Lee ángulos desde sliders o genera animación con seno
        float baseAngle = baseSlider ? baseSlider.value : Mathf.Sin(Time.time) * 45f;
        float brazo1Angle = brazo1Slider ? brazo1Slider.value : Mathf.Sin(Time.time + 1) * 30f;
        float brazo2Angle = brazo2Slider ? brazo2Slider.value : Mathf.Sin(Time.time + 2) * 30f;

        // Aplica rotaciones locales
        if (baseObj) baseObj.localRotation = Quaternion.Euler(0, baseAngle, 0);
        if (brazo1) brazo1.localRotation = Quaternion.Euler(brazo1Angle, 0, 0);
        if (brazo2) brazo2.localRotation = Quaternion.Euler(brazo2Angle, 0, 0);

        // Dibuja línea desde último punto hasta nueva posición de la pinza
        if (pinza != null)
        {
            Vector3 nuevoPunto = pinza.position;
            Debug.DrawLine(ultimoPunto, nuevoPunto, Color.red, 1.0f); // se borra luego de 1s
            ultimoPunto = nuevoPunto;
        }
    }
}



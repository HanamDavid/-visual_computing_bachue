 using UnityEngine;
using UnityEngine.UI;
using TMPro;
using System.Collections.Generic;

public class RobotArmSimulator : MonoBehaviour
{
    // Variables simuladas
    public float temperatura;
    public float voltaje;
    public float nivelEnergia;
    public Vector3 movimiento;
    public float frecuencia = 1f;

    private float tiempo;

    // Sliders
    public Slider sliderMovimientoX, sliderMovimientoY, sliderMovimientoZ;
    public Slider sliderTemperatura, sliderVoltaje, sliderEnergia;

    // Historial
    private Queue<float> historialTemperatura = new Queue<float>();
    private Queue<float> historialVoltaje = new Queue<float>();
    private Queue<float> historialEnergia = new Queue<float>();

    public int maxHistorial = 10; // valores máximos a guardar
    public TextMeshProUGUI textoHistorial;

    void Start()
    {
        nivelEnergia = 100f;

        if (sliderEnergia != null)
            sliderEnergia.minValue = 0f; sliderEnergia.maxValue = 100f;

        if (sliderVoltaje != null)
            sliderVoltaje.minValue = 12f; sliderVoltaje.maxValue = 14f;

        if (sliderTemperatura != null)
            sliderTemperatura.minValue = 40f; sliderTemperatura.maxValue = 60f;

        if (sliderMovimientoX != null)
            sliderMovimientoX.minValue = -1f; sliderMovimientoX.maxValue = 1f;

        if (sliderMovimientoY != null)
            sliderMovimientoY.minValue = -1f; sliderMovimientoY.maxValue = 1f;

        if (sliderMovimientoZ != null)
            sliderMovimientoZ.minValue = -1f; sliderMovimientoZ.maxValue = 1f;
    }

    void Update()
    {
        tiempo += Time.deltaTime * frecuencia;

        // Simulación
        temperatura = 50f + Mathf.Sin(tiempo) * 10f + Random.Range(-1f, 1f);
        voltaje = 13f + Mathf.Sin(tiempo * 0.5f) * 1f;
        nivelEnergia -= Time.deltaTime * 1f;
        nivelEnergia = Mathf.Clamp(nivelEnergia, 0f, 100f);

        movimiento = new Vector3(
            Mathf.Sin(tiempo),
            Mathf.Sin(tiempo * 0.5f),
            Mathf.Sin(tiempo * 0.25f)
        );

        // Actualizar sliders
        if (sliderMovimientoX != null) sliderMovimientoX.value = movimiento.x;
        if (sliderMovimientoY != null) sliderMovimientoY.value = movimiento.y;
        if (sliderMovimientoZ != null) sliderMovimientoZ.value = movimiento.z;
        if (sliderTemperatura != null) sliderTemperatura.value = temperatura;
        if (sliderVoltaje != null) sliderVoltaje.value = voltaje;
        if (sliderEnergia != null) sliderEnergia.value = nivelEnergia;

        // Guardar en historial
        AgregarHistorial(historialTemperatura, temperatura);
        AgregarHistorial(historialVoltaje, voltaje);
        AgregarHistorial(historialEnergia, nivelEnergia);

        // Mostrar historial en texto
        if (textoHistorial != null)
        {
            textoHistorial.text =
                $"Historial Temperatura:\n{FormatearHistorial(historialTemperatura)}\n\n" +
                $"Historial Voltaje:\n{FormatearHistorial(historialVoltaje)}\n\n" +
                $"Historial Energía:\n{FormatearHistorial(historialEnergia)}";
        }
    }

    void AgregarHistorial(Queue<float> historial, float nuevoValor)
    {
        if (historial.Count >= maxHistorial)
            historial.Dequeue();
        historial.Enqueue(nuevoValor);
    }

    string FormatearHistorial(Queue<float> historial)
    {
        string texto = "";
        foreach (var valor in historial)
            texto += $"{valor:F1}\n";
        return texto;
    }
}

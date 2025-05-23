using UnityEngine;
using UnityEngine.UI;

public class CameraController : MonoBehaviour
{
    public Camera mainCamera;
    public Button toggleModeButton;
    public Slider sizeSlider;
    public Text modeLabel;

    private void Start()
    {
        toggleModeButton.onClick.AddListener(ToggleCameraMode);
        sizeSlider.onValueChanged.AddListener(UpdateSizeSlider);

        sizeSlider.minValue = 1f;
        sizeSlider.maxValue = 20f;

        UpdateUI();
    }

    void ToggleCameraMode()
    {
        mainCamera.orthographic = !mainCamera.orthographic;
        UpdateUI();
    }

    void UpdateSizeSlider(float value)
    {
        if (mainCamera.orthographic)
            mainCamera.orthographicSize = value;
        else
            mainCamera.fieldOfView = value;
    }

    void UpdateUI()
    {
        if (mainCamera.orthographic)
        {
            sizeSlider.minValue = 1f;
            sizeSlider.maxValue = 20f;
            sizeSlider.value = mainCamera.orthographicSize;
        }
        else
        {
            sizeSlider.minValue = 30f;
            sizeSlider.maxValue = 100f;
            sizeSlider.value = mainCamera.fieldOfView;
        }

        if (modeLabel != null)
            modeLabel.text = mainCamera.orthographic ? "Modo: Ortográfico" : "Modo: Perspectiva";
    }
}


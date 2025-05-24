using UnityEngine;

public class CameraController : MonoBehaviour
{
    public float speed = 5.0f;
    public float mouseSensitivity = 2.0f;

    float pitch = 0.0f;
    float yaw = 0.0f;

    float fixedHeight;

    void Start()
    {
        // Guardamos la altura inicial para mantenerla fija
        fixedHeight = transform.position.y;

        // Opcional: bloquear cursor
        // Cursor.lockState = CursorLockMode.Locked;
        // Cursor.visible = false;
    }

    void Update()
    {
        // Lectura del mouse para rotar la cámara
        float mouseX = Input.GetAxis("Mouse X") * mouseSensitivity;
        float mouseY = Input.GetAxis("Mouse Y") * mouseSensitivity;

        yaw += mouseX;
        pitch -= mouseY;
        pitch = Mathf.Clamp(pitch, -90f, 90f);

        transform.eulerAngles = new Vector3(pitch, yaw, 0);

        // Movimiento con teclado
        float horizontal = Input.GetAxis("Horizontal"); // A, D
        float vertical = Input.GetAxis("Vertical");     // W, S

        // Vector de movimiento local (adelante, derecha)
        Vector3 forward = transform.forward;
        Vector3 right = transform.right;

        // Proyectamos forward y right en plano horizontal (Y=0)
        forward.y = 0;
        right.y = 0;
        forward.Normalize();
        right.Normalize();

        // Movimiento final solo en XZ
        Vector3 moveDirection = forward * vertical + right * horizontal;

        // Aplicamos movimiento manteniendo altura constante
        Vector3 newPosition = transform.position + moveDirection * speed * Time.deltaTime;
        newPosition.y = fixedHeight;  // Mantenemos la altura fija

        transform.position = newPosition;

        // Acción click mouse izquierdo
        if (Input.GetMouseButtonDown(0))
        {
            Debug.Log("Click detectado: Acción realizada");
        }
    }
}

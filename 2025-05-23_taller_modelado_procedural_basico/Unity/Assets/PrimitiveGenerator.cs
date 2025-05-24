using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class AnimatedPrimitives : MonoBehaviour
{
    [Header("Cube Grid")]
    public int gridRows = 3;
    public int gridCols = 3;
    public float gridSpacing = 2f;
    public float cubeDelay = 0.1f;

    [Header("Cylinder Spiral")]
    public int spiralCount = 20;
    public float spiralRadius = 0.5f;
    public float spiralHeightIncrement = 0.5f;
    public float spiralAngleIncrement = 30f;
    public float cylinderDelay = 0.1f;

    private List<Transform> animatedCylinders = new List<Transform>();

    void Start()
    {
        StartCoroutine(GenerateCubeGrid());
        StartCoroutine(GenerateCylinderSpiral());
    }

    IEnumerator GenerateCubeGrid()
    {
        for (int row = 0; row < gridRows; row++)
        {
            for (int col = 0; col < gridCols; col++)
            {
                GameObject cube = GameObject.CreatePrimitive(PrimitiveType.Cube);
                cube.name = $"Cube_{row}_{col}";

                // Posición inicial fuera de la rejilla
                cube.transform.position = Vector3.zero;

                // Destino
                Vector3 targetPos = new Vector3(col * gridSpacing, 0, row * gridSpacing);
                StartCoroutine(AnimateTransform(cube.transform, targetPos, Quaternion.Euler(0, (row + col) * 15f, 0), new Vector3(1, 1, 1), 1f));

                yield return new WaitForSeconds(cubeDelay);
            }
        }
    }

    IEnumerator GenerateCylinderSpiral()
    {
        for (int i = 0; i < spiralCount; i++)
        {
            GameObject cylinder = GameObject.CreatePrimitive(PrimitiveType.Cylinder);
            cylinder.name = $"Cylinder_{i}";

            // Posición inicial
            cylinder.transform.position = Vector3.zero;

            // Cálculo destino
            float angle = i * spiralAngleIncrement * Mathf.Deg2Rad;
            float x = Mathf.Cos(angle) * spiralRadius * i;
            float z = Mathf.Sin(angle) * spiralRadius * i;
            float y = i * spiralHeightIncrement;

            Vector3 targetPos = new Vector3(x, y, z);
            Quaternion targetRot = Quaternion.Euler(i * 10f, i * 15f, 0);
            Vector3 targetScale = new Vector3(1, 1 + 0.1f * i, 1);

            StartCoroutine(AnimateTransform(cylinder.transform, targetPos, targetRot, targetScale, 1f));
            animatedCylinders.Add(cylinder.transform);

            yield return new WaitForSeconds(cylinderDelay);
        }
    }

    IEnumerator AnimateTransform(Transform t, Vector3 targetPos, Quaternion targetRot, Vector3 targetScale, float duration)
    {
        Vector3 startPos = t.position;
        Quaternion startRot = t.rotation;
        Vector3 startScale = t.localScale;

        float elapsed = 0f;

        while (elapsed < duration)
        {
            float tFactor = elapsed / duration;
            t.position = Vector3.Lerp(startPos, targetPos, tFactor);
            t.rotation = Quaternion.Slerp(startRot, targetRot, tFactor);
            t.localScale = Vector3.Lerp(startScale, targetScale, tFactor);

            elapsed += Time.deltaTime;
            yield return null;
        }

        t.position = targetPos;
        t.rotation = targetRot;
        t.localScale = targetScale;
    }
}

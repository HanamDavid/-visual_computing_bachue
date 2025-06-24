import { useEffect, useMemo, useState } from "react";
import { useLoader, useThree } from "@react-three/fiber";
import { TextureLoader } from "three";
import { Html } from "@react-three/drei";

export default function DetectionScene() {
  const [detections, setDetections] = useState([]);
  const [texture, setTexture] = useState(null);

  // Cargar JSON de detecciones (si existe)
  useEffect(() => {
    fetch("http://localhost:8080/static/resultados.json")
      .then((res) => res.json())
      .then((data) => setDetections(data.objects || []))
      .catch((err) => {
        console.warn("No se pudo cargar resultados.json aún (quizás no ha sido generado):", err);
      });
  }, []);

  // Cargar imagen de detección solo si existe
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      const loader = new TextureLoader();
      loader.load("http://localhost:8080/static/deteccion.png", setTexture, undefined, console.error);
    };
    img.onerror = () => {
      console.warn("deteccion.png aún no existe, esperando carga del usuario.");
    };
    img.src = "http://localhost:8080/static/deteccion.png";
  }, []);

  // Si la textura aún no existe, no renderizar nada
  if (!texture) return null;

  const imgWidth = texture.image?.width || 640;
  const imgHeight = texture.image?.height || 480;
  const centerX = imgWidth / 2;
  const centerY = -imgHeight / 2;

  return (
    <>
      {/* Imagen de fondo */}
      <mesh position={[centerX, centerY, -10]}>
        <planeGeometry args={[imgWidth, imgHeight]} />
        <meshBasicMaterial map={texture} />
      </mesh>

      {/* Cajas 3D por cada detección */}
      {detections.map((d, i) => {
        const x = d.x + d.w / 2;
        const y = -(d.y + d.h / 2);

        return (
          <group key={i} position={[x, y, 0]}>
            <mesh>
              <boxGeometry args={[d.w, d.h, 1]} />
              <meshBasicMaterial color="lime" wireframe />
            </mesh>
            <Html center>
              <div
                style={{
                  background: "rgba(0, 0, 0, 0.6)",
                  color: "white",
                  fontSize: "12px",
                  padding: "2px 4px",
                  borderRadius: "4px",
                  whiteSpace: "nowrap",
                }}
              >
                {d.class} ({(d.confidence * 100).toFixed(1)}%)
              </div>
            </Html>
          </group>
        );
      })}
    </>
  );
}


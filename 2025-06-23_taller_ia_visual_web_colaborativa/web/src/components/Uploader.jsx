import { useRef, useState } from "react";

export default function Uploader({ onUploadComplete }) {
  const fileRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    const file = fileRef.current?.files?.[0];
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8080/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error al subir la imagen");
      }

      if (onUploadComplete) onUploadComplete();
    } catch (err) {
      console.error(err);
      alert("Hubo un error subiendo la imagen.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input type="file" ref={fileRef} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Subiendo..." : "Subir Imagen"}
      </button>
    </div>
  );
}


import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { ref, set, get } from "firebase/database";
import { db } from "../firebase/firebaseConfig";

export function ObjetoPersistente() {
  const meshRef = useRef();
  const [posInicial, setPosInicial] = useState([0, 1, 0]);

  // 🔹 Al cargar el componente, lee la posición de Firebase
  useEffect(() => {
    const posRef = ref(db, "users/user1/position");
    get(posRef).then((snapshot) => {
      if (snapshot.exists()) {
        const { x, y, z } = snapshot.val();
        setPosInicial([x, y, z]);
      }
    });
  }, []);

  // 🔹 Cada 3 segundos, guarda la posición actual
  useEffect(() => {
    const interval = setInterval(() => {
      const { x, y, z } = meshRef.current.position;
      set(ref(db, "users/user1/position"), { x, y, z });
      console.log("📌 Posición guardada en Firebase");
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // 🔹 Movimiento simple (horizontal)
  useFrame((state) => {
    meshRef.current.position.x = Math.sin(state.clock.elapsedTime) * 2;
  });

  return (
    <mesh ref={meshRef} position={posInicial}>
      <boxGeometry />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

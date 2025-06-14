import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line, Html } from '@react-three/drei';
import * as THREE from 'three';

// --- Constantes de configuración ---
const SEGMENT_LENGTH = 1.0;
const NUM_SEGMENTS = 4;
const MAX_ITERATIONS = 50;
const THRESHOLD = 0.01;
const TOTAL_ARM_LENGTH = NUM_SEGMENTS * SEGMENT_LENGTH;

// --- Vectores pre-alocados para optimización ---
const _vector1 = new THREE.Vector3();
const _vector2 = new THREE.Vector3();
const _rotationAxis = new THREE.Vector3();
const _endEffectorPosition = new THREE.Vector3();
const _jointPosition = new THREE.Vector3();
const _jointToEndEffector = new THREE.Vector3();
const _jointToTarget = new THREE.Vector3();

/**
 * Componente RobotArm: Implementa cinemática inversa (IK) con el algoritmo Cyclic Coordinate Descent (CCD).
 */
export function RobotArm({ targetPosition }) {
  // Array de refs para cada segmento, creado una sola vez.
  const segmentRefs = useMemo(() => Array.from({ length: NUM_SEGMENTS }, () => React.createRef()), []);

  // **LA CLAVE DE LA SOLUCIÓN (1/3): Estado para saber si el brazo está listo.**
  // Empieza en `false`. Evita que cualquier lógica se ejecute prematuramente.
  const [isReady, setIsReady] = useState(false);

  // Ref para datos de depuración para no causar re-renders innecesarios.
  const debugInfo = useRef({ distance: 0, iterations: 0, isReachable: true });

  // Estado para los puntos de la línea.
  const [linePoints, setLinePoints] = useState([]);

  // Efecto que se ejecuta para determinar cuándo los refs están asignados.
  useEffect(() => {
    // Si todos los refs tienen un `.current`, significa que el brazo está montado.
    if (segmentRefs.every(ref => ref.current)) {
        // **LA CLAVE DE LA SOLUCIÓN (2/3): Se marca como listo.**
        // Esto causará un re-render y ahora sí se ejecutarán la lógica y el dibujado.
        setIsReady(true);
    }
  }, [segmentRefs]); // Se re-evalúa si la lista de refs cambia (solo una vez).


  const getEndEffectorPosition = useCallback(() => {
    const lastSegment = segmentRefs[NUM_SEGMENTS - 1]?.current;
    if (!lastSegment) return new THREE.Vector3();

    return _endEffectorPosition.set(0, SEGMENT_LENGTH, 0).applyMatrix4(lastSegment.matrixWorld);
  }, [segmentRefs]);


  const solveCCD = useCallback((target) => {
    let iterations = 0;
    let endEffectorPosition = getEndEffectorPosition();
    let distance = endEffectorPosition.distanceTo(target);

    while (distance > THRESHOLD && iterations < MAX_ITERATIONS) {
      for (let i = NUM_SEGMENTS - 1; i >= 0; i--) {
        const currentSegment = segmentRefs[i].current;

        currentSegment.getWorldPosition(_jointPosition);
        endEffectorPosition = getEndEffectorPosition();

        _jointToEndEffector.subVectors(endEffectorPosition, _jointPosition).normalize();
        _jointToTarget.subVectors(target, _jointPosition).normalize();

        const angle = Math.acos(_jointToEndEffector.dot(_jointToTarget));
        _rotationAxis.crossVectors(_jointToEndEffector, _jointToTarget).normalize();

        if (angle > 1e-4) {
          const quaternion = new THREE.Quaternion().setFromAxisAngle(_rotationAxis, angle);
          currentSegment.quaternion.multiplyQuaternions(quaternion, currentSegment.quaternion);
        }

        distance = getEndEffectorPosition().distanceTo(target);
        if (distance <= THRESHOLD) break;
      }
      iterations++;
    }

    debugInfo.current = {
      distance,
      iterations,
      isReachable: debugInfo.current.isReachable,
    };
  }, [segmentRefs, getEndEffectorPosition]);


  useFrame(() => {
    // Si no está listo o no hay objetivo, no se hace absolutamente nada.
    if (!isReady || !targetPosition) return;

    const distanceToTarget = targetPosition.length();
    if (distanceToTarget > TOTAL_ARM_LENGTH) {
      debugInfo.current.isReachable = false;
      // Opcional: Estirar el brazo completamente hacia el objetivo.
      segmentRefs.forEach(ref => {
        if(ref.current) ref.current.lookAt(targetPosition);
      });
    } else {
      debugInfo.current.isReachable = true;
      solveCCD(targetPosition);
    }

    const points = [];
    segmentRefs[0].current.getWorldPosition(_vector1);
    points.push(_vector1.clone());

    for (let i = 0; i < NUM_SEGMENTS; i++) {
      const segment = segmentRefs[i].current;
      _vector2.set(0, SEGMENT_LENGTH, 0).applyMatrix4(segment.matrixWorld);
      points.push(_vector2.clone());
    }
    points.push(targetPosition);
    setLinePoints(points);
  });

  return (
    <>
      <group position-y={-TOTAL_ARM_LENGTH / 2}>
        {Array.from({ length: NUM_SEGMENTS }).map((_, i) => (
          <group
            key={i}
            ref={segmentRefs[i]}
            position={i > 0 ? [0, SEGMENT_LENGTH, 0] : [0, 0, 0]}
          >
            <mesh position-y={SEGMENT_LENGTH / 2}>
              <boxGeometry args={[0.2, SEGMENT_LENGTH, 0.2]} />
              <meshStandardMaterial color="#FF69B4" />
            </mesh>
            {i < NUM_SEGMENTS - 1 && (
              <mesh position-y={SEGMENT_LENGTH}>
                <sphereGeometry args={[0.15, 16, 16]} />
                <meshStandardMaterial color="#8A2BE2" />
              </mesh>
            )}
          </group>
        ))}
      </group>

      {/* **LA CLAVE DE LA SOLUCIÓN (3/3): Renderizado Condicional.**
          Esta línea y la información de abajo SOLO se renderizan si `isReady` es `true`.
          Para cuando esto ocurre, `linePoints` ya tiene un array con puntos válidos.
          Esto elimina el error `RangeError`. */}
            {isReady &&
  linePoints.length >= 2 &&
  linePoints.every((p) => p instanceof THREE.Vector3) && (
    <>
      <Line points={linePoints} color="white" lineWidth={2.5} />

      <Html
        position={[0, 2, 0]}
        center
        style={{
          color: 'white',
          background: '#00000080',
          padding: '10px',
          borderRadius: '5px',
          width: '250px',
          fontFamily: 'monospace',
        }}
      >
        <div>Distancia: {debugInfo.current.distance.toFixed(3)}</div>
        <div>Iteraciones/Frame: {debugInfo.current.iterations}</div>
        {!debugInfo.current.isReachable && (
          <div style={{ color: '#FFA500', marginTop: '5px' }}>
            ⚠️ Objetivo fuera de alcance
          </div>
        )}
      </Html>
    </>
)}

    </>
  );
}

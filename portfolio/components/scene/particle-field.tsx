"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const COUNT = 420;
const RADIUS = 7;
const LINK_DISTANCE = 1.1;

export default function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const { mouse } = useThree();

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const velocities = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const r = RADIUS * Math.cbrt(Math.random());
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      velocities[i * 3] = (Math.random() - 0.5) * 0.003;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.003;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.003;
    }
    return { positions, velocities };
  }, []);

  const linePositions = useMemo(
    () => new Float32Array(COUNT * COUNT * 3 * 0 + 6000),
    []
  );

  useFrame((state) => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes
      .position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    for (let i = 0; i < COUNT; i++) {
      arr[i * 3] += velocities[i * 3];
      arr[i * 3 + 1] += velocities[i * 3 + 1];
      arr[i * 3 + 2] += velocities[i * 3 + 2];

      const dist = Math.sqrt(
        arr[i * 3] ** 2 + arr[i * 3 + 1] ** 2 + arr[i * 3 + 2] ** 2
      );
      if (dist > RADIUS) {
        velocities[i * 3] *= -1;
        velocities[i * 3 + 1] *= -1;
        velocities[i * 3 + 2] *= -1;
      }
    }
    posAttr.needsUpdate = true;

    if (pointsRef.current) {
      const targetY = mouse.x * 0.25;
      const targetX = -mouse.y * 0.2;
      pointsRef.current.rotation.y +=
        (targetY - pointsRef.current.rotation.y) * 0.02 +
        0.0006;
      pointsRef.current.rotation.x +=
        (targetX - pointsRef.current.rotation.x) * 0.02;

      if (linesRef.current) {
        linesRef.current.rotation.copy(pointsRef.current.rotation);
      }
    }

    // rebuild connection lines every frame within a distance threshold (capped for perf)
    if (linesRef.current) {
      const lineGeo = linesRef.current.geometry;
      const linePos: number[] = [];
      let connections = 0;
      const MAX_CONNECTIONS = 900;
      for (let i = 0; i < COUNT && connections < MAX_CONNECTIONS; i += 2) {
        for (let j = i + 1; j < Math.min(i + 12, COUNT); j++) {
          const dx = arr[i * 3] - arr[j * 3];
          const dy = arr[i * 3 + 1] - arr[j * 3 + 1];
          const dz = arr[i * 3 + 2] - arr[j * 3 + 2];
          const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (d < LINK_DISTANCE) {
            linePos.push(
              arr[i * 3], arr[i * 3 + 1], arr[i * 3 + 2],
              arr[j * 3], arr[j * 3 + 1], arr[j * 3 + 2]
            );
            connections++;
          }
        }
      }
      lineGeo.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(linePos, 3)
      );
    }
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={COUNT}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          color="#5EEAD4"
          transparent
          opacity={0.85}
          sizeAttenuation
        />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#A78BFA" transparent opacity={0.18} />
      </lineSegments>
    </group>
  );
}

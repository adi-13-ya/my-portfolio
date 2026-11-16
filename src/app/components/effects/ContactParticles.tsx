// NEW: ContactParticles — added 2026-03-23. Existing files untouched except for import lines.
'use client';

import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import useReducedMotion from '../../hooks/useReducedMotion';
import useAccentColor from '../../hooks/useAccentColor';

function DriftingParticles({ color }: { color: string }) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 800;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 16;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      // Very slow drift — meditative
      pos[i * 3] += Math.sin(time * 0.1 + i * 0.1) * 0.001;
      pos[i * 3 + 1] += Math.cos(time * 0.08 + i * 0.05) * 0.001;
      pos[i * 3 + 2] += Math.sin(time * 0.05 + i * 0.02) * 0.0005;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={0.03}
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

function ContactParticlesScene() {
  const accent = useAccentColor();
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
      }}
      gl={{ alpha: true }}
    >
      <DriftingParticles color={accent} />
    </Canvas>
  );
}

export default function ContactParticles() {
  const prefersReduced = useReducedMotion();
  if (prefersReduced) return null;
  return <ContactParticlesScene />;
}

// NEW: HeroParticleField — added 2026-03-23. Existing files untouched except for import lines.
'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import useReducedMotion from '../../hooks/useReducedMotion';
import useAccentColor from '../../hooks/useAccentColor';

function Particles({ accent }: { accent: string }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  const count = 1500;

  const { positions, velocities, dummy } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const dummy = new THREE.Object3D();

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      velocities[i * 3] = (Math.random() - 0.5) * 0.002;
      velocities[i * 3 + 1] = Math.random() * 0.005 + 0.003; // Drift upward
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.001;

    }
    return { positions, velocities, dummy };
  }, []);

  // Track mouse in NDC
  useMemo(() => {
    if (typeof window !== 'undefined') {
      const handler = (e: MouseEvent) => {
        mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
      };
      window.addEventListener('mousemove', handler);
    }
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;

    const mx = mouseRef.current.x * viewport.width * 0.5;
    const my = mouseRef.current.y * viewport.height * 0.5;

    for (let i = 0; i < count; i++) {
      // Update positions
      positions[i * 3] += velocities[i * 3];
      positions[i * 3 + 1] += velocities[i * 3 + 1];
      positions[i * 3 + 2] += velocities[i * 3 + 2];

      // Wrap around bounds
      if (positions[i * 3 + 1] > 10) positions[i * 3 + 1] = -10;
      if (positions[i * 3] > 10) positions[i * 3] = -10;
      if (positions[i * 3] < -10) positions[i * 3] = 10;

      // Mouse repulsion (120px ≈ 1.5 world units)
      const dx = positions[i * 3] - mx;
      const dy = positions[i * 3 + 1] - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 1.5 && dist > 0.01) {
        const force = (1.5 - dist) * 0.005;
        positions[i * 3] += (dx / dist) * force;
        positions[i * 3 + 1] += (dy / dist) * force;
      }

      dummy.position.set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
      dummy.scale.setScalar(0.02 + Math.random() * 0.005);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial vertexColors={false} color={accent} transparent opacity={0.7} />
    </instancedMesh>
  );
}

function ParticleScene() {
  const accent = useAccentColor();
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}
      gl={{ alpha: true, antialias: false }}
    >
      <Particles key={accent} accent={accent} />
    </Canvas>
  );
}

export default function HeroParticleField() {
  const prefersReduced = useReducedMotion();
  if (prefersReduced) return null;
  return <ParticleScene />;
}

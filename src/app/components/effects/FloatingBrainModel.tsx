// NEW: FloatingBrainModel — added 2026-03-23. Existing files untouched except for import lines.
'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function BrainMesh() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={1}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshBasicMaterial color="#C0392B" wireframe />
      </mesh>
    </Float>
  );
}

export default function FloatingBrainModel() {
  return (
    <div style={{ width: 300, height: 300, pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 50 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <BrainMesh />
      </Canvas>
    </div>
  );
}

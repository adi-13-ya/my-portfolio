// NEW: SkillGlobe — added 2026-03-23. Existing files untouched except for import lines.
'use client';

import { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import useReducedMotion from '../../hooks/useReducedMotion';
import useAccentColor from '../../hooks/useAccentColor';

function SkillLabels({ skills }: { skills: string[] }) {
  // Fibonacci sphere distribution
  const positions = useMemo(() => {
    const radius = 2;
    const n = skills.length;
    const points: [number, number, number][] = [];
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < n; i++) {
      const y = 1 - (i / (n - 1)) * 2; // -1 to 1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = goldenAngle * i;
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;
      points.push([x * radius, y * radius, z * radius]);
    }
    return points;
  }, [skills]);

  return (
    <>
      {skills.map((skill, i) => (
        <Html
          key={skill}
          position={positions[i]}
          style={{
            fontSize: '11px',
            color: '#f0f0f0',
            background: 'rgba(13,13,13,0.7)',
            padding: '2px 6px',
            borderRadius: '3px',
            pointerEvents: 'auto',
            whiteSpace: 'nowrap',
            userSelect: 'none',
          }}
          distanceFactor={5}
        >
          {skill}
        </Html>
      ))}
    </>
  );
}

export default function SkillGlobe({ skills }: { skills: string[] }) {
  const prefersReduced = useReducedMotion();
  const accent = useAccentColor('#8B0000');
  if (prefersReduced) return null;

  return (
    <div style={{ width: 400, height: 400, margin: '0 auto' }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true }}
      >
        <mesh>
          <sphereGeometry args={[2, 16, 16]} />
          <meshBasicMaterial color={accent} wireframe />
        </mesh>
        <SkillLabels skills={skills} />
        <OrbitControls
          autoRotate
          autoRotateSpeed={0.6}
          enableZoom={false}
          enablePan={false}
        />
      </Canvas>
    </div>
  );
}

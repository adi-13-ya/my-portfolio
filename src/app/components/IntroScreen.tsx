'use client';

import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  width: string;
  height: string;
  background: string;
  left: string;
  top: string;
  animation: string;
  animationDelay: string;
}

export default function IntroScreen() {
  const [hidden, setHidden] = useState(false);
  const [removed, setRemoved] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate particles only on client to avoid hydration mismatch
    const generated = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      width: `${Math.random() * 4 + 1}px`,
      height: `${Math.random() * 4 + 1}px`,
      background: `rgba(229, 9, 20, ${Math.random() * 0.8 + 0.2})`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animation: `particleFloat ${Math.random() * 5 + 5}s linear infinite`,
      animationDelay: `${Math.random() * 3}s`,
    }));
    setParticles(generated);

    // Auto-hide after intro animation
    const timer = setTimeout(() => {
      setHidden(true);
    }, 4500);

    const removeTimer = setTimeout(() => {
      setRemoved(true);
    }, 5500);

    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (removed) return null;

  return (
    <div className={`intro-screen ${hidden ? 'hidden' : ''}`}>
      {/* Scanline effect overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.01) 2px, rgba(255,255,255,0.01) 4px)',
        pointerEvents: 'none',
        zIndex: 1
      }} />

      {/* Floating particles during intro — generated client-side only */}
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            width: p.width,
            height: p.height,
            background: p.background,
            borderRadius: '50%',
            left: p.left,
            top: p.top,
            animation: p.animation,
            animationDelay: p.animationDelay,
          }}
        />
      ))}

      <div className="intro-title" style={{ position: 'relative', zIndex: 2 }}>
        Aditya Gujar
      </div>
      <div className="intro-subtitle" style={{ position: 'relative', zIndex: 2 }}>
        Portfolio from the Upside Down
      </div>
    </div>
  );
}

// NEW: ScrollHint — added 2026-03-23. Existing files untouched except for import lines.
'use client';

import { useEffect, useState } from 'react';

export default function ScrollHint() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY < 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.5s ease',
      }}
    >
      <span
        style={{
          fontFamily: 'monospace',
          fontSize: '0.7rem',
          color: 'var(--st-red)',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
        }}
      >
        scroll to enter the lab
      </span>
      <span
        style={{
          display: 'inline-block',
          animation: 'scrollBounce 2s ease-in-out infinite',
          color: 'var(--st-red)',
          fontSize: '1.2rem',
        }}
      >
        ↓
      </span>
      <style>{`
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
      `}</style>
    </div>
  );
}

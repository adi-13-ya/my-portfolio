// NEW: DemogorgonButton — added 2026-03-23. Existing files untouched except for import lines.
'use client';

import { useState } from 'react';

interface DemogorgonButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  success?: boolean;
}

export default function DemogorgonButton({
  onClick,
  children,
  disabled,
  type = 'button',
  className = '',
  success = false,
}: DemogorgonButtonProps) {
  const [hovered, setHovered] = useState(false);

  const petalAngles = [0, 72, 144, 216, 288];

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={className}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ position: 'relative', overflow: 'visible' }}
      >
        {children}

        {/* Petal burst on hover */}
        {hovered &&
          petalAngles.map((angle) => (
            <span
              key={angle}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: 6,
                height: 20,
                backgroundColor: '#8B0000',
                opacity: 0.6,
                borderRadius: '50%',
                transformOrigin: 'center center',
                transform: `rotate(${angle}deg) translateY(-20px)`,
                animation: 'petalBurst 400ms ease-out forwards',
                pointerEvents: 'none',
              }}
            />
          ))}
      </button>

      {/* Success message */}
      {success && (
        <div
          style={{
            marginTop: '0.75rem',
            fontFamily: 'monospace',
            fontSize: '0.75rem',
            color: '#C0392B',
            opacity: 0,
            animation: 'successFadeIn 300ms ease forwards',
            textAlign: 'center',
          }}
        >
          message received // gate opening...
        </div>
      )}

      <style>{`
        @keyframes petalBurst {
          0% { opacity: 0.6; transform: rotate(var(--angle, 0deg)) translateY(-10px) scale(0.5); }
          100% { opacity: 0; transform: rotate(var(--angle, 0deg)) translateY(-30px) scale(1); }
        }
        @keyframes successFadeIn {
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

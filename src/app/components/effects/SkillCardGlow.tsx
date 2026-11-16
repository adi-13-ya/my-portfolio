// NEW: SkillCardGlow — added 2026-03-23. Existing files untouched except for import lines.
'use client';

import { useRef, useState, useCallback } from 'react';

export default function SkillCardGlow({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [dimensions, setDimensions] = useState({ w: 0, h: 0 });

  const handleMouseEnter = useCallback(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setDimensions({ w: rect.width, h: rect.height });
    }
    setHovered(true);
  }, []);

  const perimeter = (dimensions.w + dimensions.h) * 2;

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setHovered(false)}
      style={{ position: 'relative', display: 'inline-block' }}
    >
      {children}
      {/* SVG border overlay */}
      {hovered && dimensions.w > 0 && (
        <svg
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            overflow: 'visible',
          }}
        >
          <rect
            x="0"
            y="0"
            width={dimensions.w}
            height={dimensions.h}
            fill="none"
            stroke="var(--st-red)"
            strokeWidth="1.5"
            strokeDasharray={perimeter}
            strokeDashoffset={perimeter}
            style={{
              animation: 'skillBorderDraw 600ms ease forwards',
            }}
          />
        </svg>
      )}
      <style>{`
        @keyframes skillBorderDraw {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
}

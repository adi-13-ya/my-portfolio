// NEW: MindFlayerCursor — added 2026-03-23. Existing files untouched except for import lines.
'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ClickBurst {
  id: number;
  x: number;
  y: number;
}

export default function MindFlayerCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const outerPos = useRef({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [bursts, setBursts] = useState<ClickBurst[]>([]);
  const animRef = useRef<number>(0);
  const burstIdRef = useRef(0);

  const updateCursor = useCallback(() => {
    // Inner dot follows exactly
    if (innerRef.current) {
      innerRef.current.style.transform = `translate(${mousePos.current.x - 3}px, ${mousePos.current.y - 3}px)`;
    }

    // Outer ring follows with lerp
    outerPos.current.x += (mousePos.current.x - outerPos.current.x) * 0.12;
    outerPos.current.y += (mousePos.current.y - outerPos.current.y) * 0.12;

    if (outerRef.current) {
      outerRef.current.style.transform = `translate(${outerPos.current.x - 14}px, ${outerPos.current.y - 14}px)`;
    }

    animRef.current = requestAnimationFrame(updateCursor);
  }, []);

  useEffect(() => {
    // Check if touch device
    if (typeof window !== 'undefined' && 'ontouchstart' in window) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"]')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleClick = (e: MouseEvent) => {
      const id = ++burstIdRef.current;
      setBursts((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => {
        setBursts((prev) => prev.filter((b) => b.id !== id));
      }, 300);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('click', handleClick);
    animRef.current = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animRef.current);
    };
  }, [updateCursor]);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null;

  return (
    <>
      {/* Hide default cursor */}
      <style>{`
        * { cursor: none !important; }
      `}</style>

      {/* Outer ring */}
      <motion.div
        ref={outerRef}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 28,
          height: 28,
          borderRadius: '50%',
          border: `1.5px solid var(--st-red)`,
          backgroundColor: isHovering ? 'rgba(var(--accent-rgb),0.15)' : 'transparent',
          pointerEvents: 'none',
          zIndex: 99999,
          transition: 'width 0.2s, height 0.2s, background-color 0.2s',
          ...(isHovering
            ? { width: 56, height: 56, marginLeft: -14, marginTop: -14 }
            : {}),
        }}
      />

      {/* Inner dot */}
      <div
        ref={innerRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: 'var(--st-red)',
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: isHovering ? 0 : 1,
          transition: 'opacity 0.2s',
        }}
      />

      {/* Click burst effects */}
      <AnimatePresence>
        {bursts.map((burst) => (
          <div
            key={burst.id}
            style={{
              position: 'fixed',
              top: burst.y,
              left: burst.x,
              pointerEvents: 'none',
              zIndex: 99999,
            }}
          >
            {[0, 90, 180, 270].map((angle) => (
              <div
                key={angle}
                style={{
                  position: 'absolute',
                  width: 2,
                  height: 12,
                  backgroundColor: 'var(--st-red)',
                  transformOrigin: 'center center',
                  transform: `rotate(${angle}deg)`,
                  animation: `cursorBurst 300ms ease-out forwards`,
                }}
              />
            ))}
          </div>
        ))}
      </AnimatePresence>

      <style>{`
        @keyframes cursorBurst {
          0% { opacity: 1; transform: rotate(var(--rotation, 0deg)) scaleY(1) translateY(0); }
          100% { opacity: 0; transform: rotate(var(--rotation, 0deg)) scaleY(0.5) translateY(-16px); }
        }
      `}</style>
    </>
  );
}

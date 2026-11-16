// NEW: TimelineWire — added 2026-03-23. Existing files untouched except for import lines.
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useReducedMotion from '../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export default function TimelineWire() {
  const wireRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced || !wireRef.current) return;

    const st = ScrollTrigger.create({
      trigger: wireRef.current.parentElement,
      start: 'top 60%',
      end: 'bottom 40%',
      scrub: 1,
      animation: gsap.fromTo(
        wireRef.current,
        { scaleY: 0 },
        { scaleY: 1, ease: 'none' }
      ),
    });

    return () => {
      st.kill();
    };
  }, [prefersReduced]);

  if (prefersReduced) return null;

  return (
    <div
      ref={wireRef}
      style={{
        position: 'absolute',
        left: '30px',
        top: 0,
        width: 2,
        height: '100%',
        background: 'var(--st-red)',
        boxShadow: '0 0 8px var(--st-red), 0 0 2px var(--st-red)',
        transformOrigin: 'top center',
        zIndex: 0,
      }}
    />
  );
}

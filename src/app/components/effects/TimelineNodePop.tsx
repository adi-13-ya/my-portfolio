// NEW: TimelineNodePop — added 2026-03-23. Existing files untouched except for import lines.
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TimelineNodePopProps {
  children: React.ReactNode;
  index: number;
}

export default function TimelineNodePop({ children, index }: TimelineNodePopProps) {
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!nodeRef.current) return;

    const anim = gsap.fromTo(
      nodeRef.current,
      { opacity: 0, scale: 0.85, y: 20 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        delay: index * 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: nodeRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, [index]);

  return (
    <div ref={nodeRef} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}

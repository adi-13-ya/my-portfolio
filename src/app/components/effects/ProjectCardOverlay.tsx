// NEW: ProjectCardOverlay — added 2026-03-23. Existing files untouched except for import lines.
'use client';

import { useState } from 'react';

interface ProjectCardOverlayProps {
  imageSrc: string;
  altText: string;
}

export default function ProjectCardOverlay({ imageSrc, altText }: ProjectCardOverlayProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{ position: 'relative', overflow: 'hidden' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageSrc}
        alt={altText}
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          filter: hovered
            ? 'none'
            : 'sepia(1) saturate(2) hue-rotate(300deg) brightness(0.4)',
          transition: 'filter 400ms ease',
        }}
      />
      {/* Classified badge */}
      <span
        style={{
          position: 'absolute',
          top: 8,
          right: 8,
          fontFamily: 'monospace',
          fontSize: '10px',
          color: '#C0392B',
          background: '#0d0d0d',
          border: '1px solid #8B0000',
          padding: '2px 6px',
          zIndex: 2,
        }}
      >
        {'// classified'}
      </span>
    </div>
  );
}

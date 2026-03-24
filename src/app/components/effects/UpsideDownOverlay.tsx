// NEW: UpsideDownOverlay — added 2026-03-23. Existing files untouched except for import lines.
'use client';

export default function UpsideDownOverlay() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        background: 'radial-gradient(ellipse at center, rgba(80,0,0,0.45) 0%, #0d0d0d 100%)',
      }}
    />
  );
}

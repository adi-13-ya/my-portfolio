// NEW: DemogorgonWatermark — added 2026-03-23. Existing files untouched except for import lines.
'use client';

export default function DemogorgonWatermark() {
  // SVG placeholder: radial burst of 5 elongated petals
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 16,
        right: 16,
        width: 80,
        opacity: 0.08,
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        {[0, 72, 144, 216, 288].map((angle) => (
          <ellipse
            key={angle}
            cx="50"
            cy="20"
            rx="6"
            ry="28"
            fill="#8B0000"
            transform={`rotate(${angle} 50 50)`}
          />
        ))}
        <circle cx="50" cy="50" r="8" fill="#8B0000" />
      </svg>
    </div>
  );
}

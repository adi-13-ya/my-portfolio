// NEW: CursorWrapper — added 2026-03-24. Client wrapper for MindFlayerCursor in server layout.
'use client';

import dynamic from 'next/dynamic';

const MindFlayerCursor = dynamic(
  () => import('./MindFlayerCursor'),
  { ssr: false }
);

export default function CursorWrapper() {
  return <MindFlayerCursor />;
}

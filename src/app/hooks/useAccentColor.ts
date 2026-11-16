'use client';

import { useEffect, useState } from 'react';

/** Reads the current theme accent (--st-red) from computed styles and
 *  updates whenever the theme changes (via the `themechange` event). */
export default function useAccentColor(fallback = '#C0392B') {
  const [color, setColor] = useState(fallback);

  useEffect(() => {
    const read = () => {
      const v = getComputedStyle(document.documentElement)
        .getPropertyValue('--st-red')
        .trim();
      if (v) setColor(v);
    };
    read();
    window.addEventListener('themechange', read);
    return () => window.removeEventListener('themechange', read);
  }, []);

  return color;
}

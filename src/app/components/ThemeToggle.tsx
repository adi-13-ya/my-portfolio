'use client';

import { useTheme } from './ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      title={
        theme === 'stranger'
          ? 'Unlock the Keyhouse (Locke & Key theme)'
          : 'Return to the Upside Down (Stranger Things theme)'
      }
      aria-label="Toggle theme between Stranger Things and Locke and Key"
    >
      <span className="theme-toggle-icon">{theme === 'stranger' ? '🗝️' : '⚡'}</span>
      <span>{theme === 'stranger' ? 'Locke & Key' : 'Stranger Things'}</span>
    </button>
  );
}

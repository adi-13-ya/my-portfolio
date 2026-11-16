'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

export type ThemeName = 'stranger' | 'lockekey';

interface ThemeContextValue {
  theme: ThemeName;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'stranger',
  toggleTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

function applyTheme(theme: ThemeName) {
  if (theme === 'lockekey') {
    document.documentElement.dataset.theme = 'lockekey';
  } else {
    delete document.documentElement.dataset.theme;
  }
  window.dispatchEvent(new Event('themechange'));
}

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeName>('stranger');

  // Restore persisted theme on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('portfolio-theme');
      if (saved === 'lockekey') {
        setTheme('lockekey');
        applyTheme('lockekey');
      }
    } catch {
      /* storage unavailable */
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next: ThemeName = prev === 'stranger' ? 'lockekey' : 'stranger';
      applyTheme(next);
      try {
        localStorage.setItem('portfolio-theme', next);
      } catch {
        /* storage unavailable */
      }
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

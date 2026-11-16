'use client';

import { useState, useEffect } from 'react';
import { useTheme } from './ThemeContext';
import { getThemeMusic } from '../lib/themeMusic';

export default function SoundToggle() {
  const [playing, setPlaying] = useState(false);
  const { theme } = useTheme();

  // Sync with the music engine (started by the intro screen)
  useEffect(() => {
    const checkInterval = setInterval(() => {
      setPlaying(getThemeMusic().playing);
    }, 500);
    return () => clearInterval(checkInterval);
  }, []);

  const toggleSound = () => {
    const music = getThemeMusic();
    if (playing) {
      music.stop();
      setPlaying(false);
    } else {
      music.start(theme);
      setPlaying(true);
    }
  };

  return (
    <button
      className="sound-toggle"
      onClick={toggleSound}
      title={playing ? 'Mute the theme music' : 'Play the theme music'}
      aria-label={playing ? 'Mute sound' : 'Play sound'}
    >
      {playing ? '🔊' : '🔇'}
    </button>
  );
}

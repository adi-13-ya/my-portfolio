'use client';

import { useState, useRef, useEffect } from 'react';

export default function SoundToggle() {
    const [playing, setPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        audioRef.current = new Audio('/audio/stranger-things-theme.mp3');
        audioRef.current.loop = true;
        audioRef.current.volume = 0.3;

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    const toggleSound = () => {
        if (!audioRef.current) return;

        if (playing) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(() => {
                // Browser blocked autoplay
            });
        }
        setPlaying(!playing);
    };

    return (
        <button
            className="sound-toggle"
            onClick={toggleSound}
            title={playing ? 'Mute the Upside Down' : 'Enter the Upside Down'}
            aria-label={playing ? 'Mute sound' : 'Play sound'}
        >
            {playing ? '🔊' : '🔇'}
        </button>
    );
}

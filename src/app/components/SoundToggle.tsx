'use client';

import { useState, useEffect } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getWindow = (): any => typeof window !== 'undefined' ? window : {};

export default function SoundToggle() {
    const [playing, setPlaying] = useState(false);

    // Sync with the global audio state from IntroScreen
    useEffect(() => {
        const checkInterval = setInterval(() => {
            const w = getWindow();
            if (w.__stSynthPlaying !== undefined) {
                setPlaying(!!w.__stSynthPlaying);
            }
        }, 500);
        return () => clearInterval(checkInterval);
    }, []);

    const toggleSound = () => {
        const w = getWindow();

        if (playing) {
            // Stop audio
            if (typeof w.__stSynthStop === 'function') {
                w.__stSynthStop();
            }
            setPlaying(false);
        } else {
            // Restart audio
            if (typeof w.__stSynthStart === 'function') {
                w.__stSynthStart();
            }
            setPlaying(true);
        }
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

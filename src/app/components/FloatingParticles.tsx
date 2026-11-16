'use client';

import { useEffect, useState } from 'react';

export default function FloatingParticles() {
    const [particles, setParticles] = useState<Array<{
        id: number;
        left: string;
        size: string;
        duration: string;
        delay: string;
        opacity: number;
    }>>([]);

    useEffect(() => {
        const newParticles = Array.from({ length: 30 }).map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            size: `${Math.random() * 4 + 1}px`,
            duration: `${Math.random() * 15 + 10}s`,
            delay: `${Math.random() * 10}s`,
            opacity: Math.random() * 0.6 + 0.2,
        }));
        setParticles(newParticles);
    }, []);

    return (
        <>
            {particles.map((p) => (
                <div
                    key={p.id}
                    className="particle"
                    style={{
                        left: p.left,
                        bottom: '-10px',
                        width: p.size,
                        height: p.size,
                        animationDuration: p.duration,
                        animationDelay: p.delay,
                        background: `rgba(var(--accent-rgb), ${p.opacity})`,
                    }}
                />
            ))}
        </>
    );
}

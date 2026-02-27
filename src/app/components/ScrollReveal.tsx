'use client';

import { useEffect, useRef } from 'react';

export default function ScrollReveal({ children, className = '', direction = 'up' }: {
    children: React.ReactNode;
    className?: string;
    direction?: 'up' | 'left' | 'right';
}) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    const revealClass = direction === 'left' ? 'reveal-left' : direction === 'right' ? 'reveal-right' : 'reveal';

    return (
        <div ref={ref} className={`${revealClass} ${className}`}>
            {children}
        </div>
    );
}

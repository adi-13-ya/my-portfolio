'use client';

import { useEffect, useState } from 'react';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        e.preventDefault();
        setMenuOpen(false);
        const el = document.getElementById(targetId);
        el?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <a className="nav-logo" href="#hero" onClick={(e) => handleClick(e, 'hero')}>
                AG
            </a>

            <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
                {menuOpen && (
                    <li style={{ position: 'absolute', top: '2rem', right: '2rem' }}>
                        <button
                            onClick={() => setMenuOpen(false)}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: 'var(--st-red)',
                                fontSize: '1.5rem',
                                cursor: 'pointer',
                                fontFamily: 'inherit'
                            }}
                        >
                            ✕
                        </button>
                    </li>
                )}
                <li><a href="#about" onClick={(e) => handleClick(e, 'about')}>About</a></li>
                <li><a href="#research" onClick={(e) => handleClick(e, 'research')}>Research</a></li>
                <li><a href="#experience" onClick={(e) => handleClick(e, 'experience')}>Experience</a></li>
                <li><a href="#projects" onClick={(e) => handleClick(e, 'projects')}>Projects</a></li>
                <li><a href="#skills" onClick={(e) => handleClick(e, 'skills')}>Skills</a></li>
                <li><a href="#education" onClick={(e) => handleClick(e, 'education')}>Education</a></li>
                <li><a href="#contact" onClick={(e) => handleClick(e, 'contact')}>Contact</a></li>
            </ul>

            <button
                className="mobile-menu-btn"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>
        </nav>
    );
}

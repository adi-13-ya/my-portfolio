'use client';

// Stranger Things themed SVG icons to replace emojis
// Each icon is designed to match the show's aesthetic

interface IconProps {
    size?: number;
    className?: string;
}

// Lightning bolt - used for tagline and enter button
export function IconLightning({ size = 20, className = '' }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={{ display: 'inline-block', verticalAlign: 'middle' }}>
            <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" fill="var(--st-red)" stroke="var(--st-red-glow)" strokeWidth="0.5" />
            <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" fill="url(#lightning-grad)" />
            <defs>
                <linearGradient id="lightning-grad" x1="4" y1="2" x2="18" y2="22">
                    <stop offset="0%" stopColor="#ff4444" />
                    <stop offset="100%" stopColor="var(--st-red)" />
                </linearGradient>
            </defs>
        </svg>
    );
}

// Crystal Ball / Portal - for DocLingo project
export function IconPortal({ size = 20, className = '' }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={{ display: 'inline-block', verticalAlign: 'middle' }}>
            <circle cx="12" cy="12" r="9" stroke="var(--st-red)" strokeWidth="1.5" fill="none" />
            <circle cx="12" cy="12" r="5" stroke="var(--st-red)" strokeWidth="1" fill="none" opacity="0.6" />
            <circle cx="12" cy="12" r="2" fill="var(--st-red)" opacity="0.8" />
            <path d="M12 3C7 3 3 7 3 12" stroke="var(--st-accent)" strokeWidth="0.5" opacity="0.4" />
            <path d="M21 12c0 5-4 9-9 9" stroke="var(--st-accent)" strokeWidth="0.5" opacity="0.4" />
        </svg>
    );
}

// Mind / Brain - for AI & ML skills
export function IconMind({ size = 20, className = '' }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={{ display: 'inline-block', verticalAlign: 'middle' }}>
            <path d="M12 2C8.5 2 6 4.5 6 7.5c0 1.5.5 2.8 1.5 3.8L6 14h12l-1.5-2.7c1-.9 1.5-2.3 1.5-3.8C18 4.5 15.5 2 12 2z" stroke="var(--st-red)" strokeWidth="1.5" fill="none" />
            <path d="M9 14v3a3 3 0 006 0v-3" stroke="var(--st-red)" strokeWidth="1.5" fill="none" />
            <line x1="12" y1="5" x2="12" y2="9" stroke="var(--st-red)" strokeWidth="0.8" opacity="0.5" />
            <line x1="10" y1="7" x2="14" y2="7" stroke="var(--st-red)" strokeWidth="0.8" opacity="0.5" />
            <circle cx="12" cy="7" r="1.5" fill="var(--st-red)" opacity="0.3" />
        </svg>
    );
}

// Terminal / Code - for Programming Languages
export function IconTerminal({ size = 20, className = '' }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={{ display: 'inline-block', verticalAlign: 'middle' }}>
            <rect x="2" y="3" width="20" height="18" rx="2" stroke="var(--st-red)" strokeWidth="1.5" fill="none" />
            <polyline points="6,9 10,12 6,15" stroke="var(--st-red)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="12" y1="15" x2="18" y2="15" stroke="var(--st-red)" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="2" y1="6" x2="22" y2="6" stroke="var(--st-red)" strokeWidth="0.5" opacity="0.3" />
        </svg>
    );
}

// Data / Chart - for Data Science
export function IconData({ size = 20, className = '' }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={{ display: 'inline-block', verticalAlign: 'middle' }}>
            <rect x="3" y="14" width="4" height="7" rx="0.5" fill="var(--st-red)" opacity="0.6" />
            <rect x="10" y="8" width="4" height="13" rx="0.5" fill="var(--st-red)" opacity="0.8" />
            <rect x="17" y="3" width="4" height="18" rx="0.5" fill="var(--st-red)" />
            <path d="M3 12L10 6L17 3" stroke="var(--st-accent)" strokeWidth="1" fill="none" opacity="0.5" strokeDasharray="2 2" />
        </svg>
    );
}

// Globe / Web - for Web Development
export function IconGlobe({ size = 20, className = '' }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={{ display: 'inline-block', verticalAlign: 'middle' }}>
            <circle cx="12" cy="12" r="9" stroke="var(--st-red)" strokeWidth="1.5" fill="none" />
            <ellipse cx="12" cy="12" rx="4" ry="9" stroke="var(--st-red)" strokeWidth="1" fill="none" opacity="0.6" />
            <line x1="3" y1="12" x2="21" y2="12" stroke="var(--st-red)" strokeWidth="0.8" opacity="0.5" />
            <path d="M4 8h16M4 16h16" stroke="var(--st-red)" strokeWidth="0.5" opacity="0.3" />
        </svg>
    );
}

// Cloud - for Cloud & Tools
export function IconCloud({ size = 20, className = '' }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={{ display: 'inline-block', verticalAlign: 'middle' }}>
            <path d="M6 19a4 4 0 01-.88-7.9A6 6 0 0117.73 10 4 4 0 1119 19H6z" stroke="var(--st-red)" strokeWidth="1.5" fill="none" />
            <path d="M10 15l2-2 2 2" stroke="var(--st-red)" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
            <line x1="12" y1="13" x2="12" y2="17" stroke="var(--st-red)" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
        </svg>
    );
}

// Demogorgon flower/star - for achievements medal
export function IconDemoStar({ size = 20, className = '' }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={{ display: 'inline-block', verticalAlign: 'middle' }}>
            <polygon points="12,2 14.5,8.5 21,9.5 16,14 17.5,21 12,17.5 6.5,21 8,14 3,9.5 9.5,8.5" fill="none" stroke="var(--st-red)" strokeWidth="1.5" />
            <circle cx="12" cy="12" r="3" fill="var(--st-red)" opacity="0.3" />
        </svg>
    );
}

// Scroll/Certificate - for certifications
export function IconScroll({ size = 20, className = '' }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={{ display: 'inline-block', verticalAlign: 'middle' }}>
            <path d="M4 4h16v16H4z" stroke="var(--st-red)" strokeWidth="1.5" fill="none" rx="1" />
            <line x1="8" y1="8" x2="16" y2="8" stroke="var(--st-red)" strokeWidth="1" opacity="0.6" strokeLinecap="round" />
            <line x1="8" y1="11" x2="16" y2="11" stroke="var(--st-red)" strokeWidth="1" opacity="0.4" strokeLinecap="round" />
            <line x1="8" y1="14" x2="13" y2="14" stroke="var(--st-red)" strokeWidth="1" opacity="0.3" strokeLinecap="round" />
            <circle cx="15" cy="16" r="2.5" stroke="var(--st-red)" strokeWidth="1" fill="none" opacity="0.5" />
            <path d="M14 16l1 1 2-2" stroke="var(--st-red)" strokeWidth="0.8" opacity="0.5" strokeLinecap="round" />
        </svg>
    );
}

// Graduation cap - for education/certification
export function IconGrad({ size = 20, className = '' }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={{ display: 'inline-block', verticalAlign: 'middle' }}>
            <path d="M12 3L2 9l10 6 10-6-10-6z" stroke="var(--st-red)" strokeWidth="1.5" fill="none" />
            <path d="M6 11.5v4.5c0 2 2.7 3.5 6 3.5s6-1.5 6-3.5v-4.5" stroke="var(--st-red)" strokeWidth="1.5" fill="none" />
            <line x1="22" y1="9" x2="22" y2="17" stroke="var(--st-red)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

// Map pin - for location
export function IconPin({ size = 20, className = '' }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={{ display: 'inline-block', verticalAlign: 'middle' }}>
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="var(--st-red)" strokeWidth="1.5" fill="none" />
            <circle cx="12" cy="9" r="2.5" fill="var(--st-red)" opacity="0.5" />
        </svg>
    );
}

// Envelope - for email
export function IconEnvelope({ size = 20, className = '' }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={{ display: 'inline-block', verticalAlign: 'middle' }}>
            <rect x="2" y="4" width="20" height="16" rx="2" stroke="var(--st-red)" strokeWidth="1.5" fill="none" />
            <polyline points="2,4 12,13 22,4" stroke="var(--st-red)" strokeWidth="1.5" fill="none" />
        </svg>
    );
}

// Briefcase - for LinkedIn
export function IconBriefcase({ size = 20, className = '' }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={{ display: 'inline-block', verticalAlign: 'middle' }}>
            <rect x="2" y="7" width="20" height="14" rx="2" stroke="var(--st-red)" strokeWidth="1.5" fill="none" />
            <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" stroke="var(--st-red)" strokeWidth="1.5" fill="none" />
            <line x1="2" y1="13" x2="22" y2="13" stroke="var(--st-red)" strokeWidth="0.8" opacity="0.4" />
        </svg>
    );
}

// Tentacle / Demogorgon - for GitHub (replaces octopus)
export function IconDemogorgon({ size = 20, className = '' }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={{ display: 'inline-block', verticalAlign: 'middle' }}>
            <circle cx="12" cy="10" r="6" stroke="var(--st-red)" strokeWidth="1.5" fill="none" />
            <path d="M8 7c0-2 1.5-4 4-4s4 2 4 4" stroke="var(--st-red)" strokeWidth="1" opacity="0.5" />
            <path d="M6 14l-2 4M10 15l-1 5M14 15l1 5M18 14l2 4" stroke="var(--st-red)" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
            <circle cx="10" cy="9" r="1" fill="var(--st-red)" opacity="0.6" />
            <circle cx="14" cy="9" r="1" fill="var(--st-red)" opacity="0.6" />
        </svg>
    );
}

// Heart with glow - for footer
export function IconHeart({ size = 20, className = '' }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={{ display: 'inline-block', verticalAlign: 'middle' }}>
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="var(--st-red)" />
        </svg>
    );
}

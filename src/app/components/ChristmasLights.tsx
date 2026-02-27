'use client';

export default function ChristmasLights() {
    return (
        <div className="christmas-lights-bar">
            {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="light-bulb" />
            ))}
        </div>
    );
}

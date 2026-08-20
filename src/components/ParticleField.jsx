import { useRef } from "react";

export default function ParticleField({ count = 22 }) {
  const particles = useRef(
    Array.from({ length: count }, () => ({
      left: Math.random() * 100,
      size: 1.6 + Math.random() * 2.6,
      duration: 16 + Math.random() * 20,
      delay: Math.random() * -30,
      drift: (Math.random() - 0.5) * 140,
      mint: Math.random() > 0.5,
    }))
  ).current;
  return (
    <div className="particle-field" aria-hidden="true">
      {particles.map((p, i) => (
        <span
          key={i}
          className={`particle ${p.mint ? "particle--mint" : ""}`}
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            "--drift": `${p.drift}px`,
          }}
        />
      ))}
    </div>
  );
}

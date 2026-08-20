import { useRef } from "react";
import { IconGithub, IconTwitter, IconLinkedin } from "./Icons";
import Reveal from "./Reveal";

export default function TeamCard({ name, role, hue, index }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `rotateY(${px * 10}deg) rotateX(${-py * 10}deg) scale(1.03)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "rotateY(0) rotateX(0) scale(1)";
  };
  return (
    <Reveal delay={index * 80} className="team-wrap">
      <div ref={ref} className="team-card" onMouseMove={onMove} onMouseLeave={onLeave} data-cursor="link">
        <div className="team-portrait notch-lg" style={{ background: `linear-gradient(150deg, hsl(${hue},55%,18%), hsl(${hue + 30},50%,10%))` }}>
          <div className="team-portrait-grid" />
        </div>
        <div className="team-meta">
          <h4>{name}</h4>
          <span>{role}</span>
        </div>
        <div className="team-social">
          <a href="#" aria-label="Github"><IconGithub size={15} /></a>
          <a href="#" aria-label="Twitter"><IconTwitter size={15} /></a>
          <a href="#" aria-label="LinkedIn"><IconLinkedin size={15} /></a>
        </div>
      </div>
    </Reveal>
  );
}

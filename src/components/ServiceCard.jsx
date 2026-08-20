import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";

export default function ServiceCard({ icon: Icon, index, title, description }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${px * 7}deg) rotateX(${-py * 7}deg) translateY(-4px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "perspective(800px) rotateY(0) rotateX(0)";
  };

  return (
    <Reveal delay={index * 90} dir="scale" className="service-wrap">
      <div ref={ref} className="service-card notch-lg" onMouseMove={onMove} onMouseLeave={onLeave} data-cursor="link">
        <div className="service-index">0{index + 1}</div>
        <div className="service-icon"><Icon size={22} strokeWidth={1.4} /></div>
        <h3 className="service-title">{title}</h3>
        <p className="service-desc">{description}</p>
        <div className="service-more">Learn more <ArrowUpRight size={14} /></div>
      </div>
    </Reveal>
  );
}

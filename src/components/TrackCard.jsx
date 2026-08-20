import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";

export default function TrackCard({ icon: Icon, index, title, blurb, detail }) {
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
    <Reveal delay={index * 90} dir="scale" className="track-wrap">
      <div ref={ref} className="track-card notch-lg" onMouseMove={onMove} onMouseLeave={onLeave} data-cursor="link">
        <div className="track-index">0{index + 1}</div>
        <div className="track-icon"><Icon size={22} strokeWidth={1.4} /></div>
        <h3 className="track-title">{title}</h3>
        <p className="track-blurb">{blurb}</p>
        <p className="track-detail">{detail}</p>
        <div className="track-more">Learn more <ArrowUpRight size={14} /></div>
      </div>
    </Reveal>
  );
}

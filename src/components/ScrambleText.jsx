import { useEffect, useState } from "react";
import { useInView } from "../hooks/useInView";

export default function ScrambleText({ text, className = "" }) {
  const [display, setDisplay] = useState(text);
  const [ref, inView] = useInView(0.4);
  useEffect(() => {
    if (!inView) return;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let frame = 0;
    const totalFrames = text.length * 2 + 14;
    let raf;
    const tick = () => {
      frame++;
      const revealCount = Math.floor((frame / totalFrames) * text.length);
      let out = "";
      for (let i = 0; i < text.length; i++) {
        if (text[i] === " " || /[·—]/.test(text[i])) { out += text[i]; continue; }
        out += i < revealCount ? text[i] : chars[Math.floor(Math.random() * chars.length)];
      }
      setDisplay(out);
      if (frame < totalFrames) raf = requestAnimationFrame(tick);
      else setDisplay(text);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, text]);
  return <span ref={ref} className={className}>{display}</span>;
}

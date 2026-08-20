import { useEffect, useState } from "react";
import { useInView } from "../hooks/useInView";

export default function Counter({ target, suffix = "", label }) {
  const [ref, inView] = useInView(0.4);
  const [val, setVal] = useState(0);
  const [scrambling, setScrambling] = useState(true);
  useEffect(() => {
    if (!inView) return;
    const digits = String(target).length;
    let scrambleFrames = 0;
    let raf;
    const scrambleTick = () => {
      scrambleFrames++;
      setVal(Math.floor(Math.random() * Math.pow(10, digits)));
      if (scrambleFrames < 10) {
        raf = requestAnimationFrame(scrambleTick);
      } else {
        setScrambling(false);
        const start = performance.now();
        const dur = 1200;
        const countTick = (now) => {
          const p = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(target * eased));
          if (p < 1) raf = requestAnimationFrame(countTick);
        };
        raf = requestAnimationFrame(countTick);
      }
    };
    raf = requestAnimationFrame(scrambleTick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);
  return (
    <div ref={ref} className="stat">
      <div className={`stat-num ${scrambling ? "stat-num--scrambling" : ""}`}>
        {val}
        <span className="stat-suffix">{suffix}</span>
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

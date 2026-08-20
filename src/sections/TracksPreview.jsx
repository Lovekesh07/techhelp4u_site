import { Cpu, Layers, Zap, Users2 } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import ScrambleText from "../components/ScrambleText";
import Ticker from "../components/Ticker";

// Titles only — full blurbs + details live at /tracks
// (see pages/Tracks.jsx -> sections/TracksSection.jsx).
const TRACKS = [
  { icon: Cpu, title: "Hackathons" },
  { icon: Layers, title: "Workshops & build nights" },
  { icon: Zap, title: "Open-source sprints" },
  { icon: Users2, title: "Speaker series" },
];

export default function TracksPreview() {
  return (
    <>
      <Ticker items={["HACKATHONS", "WORKSHOPS", "OPEN SOURCE SPRINTS", "SPEAKER NIGHTS", "BUILD NIGHTS", "DEMO DAYS"]} />
      <section className="tracks" id="tracks">
        <Reveal className="section-eyebrow center"><ScrambleText text="03 — TRACKS" /></Reveal>
        <Reveal delay={80}><h2 className="section-title center">What we actually run.</h2></Reveal>
        <div className="tracks-chip-row">
          {TRACKS.map((t, i) => {
            const Icon = t.icon;
            return (
              <Reveal key={t.title} delay={120 + i * 70} dir="scale" className="track-chip" data-cursor="link">
                <Icon size={17} strokeWidth={1.4} />
                <span>{t.title}</span>
              </Reveal>
            );
          })}
        </div>
        <Reveal delay={420} className="section-cta center">
          <Link to="/tracks" className="btn btn-outline" data-cursor="link">
            View all tracks <ArrowRight size={16} />
          </Link>
        </Reveal>
      </section>
    </>
  );
}

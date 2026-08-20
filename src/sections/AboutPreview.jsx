import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "../components/Reveal";
import ScrambleText from "../components/ScrambleText";
import Counter from "../components/Counter";

// Condensed "highlights only" version of AboutSection for the Home page.
// Full story lives at /about (see pages/About.jsx -> sections/AboutSection.jsx).
export default function AboutPreview() {
  return (
    <section className="about" id="about">
      <div className="about-grid">
        <div className="about-sticky">
          <Reveal className="section-eyebrow"><ScrambleText text="01 — ABOUT" /></Reveal>
          <Reveal delay={100}><h2 className="section-title">A network, not a club.</h2></Reveal>
          <div className="stats-row">
            <Counter target={2400} suffix="+" label="Members" />
            <Counter target={42} label="Hackathons hosted" />
            <Counter target={680} suffix="+" label="Projects shipped" />
            <Counter target={180} suffix="K+" label="Awarded in prizes" />
          </div>
        </div>
        <div className="about-story">
          <Reveal className="story-block">
            <p>
              What started as a group chat and one folding table in a dorm common
              room is now the hackathon our campus is known for — plus workshops
              and open-source sprints all year, open to any student, any major,
              any experience level.
            </p>
          </Reveal>
          <Reveal delay={120} className="section-cta">
            <Link to="/about" className="btn btn-outline" data-cursor="link">
              Read our story <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

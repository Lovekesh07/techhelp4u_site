import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "../components/Reveal";
import ScrambleText from "../components/ScrambleText";
import TeamCard from "../components/TeamCard";

// Founder only — the full roster lives at /team
// (see pages/Team.jsx -> sections/TeamSection.jsx).
export default function TeamPreview() {
  return (
    <section className="team" id="team">
      <Reveal className="section-eyebrow center"><ScrambleText text="05 — TEAM" /></Reveal>
      <Reveal delay={80}><h2 className="section-title center">The people running it.</h2></Reveal>
      <div className="team-grid team-grid--single">
        <TeamCard index={0} name="Maya Chen" role="Founder & President" hue={24} />
      </div>
      <Reveal delay={200} className="section-cta center">
        <Link to="/team" className="btn btn-outline" data-cursor="link">
          Meet our team <ArrowRight size={16} />
        </Link>
      </Reveal>
    </section>
  );
}

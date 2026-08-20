import { Code2, Trophy, BrainCircuit } from "lucide-react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "../components/Reveal";
import ScrambleText from "../components/ScrambleText";
import ServiceCard from "../components/ServiceCard";

// Only the top 3 of 6 services — the rest live at /services
// (see pages/Services.jsx -> sections/ServicesSection.jsx).
const HIGHLIGHTS = [
  {
    icon: Code2,
    title: "Technical Workshops",
    description: "Hands-on sessions on React, AI, web development, cloud and modern tooling.",
  },
  {
    icon: Trophy,
    title: "Hackathons",
    description: "Innovative hackathons where you solve real-world challenges with a team.",
  },
  {
    icon: BrainCircuit,
    title: "AI & Innovation",
    description: "Explore artificial intelligence, machine learning and emerging technologies.",
  },
];

export default function ServicesPreview() {
  return (
    <section className="services" id="services">
      <Reveal className="section-eyebrow center"><ScrambleText text="02 — SERVICES" /></Reveal>
      <Reveal delay={80}><h2 className="section-title center">What we offer.</h2></Reveal>
      <Reveal delay={140} className="services-lede">
        <p>A collaborative ecosystem where students learn, innovate and build impactful
        solutions through workshops, hackathons and mentorship.</p>
      </Reveal>
      <div className="services-grid">
        {HIGHLIGHTS.map((s, i) => (
          <ServiceCard key={s.title} index={i} icon={s.icon} title={s.title} description={s.description} />
        ))}
      </div>
      <Reveal delay={260} className="section-cta center">
        <Link to="/services" className="btn btn-outline" data-cursor="link">
          Explore all services <ArrowRight size={16} />
        </Link>
      </Reveal>
    </section>
  );
}

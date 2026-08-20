import { Code2, Trophy, BrainCircuit, Users, Rocket, BookOpen } from "lucide-react";
import Reveal from "../components/Reveal";
import ScrambleText from "../components/ScrambleText";
import ServiceCard from "../components/ServiceCard";

const SERVICES = [
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
  {
    icon: Users,
    title: "Community",
    description: "Network with passionate developers, designers and entrepreneurs.",
  },
  {
    icon: Rocket,
    title: "Projects",
    description: "Build impactful projects and strengthen your portfolio with practical experience.",
  },
  {
    icon: BookOpen,
    title: "Learning Resources",
    description: "Access roadmaps, recordings, notes and coding resources any time.",
  },
];

export default function ServicesSection() {
  return (
    <section className="services" id="services">
      <Reveal className="section-eyebrow center"><ScrambleText text="02 — SERVICES" /></Reveal>
      <Reveal delay={80}><h2 className="section-title center">What we offer.</h2></Reveal>
      <Reveal delay={140} className="services-lede">
        <p>A collaborative ecosystem where students learn, innovate and build impactful
        solutions through workshops, hackathons and mentorship.</p>
      </Reveal>
      <div className="services-grid">
        {SERVICES.map((s, i) => (
          <ServiceCard key={s.title} index={i} icon={s.icon} title={s.title} description={s.description} />
        ))}
      </div>
    </section>
  );
}

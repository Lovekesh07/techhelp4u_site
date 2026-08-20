import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";
import NetworkCore from "../components/NetworkCore";
import Reveal from "../components/Reveal";
import ScrambleText from "../components/ScrambleText";
import AboutPreview from "../sections/AboutPreview";
import ServicesPreview from "../sections/ServicesPreview";
import TracksPreview from "../sections/TracksPreview";
import EventsPreview from "../sections/EventsPreview";
import TeamPreview from "../sections/TeamPreview";
import JoinSection from "../sections/JoinSection";

export default function Home() {
  const heroBgRef = useRef(null);
  const heroContentRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (heroBgRef.current) heroBgRef.current.style.transform = `translateY(${y * 0.15}px)`;
      if (heroContentRef.current) {
        heroContentRef.current.style.transform = `translateY(${y * 0.22}px)`;
        heroContentRef.current.style.opacity = String(Math.max(1 - y / 520, 0));
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // If we arrived here via a nav click on a subsection (e.g. from the Nav
  // component navigating "/" with { state: { scrollTo: "about" } }), or via
  // a direct "/#about"-style hash link, scroll to that section on load.
  useEffect(() => {
    const targetId = location.state?.scrollTo || (location.hash ? location.hash.slice(1) : null);
    if (!targetId) return;
    const el = document.getElementById(targetId);
    if (el) {
      requestAnimationFrame(() => el.scrollIntoView({ behavior: "smooth" }));
    }
  }, [location.state, location.hash]);

  const headline = "We ship at 3am and call it Tuesday.";

  return (
    <>
    <section className="hero" id="hero">
      <div className="mesh-bg" ref={heroBgRef} aria-hidden="true">
        <span className="blob blob-a" />
        <span className="blob blob-b" />
        <span className="grain" />
      </div>
      <NetworkCore />
      <div className="hero-content" ref={heroContentRef}>
        <div className="eyebrow reveal reveal--in">
          <ScrambleText text="STUDENT-RUN · TECH COMMUNITY · EST. 2021" />
        </div>
        <h1 className="headline">
          {headline.split(" ").map((w, i) => (
            <span className="word-mask" key={i}>
              <span className="word" style={{ animationDelay: `${0.15 + i * 0.08}s` }}>{w}</span>
            </span>
          ))}
        </h1>
        <Reveal delay={600} className="hero-sub">
          <p>
            TECHhelp4u is a student-built network of hackers, designers and builders — running
            hackathons, workshops and late-night build sessions for anyone who'd rather
            ship something than just talk about it.
          </p>
        </Reveal>
        <Reveal delay={750} className="cta-row">
          <a href="#events" className="btn btn-primary">See upcoming hacks <ArrowRight size={16} /></a>
          <a href="#join" className="btn btn-outline">Join the network</a>
        </Reveal>
      </div>
      <a href="#about" className="scroll-indicator" aria-hidden="true">
        <span className="scroll-line" />
        <ChevronDown size={14} />
      </a>
    </section>

    <AboutPreview />
    <ServicesPreview />
    <TracksPreview />
    <EventsPreview />
    <TeamPreview />
    <JoinSection />
    </>
  );
}

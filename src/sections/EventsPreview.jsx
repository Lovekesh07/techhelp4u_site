import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import ScrambleText from "../components/ScrambleText";
import Ticker from "../components/Ticker";

// Just the flagship event — the full calendar of workshops, sprints and
// smaller hackathons lives at /events (see pages/Events.jsx -> sections/EventsSection.jsx).
export default function EventsPreview() {
  return (
    <>
      <section className="events" id="events">
        <Reveal className="section-eyebrow center"><ScrambleText text="04 — EVENTS & HACKATHONS" /></Reveal>
        <Reveal delay={80}><h2 className="section-title center">Built to be entered.</h2></Reveal>

        <Reveal delay={140} className="featured-event notch-lg">
          <div className="featured-left">
            <span className="tag">FLAGSHIP EVENT — NOV 2026</span>
            <h3>HACK/TECHhelp4u — 36-Hour Hackathon</h3>
            <p>Our biggest event of the year: 36 hours, four tracks, one campus.
            Open to any student — no experience required, first-timers welcome.</p>
            <div className="prize-pool">
              <div>
                <span className="prize-amount">$15,000</span>
                <span className="prize-label">Total prize pool</span>
              </div>
              <a href="#" className="btn btn-primary" data-cursor="link">
                Apply to HACK/TECHhelp4u <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
          <div className="featured-right" aria-hidden="true">
            <div className="featured-plate">
              <div className="plate-grid" />
              <span className="plate-code">01 010 HACK//TECHhelp4u</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={220} className="section-cta center">
          <Link to="/events" className="btn btn-outline" data-cursor="link">
            View all events &amp; workshops <ArrowRight size={16} />
          </Link>
        </Reveal>
      </section>
      <Ticker items={["36 HOURS", "$15,000 PRIZE POOL", "ALL MAJORS WELCOME", "NO EXPERIENCE REQUIRED", "APPLICATIONS OPEN NOV 2026"]} />
    </>
  );
}

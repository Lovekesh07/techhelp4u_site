import { useCallback, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import Reveal from "../components/Reveal";
import ScrambleText from "../components/ScrambleText";
import Ticker from "../components/Ticker";

export default function EventsSection() {
  const eventsRef = useRef(null);

  const onEventsWheel = useCallback((e) => {
    const el = eventsRef.current;
    if (!el) return;
    if (el.scrollWidth > el.clientWidth) {
      e.preventDefault();
      el.scrollLeft += e.deltaY * 1.1;
    }
  }, []);

  return (
    <>
      <section className="events" id="events">
        <Reveal className="section-eyebrow"><ScrambleText text="04 — EVENTS & HACKATHONS" /></Reveal>
        <Reveal delay={80}><h2 className="section-title">Built to be entered.</h2></Reveal>

        <Reveal delay={140} className="featured-event notch-lg">
          <div className="featured-left">
            <span className="tag">FLAGSHIP EVENT — NOV 2026</span>
            <h3>HACK/TECHhelp4u — 36-Hour Hackathon</h3>
            <p>Our biggest event of the year: 36 hours, four tracks, one campus.
            Open to any student — no experience required, first-timers welcome.</p>
            <div className="timeline">
              {["Applications", "Team formation", "Hacking begins", "Demo day"].map((p, i) => (
                <div className="timeline-step" key={p}>
                  <span className={`timeline-dot ${i <= 1 ? "timeline-dot--done" : ""}`} />
                  <span className="timeline-label">{p}</span>
                </div>
              ))}
              <div className="timeline-track">
                <div className="timeline-fill" />
              </div>
            </div>
            <div className="prize-pool">
              <div>
                <span className="prize-amount">$15,000</span>
                <span className="prize-label">Total prize pool</span>
              </div>
              <a href="#" className="btn btn-primary">
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

        <Reveal delay={200} className="events-scroll-wrap">
          <div className="events-scroll" ref={eventsRef} onWheel={onEventsWheel}>
            {[
              { name: "Git & GitHub 101", tag: "Workshop", date: "Aug 2026" },
              { name: "Open Source Friday", tag: "OSS sprint", date: "Sep 2026" },
              { name: "Design Systems Night", tag: "Workshop", date: "Sep 2026" },
              { name: "Founders' Fireside", tag: "Speaker series", date: "Oct 2026" },
              { name: "HACK/TECHhelp4u: Freshman Track", tag: "Beginner hackathon", date: "Dec 2026" },
            ].map((ev) => (
              <div className="event-card notch-sm" key={ev.name} data-cursor="link">
                <span className="event-tag">{ev.tag}</span>
                <h4>{ev.name}</h4>
                <span className="event-date">{ev.date}</span>
                <div className="event-expand">
                  <span>Details <ArrowUpRight size={13} /></span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>
      <Ticker items={["36 HOURS", "$15,000 PRIZE POOL", "ALL MAJORS WELCOME", "NO EXPERIENCE REQUIRED", "APPLICATIONS OPEN NOV 2026"]} />
    </>
  );
}

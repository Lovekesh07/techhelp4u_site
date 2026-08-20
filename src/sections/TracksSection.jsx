import { Cpu, Layers, Zap, Users2 } from "lucide-react";
import Reveal from "../components/Reveal";
import ScrambleText from "../components/ScrambleText";
import Ticker from "../components/Ticker";
import TrackCard from "../components/TrackCard";

export default function TracksSection() {
  return (
    <>
      <Ticker items={["HACKATHONS", "WORKSHOPS", "OPEN SOURCE SPRINTS", "SPEAKER NIGHTS", "BUILD NIGHTS", "DEMO DAYS"]} />
      <section className="tracks" id="tracks">
        <Reveal className="section-eyebrow center"><ScrambleText text="03 — TRACKS" /></Reveal>
        <Reveal delay={80}><h2 className="section-title center">What we actually run.</h2></Reveal>
        <div className="tracks-grid">
          <TrackCard index={0} icon={Cpu} title="Hackathons"
            blurb="Two to three flagship hackathons a year — real prize pools, real sponsors."
            detail="From HACK/TECHhelp4u, our flagship 36-hour event, to smaller themed sprints — team formation, mentorship, and a demo stage people actually watch." />
          <TrackCard index={1} icon={Layers} title="Workshops & build nights"
            blurb="Weekly, hands-on, and taught by members so nobody has to learn alone."
            detail="Git and GitHub, your first API, intro to ML, a portfolio site that doesn't look like a template — every week of term." />
          <TrackCard index={2} icon={Zap} title="Open-source sprints"
            blurb="Monthly sprints on real projects — your first pull request, guaranteed."
            detail="We pick maintainers who take first-time contributors seriously, then sit together and ship the PR the same night." />
          <TrackCard index={3} icon={Users2} title="Speaker series"
            blurb="Engineers and founders who visit to talk shop, not just talk."
            detail="Small-room talks and office hours with people building the things our members want to build next." />
        </div>
      </section>
    </>
  );
}

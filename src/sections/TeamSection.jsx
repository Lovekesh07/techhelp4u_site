import Reveal from "../components/Reveal";
import ScrambleText from "../components/ScrambleText";
import TeamCard from "../components/TeamCard";

export default function TeamSection() {
  return (
    <section className="team" id="team">
      <Reveal className="section-eyebrow center"><ScrambleText text="05 — TEAM" /></Reveal>
      <Reveal delay={80}><h2 className="section-title center">The people running it.</h2></Reveal>
      <div className="team-grid">
        <TeamCard index={0} name="Maya Chen" role="Founder & President" hue={24} />
        <TeamCard index={1} name="Diego Alvarez" role="Head of Events" hue={155} />
        <TeamCard index={2} name="Amara Osei" role="Design Lead" hue={340} />
        <TeamCard index={3} name="Ben Okafor" role="Sponsorship Lead" hue={200} />
      </div>
    </section>
  );
}

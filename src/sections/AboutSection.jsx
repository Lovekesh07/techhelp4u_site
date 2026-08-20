import Reveal from "../components/Reveal";
import ScrambleText from "../components/ScrambleText";
import Counter from "../components/Counter";

export default function AboutSection() {
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
            <span className="story-index">— 2021</span>
            <p>TECHhelp4u started as a group chat and one folding table in a dorm common
            room — six of us trying to get more people to show up to our first
            build night.</p>
          </Reveal>
          <Reveal delay={100} className="story-block">
            <span className="story-index">— 2023</span>
            <p>The build nights turned into full hackathons. We started bringing
            in sponsors and judges, and enough pizza to make the fire marshal
            nervous.</p>
          </Reveal>
          <Reveal delay={200} className="story-block">
            <span className="story-index">— 2026</span>
            <p>Today TECHhelp4u runs the hackathon our campus is known for, plus
            workshops and open-source sprints all year — open to any student,
            any major, any experience level.</p>
          </Reveal>
          <Reveal delay={300} className="about-image notch-lg" aria-hidden="true">
            <div className="image-plate">
              <div className="plate-grid" />
              <div className="plate-orb" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

import { Mail, MapPin, Users2 } from "lucide-react";
import Reveal from "../components/Reveal";
import ScrambleText from "../components/ScrambleText";
import JoinForm from "../components/JoinForm";
import CommunityGlobe from "../components/CommunityGlobe";

export default function JoinSection() {
  return (
    <section className="contact" id="join">
      <div className="contact-grid">
        <Reveal className="contact-left">
          <span className="section-eyebrow"><ScrambleText text="06 — JOIN" /></span>
          <h2 className="section-title">Come build with us.</h2>
          <p className="contact-copy">
            Whether you want to compete, volunteer, sponsor, or just show up to
            a build night — there's a place for you at TECHhelp4u.
          </p>
          <div className="contact-info">
            <a href="mailto:hello@TECHhelp4ucommunity.dev" data-cursor="link"><Mail size={15} /> hello@TECHhelp4ucommunity.dev</a>
            <span><Users2 size={15} /> 2,400+ members on Discord</span>
            <span><MapPin size={15} /> On campus, and everywhere online</span>
          </div>
          <JoinForm />
        </Reveal>
        <Reveal delay={150} className="contact-right notch-lg" aria-hidden="true">
          <div className="globe-plate">
            <CommunityGlobe />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

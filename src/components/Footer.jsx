import { useLocation, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { TECHhelp4uMark, IconGithub, IconTwitter, IconLinkedin } from "./Icons";

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  const goToSection = (id) => (e) => {
    e.preventDefault();
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { state: { scrollTo: id } });
    }
  };

  return (
    <footer className="footer">
      <div className="footer-divider" />
      <div className="footer-grid">
        <div className="footer-brand">
          <span className="brand"><TECHhelp4uMark size={18} /> TECHhelp4u</span>
          <p>Student-run community for builders. Hackathons, workshops and a
          network that doesn't stop at graduation.</p>
        </div>
        <div className="footer-newsletter">
          <span className="footer-heading">Get event drops</span>
          <form
            className="newsletter-form"
            onSubmit={(e) => {
              e.preventDefault();
              e.target.reset();
            }}
          >
            <input type="email" placeholder="you@university.edu" required />
            <button type="submit" data-cursor="link" aria-label="Subscribe"><ArrowRight size={16} /></button>
          </form>
        </div>
        <div className="footer-links">
          <span className="footer-heading">Quick links</span>
          <a href="#about" onClick={goToSection("about")}>About</a>
          <a href="#services" onClick={goToSection("services")}>Services</a>
          <a href="#tracks" onClick={goToSection("tracks")}>Tracks</a>
          <a href="#events" onClick={goToSection("events")}>Events</a>
          <a href="#join" onClick={goToSection("join")}>Join</a>
        </div>
        <div className="footer-social">
          <span className="footer-heading">Follow</span>
          <div className="social-row">
            <a href="#" data-cursor="link"><IconGithub size={16} /></a>
            <a href="#" data-cursor="link"><IconTwitter size={16} /></a>
            <a href="#" data-cursor="link"><IconLinkedin size={16} /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 TECHhelp4u. Built by members, for members.</span>
        <span>Design & build, in-house.</span>
      </div>
    </footer>
  );
}

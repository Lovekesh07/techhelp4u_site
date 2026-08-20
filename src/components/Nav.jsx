import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { TECHhelp4uMark } from "./Icons";

// Each item is both a home-page anchor (id) and its own standalone subpage (path).
const NAV_ITEMS = [
  { id: "about", path: "/about", label: "About" },
  { id: "services", path: "/services", label: "Services" },
  { id: "tracks", path: "/tracks", label: "Tracks" },
  { id: "events", path: "/events", label: "Events" },
  { id: "team", path: "/team", label: "Team" },
  { id: "join", path: "/join", label: "Join" },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navIndicator, setNavIndicator] = useState({ left: 0, width: 0, opacity: 0 });
  const [activeId, setActiveId] = useState(null);
  const navRefs = useRef({});
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close mobile menu whenever the route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // On the single-page home, watch which section is on screen (scrollspy).
  // On a standalone subpage, the active item is just whichever page we're on.
  useEffect(() => {
    if (!isHome) {
      const current = NAV_ITEMS.find((n) => n.path === location.pathname);
      setActiveId(current ? current.id : null);
      return;
    }
    const sections = NAV_ITEMS.map((n) => document.getElementById(n.id)).filter(Boolean);
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [isHome, location.pathname]);

  // slide the nav indicator under whichever link is active
  useEffect(() => {
    const el = activeId ? navRefs.current[activeId] : null;
    if (el) {
      setNavIndicator({ left: el.offsetLeft, width: el.offsetWidth, opacity: 1 });
    } else {
      setNavIndicator((s) => ({ ...s, opacity: 0 }));
    }
  }, [activeId]);

  const goToSection = (id) => (e) => {
    e.preventDefault();
    setMenuOpen(false);
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      // navigate home, then scroll once the sections have mounted
      navigate("/", { state: { scrollTo: id } });
    }
  };

  return (
    <>
      <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
        <NavLink to="/" className="brand" data-cursor="link">
          <TECHhelp4uMark /> TECHhelp4u
        </NavLink>
        <nav className="nav-links">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              data-cursor="link"
              ref={(el) => (navRefs.current[item.id] = el)}
              className={activeId === item.id ? "active" : ""}
              onClick={goToSection(item.id)}
            >
              {item.label}
            </a>
          ))}
          <span
            className="nav-indicator"
            style={{ left: navIndicator.left, width: navIndicator.width, opacity: navIndicator.opacity }}
          />
        </nav>
        <a href="#join" className="btn btn-ghost" onClick={goToSection("join")}>Join TECHhelp4u</a>
        <button className="nav-burger" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu">
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>
      {menuOpen && (
        <div className="mobile-menu">
          {NAV_ITEMS.map((item, i) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={goToSection(item.id)}
              style={{ animationDelay: `${0.08 + i * 0.06}s` }}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}

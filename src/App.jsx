import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import ParticleField from "./components/ParticleField";

export default function App() {
  const progressFillRef = useRef(null);
  const location = useLocation();

  // scroll-to-top whenever the route changes (real page navigation, not anchor scroll)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressFillRef.current) {
        progressFillRef.current.style.width = `${max > 0 ? (y / max) * 100 : 0}%`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  return (
    <div className="app-root">
      <CustomCursor />
      <ParticleField />

      <div className="scroll-progress">
        <div className="scroll-progress-fill" ref={progressFillRef} />
      </div>

      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

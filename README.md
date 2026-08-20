# TECHhelp4u — Website

Your old `Backup.jsx` (one giant 1,400-line file) has been split into a proper
Vite + React project. The **home page (`/`) is one continuous scrolling page**
— Hero → About → Tracks → Events → Team → Join, just like the original — and
the nav smooth-scrolls between them. Each section is *also* available as its
own standalone subpage (`/about`, `/tracks`, `/events`, `/team`, `/join`) for
direct linking or sharing.

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL. `npm run build` produces a production build
in `dist/`.

## Structure

```
src/
  main.jsx           → React Router setup (home route + subpage routes)
  App.jsx             → shared layout: nav, footer, cursor, scroll progress bar
  index.css           → all the site's CSS (pulled out of Backup.jsx's <style> tag)
  hooks/
    useInView.js       → scroll-reveal intersection observer hook
  components/          → small reusable pieces
    Nav.jsx, Footer.jsx
    Reveal.jsx, Magnetic.jsx, CustomCursor.jsx, ParticleField.jsx, ScrambleText.jsx
    NetworkCore.jsx     → hero 3D network graph (three.js)
    CommunityGlobe.jsx  → small 3D globe used on the Join section
    Counter.jsx, TrackCard.jsx, TeamCard.jsx, JoinForm.jsx, Ticker.jsx
    Icons.jsx           → Github/Twitter/LinkedIn + brand mark SVGs
  sections/             → the actual section content, shared between Home and subpages
    AboutSection.jsx, TracksSection.jsx, EventsSection.jsx, TeamSection.jsx, JoinSection.jsx
  pages/                 → routes
    Home.jsx    → "/"       (hero + every section, in one scrolling page)
    About.jsx   → "/about"  (just <AboutSection />, standalone)
    Tracks.jsx  → "/tracks"
    Events.jsx  → "/events"
    Team.jsx    → "/team"
    Join.jsx    → "/join"
```

## How the navigation works

- **On the home page**, clicking "About"/"Tracks"/etc. in the nav smooth-scrolls
  to that section's `id` on the same page — no reload, no URL change. The nav
  highlights whichever section is currently in view (scrollspy).
- **From a subpage** (or anywhere that isn't `/`), clicking a nav link
  navigates to `/` and then scrolls to that section once it's mounted.
- The **subpages themselves** (`/about`, `/tracks`, `/events`, `/team`,
  `/join`) still exist and render just that one section — handy if you ever
  want to share a direct link to, say, `/join` without sending people to the
  full scrolling page.

## Notes

- Section content lives once, in `src/sections/`, and is reused by both
  `Home.jsx` (all together) and the individual subpages (`pages/About.jsx`
  etc. just import and render one section) — so editing copy or layout only
  needs to happen in one place.
- All the original visuals (network graph, particle field, scramble text,
  scroll reveals, magnetic buttons, custom cursor) work exactly as before.
- `index.css` is the same design system as before (CSS variables for the
  copper/mint PCB theme), just no longer embedded in a JS template string.

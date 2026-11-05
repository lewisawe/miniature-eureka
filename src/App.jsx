import { useState } from "react";
import Starfield from "./components/Starfield.jsx";
import DJBooth from "./components/DJBooth.jsx";
import Deck from "./components/Deck.jsx";
import Reveal from "./components/Reveal.jsx";
import BSide from "./components/BSide.jsx";
import { useTheme } from "./lib/useTheme.js";
import { useScrollSpy } from "./lib/useScrollSpy.js";
import { useKonami } from "./lib/useKonami.js";
import {
  profile,
  about,
  rig,
  setlist,
  achievements,
  contact,
  bside,
} from "./content.js";
import "./App.css";

const CURRENT_YEAR = new Date().getFullYear();

const NAV = [
  { label: "About", target: "about" },
  { label: "The Rig", target: "rig" },
  { label: "Set List", target: "setlist" },
  { label: "Achievements", target: "achievements" },
  { label: "Contact", target: "contact" },
];

const SECTION_IDS = NAV.map((n) => n.target);

function Kicker({ children }) {
  return (
    <p className="kicker">
      <span className="kicker__dot" />
      {children}
    </p>
  );
}

export default function App() {
  const [pulse, setPulse] = useState(0);
  const [theme, setTheme] = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [bsideOpen, setBsideOpen] = useState(false);
  const activeId = useScrollSpy(SECTION_IDS);
  useKonami(() => setBsideOpen(true));

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      <Starfield />

      <div className="shell">
        {/* ---- Nav ---- */}
        <header className="nav">
          <a href="#top" className="nav__brand" onClick={closeMenu}>
            {profile.name}
          </a>

          <button
            type="button"
            className={`nav__toggle ${menuOpen ? "is-open" : ""}`}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>

          <nav
            className={`nav__links ${menuOpen ? "is-open" : ""}`}
            aria-label="Primary"
          >
            {NAV.map((n) => (
              <a
                key={n.target}
                href={`#${n.target}`}
                className={activeId === n.target ? "is-active" : ""}
                onClick={closeMenu}
              >
                {n.label}
              </a>
            ))}
            {profile.resumeUrl && (
              <a
                className="nav__resume"
                href={profile.resumeUrl}
                target="_blank"
                rel="noreferrer"
                onClick={closeMenu}
              >
                Resume ↗
              </a>
            )}
          </nav>
        </header>

        {/* ---- Hero ---- */}
        <section id="top" className="hero">
          <h1 className="hero__title">
            Hi, I'm <span className="hero__name">{profile.name}</span>
          </h1>
          <p className="hero__tagline">{profile.tagline}</p>
          <p className="hero__blurb">{profile.blurb}</p>

          {/* The DJ booth visuals + original music loop + theme crossfader */}
          <DJBooth pulse={pulse} theme={theme} setTheme={setTheme} />

          {/* Creative feature: the navigation deck */}
          <Deck onHit={() => setPulse((p) => p + 1)} />
        </section>

        {/* ---- About ---- */}
        <section id="about" className="section">
          <Reveal>
            <Kicker>{about.kicker}</Kicker>
            <h2 className="section__title">{about.heading}</h2>
            <div className="about__body">
              {about.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ---- The Rig (skills) ---- */}
        <section id="rig" className="section">
          <Reveal>
            <Kicker>{rig.kicker}</Kicker>
            <h2 className="section__title">{rig.heading}</h2>
            <p className="section__sub">{rig.sub}</p>
          </Reveal>
          <div className="rig__grid">
            {rig.groups.map((g, i) => (
              <Reveal as="div" className="rig__card" key={g.name} style={{ transitionDelay: `${i * 70}ms` }}>
                <h3 className="rig__cardtitle">{g.name}</h3>
                <ul className="rig__tags">
                  {g.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---- The Set List (projects) ---- */}
        <section id="setlist" className="section">
          <Reveal>
            <Kicker>{setlist.kicker}</Kicker>
            <h2 className="section__title">{setlist.heading}</h2>
            <p className="section__sub">{setlist.sub}</p>
          </Reveal>
          <div className="tracks">
            {setlist.tracks.map((t, i) => (
              <Reveal as="article" className="track" key={t.no} style={{ transitionDelay: `${i * 60}ms` }}>
                <div className="track__top">
                  <span className="track__no">TRACK {t.no}</span>
                  <div className="track__tags">
                    {t.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
                <h3 className="track__title">{t.title}</h3>
                <p className="track__role">{t.role}</p>
                <p className="track__desc">{t.desc}</p>
                {t.link && (
                  <a
                    className="track__link"
                    href={t.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Play ↗
                  </a>
                )}
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---- Achievements ---- */}
        <section id="achievements" className="section">
          <Reveal>
            <Kicker>{achievements.kicker}</Kicker>
            <h2 className="section__title">{achievements.heading}</h2>
            <p className="section__sub">{achievements.sub}</p>
          </Reveal>
          <div className="ach__list">
            {achievements.items.map((a, i) => (
              <Reveal as="div" className="ach__item" key={i} style={{ transitionDelay: `${i * 50}ms` }}>
                <div className="ach__meta">{a.meta}</div>
                <div>
                  <h3 className="ach__title">{a.title}</h3>
                  <p className="ach__desc">{a.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---- Contact / Transmission ---- */}
        <section id="contact" className="section section--contact">
          <Reveal>
            <Kicker>{contact.kicker}</Kicker>
            <h2 className="section__title">{contact.heading}</h2>
            <p className="section__sub">{contact.sub}</p>
            <div className="contact__links">
              <a
                className="btn"
                href={profile.githubUrl}
                target="_blank"
                rel="noreferrer"
              >
                GitHub ↗
              </a>
              {profile.linkedinUrl && (
                <a
                  className="btn btn--ghost"
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn ↗
                </a>
              )}
            </div>
          </Reveal>
        </section>

        <footer className="footer">
          <span>
            Built by {profile.name} · Hosted on AWS Amplify · {CURRENT_YEAR}
          </span>
          <button
            type="button"
            className="footer__egg"
            onClick={() => setBsideOpen(true)}
          >
            psst — there's a B-side. (↑↑↓↓←→←→ B A)
          </button>
        </footer>
      </div>

      <BSide
        open={bsideOpen}
        onClose={() => setBsideOpen(false)}
        facts={bside.facts}
      />

      {/* Back to the deck */}
      <a href="#top" className="totop" aria-label="Back to the deck">
        ↑ Deck
      </a>
    </>
  );
}

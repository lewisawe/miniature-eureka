import { useState } from "react";
import Starfield from "./components/Starfield.jsx";
import DJBooth from "./components/DJBooth.jsx";
import Deck from "./components/Deck.jsx";
import {
  profile,
  about,
  rig,
  setlist,
  achievements,
  contact,
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

  return (
    <>
      <Starfield />

      <div className="shell">
        {/* ---- Nav ---- */}
        <header className="nav">
          <a href="#top" className="nav__brand">
            {profile.name}
          </a>
          <nav className="nav__links" aria-label="Primary">
            {NAV.map((n) => (
              <a key={n.target} href={`#${n.target}`}>
                {n.label}
              </a>
            ))}
            {profile.resumeUrl && (
              <a
                className="nav__resume"
                href={profile.resumeUrl}
                target="_blank"
                rel="noreferrer"
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

          {/* The DJ booth visuals + original music loop */}
          <DJBooth pulse={pulse} />

          {/* Creative feature: the navigation deck */}
          <Deck onHit={() => setPulse((p) => p + 1)} />
        </section>

        {/* ---- About ---- */}
        <section id="about" className="section">
          <Kicker>{about.kicker}</Kicker>
          <h2 className="section__title">{about.heading}</h2>
          <div className="about__body">
            {about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>

        {/* ---- The Rig (skills) ---- */}
        <section id="rig" className="section">
          <Kicker>{rig.kicker}</Kicker>
          <h2 className="section__title">{rig.heading}</h2>
          <p className="section__sub">{rig.sub}</p>
          <div className="rig__grid">
            {rig.groups.map((g) => (
              <div key={g.name} className="rig__card">
                <h3 className="rig__cardtitle">{g.name}</h3>
                <ul className="rig__tags">
                  {g.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ---- The Set List (projects) ---- */}
        <section id="setlist" className="section">
          <Kicker>{setlist.kicker}</Kicker>
          <h2 className="section__title">{setlist.heading}</h2>
          <p className="section__sub">{setlist.sub}</p>
          <div className="tracks">
            {setlist.tracks.map((t) => (
              <article key={t.no} className="track">
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
              </article>
            ))}
          </div>
        </section>

        {/* ---- Achievements ---- */}
        <section id="achievements" className="section">
          <Kicker>{achievements.kicker}</Kicker>
          <h2 className="section__title">{achievements.heading}</h2>
          <p className="section__sub">{achievements.sub}</p>
          <div className="ach__list">
            {achievements.items.map((a, i) => (
              <div key={i} className="ach__item">
                <div className="ach__meta">{a.meta}</div>
                <div>
                  <h3 className="ach__title">{a.title}</h3>
                  <p className="ach__desc">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---- Contact / Transmission ---- */}
        <section id="contact" className="section section--contact">
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
        </section>

        <footer className="footer">
          <span>
            Built by {profile.name} · Hosted on AWS Amplify · {CURRENT_YEAR}
          </span>
        </footer>
      </div>
    </>
  );
}

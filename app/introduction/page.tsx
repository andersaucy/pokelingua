import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Introduction — Pokélingua",
  description: "Why Pokémon localization is a history of cultural globalization across names, games, animation, and regional media.",
};

const exhibitLenses = [
  { number: "01", title: "Names are design", text: "A Pokémon name can carry anatomy, sound, humor, mythology, and marketing at once. Translating it means deciding which ideas should survive—and what will feel memorable in another language." },
  { number: "02", title: "Media arrive differently", text: "A television dub may establish a locale years before a translated game. Cards, cinemas, websites, mobile services, and retail can each introduce another vocabulary and another official date." },
  { number: "03", title: "Audiences keep the archive", text: "Older names do not disappear when a company changes policy. They remain in childhood memory, recorded broadcasts, packaging, fan speech, and sometimes public controversy." },
];

const readingRoutes = [
  { label: "By place", title: "Enter a locale", text: "Follow one territory’s arrivals, naming systems, scripts, broadcasters, releases, and revisions.", href: "/#locales", action: "Open the locale atlas" },
  { label: "By creature", title: "Search one Pokémon", text: "Hold the species constant and compare what its name became across the completed language archives.", href: "/#pokemon-search", action: "Search across languages" },
  { label: "By time", title: "Follow the chronology", text: "Compare corporate expansion, playable game languages, official anime dubs, and locale-specific naming decisions.", href: "/timeline", action: "Travel through time" },
];

export default function IntroductionPage() {
  return <main className="introduction-page">
    <nav className="nav intro-nav" aria-label="Introduction navigation">
      <a className="brand" href="/" aria-label="Pokélingua homepage"><span className="brand-mark" aria-hidden="true"><i /></span><span>Pokélingua</span></a>
      <div className="nav-links"><a href="#premise">Premise</a><a href="#lenses">Exhibit lenses</a><a href="#reading">How to explore</a></div>
      <a className="nav-cta" href="/#locales">Enter the atlas <span>↗</span></a>
    </nav>

    <header className="intro-hero" id="top">
      <div className="intro-hero-index"><span>Curatorial statement</span><b>INTRO<br />000</b><small>Names · media · markets · memory</small></div>
      <div className="intro-hero-copy">
        <p className="eyebrow"><span className="pulse" /> Why this exhibition exists</p>
        <h1>How a local world became<br /><em>a global language.</em></h1>
        <p className="intro-hero-lede">Pokémon is one of the clearest living examples of cultural globalization: a world created in Japanese, repeatedly interpreted for new places, and made familiar through games, voices, names, images, products, and shared rituals.</p>
        <div className="intro-hero-actions"><a className="primary-button" href="#premise">Read the statement <span>↓</span></a><a className="text-link" href="/#locales">Skip to the atlas <span>→</span></a></div>
      </div>
    </header>

    <section className="intro-premise" id="premise">
      <div><span>Exhibition premise / 01</span><h2>Global success was not<br /><em>simple export.</em></h2></div>
      <article>
        <p className="intro-dropcap">Pokémon did not become worldwide merely because the same object was shipped everywhere. Its success depended on thousands of choices about what could remain Japanese, what needed to be translated, what should be renamed, how a joke could travel, and which voice or script would make the world feel local.</p>
        <p>A child might first encounter Pokémon through a Game Boy cartridge in one country, a dubbed television episode in another, a trading card in a third, or an official YouTube channel decades later. These are not secondary versions orbiting a single “real” release. Together they are the history of how the franchise became global.</p>
        <aside><b>The central idea</b><p>Localization is not the final step after creation. It is one of the processes through which Pokémon became culturally legible, emotionally familiar, and durable across generations.</p></aside>
      </article>
    </section>

    <section className="intro-process" aria-label="Cultural globalization process">
      <div><span>Origin</span><b>Japanese concepts, names & media</b></div><i aria-hidden="true">→</i>
      <div><span>Interpretation</span><b>Language, policy & regional judgment</b></div><i aria-hidden="true">→</i>
      <div><span>Circulation</span><b>Games, animation, cards, web & retail</b></div><i aria-hidden="true">→</i>
      <div><span>Memory</span><b>Local vocabulary becomes cultural history</b></div>
    </section>

    <section className="intro-lenses" id="lenses">
      <div className="intro-lenses-head"><span>Three exhibition lenses / 02</span><h2>Translation leaves<br /><em>evidence.</em></h2><p>Pokélingua treats every name, date, script, and release as a record of a decision—not as trivia detached from the people and media that carried it.</p></div>
      <div className="intro-lens-grid">{exhibitLenses.map((lens) => <article key={lens.number}><span>{lens.number}</span><h3>{lens.title}</h3><p>{lens.text}</p></article>)}</div>
    </section>

    <section className="intro-record">
      <div><span>What the atlas records / 03</span><h2>One event can have<br /><em>several true dates.</em></h2></div>
      <div className="intro-record-grid">
        <article><b>Territory</b><p>Where this particular audience and distribution history took shape.</p></article>
        <article><b>Language & script</b><p>What was spoken, written, romanized, retained, or newly coined.</p></article>
        <article><b>Medium</b><p>Whether the evidence comes from a core game, dub, card, website, product, or event.</p></article>
        <article><b>Time marker</b><p>When that version first appeared, changed policy, or entered an official archive.</p></article>
        <article><b>Name origin</b><p>The words, sounds, myths, and concepts a localized Pokémon name carries.</p></article>
        <article><b>Evidence level</b><p>What is official, historical, unofficial, unresolved, or still awaiting a defensible source.</p></article>
      </div>
    </section>

    <section className="intro-reading" id="reading">
      <div className="intro-reading-head"><span>Choose an entrance / 04</span><h2>There is no single route<br /><em>through the exhibit.</em></h2></div>
      <div className="intro-reading-grid">{readingRoutes.map((route) => <a href={route.href} key={route.label}><span>{route.label}</span><h3>{route.title}</h3><p>{route.text}</p><b>{route.action} →</b></a>)}</div>
    </section>

    <section className="intro-closing">
      <span>Pokélingua / a living exhibition</span>
      <blockquote>One world.<br />Many Pokémon.<br /><em>Many histories of becoming familiar.</em></blockquote>
      <p>This independent educational archive is built to grow. Its purpose is not to declare one localization definitive, but to place each version in its own territory, medium, language, and moment.</p>
      <a className="primary-button" href="/#locales">Begin with the locale atlas <span>↗</span></a>
    </section>

    <footer className="intro-footer"><a className="brand" href="/"><span>Pokélingua</span></a><p>Independent, unofficial, and unaffiliated with Nintendo, Creatures, Game Freak, or The Pokémon Company.</p><a href="/">Return home ↑</a></footer>
  </main>;
}

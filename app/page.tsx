"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { GlobalPokemonSearch } from "./components/GlobalPokemonSearch";

type Locale = {
  id: string;
  slug: string;
  flag: string;
  place: string;
  local: string;
  languages: string;
  status: "Chapter live" | "Researching";
  note: string;
  years: string;
  coreGame: string;
};

const locales: Locale[] = [
  { id: "jp", slug: "japan", flag: "JP", place: "Japan", local: "日本", languages: "Japanese", status: "Chapter live", note: "The source naming system: kana, wordplay, romanization, and the 1996 world from which every later locale begins.", years: "1996—today", coreGame: "27 Feb 1996 · Red / Green" },
  { id: "us", slug: "united-states", flag: "US", place: "United States", local: "United States", languages: "English (US)", status: "Chapter live", note: "The first international reinvention—and the English vocabulary that became a base for later markets.", years: "1998—today", coreGame: "28 Sep 1998 · Red / Blue" },
  { id: "de", slug: "germany", flag: "DE", place: "Germany", local: "Deutschland", languages: "German", status: "Chapter live", note: "A dense vocabulary of compounds, wordplay, and creature clues built for German-speaking players.", years: "1999—today", coreGame: "05 Oct 1999 · Rot / Blau" },
  { id: "it", slug: "italy", flag: "IT", place: "Italy", local: "Italia", languages: "Italian", status: "Chapter live", note: "English species spellings, Italian pronunciation, and a small set of revealing translated exceptions.", years: "1999—today", coreGame: "05 Oct 1999 · Rosso / Blu" },
  { id: "fr", slug: "france", flag: "FR", place: "France", local: "France", languages: "French", status: "Chapter live", note: "One of the most inventive naming systems, built around wordplay rather than simple transliteration.", years: "1999—today", coreGame: "08 Oct 1999 · Rouge / Bleu" },
  { id: "kr", slug: "south-korea", flag: "KR", place: "South Korea", local: "대한민국", languages: "Korean", status: "Chapter live", note: "A localization story shaped by cultural policy, broadcasting, and a dedicated regional company.", years: "1998—today", coreGame: "24 Apr 2002 · Gold / Silver" },
  { id: "hk", slug: "hong-kong", flag: "HK", place: "Hong Kong", local: "香港", languages: "Cantonese · Traditional Chinese", status: "Chapter live", note: "A Cantonese naming tradition, a 2016 unification, and a history that cannot be reduced to script alone.", years: "1998—today", coreGame: "18 Nov 2016 · Sun / Moon" },
  { id: "tw", slug: "taiwan", flag: "TW", place: "Taiwan", local: "台灣", languages: "Mandarin · Traditional Chinese", status: "Chapter live", note: "Decades of Taiwan-specific anime and publishing history meet a coordinated Chinese-language game localization.", years: "1998—today", coreGame: "18 Nov 2016 · Sun / Moon" },
  { id: "cn", slug: "mainland-china", flag: "CN", place: "Mainland China", local: "中国大陆", languages: "Mandarin · Simplified Chinese", status: "Chapter live", note: "The mainland record of official entry, simplified-script terminology, games, cards, and media.", years: "2000s—today", coreGame: "18 Nov 2016 · Sun / Moon" },
  { id: "br", slug: "brazil", flag: "BR", place: "Brazil", local: "Brasil", languages: "Brazilian Portuguese", status: "Researching", note: "A long-running dub culture alongside games that historically arrived without Portuguese support.", years: "1999—today", coreGame: "Announced for 2027 · Winds / Waves" },
  { id: "vn", slug: "vietnam", flag: "VN", place: "Vietnam", local: "Việt Nam", languages: "Vietnamese", status: "Chapter live", note: "Japanese-rooted species names, Vietnamese-language media, and the English-name standard announced in May 2026.", years: "2002—today", coreGame: "No Vietnamese core-game edition" },
  { id: "in", slug: "india", flag: "IN", place: "India", local: "भारत", languages: "Hindi · Tamil · Telugu +", status: "Researching", note: "A multilingual broadcast and digital story now unfolding across official regional channels.", years: "2003—today", coreGame: "No regional-language core-game edition" },
  { id: "alt", slug: "unofficial", flag: "ALT", place: "Unofficial editions", local: "Parallel archive", languages: "Fan translations · bootlegs · ROM hacks", status: "Chapter live", note: "A carefully sourced index of unofficial routes that filled language gaps—and the locales where those stories belong.", years: "1990s—today", coreGame: "Context index · outside official chronology" },
];

const localeTimeline = [
  { year: 1996, label: "Japan", slug: "japan" },
  { year: 1998, label: "United States", slug: "united-states" },
  { year: 1998, label: "Hong Kong", slug: "hong-kong" },
  { year: 1998, label: "Taiwan", slug: "taiwan" },
  { year: 1998, label: "Mainland China", slug: "mainland-china" },
  { year: 1999, label: "Germany", slug: "germany" },
  { year: 1999, label: "France", slug: "france" },
  { year: 1999, label: "Italy", slug: "italy" },
  { year: 1999, label: "South Korea", slug: "south-korea" },
  { year: 1999, label: "Brazil", slug: "brazil" },
  { year: 2002, label: "Vietnam", slug: "vietnam" },
  { year: 2003, label: "India", slug: "india" },
  { year: 2027, label: "Future", slug: "future" },
];

const localeMedia: Record<string, { src: string; alt: string; kind: string }> = {
  jp: { src: "/exhibits/red-green.jpg", alt: "Japanese Pokémon Red and Green Game Boy boxes", kind: "Core game · 1996" },
  us: { src: "/exhibits/red-blue.jpg", alt: "Pokémon Red and Blue Game Boy boxes", kind: "Core game · 1998" },
  de: { src: "/exhibits/red-blue.jpg", alt: "Pokémon Red and Blue Game Boy boxes", kind: "Core game · 1999" },
  it: { src: "/exhibits/red-blue.jpg", alt: "Pokémon Red and Blue Game Boy boxes", kind: "Core game · 1999" },
  fr: { src: "/exhibits/red-blue.jpg", alt: "Pokémon Red and Blue Game Boy boxes", kind: "Core game · 1999" },
  kr: { src: "/exhibits/gold-silver-korea.jpg", alt: "Korean Pokémon Gold and Silver Game Boy Color boxes", kind: "Korean core game · 2002" },
  hk: { src: "/exhibits/sun-moon.jpg", alt: "Pokémon Sun and Moon double pack", kind: "Chinese core game · 2016" },
  tw: { src: "/exhibits/sun-moon.jpg", alt: "Pokémon Sun and Moon double pack", kind: "Chinese core game · 2016" },
  cn: { src: "/exhibits/sun-moon.jpg", alt: "Pokémon Sun and Moon double pack", kind: "Chinese core game · 2016" },
  br: { src: "/exhibits/winds-waves.jpg", alt: "Brazilian Portuguese announcement for Pokémon Winds and Waves", kind: "Core game · 2027" },
  vn: { src: "/exhibits/anime-original.jpg", alt: "Pokémon animated series poster", kind: "Anime archive" },
  in: { src: "/exhibits/anime-original.jpg", alt: "Pokémon animated series poster", kind: "Anime archive" },
};

const milestones = [
  { year: "1996", title: "The starting point", text: "Pocket Monsters Red and Green launch in Japan. The names, world, and wordplay begin in Japanese.", type: "Games" },
  { year: "1998", title: "A new English identity", text: "Pokémon Red and Blue and the animated series arrive in the United States—with a localized cast of names.", type: "Names" },
  { year: "2001", title: "A company for the wider world", text: "Pokémon USA, Inc. is established, later becoming part of The Pokémon Company International.", type: "Company" },
  { year: "2003", title: "A European foothold", text: "A London representative office is established as the brand's regional structure expands.", type: "Company" },
  { year: "2006", title: "Pokémon Korea", text: "Pokémon Korea, Inc. is established, creating a dedicated organization for the Korean market.", type: "Locale" },
  { year: "2013", title: "One worldwide release", text: "Pokémon X and Y become the core series' first simultaneous global launch.", type: "Games" },
  { year: "2016", title: "Nine languages in one game", text: "Pokémon Sun and Moon add Simplified and Traditional Chinese to the selectable game languages.", type: "Languages" },
  { year: "2020s", title: "The archive goes online", text: "Official regional channels bring dubbed episodes—and their publication dates—into a searchable public record.", type: "Anime" },
];

const types = ["All", "Names", "Games", "Anime", "Company", "Locale", "Languages"];

export default function Home() {
  const [query, setQuery] = useState("");
  const [activeType, setActiveType] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);

  const visibleLocales = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return locales;
    return locales.filter((locale) =>
      [locale.place, locale.local, locale.languages, locale.note, locale.coreGame].join(" ").toLowerCase().includes(q),
    );
  }, [query]);

  const visibleMilestones = activeType === "All" ? milestones : milestones.filter((item) => item.type === activeType);

  return (
    <main>
      <nav className="nav" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="Pokélingua home">
          <span className="brand-mark" aria-hidden="true"><i /></span>
          <span>Pokélingua</span>
        </a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle menu">Menu</button>
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <a href="#locales">Locales</a>
          <a href="#pokemon-search">Pokémon search</a>
          <a href="#timeline">Timeline</a>
          <a href="#locale-notes">Locale notes</a>
          <a href="#korea">Stories</a>
          <a href="#method">About the archive</a>
        </div>
        <a className="nav-cta" href="#locales">Explore the atlas <span>↗</span></a>
      </nav>

      <section className="hero-poster" id="top" aria-labelledby="hero-title">
        <h1 className="visually-hidden" id="hero-title">Pokélingua — One world. Many Pokémon.</h1>
        <Image
          className="hero-poster-image"
          src="/og.png"
          alt="A globe surrounded by Japanese, Spanish, French, Korean, Chinese, German, Thai, Italian, Portuguese, Arabic, and Russian labels."
          width={1731}
          height={909}
          priority
          sizes="100vw"
        />
        <div className="hero-poster-bar">
          <p>Tracing how names, stories, and creatures crossed borders—and what changed along the way.</p>
          <div className="hero-actions">
            <a className="primary-button" href="#locales">Explore by locale <span>↓</span></a>
            <a className="text-link" href="#timeline">Travel through time <span>→</span></a>
          </div>
          <span className="hero-period">Since 1996 · Across borders, screens & scripts</span>
        </div>
      </section>

      <section className="intro-section" id="locales">
        <div className="section-kicker">01 / The locale atlas</div>
        <div className="intro-grid">
          <h2>Language is only<br />the beginning.</h2>
          <div>
            <p>A locale is more than a translation. It is a particular meeting of language, territory, broadcaster, distributor, policy, and time.</p>
            <p>Each chapter follows those decisions—and preserves the versions that came before.</p>
            <p className="locale-order-note"><b>Archive order:</b> first localized core-series release. Locales without one follow announced editions, then earliest official market arrival.</p>
          </div>
        </div>
        <div className="locale-timeline" aria-label="Pokémon locale arrival timeline">
          <div className="locale-timeline-head"><span>1995</span><b>Locale arrivals</b><span>2027+</span></div>
          <div className="locale-timeline-track">
            {localeTimeline.map((item, index) => <a href={`/locales/${item.slug}`} className={`locale-timeline-node ${item.slug === "future" ? "future" : ""}`} style={{ "--position": `${((item.year - 1995) / 33) * 100}%`, "--lane-offset": `${[-50, 0, 50][index % 3]}px` } as React.CSSProperties} key={`${item.slug}-${item.year}`} aria-label={`${item.year}: ${item.label}`}><i /><span><b>{item.label}</b><small>{item.year}</small></span></a>)}
          </div>
          <p>Nodes mark the earliest documented official market arrival used by this exhibition; the Future node separates confirmed plans from evidence still under review.</p>
        </div>
        <label className="search-box">
          <span>⌕</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find a place, language, or script…" aria-label="Search locales" />
          <kbd>{visibleLocales.length} locales</kbd>
        </label>
        <div className="locale-grid">
          {visibleLocales.map((locale, index) => (
            <a className={`locale-card ${locale.id === "kr" ? "featured" : ""}`} href={`/locales/${locale.slug}`} key={locale.id} style={{ "--delay": `${index * 45}ms` } as React.CSSProperties}>
              <div className="locale-top"><span className="flag">{locale.flag}</span><span className={`status ${locale.status === "Chapter live" ? "live" : ""}`}>{locale.status}</span></div>
              {localeMedia[locale.id] && <figure className="locale-card-media"><img src={localeMedia[locale.id].src} alt={localeMedia[locale.id].alt} loading="lazy" /><figcaption>{localeMedia[locale.id].kind}</figcaption></figure>}
              <div className="locale-local">{locale.local}</div>
              <h3>{locale.place}</h3>
              <div className="locale-language">{locale.languages}</div>
              <div className="locale-game-release"><span>Core-series marker</span><b>{locale.coreGame}</b></div>
              <p>{locale.note}</p>
              <div className="locale-bottom"><span>{locale.years}</span><span>Read chapter ↗</span></div>
            </a>
          ))}
        </div>
        {visibleLocales.length === 0 && <div className="empty">That locale is not in this first research set—yet.</div>}
      </section>

      <GlobalPokemonSearch />

      <section className="story-section" id="korea">
        <div className="story-aside">
          <div className="section-kicker light">Featured locale / 001</div>
          <div className="hangul" aria-hidden="true">포켓몬</div>
          <div className="story-index">KR<br />37° N<br />127° E</div>
        </div>
        <article className="story-body">
          <div className="story-label"><span>대한민국</span> South Korea</div>
          <h2>A world that could not simply be imported.</h2>
          <p className="story-lede">When Pokémon first spread beyond Japan, South Korea was in the middle of deciding how Japanese popular culture could enter the country at all.</p>
          <div className="story-columns">
            <p>For decades, official imports of Japanese popular culture were restricted. In October 1998, the government announced the first stage of a gradual opening. Pokémon’s Korean history unfolded inside that larger cultural transition—not in a vacuum.</p>
            <p>That context helps explain why localization is not just a list of translated names. Distribution routes, Korean-language presentation, television, games, and eventually a dedicated local company all shaped what “Pokémon in Korea” became.</p>
          </div>
          <div className="fact-strip">
            <div><b>1998</b><span>First stage of Korea’s opening to Japanese popular culture</span></div>
            <div><b>2006</b><span>Pokémon Korea, Inc. established</span></div>
            <div><b>Now</b><span>A distinct locale across games, animation, events & retail</span></div>
          </div>
          <div className="source-row">
            <span>Sources for this excerpt</span>
            <a href="https://theme.archives.go.kr/next/chronology/archiveDetail.do?evntId=0049291994&flag=2" target="_blank" rel="noreferrer">National Archives of Korea ↗</a>
            <a href="https://corporate.pokemon.co.jp/en/aboutus/history" target="_blank" rel="noreferrer">The Pokémon Company ↗</a>
          </div>
          <a className="chapter-link" href="/locales/south-korea">Enter the complete South Korea chapter <span>→</span></a>
        </article>
      </section>

      <section className="notes-section" id="locale-notes">
        <div className="section-kicker">03 / When one language is not one locale</div>
        <div className="notes-head">
          <h2>The footnotes are<br /><em>part of the story.</em></h2>
          <p>Scripts, spoken languages, markets, and official labels do not always line up. Pokélingua marks the distinction at the moment it matters.</p>
        </div>

        <article className="case-study chinese-case">
          <div className="case-meta"><span>Case note 001</span><b>Chinese localization</b><small>Hong Kong · Taiwan · Mainland China</small></div>
          <div className="case-content">
            <div className="timestamp"><span>26</span><b>FEB<br />2016</b><small>23:00 HKT<br />announcement window</small></div>
            <div className="case-copy">
              <h3>Two scripts do not mean two spoken languages.</h3>
              <p>Pokémon Sun and Moon introduced both Simplified and Traditional Chinese text. But Hong Kong’s established Cantonese names did not map neatly onto a unified written standard designed to also serve Mandarin-speaking markets.</p>
              <div className="name-compare">
                <div><span>Hong Kong, established Cantonese</span><b>比卡超</b><small>bei-kaa-chiu</small></div>
                <div className="change-arrow">→</div>
                <div><span>Unified Chinese characters</span><b>皮卡丘</b><small>pí-kǎ-qiū in Mandarin<br />pei-kaa-jau in Cantonese</small></div>
              </div>
              <aside className="footnote"><sup>1</sup><p><b>Traditional Chinese is a writing system—not a synonym for Cantonese.</b> The same characters can be read differently across spoken varieties. That is why a written name selected for Mandarin can sound unlike “Pikachu” when read in Cantonese.</p></aside>
            </div>
          </div>
          <div className="social-moment">
            <div className="social-icon">f</div>
            <div><span className="social-label">A moment preserved / Facebook reaction</span><blockquote>“Pikachu is 比卡超, not 皮卡丘.”</blockquote><p>A campaign collected more than 6,000 signatures; fans filled Nintendo Hong Kong’s Facebook page with objections, followed by a street protest on 31 May 2016.</p></div>
            <a href="https://kotaku.com/hong-kong-pokemon-fans-protest-pikachus-name-change-1779471301" target="_blank" rel="noreferrer">View the contemporary report ↗</a>
          </div>
        </article>

        <article className="case-study iberia-case">
          <div className="case-meta"><span>Case note 002</span><b>Spanish & Portuguese</b><small>Europe · Latin America · Brazil</small></div>
          <div className="case-content">
            <div className="timestamp"><span>27</span><b>FEB<br />2025</b><small>official confirmation<br />Latin American Spanish</small></div>
            <div className="case-copy">
              <h3>A language option finally becomes a regional one.</h3>
              <p>For years, the core games’ “Spanish” meant the localization made for Spain. Spanish-language Red and Blue launched there in 1999, establishing Iberian vocabulary for moves, items, characters, and dialogue. Those editions were later distributed or made selectable more widely, but their register still addressed players in Spain.</p>
              <p>Latin American audiences had a different tradition: a regionally dubbed animated series from 1999, usually based on the English television adaptation, with its own voices and terminology. Players could therefore grow up hearing one Spanish Pokémon vocabulary on television while encountering English—or later Spain’s Spanish—inside the games. Differences such as <i>Placaje</i> versus <i>Tacleada</i>, region-specific idiom, and words carrying different meanings across the Atlantic made “Spanish already exists” an incomplete answer.</p>
              <p>Pokémon GO added Latin American Spanish in 2024; the Latin American TCG followed in March 2025; and Latin American Spanish became its own selectable core-game language with Pokémon Legends: Z-A on 16 October 2025. The distinction records two established audience histories, not a claim that either variety represents every speaker in its region.</p>
              <div className="locale-split">
                <div><i>ES-EU</i><b>Spanish for Spain</b><span>Longstanding core-game localization</span></div>
                <div><i>ES-LA</i><b>Latin American Spanish</b><span>Core games from Legends: Z-A</span></div>
                <div><i>PT-BR</i><b>Brazilian Portuguese</b><span>Announced for Winds & Waves in 2027</span></div>
                <div><i>PT-PT</i><b>European Portuguese</b><span>No core-game edition announced</span></div>
              </div>
              <figure className="case-artifact"><img src="/exhibits/legends-za.jpg" alt="Pokémon Legends Z-A box art" loading="lazy" /><figcaption>Core-game artifact · first Latin American Spanish edition · 2025</figcaption></figure>
              <aside className="footnote"><sup>2</sup><p><b>Spanish and Portuguese labels are product-specific.</b> An anime dub, website, trading card release, mobile game, and core game may each support a different set of locales at different dates. Pokélingua records the medium beside every language claim.</p></aside>
            </div>
          </div>
          <div className="social-moment video-moment">
            <div className="social-icon">▶</div>
            <div><span className="social-label">A moment preserved / YouTube · 16 Mar 2024</span><blockquote>“Pokémon games in Latin American Spanish after 25 years.”</blockquote><p>Campaign coverage by verified creator N Deluxe reached 21,000+ views and 1,800 likes—capturing the community milestone before the 2025 game-language rollout.</p></div>
            <a href="https://www.youtube.com/watch?v=8VU79bLuq3E" target="_blank" rel="noreferrer">Watch the archived moment ↗</a>
          </div>
          <div className="social-moment professional-moment"><div className="social-icon">in</div><div><span className="social-label">A decision preserved / LinkedIn · 27 Feb 2025</span><blockquote>“The main games and spin-offs…will have subtitles in Latin Spanish from launch.”</blockquote><p>Tomás Cortijo, The Pokémon Company International’s regional director for Latin America, described a localization team including people from across the region and publicly marked the transition from campaign to product policy.</p></div><a href="https://www.linkedin.com/posts/tomascortijo_pok%C3%A9mon-presents-2272025-activity-7301045323886415872-GPT1" target="_blank" rel="noreferrer">View the announcement post ↗</a></div>
        </article>
      </section>

      <section className="timeline-section" id="timeline">
        <div className="section-kicker">04 / Selected milestones</div>
        <div className="timeline-head"><h2>Not one timeline.<br /><em>Thousands of arrivals.</em></h2><p>Start with the company-wide landmarks, then filter by the kind of decision that changed Pokémon’s global shape.</p></div>
        <div className="filters" role="group" aria-label="Filter timeline">
          {types.map((type) => <button key={type} onClick={() => setActiveType(type)} className={activeType === type ? "active" : ""}>{type}</button>)}
        </div>
        <div className="timeline-list">
          {visibleMilestones.map((item) => (
            <article className="timeline-item" key={`${item.year}-${item.title}`}>
              <time>{item.year}</time><span className="timeline-dot" /><div><span className="event-type">{item.type}</span><h3>{item.title}</h3><p>{item.text}</p></div>
            </article>
          ))}
        </div>
        <p className="timeline-note">This first edition uses milestone dates from The Pokémon Company’s corporate history. Locale chapters will add broadcasts, releases, terminology changes, and official uploads—with day-level dates where the record allows.</p>
      </section>

      <section className="method-section" id="method">
        <div className="section-kicker light">05 / Built as a public record</div>
        <div className="method-grid">
          <h2>Every name has<br />a history.<br /><em>Every date needs<br />a source.</em></h2>
          <div className="principles">
            <div><span>01</span><h3>Locale, not just language</h3><p>Territory, script, distributor, platform, and audience stay attached to every record.</p></div>
            <div><span>02</span><h3>Versions are preserved</h3><p>A revised official name does not erase what fans encountered before it.</p></div>
            <div><span>03</span><h3>Evidence stays visible</h3><p>Official sources, archives, and reliable secondary research sit beside the claim.</p></div>
          </div>
        </div>
        <div className="manifesto">Not affiliated with or endorsed by Nintendo, Creatures, GAME FREAK, or The Pokémon Company. Pokélingua is an independent research and cultural-history project.</div>
      </section>

      <footer><a className="brand footer-brand" href="#top"><span className="brand-mark" aria-hidden="true"><i /></span><span>Pokélingua</span></a><p>A living atlas of Pokémon localization.</p><a href="https://github.com/andersaucy/pokelingua" target="_blank" rel="noreferrer">Open research, built in public ↗</a></footer>
    </main>
  );
}

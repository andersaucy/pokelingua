import type { Metadata } from "next";
import { notFound } from "next/navigation";

const chapters = {
  "south-korea": {
    code: "KR", place: "South Korea", local: "대한민국", language: "Korean · 한국어", period: "1998—today", live: true,
    deck: "How cultural policy, Korean-language media, and a dedicated regional company shaped a distinct Pokémon locale.",
  },
  france: { code: "FR", place: "France", local: "France", language: "French · français", period: "1999—today", live: false, deck: "The history of one of Pokémon’s most inventive name-localization traditions." },
  taiwan: { code: "TW", place: "Taiwan", local: "台灣", language: "Traditional Chinese · Mandarin", period: "1998—today", live: false, deck: "From established anime vocabulary to a coordinated Chinese-language game localization." },
  india: { code: "IN", place: "India", local: "भारत", language: "Hindi · Tamil · Telugu +", period: "2003—today", live: false, deck: "Pokémon across a multilingual broadcast market and a growing official digital archive." },
  brazil: { code: "BR", place: "Brazil", local: "Brasil", language: "Brazilian Portuguese", period: "1999—today", live: false, deck: "A major dub culture, a passionate fan base, and the late arrival of Portuguese in core games." },
  vietnam: { code: "VN", place: "Vietnam", local: "Việt Nam", language: "Vietnamese · Tiếng Việt", period: "1990s—today", live: false, deck: "A developing official vocabulary with recent naming decisions still being documented." },
} as const;

type Slug = keyof typeof chapters;

export function generateStaticParams() { return Object.keys(chapters).map((slug) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const chapter = chapters[slug as Slug];
  return chapter ? { title: `${chapter.place} — Pokélingua`, description: chapter.deck } : {};
}

function Researching({ chapter }: { chapter: (typeof chapters)[Exclude<Slug, "south-korea">] }) {
  return <>
    <section className="locale-placeholder">
      <div><span className="research-pulse" /> Chapter in research</div>
      <h2>This history deserves<br />more than a summary.</h2>
      <p>{chapter.deck}</p>
      <p>This URL is already part of the atlas. The published chapter will separate games, animation, names, websites, and regional releases—and attach a source and time marker to every milestone.</p>
      <a href="/#locales">Return to the locale atlas →</a>
    </section>
    <section className="research-board">
      <div><span>Research track 01</span><b>Earliest official arrival</b><p>Confirm the first licensed game, broadcast, card, and website dates independently.</p></div>
      <div><span>Research track 02</span><b>Naming system</b><p>Record original terms, revisions, pronunciations, and source-language relationships.</p></div>
      <div><span>Research track 03</span><b>Primary moments</b><p>Archive official announcements and representative contemporary social reactions.</p></div>
    </section>
  </>;
}

export default async function LocalePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const chapter = chapters[slug as Slug];
  if (!chapter) notFound();

  return <main className="locale-page">
    <nav className="nav locale-nav">
      <a className="brand" href="/"><span className="brand-mark" aria-hidden="true"><i /></span><span>Pokélingua</span></a>
      <a className="back-link" href="/#locales">← All locales</a>
      <span className="chapter-number">Locale chapter / {chapter.code}</span>
    </nav>
    <header className="locale-hero">
      <div className="locale-code">{chapter.code}</div>
      <div className="locale-title"><span>{chapter.local}</span><h1>{chapter.place}</h1><p>{chapter.deck}</p></div>
      <div className="locale-details"><div><span>Language context</span><b>{chapter.language}</b></div><div><span>Period in focus</span><b>{chapter.period}</b></div><div><span>Editorial state</span><b>{chapter.live ? "Chapter live · v0.1" : "Researching"}</b></div></div>
    </header>
    {!chapter.live ? <Researching chapter={chapter as (typeof chapters)[Exclude<Slug, "south-korea">]} /> : <>
      <section className="chapter-opening">
        <div className="chapter-rail"><span>Opening context</span><b>01</b></div>
        <article><p className="dropcap">Pokémon did not enter every market on equal terms. In South Korea, its arrival overlapped with a national re-evaluation of how Japanese popular culture could circulate after decades of restriction.</p><p>That policy history does not explain every localization choice. It does establish the conditions around them: what could be imported, through which channels, and when a Japanese franchise could openly present itself as Japanese.</p><aside><b>Editorial note</b><p>This chapter distinguishes the gradual opening of Japanese popular culture from individual Pokémon releases. A policy date is context—not automatically a Pokémon release date.</p></aside></article>
      </section>
      <section className="chapter-timeline">
        <div className="chapter-rail"><span>Time markers</span><b>02</b></div>
        <div className="chapter-events">
          <article><time>20 OCT<br />1998</time><div><span>Policy context</span><h2>The first opening</h2><p>South Korea announces the first stage of a gradual opening to Japanese popular culture. The National Archives describes an approach designed to proceed by category and in stages.</p><a href="https://theme.archives.go.kr/next/chronology/archiveDetail.do?evntId=0049291994&flag=2" target="_blank" rel="noreferrer">Primary record · National Archives of Korea ↗</a></div></article>
          <article><time>AUG<br />2006</time><div><span>Company structure</span><h2>A dedicated Korean company</h2><p>Pokémon Korea, Inc. is established. This is a corporate milestone rather than the beginning of all Korean Pokémon history—but it marks a new level of official regional organization.</p><a href="https://corporate.pokemon.co.jp/en/aboutus/history" target="_blank" rel="noreferrer">Official history · The Pokémon Company ↗</a></div></article>
          <article className="research-event"><time>DATE<br />QUEUE</time><div><span>Next evidence pass</span><h2>Games, broadcast, and names</h2><p>The next edition will independently date the earliest licensed animation, Korean game releases, naming standards, TCG distribution, websites, and official channel uploads.</p><b>Marked incomplete—no guessed dates</b></div></article>
        </div>
      </section>
      <section className="chapter-question">
        <div className="chapter-rail"><span>Why locale?</span><b>03</b></div>
        <article><h2>한국어 is the language.<br /><em>South Korea is the locale.</em></h2><p>The distinction lets this archive connect a Korean-language name to the specific product, territory, date, distributor, and audience that used it. If a term later changes—or appears differently in another Korean-speaking context—the earlier record remains visible.</p><div className="record-example"><span>Example record shape</span><code>locale: ko-KR<br />medium: animated television<br />term: [source pending]<br />valid_from: [date pending]<br />evidence: required</code></div></article>
      </section>
      <section className="chapter-sources"><span>Sources in this edition</span><a href="https://theme.archives.go.kr/next/chronology/archiveDetail.do?evntId=0049291994&flag=2" target="_blank" rel="noreferrer">01 · National Archives of Korea</a><a href="https://corporate.pokemon.co.jp/en/aboutus/history" target="_blank" rel="noreferrer">02 · The Pokémon Company corporate history</a><a href="/#locale-notes">Next: explore the Chinese and Spanish locale notes →</a></section>
    </>}
    <footer><a className="brand footer-brand" href="/"><span className="brand-mark" aria-hidden="true"><i /></span><span>Pokélingua</span></a><p>{chapter.place} / locale chapter</p><a href="/#locales">Continue exploring ↗</a></footer>
  </main>;
}

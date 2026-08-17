import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Name Routes — Pokélingua",
  description: "A visual exhibition of how Pokémon names travel through Japanese sound, English reference forms, local wordplay, Chinese characters, and changing regional policies.",
};

type RouteKind = "source" | "recreated" | "japanese" | "english" | "hanzi" | "mixed";

const routeFamilies: Array<{ kind: RouteKind; label: string; title: string; text: string; locales: string }> = [
  { kind: "recreated", label: "Meaning re-created", title: "New wordplay in a local language", text: "The sound can change completely while anatomy, behavior, humor, or another clue is rebuilt for a new audience.", locales: "United States · France · Germany" },
  { kind: "japanese", label: "Japanese sound carried forward", title: "Transcription rather than renaming", text: "A different writing system records the Japanese pronunciation. The original wordplay may become less transparent, but the spoken identity stays close.", locales: "Thailand · historical Vietnam · parts of Korea" },
  { kind: "english", label: "International / English reference", title: "One shared species vocabulary", text: "The English or international spelling is retained, pronounced locally, or represented in another script while the surrounding dialogue is translated.", locales: "Italy · Spain · Latin America · Brazil · Russia · Türkiye · current India · current Vietnam" },
  { kind: "hanzi", label: "Chinese character transcreation", title: "Sound, meaning, or both through hanzi", text: "Chinese names may approximate a sound, describe the creature, create a new compound, or combine those methods. Traditional and Simplified are script forms; Mandarin and Cantonese are spoken readings.", locales: "Hong Kong · Taiwan · Mainland China" },
  { kind: "mixed", label: "Mixed local system", title: "No single source wins", text: "Some catalogs combine local coinages, Japanese-derived forms, English-derived forms, shared international names, and revisions made at different moments.", locales: "South Korea · historical Hindi record" },
];

const localeRoutes: Array<{ locale: string; local: string; href: string; kind: RouteKind; route: string; note: string; history?: string }> = [
  { locale: "Japan", local: "日本", href: "/locales/japan", kind: "source", route: "Source vocabulary", note: "Japanese names supply the first sounds, concepts, puns, and visual clues." },
  { locale: "United States", local: "United States", href: "/locales/united-states", kind: "recreated", route: "English re-creation", note: "Most early species received new English names designed around their characteristics." },
  { locale: "France", local: "France", href: "/locales/france", kind: "recreated", route: "French re-creation", note: "A highly visible tradition of local compounds and wordplay." },
  { locale: "Germany", local: "Deutschland", href: "/locales/germany", kind: "recreated", route: "German re-creation", note: "Compounds frequently rebuild a creature clue inside the German name." },
  { locale: "Italy", local: "Italia", href: "/locales/italy", kind: "english", route: "International names retained", note: "Species spellings generally match English, with a small number of translated exceptions." },
  { locale: "Spain", local: "España", href: "/locales/spain", kind: "english", route: "International names retained", note: "The games translate the world around the creatures while generally sharing English species names." },
  { locale: "Latin America", local: "América Latina", href: "/locales/latin-america", kind: "english", route: "International names retained", note: "Its distinct Spanish media tradition generally keeps the international species layer." },
  { locale: "Brazil", local: "Brasil", href: "/locales/brazil", kind: "english", route: "English-rooted with exceptions", note: "Most media keeps English species names; some official categories, including Paradox Pokémon, have localized records." },
  { locale: "South Korea", local: "대한민국", href: "/locales/south-korea", kind: "mixed", route: "Mixed Korean system", note: "Korean coinages sit beside Japanese-derived, English-derived, and international forms." },
  { locale: "Hong Kong", local: "香港", href: "/locales/hong-kong", kind: "hanzi", route: "Hanzi · Cantonese reading", note: "Character names mix sound and meaning; older Cantonese media forms remain historically important.", history: "2016 coordination changed several established records." },
  { locale: "Taiwan", local: "台灣", href: "/locales/taiwan", kind: "hanzi", route: "Hanzi · Mandarin reading", note: "Traditional characters carry a coordinated Chinese name set, read through Taiwan Mandarin." },
  { locale: "Mainland China", local: "中国大陆", href: "/locales/mainland-china", kind: "hanzi", route: "Hanzi · Mandarin reading", note: "Simplified characters represent the coordinated Chinese names, with some later mainland-only revisions." },
  { locale: "Thailand", local: "ประเทศไทย", href: "/locales/thailand", kind: "japanese", route: "Japanese → Thai script", note: "Most official species names are orthographic transcriptions of their Japanese names." },
  { locale: "Vietnam", local: "Việt Nam", href: "/locales/vietnam", kind: "english", route: "English standard since 2026", note: "Current official content uses English species names.", history: "Earlier Vietnamese media commonly carried Japanese-rooted forms." },
  { locale: "Russia", local: "Россия", href: "/locales/russia", kind: "english", route: "English → Cyrillic", note: "The dub generally retains English-derived species identities and represents them in Cyrillic when needed." },
  { locale: "Türkiye", local: "Türkiye", href: "/locales/turkey", kind: "english", route: "International names retained", note: "Turkish presentation and dialogue coexist with the English species vocabulary." },
  { locale: "India overview", local: "भारत", href: "/locales/india", kind: "english", route: "English-based shared policy", note: "The current national policy aligns the language editions around English-based names." },
  { locale: "Hindi in India", local: "हिन्दी", href: "/locales/hindi-india", kind: "english", route: "English standard since 2025", note: "Hindi names were aligned with the English-based Tamil, Telugu, and Bengali record.", history: "A distinct Hindi name layer existed in supported services from 2023." },
  { locale: "Tamil in India", local: "தமிழ்", href: "/locales/tamil-india", kind: "english", route: "English-based species layer", note: "The dub remains Tamil while the shared species identities follow English." },
  { locale: "Telugu in India", local: "తెలుగు", href: "/locales/telugu-india", kind: "english", route: "English-based species layer", note: "The dub remains Telugu while the shared species identities follow English." },
];

const bulbasaurRoutes = [
  { code: "JP", script: "フシギダネ", reading: "Fushigidane", route: "source", origin: "fushigi · mysterious + tane · seed; also echoes “isn’t it strange?”" },
  { code: "EN", script: "Bulbasaur", reading: "English", route: "recreated", origin: "bulb + dinosaur" },
  { code: "FR", script: "Bulbizarre", reading: "French", route: "recreated", origin: "bulbe + bizarre" },
  { code: "DE", script: "Bisasam", reading: "German", route: "recreated", origin: "bizarr + Saurier + Samen" },
  { code: "ZH", script: "妙蛙種子", reading: "Miàowāzhǒngzǐ", route: "hanzi", origin: "wonderful + frog + seed" },
  { code: "TH", script: "ฟุชิกิดาเนะ", reading: "Fuchikidane", route: "japanese", origin: "the Japanese sound written in Thai script" },
  { code: "KO", script: "이상해씨", reading: "Isanghaessi", route: "mixed", origin: "strange + seed; a Korean re-creation" },
];

export default function NameRoutesPage() {
  return <main className="name-routes-page" id="top">
    <nav className="nav name-routes-nav" aria-label="Name routes navigation">
      <a className="brand" href="/" aria-label="Pokélingua home"><span className="brand-mark" aria-hidden="true"><i /></span><span>Pokélingua</span></a>
      <div className="nav-links"><a href="#routes">Routes</a><a href="#one-pokemon">One Pokémon</a><a href="#locale-ledger">All locales</a><a href="#reflection">Reflection</a></div>
      <a className="nav-cta" href="/#locales">Explore locales <span>↗</span></a>
    </nav>

    <header className="name-routes-hero">
      <div className="name-routes-index"><span>Comparative chapter / 02</span><b>名<br />NAME<br />이름</b><small>Sound · meaning · script · policy</small></div>
      <div className="name-routes-intro"><span>How a species identity travels</span><h1>Must a name<br /><em>make sense?</em></h1><p>Pokémon’s global catalogs answer that question in radically different ways. Some rebuild Japanese wordplay. Some preserve Japanese sound. Some inherit English. Some use characters to make a new bridge between sound and meaning.</p><div><a className="primary-button" href="#routes">Follow the routes <span>↓</span></a><a className="text-link" href="#reflection">Jump to the question <span>↗</span></a></div></div>
    </header>

    <section className="name-routes-correction">
      <div><span>Fact check / Chinese names</span><h2>Not “the same kanji.”<br /><em>Hanzi create another route.</em></h2></div>
      <article><p>Kanji is the Japanese term for Chinese characters used in Japanese. Chinese Pokémon names are written with <b>hanzi</b>, but they are not simply copied from the Japanese name: many Japanese species names are written in kana, and the Chinese catalog makes its own choices.</p><div className="hanzi-examples"><section><span>Sound-forward</span><b lang="zh-Hant">皮卡丘</b><small>Píkǎqiū · Pikachu</small><p>Characters approximate the familiar sound.</p></section><section><span>Meaning-forward</span><b lang="zh-Hant">小火龍</b><small>Xiǎohuǒlóng · Charmander</small><p>“Little fire dragon” describes the creature.</p></section><section><span>Compound</span><b lang="zh-Hant">妙蛙種子</b><small>Miàowāzhǒngzǐ · Bulbasaur</small><p>“Wonderful frog seed” creates a Chinese semantic image.</p></section></div><aside><b>One written standard, several spoken histories</b><p>The current catalog is coordinated across Traditional and Simplified Chinese, but Cantonese and Mandarin do not pronounce those characters alike. That is why Hong Kong, Taiwan, and mainland China remain separate locale chapters.</p></aside></article>
    </section>

    <section className="name-route-map" id="routes">
      <div className="name-route-map-head"><span>Route map / dominant tendencies</span><h2>One source.<br /><em>Five ways outward.</em></h2><p>These are curatorial groupings, not rigid language families. A single catalog can move between routes by species, generation, medium, or policy date.</p></div>
      <div className="name-route-board"><aside><span>Origin record</span><b>日本語</b><strong>Japanese names</strong><p>Sound, wordplay, visual concepts, and cultural references enter circulation.</p><i aria-hidden="true">→</i></aside><div>{routeFamilies.map((family) => <article className={`route-${family.kind}`} key={family.kind}><span>{family.label}</span><h3>{family.title}</h3><p>{family.text}</p><small>{family.locales}</small></article>)}</div></div>
    </section>

    <section className="one-pokemon-routes" id="one-pokemon">
      <div className="one-pokemon-head"><span>Controlled comparison / #0001</span><h2>Hold the creature still.<br /><em>Watch the strategy change.</em></h2><p>Bulbasaur demonstrates why “translated” and “not translated” are inadequate labels. Each route preserves a different part of the source name.</p></div>
      <div className="bulbasaur-route-grid">{bulbasaurRoutes.map((item) => <article className={`route-${item.route}`} key={item.code}><span>{item.code}</span><b lang={item.code === "ZH" ? "zh-Hant" : undefined}>{item.script}</b><small>{item.reading}</small><p>{item.origin}</p></article>)}</div>
      <a href="/#pokemon-search">Compare another Pokémon across the multilingual archive →</a>
    </section>

    <section className="locale-route-ledger" id="locale-ledger">
      <div className="locale-route-ledger-head"><div><span>Every published locale / current best classification</span><h2>The route ledger</h2></div><p>“Dominant route” describes the catalog’s broad present-day practice. It does not claim that every species follows it. Historical policy changes stay visible rather than being overwritten by the current standard.</p></div>
      <div className="locale-route-grid">{localeRoutes.map((item) => <a href={item.href} className={`locale-route-card route-${item.kind}`} key={item.href}><span>{item.locale}</span><h3>{item.local}</h3><b>{item.route}</b><p>{item.note}</p>{item.history && <small>{item.history}</small>}<i>Open locale →</i></a>)}</div>
      <div className="route-ledger-note"><b>Outside the classification</b><p>The Unofficial Editions chapter is evidence context rather than one standardized locale catalog. The Future chapter is also excluded until a released product establishes an observable naming practice.</p></div>
    </section>

    <section className="name-policy-evidence">
      <div><span>What the public record establishes</span><h2>Corporate choice is visible.<br /><em>Culture is harder to prove.</em></h2></div>
      <div className="policy-evidence-grid">
        <article><span>Documented</span><h3>Meaning was an explicit goal.</h3><p>Junichi Masuda explained that names such as Bulbasaur were recreated so players in each language could feel the meaning and nuance present in the Japanese name. Translators were treated as creators, not transcription machines.</p><a href="https://www.4gamer.net/games/451/G045125/20191112090/" target="_blank" rel="noreferrer">Read the Masuda interview ↗</a></article>
        <article><span>Documented</span><h3>The production route changed.</h3><p>Before the worldwide X and Y workflow, game scripts moved from Japanese to English and then into languages such as French and German. X and Y instead translated directly from Japanese into every supported language.</p><a href="https://iwataasks.nintendo.com/interviews/3ds/pokemonxy/0/0/" target="_blank" rel="noreferrer">Read Iwata Asks ↗</a></article>
        <article><span>Documented</span><h3>Consistency can outweigh local names.</h3><p>India’s 2025 policy aligned Hindi with English-based names already used across Tamil, Telugu, and Bengali. Vietnam announced the same English-name principle for future content in 2026.</p><div><a href="https://in.portal-pokemon.com/topics/pokemon_names_unified_across_india/" target="_blank" rel="noreferrer">India policy ↗</a><a href="https://vn.portal-pokemon.com/topics/post-5775/" target="_blank" rel="noreferrer">Vietnam policy ↗</a></div></article>
        <article className="inference-card"><span>Interpretation—not confirmed policy</span><h3>“Cultural affinity” is plausible, but insufficient.</h3><p>Japanese media familiarity, dub production routes, script conventions, trademarks, inherited merchandise, and audience recognition can all influence a name. Unless a source identifies the reason, Pokélingua records the route without inventing a corporate motive.</p></article>
      </div>
    </section>

    <section className="name-routes-reflection" id="reflection">
      <span>The question left open</span><blockquote>Did Pokémon<br /><em>have</em> to be renamed<br />for the West?</blockquote><div><p><b>Linguistically, no.</b> Thailand’s Japanese-rooted catalog proves that a vast audience can learn names whose internal wordplay is not transparent in its own language. Italy and Spain prove that translated games can retain a shared international species vocabulary.</p><p><b>Creatively, the early teams had a reason.</b> English, French, and German names attempted to make each creature immediately legible, memorable, and playful. That was not the only possible solution; it was one localization philosophy—and it became part of what Western Pokémon is.</p></div><strong>The comparison does not expose a mistake. It exposes a choice.</strong>
    </section>

    <section className="name-routes-sources"><span>Research trail</span><a href="https://www.4gamer.net/games/451/G045125/20191112090/" target="_blank" rel="noreferrer">01 · Masuda on preserving meaning</a><a href="https://iwataasks.nintendo.com/interviews/3ds/pokemonxy/0/0/" target="_blank" rel="noreferrer">02 · Localization workflow</a><a href="https://bulbapedia.bulbagarden.net/wiki/List_of_Chinese_Pok%C3%A9mon_names" target="_blank" rel="noreferrer">03 · Chinese name record</a><a href="https://bulbapedia.bulbagarden.net/wiki/List_of_Thai_Pok%C3%A9mon_names" target="_blank" rel="noreferrer">04 · Thai name record</a><a href="https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_South_Korea" target="_blank" rel="noreferrer">05 · Korean mixed system</a><a href="https://in.portal-pokemon.com/topics/pokemon_names_unified_across_india/" target="_blank" rel="noreferrer">06 · India policy</a><a href="https://vn.portal-pokemon.com/topics/post-5775/" target="_blank" rel="noreferrer">07 · Vietnam policy</a></section>

    <footer className="name-routes-footer"><a className="brand footer-brand" href="/"><span className="brand-mark" aria-hidden="true"><i /></span><span>Pokélingua</span></a><p>A living atlas of Pokémon localization.</p><a href="#top">Back to top ↑</a></footer>
  </main>;
}

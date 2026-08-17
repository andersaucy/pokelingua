import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EnglishUsPokedex } from "../../components/EnglishUsPokedex";
import { FrenchPokedex } from "../../components/FrenchPokedex";
import { GermanPokedex } from "../../components/GermanPokedex";
import { ItalianPokedex } from "../../components/ItalianPokedex";
import { JapanesePokedex } from "../../components/JapanesePokedex";
import { KoreanPokedex } from "../../components/KoreanPokedex";
import { LocalePokedex } from "../../components/LocalePokedex";
import { MediaLocalePokedex } from "../../components/MediaLocalePokedex";
import { SpanishPokedex } from "../../components/SpanishPokedex";
import { VietnamesePokedex } from "../../components/VietnamesePokedex";

const chapters = {
  unofficial: { code: "ALT", place: "Unofficial editions", local: "Fan translations · bootlegs · ROM hacks", language: "Multiple languages & markets", period: "1990s—today", live: true, deck: "The unofficial routes that carried Pokémon across language barriers before—or beyond—authorized localization." },
  "united-states": { code: "US", place: "United States", local: "United States", language: "English · en-US", period: "1998—today", live: true, deck: "The first international reinvention: how Japanese names, dialogue, branding, and animation became the English Pokémon vocabulary used around the world." },
  japan: { code: "JP", place: "Japan", local: "日本", language: "Japanese · 日本語", period: "1996—today", live: true, deck: "The source chapter: how Japanese names, games, animation, and company history created the vocabulary every later locale would interpret." },
  "south-korea": {
    code: "KR", place: "South Korea", local: "대한민국", language: "Korean · 한국어", period: "1998—today", live: true,
    deck: "How cultural policy, Korean-language media, and a dedicated regional company shaped a distinct Pokémon locale.",
  },
  france: { code: "FR", place: "France", local: "France", language: "French · français", period: "1998—today", live: true, deck: "How a Nintendo France team turned translation into wordplay—and built one of Pokémon’s most distinctive naming traditions." },
  germany: { code: "DE", place: "Germany", local: "Deutschland", language: "German · Deutsch", period: "1999—today", live: true, deck: "How German compounds and wordplay turned Pokémon concepts into a distinct creature vocabulary from the franchise’s first European wave." },
  italy: { code: "IT", place: "Italy", local: "Italia", language: "Italian · italiano", period: "1999—today", live: true, deck: "How Italy built a fully localized Pokémon world around mostly unchanged species names—and when it chose to translate them." },
  spain: { code: "ES", place: "Spain", local: "España", language: "Spanish · español (España)", period: "1999—today", live: true, deck: "The European Spanish game tradition: a fully localized world built around mostly shared international species names." },
  "latin-america": { code: "LAT", place: "Latin America", local: "América Latina", language: "Spanish · español (Latinoamérica)", period: "1999—today", live: true, deck: "A distinct regional dub tradition—and the 2025 arrival of Latin American Spanish as a selectable core-game language." },
  "hong-kong": { code: "HK", place: "Hong Kong", local: "香港", language: "Cantonese · Traditional Chinese", period: "1998—today", live: true, deck: "A Cantonese naming tradition, a 2016 unification, and a history that cannot be reduced to script alone." },
  taiwan: { code: "TW", place: "Taiwan", local: "台灣", language: "Mandarin · Traditional Chinese", period: "1998—today", live: true, deck: "From established anime vocabulary to a coordinated Chinese-language game localization." },
  "mainland-china": { code: "CN", place: "Mainland China", local: "中国大陆", language: "Mandarin · Simplified Chinese", period: "2000s—today", live: true, deck: "The mainland record of simplified-script terminology, official distribution, games, cards, and media." },
  india: { code: "IN", place: "India", local: "भारत", language: "Hindi · Tamil · Telugu +", period: "2003—today", live: false, deck: "Pokémon across a multilingual broadcast market and a growing official digital archive." },
  "hindi-india": { code: "HI", place: "Hindi in India", local: "हिन्दी", language: "Hindi · हिन्दी", period: "2003—today", live: true, deck: "From television’s Hindi debut to official digital channels and a documented change in Pokémon name policy." },
  "tamil-india": { code: "TA", place: "Tamil in India", local: "தமிழ்", language: "Tamil · தமிழ்", period: "2004—today", live: true, deck: "A regional dub history, its own official digital channel, and a naming practice tied to the English species vocabulary." },
  "telugu-india": { code: "TE", place: "Telugu in India", local: "తెలుగు", language: "Telugu · తెలుగు", period: "2004—today", live: true, deck: "A regional dub history, its own official digital channel, and a naming practice tied to the English species vocabulary." },
  thailand: { code: "TH", place: "Thailand", local: "ประเทศไทย", language: "Thai · ภาษาไทย", period: "2001—today", live: true, deck: "Japanese-rooted species names in Thai script, from television broadcasting to an official regional Pokédex and channel." },
  russia: { code: "RU", place: "Russia", local: "Россия", language: "Russian · русский", period: "2000—today", live: true, deck: "A Russian-language animation history built from the English adaptation, with retained species names and localized presentation." },
  turkey: { code: "TR", place: "Türkiye", local: "Türkiye", language: "Turkish · Türkçe", period: "2000—today", live: true, deck: "A Turkish television debut, a controversial interruption, and a later official return through games and digital animation." },
  brazil: { code: "BR", place: "Brazil", local: "Brasil", language: "Brazilian Portuguese · português brasileiro", period: "1998—2027+", live: true, deck: "From localized Red and Blue packaging and a landmark television dub to Brazilian Portuguese becoming a confirmed core-game language." },
  vietnam: { code: "VN", place: "Vietnam", local: "Việt Nam", language: "Vietnamese · Tiếng Việt", period: "2002—today", live: true, deck: "From Japanese-rooted species names in Vietnamese media to the English-name standard announced in May 2026." },
  future: { code: "FWD", place: "Future localizations", local: "Evidence watch", language: "Confirmed additions & unresolved possibilities", period: "2027—forward", live: true, deck: "A sourced watchlist separating announced language support from plausible—but unconfirmed—future localization paths." },
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
      <p>This URL is already part of the atlas. The published chapter will begin with an individual arrival brief, then separate games, animation, names, websites, and regional releases—with a source and time marker attached to every milestone.</p>
      <a href="/#locales">Return to the locale atlas →</a>
    </section>
    <section className="research-board">
      <div><span>Research track 01</span><b>Earliest official arrival</b><p>Confirm the first licensed game, broadcast, card, and website dates independently.</p></div>
      <div><span>Research track 02</span><b>Naming system</b><p>Record original terms, revisions, pronunciations, and source-language relationships.</p></div>
      <div><span>Research track 03</span><b>Primary moments</b><p>Archive official announcements and representative contemporary social reactions.</p></div>
    </section>
    <section className="research-library-status" id="name-library"><span>Name library status</span><h2>Not published yet.</h2><p>This chapter does not currently claim a complete locale-specific Pokémon name list. A searchable table will appear only after the naming policy and full record set can be verified; until then, the absence is labeled instead of being filled with assumed translations.</p></section>
  </>;
}

function ExhibitMedia({ src, alt, label, tilt = "right" }: { src: string; alt: string; label: string; tilt?: "left" | "right" }) {
  return <figure className={`exhibit-media ${tilt}`}><img src={src} alt={alt} loading="lazy" /><figcaption>{label}</figcaption></figure>;
}

const romanizationCopy = {
  japan: { script: "Kana → Latin letters", system: "Hepburn-style reading", text: "The name library uses Hepburn readings so visitors can sound out kana and compare Japanese names with their official trademarked Latin forms. Romanization is a reading layer: フシギダネ remains the Japanese name even when it is displayed as Fushigidane.", source: "https://www.loc.gov/catdir/cpso/romanization/romguide/Japanese-Romanization-Table-revised.pdf", sourceLabel: "Library of Congress Japanese romanization table" },
  "hong-kong": { script: "Traditional Chinese → Cantonese reading", system: "Yale-style table · Jyutping further study", text: "Pokélingua’s current name data uses the familiar Yale-style Cantonese spellings with diacritics and h marking lower tones. Jyutping is a different, highly systematic scheme created by the Linguistic Society of Hong Kong in 1993; it writes tones with numbers and is especially useful for dictionaries, teaching, and keyboard input.", source: "https://lshk.org/jyutping-scheme/", sourceLabel: "Linguistic Society of Hong Kong · Jyutping scheme" },
  taiwan: { script: "Traditional Chinese → Mandarin reading", system: "Hanyu Pinyin table · Wade–Giles context", text: "The table uses tone-marked Hanyu Pinyin for a consistent Mandarin reading. Taiwan’s real romanization landscape is wider: Wade–Giles remains visible in personal names, place names, and historical documents, alongside Hanyu Pinyin and other systems. These are alternate ways of representing sounds—not alternate Chinese spellings of the Pokémon.", source: "https://www.boca.gov.tw/cp-2-8194-ee028-1.html", sourceLabel: "Taiwan Bureau of Consular Affairs · four romanization systems" },
  "mainland-china": { script: "Simplified Chinese → Mandarin reading", system: "Hanyu Pinyin", text: "Tone-marked Hanyu Pinyin supplies the reading layer for the Simplified Chinese names. Tone marks matter: they record Mandarin pronunciation more precisely than an unmarked Latin spelling, while the Chinese characters remain the official name field.", source: "https://www.loc.gov/catdir/cpso/roman", sourceLabel: "Library of Congress Chinese romanization reference" },
  "south-korea": { script: "Hangul → Latin letters", system: "Revised Romanization + McCune–Reischauer", text: "The table puts Revised Romanization first and preserves McCune–Reischauer for comparison. The systems make different choices—eo versus ŏ is a familiar example—so two Latin forms can point to the same unchanged Hangul name. Event branding may introduce a third official-looking spelling.", source: "https://www.korean.go.kr/front_eng/roman/roman_01.do", sourceLabel: "National Institute of Korean Language · Revised Romanization" },
  thailand: { script: "Thai script → Latin letters", system: "Thai romanization reference", text: "Thai Pokémon usage is written in Thai script and often follows the sound of the Japanese species name. A Latin rendering such as Ashirene is an analytical reading aid, not a second official Pokémon name; different general-purpose Thai romanization tables may render details differently.", source: "https://www.loc.gov/catdir/cpso/roman", sourceLabel: "Library of Congress Thai romanization table" },
  russia: { script: "Cyrillic → Latin letters", system: "Russian transliteration", text: "Transliteration maps Cyrillic letters into Latin characters for searching and cataloging. It should not be confused with translating a name or with an exact pronunciation guide: the Russian dub can write an English-derived Pokémon name in Cyrillic while retaining the same species identity.", source: "https://www.loc.gov/catdir/cpso/roman", sourceLabel: "Library of Congress Russian romanization table" },
  "hindi-india": { script: "Devanagari → Latin letters", system: "Hindi romanization", text: "Romanization can make a Hindi-script title or dialogue searchable for readers who do not know Devanagari. Pokélingua keeps that aid separate from the current India-wide policy of using English-based species names; transliterating हिन्दी does not create a new species-name canon.", source: "https://www.loc.gov/catdir/cpso/roman", sourceLabel: "Library of Congress Hindi romanization table" },
  "tamil-india": { script: "Tamil script → Latin letters", system: "Tamil romanization", text: "Tamil romanization represents the script in Latin letters for comparison and discovery. It is not a substitute for Tamil spelling or performance, and it does not imply that the shared English-based Pokémon species names were independently translated.", source: "https://www.loc.gov/catdir/cpso/roman", sourceLabel: "Library of Congress Tamil romanization table" },
  "telugu-india": { script: "Telugu script → Latin letters", system: "Telugu romanization", text: "Telugu romanization is a bridge for reading and search, not a replacement for the Telugu script. The locale’s dub remains Telugu even when the current official species-name policy retains English-based forms.", source: "https://www.loc.gov/catdir/cpso/roman", sourceLabel: "Library of Congress Telugu romanization table" },
} as const;

type RomanizationLocale = keyof typeof romanizationCopy;

function RomanizationGuide({ locale }: { locale: RomanizationLocale }) {
  const copy = romanizationCopy[locale];
  return <section className={`romanization-guide romanization-${locale}`} id="romanization-guide">
    <div><span>Reading the script / further study</span><h2>{copy.system}</h2><b>{copy.script}</b></div>
    <article><p>{copy.text}</p><aside><b>Romanization is not renaming</b><p>It makes a non-Latin script searchable and pronounceable for more visitors. The script form remains the name of record, and multiple romanization systems can describe the same unchanged name.</p></aside><a href={copy.source} target="_blank" rel="noreferrer">{copy.sourceLabel} ↗</a></article>
    {locale === "taiwan" && <div className="wade-giles-fact"><span>Pokémon language fact / Generation IX</span><h3>Four English names preserve a Wade–Giles look.</h3><p>Wo-Chien, Chien-Pao, Ting-Lu, and Chi-Yu are formatted through Wade–Giles-style romanization. Their official Taiwan names are different Chinese character compounds, shown here with Hanyu Pinyin readings and the Chinese roots behind each English name.</p><div>{[
      { id: 1001, name: "Wo-Chien", chinese: "古簡蝸", pinyin: "Gǔjiǎnwō", roots: "蝸 wō + 簡 jiǎn", clue: "snail + bamboo slips" },
      { id: 1002, name: "Chien-Pao", chinese: "古劍豹", pinyin: "Gǔjiànbào", roots: "劍 jiàn + 豹 bào", clue: "sword + leopard" },
      { id: 1003, name: "Ting-Lu", chinese: "古鼎鹿", pinyin: "Gǔdǐnglù", roots: "鼎 dǐng + 鹿 lù", clue: "cauldron + deer" },
      { id: 1004, name: "Chi-Yu", chinese: "古玉魚", pinyin: "Gǔyùyú", roots: "鯽魚 jìyú + 玉 yù", clue: "crucian carp + jade" },
    ].map((item) => <section key={item.name}><img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.id}.png`} alt={`${item.name} sprite`} loading="lazy" /><b>{item.name}</b><strong lang="zh-Hant">{item.chinese}</strong><small>{item.pinyin} · official Taiwan name</small><p><span lang="zh-Hant">{item.roots}</span><em>{item.clue}</em></p></section>)}</div><a href="https://bulbapedia.bulbagarden.net/wiki/Chien-Pao_(Pok%C3%A9mon)#Name_origin" target="_blank" rel="noreferrer">Follow the Treasures of Ruin name-origin trail ↗</a></div>}
  </section>;
}

const chineseCopy = {
  "hong-kong": {
    eyebrow: "Cantonese is spoken. Traditional Chinese is written.",
    opening: "Hong Kong’s Pokémon history is not simply a Traditional Chinese edition of a Mandarin story. Established Cantonese names circulated through local animation and media, creating a vocabulary that sounded native when read aloud.",
    note: "In 2016, the move toward unified Chinese character names made the gap visible: the new written forms could be shared with other Chinese-language markets while producing very different sounds in Cantonese.",
    date: "26 FEB 2016", event: "Unified Chinese names announced", eventText: "Pokémon Sun and Moon’s Chinese-language announcement brought Simplified and Traditional Chinese into the core games and aligned many names across markets. Hong Kong reaction centered on what shared characters erased in Cantonese speech.",
    official: "https://www.pokemon.com.hk/",
    arrivalDate: "16 NOV 1998", arrivalTitle: "Pokémon reaches Hong Kong television", arrivalText: "The first episode of the animated series aired on TVB. This is the earliest documented mass-market arrival in this edition—not a claim that every Pokémon product became officially available that day.",
    recognitionDate: "2016", recognitionTitle: "A unified naming policy reaches the locale", recognitionText: "Chinese-language core games and unified character names made The Pokémon Company’s regional language strategy explicit, while the response revealed the strength of Hong Kong’s existing Cantonese vocabulary.",
    historySource: "https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_Hong_Kong",
    media: "/exhibits/chinese-sun-moon-traditional.jpg", mediaAlt: "Pokémon Sun and Moon regional boxes with Traditional Chinese titles", mediaLabel: "Traditional Chinese regional boxes · 2016",
  },
  taiwan: {
    eyebrow: "A Taiwan chapter, not a generic Traditional Chinese page.",
    opening: "Taiwan developed its own long-running Pokémon vocabulary through Mandarin-language animation, publishing, merchandise, and the older franchise label 神奇寶貝 (Shénqí Bǎobèi). Those memories remain part of the locale even when individual creature names match today’s unified Traditional Chinese forms.",
    note: "The library keeps Taiwan separate because identical characters do not imply identical distributors, broadcast histories, release dates, or audience experiences.",
    date: "26 FEB 2016", event: "Traditional Chinese enters the core games", eventText: "The Sun and Moon announcement established selectable Traditional Chinese in the core series. Taiwan’s current official Pokédex now provides a primary reference for present-day names.",
    official: "https://tw.portal-pokemon.com/play/pokedex",
    arrivalDate: "28 NOV 1998", arrivalTitle: "The animated series begins in Taiwan", arrivalText: "Episode one aired on CTV in Mandarin. This broadcast is the earliest documented broad public arrival in this edition and the beginning of a distinct Taiwan media history.",
    recognitionDate: "DEC 2022", recognitionTitle: "Pokémon Taiwan Co., Ltd. is established", recognitionText: "The creation of a dedicated Taiwan company marks a later form of formal regional investment. Pokémon Center Taipei followed in December 2023.",
    historySource: "https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_Taiwan",
    media: "/exhibits/chinese-sun-moon-traditional.jpg", mediaAlt: "Taiwan Pokémon Sun and Moon boxes with Traditional Chinese titles", mediaLabel: "Taiwan launch boxes · 2016",
  },
  "mainland-china": {
    eyebrow: "Simplified Chinese is the script. Mainland China is the locale.",
    opening: "Mainland China’s chapter follows more than character conversion. It records when official games, cards, merchandise, websites, and terminology entered a market with its own distribution and media environment.",
    note: "Most current creature names correspond directly with the unified Traditional Chinese list in simplified characters, but mainland-specific revisions and product timelines still require their own record. Sun and Moon did not receive a separate mainland retail package: the official Simplified Chinese site directed players to Japanese- or Traditional-Chinese-region software, where Simplified Chinese could be selected in-game.",
    date: "26 FEB 2016", event: "Simplified Chinese enters the core games", eventText: "Pokémon Sun and Moon announced Simplified Chinese as a selectable language. The official mainland Pokédex is now the primary reference for current simplified-script names.",
    official: "https://dex.pokemon.cn/play/pokedex",
    arrivalDate: "24 DEC 1998", arrivalTitle: "The animated series reaches mainland television", arrivalText: "The first episode aired on Shanghai’s OTV in Mandarin. Public recognition therefore predates official Chinese core games and later direct corporate investment by many years.",
    recognitionDate: "JUL 2020", recognitionTitle: "Pokémon Shanghai is established", recognitionText: "The Pokémon Company created a mainland subsidiary, signaling a new phase of direct local operation. Simplified Chinese TCG products followed in 2022, while game releases remained shaped by separate approval and distribution rules.",
    historySource: "https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_mainland_China",
    media: "/exhibits/chinese-sun-moon-simplified.jpg", mediaAlt: "Official Pokémon Sun and Moon launch artwork with Simplified Chinese titles", mediaLabel: "Official Simplified Chinese launch art · 2016",
  },
} as const;

function ChineseChapter({ locale }: { locale: keyof typeof chineseCopy }) {
  const copy = chineseCopy[locale];
  return <>
    <section className="arrival-brief">
      <div className="arrival-heading"><span>Arrival & recognition</span><h2>How Pokémon entered<br /><em>this locale.</em></h2><p>Public arrival and corporate recognition are different milestones. This chapter records both without treating either as the single moment Pokémon “began.”</p></div>
      <div className="arrival-markers">
        <article><time>{copy.arrivalDate}</time><span>Earliest mass-market arrival in this edition</span><h3>{copy.arrivalTitle}</h3><p>{copy.arrivalText}</p></article>
        <article><time>{copy.recognitionDate}</time><span>Later official recognition / investment</span><h3>{copy.recognitionTitle}</h3><p>{copy.recognitionText}</p></article>
      </div>
      <a href={copy.historySource} target="_blank" rel="noreferrer">Evidence trail for this locale ↗</a>
    </section>
    <section className="chapter-opening chinese-opening">
      <div className="chapter-rail"><span>Local perspective</span><b>01</b></div>
      <article><p className="dropcap">{copy.opening}</p><p>{copy.note}</p>{locale === "taiwan" && <figure className="perspective-artifact"><img src="/exhibits/taiwan-shenqibaobei-title.png" alt="Taiwanese Pokémon Best Wishes title card displaying the older 神奇寶貝 franchise label" loading="lazy" /><figcaption><b lang="zh-Hant">神奇寶貝</b><span>Shénqí Bǎobèi · Taiwan anime-era title card</span><a href="https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_Best_Wishes_Theme_Song" target="_blank" rel="noreferrer">Artifact record ↗</a></figcaption></figure>}<aside><b>Why this is its own locale</b><p>{copy.eyebrow} Pokélingua attaches every term to territory, spoken language, script, medium, and date instead of treating “Chinese” as one undifferentiated field.</p></aside></article>
    </section>
    <RomanizationGuide locale={locale} />
    {locale === "hong-kong" && <section className="locale-distinction hk-distinction">
      <div><span>Why Hong Kong remains separate</span><h2>Shared characters did not create<br /><em>a shared spoken name.</em></h2></div>
      <article><p>Hong Kong audiences had heard Pikachu as 比卡超—<i>bei-kaa-chiu</i>—through Cantonese animation and media since the late 1990s. The 2016 Chinese-language game policy standardized the written form as 皮卡丘 across Simplified and Traditional Chinese. That form approximates “Pikachu” in Mandarin, but reads very differently in Cantonese.</p><p>The dispute was therefore not a preference between two spellings of one pronunciation. It concerned whether a unified written standard should displace an established Cantonese cultural vocabulary. Fans petitioned Nintendo Hong Kong, posted objections to its Facebook page, and demonstrated outside the Japanese consulate.</p><div className="distinction-compare"><div><span>Established Hong Kong</span><b>比卡超</b><small>bei-kaa-chiu · Cantonese</small></div><div><span>Unified 2016 characters</span><b>皮卡丘</b><small>pí-kǎ-qiū · Mandarin<br />pei-kaa-jau · Cantonese</small></div></div><a href="https://www.hk01.com/%E7%A4%BE%E6%9C%83%E6%96%B0%E8%81%9E/23471/20%E4%BA%BA%E9%81%8A%E8%A1%8C%E6%8D%8D%E8%A1%9B-%E6%AF%94%E5%8D%A1%E8%B6%85-%E5%90%8D%E5%AD%97-%E6%8B%92%E7%B5%95-%E7%9A%AE%E5%8D%A1%E4%B8%98-%E5%86%80%E6%97%A5%E9%A0%98%E4%BA%8B%E6%AD%A3%E8%A6%96" target="_blank" rel="noreferrer">Contemporary Hong Kong protest report ↗</a></article>
    </section>}
    {locale === "mainland-china" && <section className="unofficial-context china-unofficial" id="unofficial-chinese-games">
      <div><span>Unofficial translation layer</span><time>BEFORE 2016</time></div>
      <article><h2>The language gap was already being filled.</h2><p>Before Sun and Moon delivered the first official Chinese core-game localization, Chinese-language ROM hacks and bootleg cartridges circulated widely. Their terminology was inconsistent and unauthorized, but their existence records sustained demand for games that players could read locally.</p><p>Pokélingua does not merge those names into the official Pokédex. It preserves them as context: the 2016 terminology arrived after years of unofficial translation practice, not into an empty market.</p><a href="https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_mainland_China" target="_blank" rel="noreferrer">Unofficial and official game history ↗</a></article>
    </section>}
    <section className="chapter-timeline">
      <div className="chapter-rail"><span>Time marker</span><b>02</b></div>
      <div className="chapter-events"><article><time>{copy.date.split(" ").map((part) => <span key={part}>{part}<br /></span>)}</time><div><span>Game language / naming policy</span><h2>{copy.event}</h2><p>{copy.eventText}</p><a href={copy.official} target="_blank" rel="noreferrer">Current official regional Pokédex ↗</a></div><ExhibitMedia src={copy.media} alt={copy.mediaAlt} label={copy.mediaLabel} /></article></div>
    </section>
    <LocalePokedex locale={locale} />
    <section className="chapter-sources"><span>Sources in this edition</span><a href={copy.official} target="_blank" rel="noreferrer">01 · Official regional Pokédex</a><a href={copy.historySource} target="_blank" rel="noreferrer">02 · Locale history</a><a href="https://bulbapedia.bulbagarden.net/wiki/List_of_Chinese_Pok%C3%A9mon_names" target="_blank" rel="noreferrer">03 · Chinese name-history index</a></section>
  </>;
}

function FrenchChapter() {
  return <>
    <section className="arrival-brief france-arrival">
      <div className="arrival-heading"><span>Mandate & arrival</span><h2>France was asked<br /><em>to make it local.</em></h2><p>The French edition was not a simple English-text conversion. Before launch, Nintendo France’s localization team argued that the creatures’ names should be rebuilt around French sound, meaning, humor, and cultural references.</p></div>
      <div className="arrival-markers">
        <article><time>1998</time><span>Localization mandate · exact day not yet documented</span><h3>The naming brief takes shape</h3><p>Later accounts by Julien Bardakoff place the first French name work in 1998. Nintendo initially hesitated to replace the Japanese or international names; the French localization argument won, creating room for names such as Bulbizarre, Salamèche, and Carapuce.</p></article>
        <article><time>05 SEP 1999</time><span>Earliest documented public arrival</span><h3>The animated series reaches France</h3><p>Fox Kids aired the first French episode a month before the Game Boy launch. This gave audiences Sacha, Pikachu, and the localized vocabulary as a spoken and televised system—not only a list inside a game.</p></article>
      </div>
      <a href="https://www.lemonde.fr/pixels/article/2016/11/23/de-pikachu-a-joey-stari-les-mille-et-une-manieres-de-baptiser-un-pokemon_5036514_4408996.html" target="_blank" rel="noreferrer">Localization account and naming argument ↗</a>
    </section>
    <section className="chapter-opening france-opening">
      <div className="chapter-rail"><span>Localization method</span><b>01</b></div>
      <article><p className="dropcap">French Pokémon names were designed to carry several ideas at once: the creature’s body, type, behavior, sound, and often a joke. Salamèche joins <i>salamandre</i> with <i>mèche</i>; Feunard folds fire and fox into a reference that still sounds like a proper name.</p><p>Julien Bardakoff is the best-known early localizer and describes leading the naming work for the first two generations. A contemporary 2000 report, however, names a five-person Nintendo France group—Bardakoff, Jean-Baptiste Fleury, Daniel Charbit, Nicolas Robert, and Nicolas Gourio—and says adapting the original 150 took six months.</p><aside><b>Editorial note</b><p>Pokélingua records individual testimony and collaborative credit together. One prominent translator can explain the method without becoming the sole author of every French name across every generation.</p></aside></article>
    </section>
    <section className="chapter-timeline france-timeline">
      <div className="chapter-rail"><span>Time markers</span><b>02</b></div>
      <div className="chapter-events">
        <article><time>1998</time><div><span>Naming policy</span><h2>Translation becomes adaptation</h2><p>The French case for translated species names is accepted. Rather than preserve every Japanese or English label, the team develops names that reproduce each creature’s idea through French vocabulary and wordplay. The surviving public accounts identify the year, but not an exact assignment day.</p><a href="https://www.lemonde.fr/pixels/article/2016/11/23/de-pikachu-a-joey-stari-les-mille-et-une-manieres-de-baptiser-un-pokemon_5036514_4408996.html" target="_blank" rel="noreferrer">Retrospective · Le Monde ↗</a></div></article>
        <article><time>08 OCT<br />1999</time><div><span>Core games / market launch</span><h2>Pokémon Rouge and Bleu arrive</h2><p>The French Game Boy editions put the localized names, attacks, characters, and places into players’ hands. The launch followed the first Fox Kids broadcast by roughly one month.</p><a href="https://www.jeuxvideo.com/news/1647727/anniversaire-pokemon-en-france-avant-ecarlate-violet-comment-j-ai-decouvert-la-serie-sur-nintendo-switch.htm" target="_blank" rel="noreferrer">France launch history ↗</a></div><ExhibitMedia src="/exhibits/red-blue.jpg" alt="Pokémon Red and Blue Game Boy boxes" label="Core-game exhibit · European launch" /></article>
        <article><time>29 DEC<br />2000</time><div><span>Contemporary record</span><h2>The localization team enters the archive</h2><p>Le Parisien profiles five Nintendo France localizers at the Cergy test center and reports that the first 150 adaptations took six months. It is unusually valuable evidence because it documents the work while the first-generation phenomenon was still new.</p><a href="https://www.leparisien.fr/archives/ils-ont-invente-les-noms-des-pokemon-29-12-2000-2001854436.php" target="_blank" rel="noreferrer">Contemporary profile · Le Parisien ↗</a></div></article>
        <article><time>GEN V<br />2011</time><div><span>Typography / game text</span><h2>French accents become visible</h2><p>Generations I–IV displayed species names without diacritics, turning Salamèche into SALAMECHE and Évoli into EVOLI inside the games. From Generation V onward, standard French spellings could appear in game text; the name library preserves both display states.</p><a href="https://bulbapedia.bulbagarden.net/wiki/List_of_French_Pok%C3%A9mon_names" target="_blank" rel="noreferrer">French spelling record ↗</a></div></article>
      </div>
    </section>
    <FrenchPokedex />
    <section className="chapter-sources"><span>Sources in this edition</span><a href="https://www.pokemon.com/fr/pokedex" target="_blank" rel="noreferrer">01 · Official French Pokédex</a><a href="https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_France" target="_blank" rel="noreferrer">02 · Pokémon in France</a><a href="https://bulbapedia.bulbagarden.net/wiki/List_of_French_Pok%C3%A9mon_names" target="_blank" rel="noreferrer">03 · French name index</a><a href="https://www.leparisien.fr/archives/ils-ont-invente-les-noms-des-pokemon-29-12-2000-2001854436.php" target="_blank" rel="noreferrer">04 · 2000 team profile</a></section>
  </>;
}

function UnitedStatesChapter() {
  return <>
    <section className="arrival-brief us-arrival">
      <div className="arrival-heading"><span>International debut & naming frame</span><h2>America received<br /><em>a newly named world.</em></h2><p>The United States was not simply another language stop. Its 1998 edition established the English names, terminology, slogan, and media presentation that would become source material for many later international localizations.</p></div>
      <div className="arrival-markers">
        <article><time>07 SEP 1998</time><span>Earliest national media arrival</span><h3>The animated series enters syndication</h3><p><i>Pokémon—I Choose You!</i> introduced Ash, Misty, Brock, and the English species names on American television. The broadcast arrived before the games, so many viewers first heard the localized vocabulary as dialogue and character performance.</p></article>
        <article><time>28 SEP 1998</time><span>First localized core-series release</span><h3>Pokémon Red and Blue launch</h3><p>North America became the franchise’s first market outside Japan to receive the core games. Red and Blue combined Japanese source material with an English script, new species names, adapted place names, and a coordinated marketing identity.</p></article>
      </div>
      <a href="https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_Red_and_Blue_Versions" target="_blank" rel="noreferrer">North American game and release record ↗</a>
    </section>
    <section className="chapter-opening us-opening">
      <div className="chapter-rail"><span>Localization method</span><b>01</b></div>
      <article><p className="dropcap">English naming aimed to make each creature immediately legible to American children. フシギダネ <i>Fushigidane</i> became Bulbasaur; ヒトカゲ <i>Hitokage</i> became Charmander. The new names compressed appearance, element, behavior, and wordplay into forms that could work across games, television, cards, toys, and playground conversation.</p><p>Contemporary participants describe a Nintendo of America naming group that worked from Game Freak’s creature concepts. Bill Giese and Sara Bush have discussed proposing names; Hiro Nakamura helped lead the broader U.S. localization. Nob Ogasawara translated the game text, but later stressed that the prominent all-capital terms—including species and character names—were handled separately.</p><aside><b>Editorial note</b><p>Pokélingua separates species naming, script translation, dubbing, and marketing credit. They formed one coordinated launch, but they were not necessarily written by the same people.</p></aside></article>
    </section>
    <section className="chapter-timeline us-timeline">
      <div className="chapter-rail"><span>Time markers</span><b>02</b></div>
      <div className="chapter-events">
        <article><time>27 FEB<br />1996</time><div><span>Source edition / Japan</span><h2>The original naming system begins</h2><p>Pokémon Red and Green launched in Japan with 151 Japanese species names. The U.S. edition would inherit the creatures and concepts two and a half years later, but not treat their names as an untouchable layer.</p><a href="https://corporate.pokemon.co.jp/en/aboutus/history/" target="_blank" rel="noreferrer">Official corporate history ↗</a></div></article>
        <article className="us-launch-event"><time>SEP<br />1998</time><div><span>English localization / coordinated launch</span><h2>Names become a transmedia system</h2><p>Television began on 7 September and Red and Blue followed on 28 September. Ash, Pallet Town, Pokédex terminology, “Gotta Catch ’Em All,” and the English species names were designed to circulate together rather than remain isolated inside a cartridge.</p><a href="https://time.com/6796536/history-origins-pokemon/" target="_blank" rel="noreferrer">U.S. localization history · TIME ↗</a></div><ExhibitMedia src="/exhibits/red-blue.jpg" alt="Pokémon Red and Blue Game Boy boxes" label="Core-game artifact · 1998" /></article>
        <article><time>FEB<br />2001</time><div><span>Company structure</span><h2>Pokémon USA is established</h2><p>The creation of Pokémon USA, Inc.—later part of The Pokémon Company International—gave the franchise a dedicated American organization. English-language stewardship was becoming permanent infrastructure rather than a single launch project.</p><a href="https://corporate.pokemon.co.jp/en/aboutus/history/" target="_blank" rel="noreferrer">Official company history ↗</a></div></article>
        <article><time>12 OCT<br />2013</time><div><span>Worldwide release model</span><h2>English no longer waits for Japan</h2><p>Pokémon X and Y became the first core-series titles released simultaneously worldwide. The U.S. edition moved from delayed export to one selectable language inside a coordinated global launch.</p><a href="https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_X_and_Y" target="_blank" rel="noreferrer">Worldwide release record ↗</a></div></article>
      </div>
    </section>
    <EnglishUsPokedex />
    <section className="chapter-sources"><span>Sources in this edition</span><a href="https://www.pokemon.com/us/pokedex" target="_blank" rel="noreferrer">01 · Official U.S. Pokédex</a><a href="https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_Red_and_Blue_Versions" target="_blank" rel="noreferrer">02 · Red and Blue release record</a><a href="https://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_in_Japanese" target="_blank" rel="noreferrer">03 · Japanese name index</a><a href="https://time.com/6796536/history-origins-pokemon/" target="_blank" rel="noreferrer">04 · U.S. localization oral history</a><a href="https://www.youtube.com/watch?v=YZ0xJ1x5kMA" target="_blank" rel="noreferrer">05 · Nob Ogasawara interview</a></section>
  </>;
}

function SpanishChapter({ locale }: { locale: "spain" | "latin-america" }) {
  const isLatam = locale === "latin-america";
  return <>
    <section className={`arrival-brief ${isLatam ? "latam-arrival" : "spain-arrival"}`}>
      <div className="arrival-heading"><span>Arrival & regional frame</span><h2>{isLatam ? <>The dub came first.<br /><em>The game language followed.</em></> : <>Spain built the first<br /><em>Spanish game world.</em></>}</h2><p>{isLatam ? "Pokémon had a Latin American Spanish voice, audience, and vocabulary from 1999, but its core games continued to offer the Spain-oriented Spanish edition for more than twenty-five years. Legends: Z-A made Latin American Spanish separately selectable in 2025." : "Pokémon Red and Blue gave Spain a Spanish-language core-game edition in 1999. That localization became the franchise’s long-running game-Spanish reference, distinct from the Latin American dub tradition developing at the same time."}</p></div>
      <div className="arrival-markers">
        <article><time>{isLatam ? "26 APR 1999" : "05 OCT 1999"}</time><span>{isLatam ? "Official anime arrival" : "First Spanish-language core games"}</span><h3>{isLatam ? "The regional dub begins" : "Rojo and Azul launch in Spain"}</h3><p>{isLatam ? "The animated series entered the region through a Latin American Spanish adaptation with its own cast, register, titles, and broadcast history." : "The Spanish editions localized dialogue, moves, items, places, and story text while retaining most English species spellings."}</p></article>
        <article><time>{isLatam ? "16 OCT 2025" : "20 DEC 1999"}</time><span>{isLatam ? "First selectable core-game locale" : "Official anime arrival"}</span><h3>{isLatam ? "Legends: Z-A adds Latin American Spanish" : "The Spain dub reaches television"}</h3><p>{isLatam ? "Nintendo’s Mexico listing names Español (América Latina) separately among the supported languages, making the regional distinction visible inside the game itself." : "Spain received a separate Spanish dub rather than importing the Latin American adaptation, reinforcing two parallel media-localization traditions."}</p></article>
      </div>
      <a href={isLatam ? "https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_Latin_America" : "https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_Spain"} target="_blank" rel="noreferrer">Locale history and release record ↗</a>
    </section>
    <section className="chapter-opening spanish-opening">
      <div className="chapter-rail"><span>Why two localizations</span><b>01</b></div>
      <article><p className="dropcap">“Spanish” describes a shared language, not one interchangeable audience edition. Spain and Latin America differ in everyday vocabulary, pronouns, idiom, voice casting, broadcast infrastructure, ratings, marketing, and expectations about natural dialogue.</p><p>{isLatam ? "For decades, Latin American viewers heard a regionally adapted anime while game players selected the Spain-oriented Spanish text. The addition of a separate Latin American option acknowledges that those traditions are related but not equivalent." : "The Spain game translation became established before a Latin American core-game option existed. Its longevity explains why European Spanish appears earlier on the core-game timeline even though Latin America’s anime history began months earlier."}</p><aside><b>Names are only one layer</b><p>Most species spellings match across the two Spanish editions. The locale distinction is clearest in dialogue, terminology, register, dubbing, distribution, and time—not in forcing every Pokémon to have two different names.</p></aside></article>
    </section>
    <section className="chapter-timeline spanish-timeline">
      <div className="chapter-rail"><span>Time markers</span><b>02</b></div>
      <div className="chapter-events">
        {isLatam ? <>
          <article><time>26 APR<br />1999</time><div><span>Animation / regional localization</span><h2>A Latin American voice precedes a game option</h2><p>The regional anime adaptation established a recognizable Latin American Pokémon vocabulary and performance tradition long before the core series acknowledged the locale in its language menu.</p><a href="https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_Latin_America" target="_blank" rel="noreferrer">Broadcast history ↗</a></div></article>
          <article><time>16 OCT<br />2025</time><div><span>Core games / selectable language</span><h2>Latin American Spanish enters the game</h2><p>Leyendas Pokémon: Z-A lists Español and Español (América Latina) as separate supported languages. The official es-mx site also uses regional forms such as Ciudad Luminalia, making the localization visible beyond the menu label.</p><a href="https://www.nintendo.com/es-mx/store/products/pokemon-legends-z-a-switch/" target="_blank" rel="noreferrer">Nintendo Mexico language listing ↗</a></div><ExhibitMedia src="/exhibits/legends-za-latam.jpg" alt="Latin American retail cover for Pokémon Legends Z-A" label="Latin American retail edition · 2025" /></article>
        </> : <>
          <article><time>05 OCT<br />1999</time><div><span>Core games / Spain</span><h2>Spanish becomes playable</h2><p>Pokémon Edición Roja and Edición Azul began the core series’ European Spanish lineage. This is the milestone used to position Spain on the homepage’s game timeline.</p><a href="https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_Spain" target="_blank" rel="noreferrer">Spain release record ↗</a></div><ExhibitMedia src="/exhibits/spanish-red.jpg" alt="Spanish Pokémon Edición Roja Game Boy box" label="Spanish core-game box · 1999" tilt="left" /></article>
          <article><time>20 DEC<br />1999</time><div><span>Animation / Spain dub</span><h2>A separate television adaptation follows</h2><p>Spain’s television edition developed independently from the Latin American dub. The two audiences could therefore share species spellings while hearing different scripts, performances, and regional language choices.</p><a href="https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_Spain" target="_blank" rel="noreferrer">Spain broadcast record ↗</a></div></article>
        </>}
      </div>
    </section>
    {isLatam && <section className="locale-distinction spanish-distinction"><div><span>A contemporary marker</span><h2>The distinction became<br /><em>visible—and shareable.</em></h2></div><article><p>The 2025 localization announcement mattered because fans had spent years asking why a franchise with a major Latin American audience supplied a Spain-oriented game script but a regionally adapted anime. The official language listing is the decisive product evidence; a localization contributor’s contemporary post preserves how the moment was presented by someone involved.</p><a href="https://www.linkedin.com/posts/tomascortijo_pok%C3%A9mon-presents-2272025-activity-7301045323886415872-GPT1" target="_blank" rel="noreferrer">Representative localization announcement post ↗</a></article></section>}
    <SpanishPokedex locale={locale} />
    <section className="chapter-sources"><span>Sources in this edition</span><a href="https://bulbapedia.bulbagarden.net/wiki/List_of_Spanish_Pok%C3%A9mon_names" target="_blank" rel="noreferrer">01 · Spanish name index</a><a href={isLatam ? "https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_Latin_America" : "https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_Spain"} target="_blank" rel="noreferrer">02 · Locale history</a><a href={isLatam ? "https://www.nintendo.com/es-mx/store/products/pokemon-legends-z-a-switch/" : "https://legends.pokemon.com/es-es/news/release-date"} target="_blank" rel="noreferrer">03 · Official regional game record</a></section>
  </>;
}

function ItalianChapter() {
  return <>
    <section className="arrival-brief italy-arrival">
      <div className="arrival-heading"><span>Arrival & naming frame</span><h2>Italy translated<br /><em>everything around the name.</em></h2><p>Pokémon entered Italy through localized Game Boy editions in autumn 1999, then became a television phenomenon in January 2000. The games, dialogue, places, moves, and media were Italian—even while nearly every species kept its English spelling.</p></div>
      <div className="arrival-markers">
        <article><time>05 OCT 1999</time><span>Earliest documented franchise arrival</span><h3>Pokémon Rosso and Blu launch</h3><p>The Italian Game Boy editions mark the franchise’s first official release in the locale. Their titles and game text were translated, but Bulbasaur, Charmander, Squirtle, and the rest of the species arrived under the English international names.</p></article>
        <article><time>10 JAN 2000</time><span>Mass-market television arrival</span><h3>Episode one airs on Italia 1</h3><p><i>L’inizio di una grande avventura</i> introduced the animated series through Mediaset’s Italia 1. The dub retained the English adaptation’s character and species names while giving the show an Italian script, cast, and musical identity.</p></article>
      </div>
      <a href="https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_Italy" target="_blank" rel="noreferrer">Italy release, broadcast, and dubbing record ↗</a>
    </section>
    <section className="chapter-opening italy-opening">
      <div className="chapter-rail"><span>Naming method</span><b>01</b></div>
      <article><p className="dropcap">Italian localization made a durable distinction between spelling and speech. Most species names are written exactly as in English, but Italian references describe them as pronounced in a way that approximates the English sound through Italian phonology: Pikachu, for example, becomes roughly <i>pìcaciu</i>.</p><p>This is not an absence of localization. The same editions translate moves, abilities, items, locations, dialogue, Pokédex prose, episode titles, and human character names. Species spellings occupy a protected international layer inside an otherwise Italian world.</p><aside><b>The exception reveals the rule</b><p>Only 21 of the first 1,025 species have a spelling distinct from English: Tipo Zero and 20 Paradox Pokémon. Their descriptive, title-like construction invited translation in a way conventional proper names did not.</p></aside></article>
    </section>
    <section className="chapter-timeline italy-timeline">
      <div className="chapter-rail"><span>Time markers</span><b>02</b></div>
      <div className="chapter-events">
        <article><time>05 OCT<br />1999</time><div><span>Core games / naming policy in use</span><h2>An Italian game, international species names</h2><p>Pokémon Rosso and Blu establish the pattern that still defines the locale: translated product text paired with English species spellings. The choice makes Italian notably different from French and German, which rebuilt most names in their own languages.</p><a href="https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_Italy" target="_blank" rel="noreferrer">Italy franchise record ↗</a></div><ExhibitMedia src="/exhibits/red-blue.jpg" alt="Pokémon Red and Blue Game Boy boxes" label="Core-game exhibit · Italian launch" tilt="left" /></article>
        <article><time>2000—<br />2008</time><div><span>Animation / musical localization</span><h2>Italian television creates its own sound</h2><p>During Mediaset’s first ten seasons, the Italian dub used nine locally created themes, including one for Pokémon Chronicles. Bulbapedia identifies Italy as the only dub outside Asia—apart from English—to create original music for the animated series.</p><a href="https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_Italy#Music" target="_blank" rel="noreferrer">Italian music and broadcast record ↗</a></div></article>
        <article className="italy-exception-event"><time>23 NOV<br />2016</time><div><span>Generation VII / first name exception</span><h2>Type: Null becomes Tipo Zero</h2><p>Pokémon Sole and Luna introduced the first species whose official Italian spelling differs from English. Tipo Zero translates the constructed designation rather than treating it like an ordinary proper name, opening a very narrow exception to the long-running policy.</p><a href="https://www.pokemon.com/it/pokedex/silvally" target="_blank" rel="noreferrer">Official Italian Pokédex record ↗</a></div></article>
        <article className="italy-exception-event"><time>18 NOV<br />2022</time><div><span>Generation IX / translated name family</span><h2>The Paradox Pokémon expand the exception</h2><p>Pokémon Scarlatto and Violetto gave Italian descriptive names to the Paradox species: Great Tusk became Grandizanne, Iron Treads became Solcoferreo, and the pattern continued through the later Paldea additions. Koraidon and Miraidon kept their international spellings.</p><a href="https://www.pokemon.com/it/novita/affronta-grandizanne-e-solcoferreo-nei-raid-teracristal" target="_blank" rel="noreferrer">Official names and release record ↗</a></div></article>
      </div>
    </section>
    <ItalianPokedex />
    <section className="chapter-sources"><span>Sources in this edition</span><a href="https://www.pokemon.com/it/pokedex" target="_blank" rel="noreferrer">01 · Official Italian Pokédex</a><a href="https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_Italy" target="_blank" rel="noreferrer">02 · Pokémon in Italy</a><a href="https://bulbapedia.bulbagarden.net/wiki/List_of_Italian_Pok%C3%A9mon_names" target="_blank" rel="noreferrer">03 · Italian name index</a><a href="https://www.pokemon.com/it/pokedex/silvally" target="_blank" rel="noreferrer">04 · Tipo Zero official record</a><a href="https://www.pokemon.com/it/novita/affronta-grandizanne-e-solcoferreo-nei-raid-teracristal" target="_blank" rel="noreferrer">05 · Paradox names official record</a></section>
  </>;
}

function VietnamChapter() {
  return <>
    <section className="arrival-brief vietnam-arrival">
      <div className="arrival-heading"><span>Arrival & naming frame</span><h2>Vietnam localized<br /><em>the world around the names.</em></h2><p>Pokémon reached Vietnamese audiences through television and publishing in the early 2000s. For much of the official record, Vietnamese dialogue and terminology surrounded species names romanized from Japanese rather than newly translated into Vietnamese.</p></div>
      <div className="arrival-markers">
        <article><time>2002</time><span>Earliest documented television arrival · exact day pending</span><h3>The original series reaches VTV3</h3><p>The national broadcaster carried the original series as a Vietnamese voice-over translation. A later VTV retrospective confirms that Pokémon had previously appeared in VTV3’s children’s programming; Bulbapedia’s broadcast record dates that first run to 2002.</p></article>
        <article><time>2003</time><span>Licensed publishing</span><h3>Pokémon Adventures enters print</h3><p>Kim Đồng Publishing House licensed and translated the manga, publishing volumes 1–12 before the first run ended. Print and television therefore formed separate early routes into the locale, each with its own translation choices.</p></article>
      </div>
      <a href="https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_Vietnam" target="_blank" rel="noreferrer">Vietnam franchise and broadcast record ↗</a>
    </section>
    <section className="chapter-opening vietnam-opening">
      <div className="chapter-rail"><span>Naming method</span><b>01</b></div>
      <article><p className="dropcap">A Vietnamese Pokémon name was often neither an English import nor a Vietnamese descriptive translation. Official anime, merchandise, social media, and web material largely rendered the Japanese species name in Latin letters: Bulbasaur became Fushigidane, Charmander became Hitokage, while Pikachu remained Pikachu.</p><p>That made Vietnam a distinct naming locale even though the spellings often pointed back to Japan. The Vietnamese language shaped dialogue, moves, abilities, items, and surrounding descriptions; the species-name layer followed a different policy.</p><aside><b>Editorial note</b><p>Pokélingua labels these as earlier Vietnam-market spellings—not “Vietnamese translations.” Most are romanizations of Japanese names, and four documented forms—Mizugrou, Peplipper, Kewassu, and Shigarogo—depart notably from the corresponding Japanese romanizations.</p></aside></article>
    </section>
    <section className="unofficial-context vietnamese-crystal" id="unofficial-vietnamese-crystal">
      <div><span>Bootleg folklore / translation relay</span><time>c. 2001</time></div>
      <article><h2>“Vietnamese Crystal” was not actually Vietnamese.</h2><p>The infamous cartridge earned its nickname because a copy was reportedly purchased in Vietnam. Its game text is English—not Vietnamese—and researchers believe it most likely passed from the original Japanese through an unlicensed Chinese translation and then into broken English.</p><p>Each relay compounded errors until Pokémon became “elf,” ordinary dialogue produced lines such as “I am a monster,” and a household meal became the internet-famous “Volcano Bakemeat.” The joke is also a useful warning: a cartridge’s sales location, language, translation path, and nickname are four different pieces of evidence.</p><aside><b>Archive status</b><p>Unofficial, origin uncertain, and excluded from the official Vietnamese name table. It belongs here because bootlegs were one way Pokémon crossed language borders when authorized local editions did not exist.</p></aside><a href="https://ecruteakforest.com/vietcrystal" target="_blank" rel="noreferrer">Translation-chain investigation ↗</a>
      </article>
    </section>
    <section className="chapter-timeline vietnam-timeline">
      <div className="chapter-rail"><span>Time markers</span><b>02</b></div>
      <div className="chapter-events">
        <article><time>25 JAN<br />2014</time><div><span>Animation / full dub</span><h2>Black & White begins on HTV3</h2><p>After an audience poll, HTV3 launched a Vietnamese dub based directly on the Japanese version. Characters and Pokémon retained Japanese names while moves, abilities, and items were translated into Vietnamese—a clear record of the locale’s layered naming method.</p><a href="https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_Vietnam" target="_blank" rel="noreferrer">Broadcast and dub record ↗</a></div><ExhibitMedia src="/exhibits/anime-original.jpg" alt="Pokémon animated series exhibit poster" label="Anime localization exhibit" /></article>
        <article><time>28 SEP<br />2015</time><div><span>National television / XY</span><h2>Pokémon returns on VTV2</h2><p>VTV2 introduced Pokémon the Series: XY in its children’s “Giờ ra chơi” block. The broadcaster described the licensed return as a reunion for viewers who remembered the earlier VTV3 run.</p><a href="https://vtv.vn/goc-khan-gia/hom-nay-28-9-pokemon-tro-lai-tren-song-vtv2-20150928154959873.htm" target="_blank" rel="noreferrer">Contemporary announcement · VTV ↗</a></div></article>
        <article><time>17 MAY<br />2019</time><div><span>Digital archive / episode one</span><h2>The original journey is dubbed online</h2><p>POPS Kids began uploading the original series from episode 1. Unlike the early VTV3 voice-over, this edition was dubbed into Vietnamese from the Japanese version, turning a foundational broadcast memory into an on-demand archive.</p><a href="https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_Vietnam" target="_blank" rel="noreferrer">Upload history ↗</a></div></article>
        <article className="vietnam-policy-event"><time>25 MAY<br />2026</time><div><span>Official naming policy</span><h2>English names become the national standard</h2><p>The official Pokémon Vietnam site announced that all future Pokémon content and services in Vietnam would consistently use the English species names. The notice explicitly acknowledged fans attached to the earlier names while establishing a new forward-looking standard.</p><a href="https://vn.portal-pokemon.com/topics/post-5775/" target="_blank" rel="noreferrer">Primary announcement · Pokémon Vietnam ↗</a></div></article>
        <article><time>30 MAY<br />2026</time><div><span>Animation / policy in use</span><h2>Horizons arrives on VTV2</h2><p>Pokémon Horizons: The Series premiered in Vietnamese as <i>Pokémon: Chân Trời Mới</i>. The dub uses English species names—Sprigatito and Fuecoco—putting the new naming policy into a mass-broadcast context five days after its announcement.</p><a href="https://vtv.gov.vn/news/vtv-voi-khan-gia/pokemon-tro-lai-tren-song-vtv2-voi-hanh-trinh-phieu-luu-moi-hap-dan" target="_blank" rel="noreferrer">Broadcast record · VTV ↗</a></div><ExhibitMedia src="/exhibits/anime-original.jpg" alt="Pokémon animated series exhibit poster" label="Anime policy exhibit · 2026" tilt="left" /></article>
      </div>
    </section>
    <VietnamesePokedex />
    <section className="chapter-sources"><span>Sources in this edition</span><a href="https://vn.portal-pokemon.com/topics/post-5775/" target="_blank" rel="noreferrer">01 · Official 2026 naming notice</a><a href="https://vn.portal-pokemon.com/play/pokedex" target="_blank" rel="noreferrer">02 · Current official Pokédex</a><a href="https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_Vietnam" target="_blank" rel="noreferrer">03 · Vietnam history index</a><a href="https://bulbapedia.bulbagarden.net/wiki/User:Raltseye/List_of_Vietnamese_Pok%C3%A9mon_names" target="_blank" rel="noreferrer">04 · Earlier-name index</a><a href="https://vtv.vn/goc-khan-gia/hom-nay-28-9-pokemon-tro-lai-tren-song-vtv2-20150928154959873.htm" target="_blank" rel="noreferrer">05 · VTV contemporary archive</a><a href="https://ecruteakforest.com/vietcrystal" target="_blank" rel="noreferrer">06 · Vietnamese Crystal investigation</a></section>
  </>;
}

function JapanChapter() {
  return <>
    <section className="arrival-brief japan-arrival">
      <div className="arrival-heading"><span>Origin point</span><h2>Before globalization,<br /><em>there was a local world.</em></h2><p>Japan is not treated as the “neutral” edition. It is the first specific locale: a Japanese-language game shaped by local wordplay, scripts, media habits, companies, and the Game Boy market of 1996.</p></div>
      <div className="arrival-markers"><article><time>27 FEB 1996</time><span>Franchise origin / first core games</span><h3>Red and Green launch in Japan</h3><p>Poketto Monsutā Aka and Midori established the creatures, regions, battle vocabulary, and first 151 Japanese names from which every later localization began.</p></article><article><time>01 APR 1997</time><span>Animation expands the language</span><h3>The television series begins</h3><p>The anime gave the vocabulary voices, repeated catchphrases, and a weekly national audience—then became one of the franchise’s main vehicles for crossing borders.</p></article></div>
      <a href="https://www.nintendo.com/jp/topics/c/article/ac09b3a5-d9d0-11e5-a9b1-063b7ac45a6d.html" target="_blank" rel="noreferrer">Nintendo’s Red and Green origin record ↗</a>
    </section>
    <section className="chapter-opening japan-opening"><div className="chapter-rail"><span>Source language</span><b>01</b></div><article><p className="dropcap">Japanese Pokémon names compress biology, behavior, sound symbolism, jokes, and visual clues into short forms that work naturally in kana. フシギダネ can suggest both a “mysterious seed” and the phrase “isn’t it strange?”—a double reading that later languages must recreate, replace, explain, or leave behind.</p><p>Pokélingua therefore separates the written kana, a Hepburn reading, and the official trademarked Latin form. Those fields help comparison, but none turns the Japanese original into an English name.</p><aside><b>The origin is still a locale</b><p>Japan sits first in the chronology, not above it. The exhibition treats source-language decisions with the same territory, medium, date, and evidence labels used everywhere else.</p></aside></article></section>
    <RomanizationGuide locale="japan" />
    <section className="chapter-timeline japan-timeline"><div className="chapter-rail"><span>Time markers</span><b>02</b></div><div className="chapter-events">
      <article><time>27 FEB<br />1996</time><div><span>Core games</span><h2>The first Pokémon vocabulary enters play</h2><p>Red and Green launch for Game Boy in Japan. Trading between versions turns a local naming system into a shared social vocabulary.</p><a href="https://www.nintendo.com/jp/topics/c/article/ac09b3a5-d9d0-11e5-a9b1-063b7ac45a6d.html" target="_blank" rel="noreferrer">Nintendo launch history ↗</a></div><ExhibitMedia src="/exhibits/red-green.jpg" alt="Japanese Pokémon Red and Green boxes" label="Core game artifact · 1996" /></article>
      <article><time>15 OCT<br />1996</time><div><span>Revised edition</span><h2>Blue revises the original record</h2><p>Pokémon Blue followed with revised graphics and Pokédex descriptions, an early reminder that even the source edition was not frozen after launch.</p><a href="https://www.nintendo.com/jp/topics/c/article/ac09b3a5-d9d0-11e5-a9b1-063b7ac45a6d.html" target="_blank" rel="noreferrer">Nintendo edition comparison ↗</a></div></article>
      <article><time>01 APR<br />1997</time><div><span>Animation</span><h2>Names become weekly spoken culture</h2><p>The television series expands Pokémon beyond game text, anchoring pronunciations, character voices, music, and stories before the international rollout.</p><a href="https://www.tv-tokyo.co.jp/anime/pokemon/" target="_blank" rel="noreferrer">Official TV Tokyo archive ↗</a></div><ExhibitMedia src="/exhibits/anime-original.jpg" alt="Original Pokémon animated series poster" label="Anime exhibit · original series" tilt="left" /></article>
      <article><time>23 APR<br />1998</time><div><span>Company structure</span><h2>Pokémon Center Co., Ltd. is established</h2><p>The company later renamed The Pokémon Company created an organizational base for managing the rapidly expanding franchise and its global future.</p><a href="https://corporate.pokemon.co.jp/en/aboutus/history" target="_blank" rel="noreferrer">Official corporate history ↗</a></div></article>
    </div></section>
    <JapanesePokedex />
    <section className="chapter-sources"><span>Sources in this edition</span><a href="https://www.pokemon.co.jp/ex/zukan/" target="_blank" rel="noreferrer">01 · Official Japanese Pokédex</a><a href="https://www.nintendo.com/jp/topics/c/article/ac09b3a5-d9d0-11e5-a9b1-063b7ac45a6d.html" target="_blank" rel="noreferrer">02 · Nintendo Red / Green history</a><a href="https://corporate.pokemon.co.jp/en/aboutus/history" target="_blank" rel="noreferrer">03 · The Pokémon Company history</a><a href="https://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_in_Japanese" target="_blank" rel="noreferrer">04 · Japanese name index</a></section>
  </>;
}

function KoreanChapter() {
  return <>
    <section className="arrival-brief korea-arrival">
      <div className="arrival-heading"><span>Policy, broadcast & first games</span><h2>A world that could not<br /><em>simply be imported.</em></h2><p>Pokémon’s Korean arrival overlapped with South Korea’s staged opening to Japanese popular culture. Broadcast, language, hardware, and corporate structure each arrived on their own timetable.</p></div>
      <div className="arrival-markers"><article><time>20 OCT 1998</time><span>National policy context</span><h3>The first stage of cultural opening</h3><p>South Korea announced a gradual opening to Japanese popular culture by category. This did not itself release Pokémon, but it defines the market conditions surrounding the franchise’s arrival.</p></article><article><time>14 JUL 1999</time><span>Earliest documented mass-market arrival</span><h3>The Korean anime begins on SBS</h3><p>The first Korean-language episode brought localized character and species vocabulary to television nearly three years before an officially translated Korean core game.</p></article></div>
      <a href="https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_South_Korea" target="_blank" rel="noreferrer">South Korea release history ↗</a>
    </section>
    <section className="chapter-opening korea-opening"><div className="chapter-rail"><span>Naming method</span><b>01</b></div><article><p className="dropcap">Korean Pokémon names do not follow one source language. Some are original Korean coinages, some adapt the Japanese name, some follow English, and others retain an international form. 이상해씨 combines “strange” with “seed,” while 님피아 follows Japanese Nymphia and 테일로 follows English Taillow.</p><p>Hangul is the official written record. Romanization is a reading aid, not a second name: Revised Romanization, McCune–Reischauer, and event-specific spellings can render the same Hangul differently.</p><aside><b>Historical-name rule</b><p>The library flags only documented changes in the Korean name itself. It does not manufacture “variants” from different Latin-alphabet romanization systems.</p></aside></article></section>
    <RomanizationGuide locale="south-korea" />
    <section className="chapter-timeline korea-timeline"><div className="chapter-rail"><span>Time markers</span><b>02</b></div><div className="chapter-events">
      <article><time>14 JUL<br />1999</time><div><span>Animation</span><h2>Pokémon speaks Korean on SBS</h2><p>The television debut establishes an early public vocabulary before Korean-language core games.</p><a href="https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_South_Korea" target="_blank" rel="noreferrer">Broadcast record ↗</a></div><ExhibitMedia src="/exhibits/anime-original.jpg" alt="Original Pokémon animated series poster" label="Anime exhibit · Korean broadcast" /></article>
      <article><time>24 APR<br />2002</time><div><span>Core games</span><h2>Gold and Silver arrive in Korean</h2><p>The Korean editions became the first officially localized core games. Hangul support kept them Game Boy Color–only; Generation III then passed without a Korean localization.</p><a href="https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_South_Korea" target="_blank" rel="noreferrer">Game history ↗</a></div><ExhibitMedia src="/exhibits/gold-silver-korea.jpg" alt="Korean Pokémon Gold and Silver boxes" label="Korean core-game artifact · 2002" tilt="left" /></article>
      <article><time>AUG<br />2006</time><div><span>Company structure</span><h2>Pokémon Korea is established</h2><p>A dedicated regional company marked a new phase of direct organization for games, cards, events, and the wider Korean market.</p><a href="https://corporate.pokemon.co.jp/en/aboutus/history/" target="_blank" rel="noreferrer">Official corporate history ↗</a></div></article>
      <article><time>12 OCT<br />2013</time><div><span>Worldwide release</span><h2>Korean joins the simultaneous launch</h2><p>Pokémon X and Y launched worldwide with Korean selectable from release day, replacing the earlier lag with a shared global schedule.</p><a href="https://www.pokemon.com/us/pokemon-news/a-pokemon-first" target="_blank" rel="noreferrer">Contemporary announcement ↗</a></div><ExhibitMedia src="/exhibits/x-box.jpg" alt="Pokémon X Nintendo 3DS box art" label="Worldwide core-game artifact · 2013" /></article>
    </div></section>
    <KoreanPokedex />
    <section className="chapter-sources"><span>Sources in this edition</span><a href="https://pokemonkorea.com/pokedex" target="_blank" rel="noreferrer">01 · Official Korean Pokédex</a><a href="https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_South_Korea" target="_blank" rel="noreferrer">02 · South Korea history</a><a href="https://bulbapedia.bulbagarden.net/wiki/List_of_Korean_Pok%C3%A9mon_names" target="_blank" rel="noreferrer">03 · Korean name index</a><a href="https://theme.archives.go.kr/next/chronology/archiveDetail.do?evntId=0049291994&flag=2" target="_blank" rel="noreferrer">04 · National Archives policy record</a></section>
  </>;
}

function GermanChapter() {
  return <>
    <section className="arrival-brief germany-arrival">
      <div className="arrival-heading"><span>Television & first games</span><h2>Germany met Pokémon<br /><em>twice in five weeks.</em></h2><p>The German animated series arrived first, followed closely by the localized Red and Blue Game Boy editions. Together they established a translated world whose compact species names became everyday vocabulary.</p></div>
      <div className="arrival-markers"><article><time>01 SEP 1999</time><span>Earliest documented public arrival</span><h3>“Pika – Pikachu” airs on RTL II</h3><p>The first German episode introduced Ash, Pikachu, and the localized terminology through television performance before the games reached stores.</p></article><article><time>05 OCT 1999</time><span>First German core-game release</span><h3>Rote and Blaue Edition launch</h3><p>Nintendo’s German release record dates the Game Boy editions to 5 October. Players could now explore the full adventure, dialogue, moves, places, and creature names in German.</p></article></div>
      <a href="https://www.nintendo.com/de-de/Spiele/Game-Boy/Pokemon-Blaue-Edition-266054.html" target="_blank" rel="noreferrer">Official Nintendo release record ↗</a>
    </section>
    <section className="chapter-opening germany-opening"><div className="chapter-rail"><span>Localization method</span><b>01</b></div><article><p className="dropcap">German names often behave like miniature definitions. Bisasam layers <i>bizarr</i>, <i>Saurier</i>, and <i>Samen</i>; Glumanda joins <i>Glut</i> with <i>Salamander</i>. A player can hear the creature’s body, type, or temperament inside a compact proper name.</p><p>The system is selective rather than absolute. Many species receive distinctive German wordplay, while names that already travel well internationally can remain unchanged.</p><aside><b>What the dropdown adds</b><p>Open any archive row to see the indexed origin behind the German name. “Shared spelling” is recorded as a localization decision, not treated as absent data.</p></aside></article></section>
    <section className="chapter-timeline germany-timeline"><div className="chapter-rail"><span>Time markers</span><b>02</b></div><div className="chapter-events">
      <article><time>01 SEP<br />1999</time><div><span>Animation</span><h2>The German voice of Pokémon begins</h2><p>RTL II airs episode one, starting a broadcast vocabulary that would grow alongside the games and trading cards.</p><a href="https://www.nintendo.com/de-de/News/2009/RTL-II-Sprechercasting-auf-den-Pokemon-Days-257233.html" target="_blank" rel="noreferrer">Nintendo anniversary record ↗</a></div><ExhibitMedia src="/exhibits/anime-original.jpg" alt="Original Pokémon animated series poster" label="Anime exhibit · German television" /></article>
      <article><time>05 OCT<br />1999</time><div><span>Core games</span><h2>German names enter the Pokédex</h2><p>Rote and Blaue Edition make the localized naming system searchable, playable, and repeatable across an entire generation.</p><a href="https://www.nintendo.com/de-de/Spiele/Game-Boy/Pokemon-Blaue-Edition-266054.html" target="_blank" rel="noreferrer">Official release page ↗</a></div><ExhibitMedia src="/exhibits/red-blue.jpg" alt="Pokémon Red and Blue Game Boy boxes" label="Core-game exhibit · German launch" tilt="left" /></article>
      <article><time>12 OCT<br />2013</time><div><span>Worldwide release</span><h2>German moves onto one global clock</h2><p>X and Y became the first core-series worldwide simultaneous launch, with German available from day one rather than following a separate European window.</p><a href="https://www.pokemon.com/us/pokemon-news/a-pokemon-first" target="_blank" rel="noreferrer">Contemporary announcement ↗</a></div></article>
    </div></section>
    <GermanPokedex />
    <section className="chapter-sources"><span>Sources in this edition</span><a href="https://www.pokemon.com/de/pokedex" target="_blank" rel="noreferrer">01 · Official German Pokédex</a><a href="https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_Germany" target="_blank" rel="noreferrer">02 · Germany history</a><a href="https://bulbapedia.bulbagarden.net/wiki/List_of_German_Pok%C3%A9mon_names" target="_blank" rel="noreferrer">03 · German name index</a></section>
  </>;
}

const mediaLocaleCopy = {
  brazil: {
    opening: "Brazil’s Pokémon history is more than a language finally appearing in a future game. Localized Red and Blue editions reached the market in 1998, and the Brazilian Portuguese anime became a mass-media phenomenon the following year. Games, television, cards, mobile services, and dubbing studios built a substantial locale long before core-series game text was available in Portuguese.",
    distinction: "Brazilian Portuguese and European Portuguese share a language family but not one media history, pronunciation standard, dubbing industry, or market. This chapter follows the Brazilian record specifically.",
    arrivalDate: "1998", arrivalTitle: "Pokémon Red and Blue reach Brazil", arrivalText: "Gradiente distributed Pokémon – Versão Vermelha and Pokémon – Versão Azul. The packaging and market presentation were localized, but the Game Boy software itself did not offer Portuguese game text; the exact launch day remains unresolved.",
    laterDate: "10 MAY 1999", laterTitle: "“Pokémon, Eu Escolho Você!” premieres", laterText: "The first Brazilian Portuguese anime episode aired on RecordTV during Eliana & Alegria. The dub became the locale’s central spoken vocabulary and expanded to Cartoon Network later that year.",
    nameDate: "27 FEB 2026 → 2027", nameTitle: "Portuguese moves from surrounding media into the core games", nameText: "Nintendo’s Brazilian listing confirms Português Brasileiro as a selectable language in Pokémon Winds and Pokémon Waves, launching worldwide in 2027. The announcement date and the future release year are kept separate.",
    sampleLabel: "Documented localized species name", sampleName: "Presa Grande", sampleMeta: "Great Tusk · Brazilian Portuguese official-media record",
    media: "/exhibits/brazil-horizons.jpg", mediaAlt: "Brazilian Portuguese Pokémon Horizons poster", mediaLabel: "Brazilian Portuguese anime · 2024",
    historySource: "https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_Brazil",
    officialSource: "https://www.nintendo.com/pt-br/store/products/pokemon-waves-switch-2/",
    digitalSource: "https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_Brazil#Pok%C3%A9mon_animation",
    libraryTitle: "Brazilian Portuguese official-media index",
    libraryStatus: "Most species retain their English spelling in Brazilian Portuguese, while Type: Null and the Paradox Pokémon have documented localized names. The table records both outcomes.",
    libraryHref: "https://bulbapedia.bulbagarden.net/wiki/List_of_Brazilian_Portuguese_Pok%C3%A9mon_names",
    libraryLink: "Open the Brazilian Portuguese name index",
  },
  thailand: {
    opening: "Thailand’s Pokémon vocabulary grew first through television and licensed media, not through a Thai-language core game. The result is a real localization history with its own script, broadcasters, digital services, and official reference pages—even though the species names generally follow Japanese pronunciation.",
    distinction: "Thai is an established official media and service language. It is not currently a selectable language in the main-series games, so this chapter records transcription and usage instead of inventing a separate translated Pokédex.",
    arrivalDate: "24 MAR 2001", arrivalTitle: "The anime begins on ModernNine TV", arrivalText: "The first documented Thai television broadcast introduced Pokémon to a national audience. That arrival predates today’s official Thai portal and digital channels by more than two decades.",
    laterDate: "30 AUG 2024", laterTitle: "Horizons enters the official Thai archive", laterText: "Pokémon Thailand Official published the first Thai episode of Pokémon Horizons on YouTube, creating a public, timestamped record of the current dub.",
    nameDate: "2001—TODAY", nameTitle: "Japanese sound, Thai script", nameText: "Official Thai usage generally transcribes the Japanese species name into Thai. The official Pokédex, for example, records Primarina as อชิเรน (Ashirene), following Japanese rather than the English name.",
    sampleLabel: "Verified name record", sampleName: "อชิเรน", sampleMeta: "Primarina · from Japanese アシレーヌ · official Thai Pokédex",
    media: "/exhibits/thai-horizons.jpg", mediaAlt: "Official Thai Pokémon Horizons episode artwork", mediaLabel: "Official Thai upload · 2024",
    historySource: "https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_Thailand",
    officialSource: "https://th.portal-pokemon.com/play/pokedex/0730",
    digitalSource: "https://www.youtube.com/watch?v=KHgJk2AB4sM",
    libraryTitle: "Thai index verification in progress",
    libraryStatus: "An official Thai Pokédex exists, so this locale can eventually support a broader name index. Pokélingua has not yet verified and ingested all 1,025 Thai-script records; until that evidence pass is complete, the page shows only sourced examples instead of presenting an incomplete scrape as a finished library.",
    libraryHref: "https://th.portal-pokemon.com/play/pokedex",
    libraryLink: "Browse the official Thai Pokédex",
  },
  russia: {
    opening: "Russia’s Pokémon history began with a television dub made from the English-language adaptation. That production route shaped more than dialogue: familiar English character and species names were retained so the animation could remain legible beside imported cards and international branding.",
    distinction: "Russian is an official dub and interface language in parts of the franchise, but not a selectable core-game language. Cyrillic presentation therefore belongs in the archive without being mistaken for an independently renamed full Pokédex.",
    arrivalDate: "18 DEC 2000", arrivalTitle: "Pokémon premieres on ORT", arrivalText: "Channel One, then known as ORT, began the first documented Russian television run. The dub was based on the English adaptation rather than produced directly from Japanese.",
    laterDate: "2014", laterTitle: "On-screen presentation becomes Russian", laterText: "The 2×2 broadcast era expanded localization beyond dialogue: season branding, title cards, eyecatches, and displayed Pokémon names appeared in Russian.",
    nameDate: "2000—TODAY", nameTitle: "Names retained across scripts", nameText: "The dub generally keeps the English species vocabulary, represented in Cyrillic where the medium calls for it. This is transliteration and grammatical adaptation—not evidence of a separate Russian species-name canon.",
    sampleLabel: "Documented naming practice", sampleName: "Покемон", sampleMeta: "Pokémon · plural Покемоны · English-derived Russian usage",
    media: "/exhibits/anime-original.jpg", mediaAlt: "Original Pokémon animated series artwork representing Russia's first broadcast era", mediaLabel: "Anime-first locale · 2000",
    historySource: "https://bulbapedia.bulbagarden.net/wiki/Rossia",
    officialSource: "https://www.netflix.com/title/81665799",
    digitalSource: "https://bulbapedia.bulbagarden.net/wiki/Rossia#Pok%C3%A9mon_anime",
    libraryTitle: "No separate Russian species list claimed",
    libraryStatus: "Russian media generally retains the international English species names and represents them in Cyrillic when needed. Those spellings can vary with medium and grammar, so Pokélingua does not claim a separate fixed 1,025-name Russian canon. Use the shared English index for the underlying official species list.",
    libraryHref: "/locales/united-states#name-library",
    libraryLink: "Browse the shared English species index",
  },
  turkey: {
    opening: "Türkiye’s first Pokémon boom arrived through television. Its history is unusually discontinuous: an early nationwide debut was followed by a public controversy and broadcast interruption, then a return that unfolded through new channels, localized mobile games, and official digital animation.",
    distinction: "Turkish localization is strongest in animation and selected services such as Pokémon GO. Most species names remain the English forms, and Turkish has not been offered as a selectable main-series game language.",
    arrivalDate: "31 JAN 2000", arrivalTitle: "The anime premieres on ATV", arrivalText: "ATV began the first documented Turkish broadcast. Pokémon quickly became a highly visible part of children’s television culture.",
    laterDate: "13 DEC 2000", laterTitle: "Broadcasting is interrupted", laterText: "After widely reported child-safety incidents, the government suspended the series. Pokémon returned to Turkish television on 9 December 2002, making interruption and re-entry central to this locale’s history.",
    nameDate: "2000—TODAY", nameTitle: "An English-derived species vocabulary", nameText: "Most Pokémon names in Turkish releases remain the English names. Localized interfaces and dialogue still create a Turkish edition, but they do not amount to a fully renamed creature catalog.",
    sampleLabel: "Coverage status", sampleName: "Pikachu", sampleMeta: "English species form retained · no Turkish core-game name set",
    media: "/exhibits/anime-original.jpg", mediaAlt: "Original Pokémon animated series artwork representing Türkiye's first broadcast era", mediaLabel: "Turkish television arrival · 2000",
    historySource: "https://bulbapedia.bulbagarden.net/wiki/T%C3%BCrkiye",
    officialSource: "https://www.youtube.com/@PokemonTR",
    digitalSource: "https://bulbapedia.bulbagarden.net/wiki/T%C3%BCrkiye#Pok%C3%A9mon_anime",
    libraryTitle: "No separate Turkish species list claimed",
    libraryStatus: "Official Turkish animation and services usually retain the international English Pokémon names. Because there is no independently localized Turkish core-game Pokédex, a second 1,025-row table would only duplicate English and imply a naming system that the evidence does not support.",
    libraryHref: "/locales/united-states#name-library",
    libraryLink: "Browse the shared English species index",
  },
  "hindi-india": {
    opening: "Hindi carried Pokémon into India’s mass television market and later became the first Indian-language branch with a dedicated official YouTube archive. Its naming history is especially revealing: a short experiment with localized Hindi species names was later replaced by one India-wide English-derived standard.",
    distinction: "Hindi has its own broadcast dates, voice productions, channel, and naming-policy history. Keeping it separate from a catch-all India page makes those decisions visible while the broader India overview can still connect shared distribution.",
    arrivalDate: "12 MAY 2003", arrivalTitle: "Pokémon begins in Hindi on Cartoon Network", arrivalText: "The first Indian television run launched in Hindi on Cartoon Network India, establishing the franchise’s earliest large-scale language relationship in the market.",
    laterDate: "29 OCT 2021", laterTitle: "An official Hindi YouTube archive begins", laterText: "The Pokémon Company launched the Hindi-dubbed Pokémon Journeys on its official regional YouTube channel, turning a broadcast history into a dated public digital collection.",
    nameDate: "SEP 2023 → 25 SEP 2025", nameTitle: "Localized names, then one national standard", nameText: "Hindi services introduced localized Hindi Pokémon names in September 2023. On 25 September 2025, the official India portal announced that Hindi would align with Tamil, Telugu, and Bengali using names based on English.",
    sampleLabel: "Current official policy", sampleName: "English-based names", sampleMeta: "Unified across Hindi, Tamil, Telugu, and Bengali · 25 Sep 2025",
    media: "/exhibits/india-horizons.jpg", mediaAlt: "Pokémon Horizons India artwork representing the official Hindi edition", mediaLabel: "Official India-language anime",
    historySource: "https://bulbapedia.bulbagarden.net/wiki/Sri_Lanka#India",
    officialSource: "https://in.portal-pokemon.com/topics/pokemon_names_unified_across_india/",
    digitalSource: "https://in.portal-pokemon.com/topics/211029090019_hindi-dubbed_version_of_pokemon_journeys_is_now_available_on_youtube/",
    libraryTitle: "Current list follows English-based names",
    libraryStatus: "The official 2025 India policy unified Hindi, Tamil, Telugu, and Bengali around English-based Pokémon names. A separate Hindi table would therefore duplicate the English species column; the Hindi-specific history lives in the surrounding script, dub, and documented 2023–2025 policy change.",
    libraryHref: "/locales/united-states#name-library",
    libraryLink: "Browse the shared current species index",
  },
  "tamil-india": {
    opening: "Tamil Pokémon developed as a regional television practice before it gained a durable official digital home. The language shares India-wide distribution milestones with Hindi and Telugu, but its performances, audience, script, and archive are distinct enough to follow on their own page.",
    distinction: "The exact first Tamil episode date remains unresolved in the available record. Pokélingua uses the earliest documented period rather than manufacturing a day, then becomes precise when official channel dates provide primary timestamps.",
    arrivalDate: "c. 2004", arrivalTitle: "Regional Tamil dubbing expands", arrivalText: "Tamil versions are documented during the early Indian television run, becoming regular by the Johto-era seasons. The present evidence supports the period, not an exact premiere date.",
    laterDate: "14 JAN 2022", laterTitle: "The official Tamil channel begins Journeys", laterText: "Pokémon Journeys launched on a dedicated official Tamil YouTube channel. Pokémon Horizons later joined the channel’s weekly archive in July 2024.",
    nameDate: "25 SEP 2025", nameTitle: "The shared English-based standard is confirmed", nameText: "The official India portal states that Tamil, Telugu, Bengali, and Hindi now follow a common Pokémon naming standard based on the English names. No separate translated Tamil full Pokédex is claimed here.",
    sampleLabel: "Current official policy", sampleName: "English-based names", sampleMeta: "Tamil dialogue and script · shared species-name standard",
    media: "/exhibits/india-horizons.jpg", mediaAlt: "Pokémon Horizons India artwork representing the official Tamil edition", mediaLabel: "Tamil official anime channel",
    historySource: "https://bulbapedia.bulbagarden.net/wiki/Sri_Lanka#India",
    officialSource: "https://in.portal-pokemon.com/topics/pokemon_names_unified_across_india/",
    digitalSource: "https://in.portal-pokemon.com/topics/pokemon_horizons_is_now_available_on_youtube_also_pokemon_south_asia_official_english_channel_has_be/",
    libraryTitle: "Current list follows English-based names",
    libraryStatus: "The official 2025 India policy states that Tamil shares an English-based species-name standard with Hindi, Telugu, and Bengali. Rather than duplicate 1,025 English rows and label them as translations, this chapter links to the shared index and preserves Tamil-specific media and script context here.",
    libraryHref: "/locales/united-states#name-library",
    libraryLink: "Browse the shared current species index",
  },
  "telugu-india": {
    opening: "Telugu Pokémon developed as a regional television practice before it gained a durable official digital home. Its chronology overlaps Tamil and Hindi, but a language-specific chapter preserves its own performances, script, audience, and publication record.",
    distinction: "The exact first Telugu episode date remains unresolved in the available record. Pokélingua labels the earliest documented period honestly and uses exact dates only where official channel announcements support them.",
    arrivalDate: "c. 2004", arrivalTitle: "Regional Telugu dubbing expands", arrivalText: "Telugu versions are documented during the early Indian television run, becoming regular by the Johto-era seasons. The present evidence supports the period, not an exact premiere date.",
    laterDate: "14 JAN 2022", laterTitle: "The official Telugu channel begins Journeys", laterText: "Pokémon Journeys launched on a dedicated official Telugu YouTube channel. Pokémon Horizons later joined the channel’s weekly archive in July 2024.",
    nameDate: "25 SEP 2025", nameTitle: "The shared English-based standard is confirmed", nameText: "The official India portal states that Telugu, Tamil, Bengali, and Hindi now follow a common Pokémon naming standard based on the English names. No separate translated Telugu full Pokédex is claimed here.",
    sampleLabel: "Current official policy", sampleName: "English-based names", sampleMeta: "Telugu dialogue and script · shared species-name standard",
    media: "/exhibits/india-horizons.jpg", mediaAlt: "Pokémon Horizons India artwork representing the official Telugu edition", mediaLabel: "Telugu official anime channel",
    historySource: "https://bulbapedia.bulbagarden.net/wiki/Sri_Lanka#India",
    officialSource: "https://in.portal-pokemon.com/topics/pokemon_names_unified_across_india/",
    digitalSource: "https://in.portal-pokemon.com/topics/pokemon_horizons_is_now_available_on_youtube_also_pokemon_south_asia_official_english_channel_has_be/",
    libraryTitle: "Current list follows English-based names",
    libraryStatus: "The official 2025 India policy states that Telugu shares an English-based species-name standard with Hindi, Tamil, and Bengali. The shared index supplies the complete names; this page records the Telugu script, dub, chronology, and regional presentation around them.",
    libraryHref: "/locales/united-states#name-library",
    libraryLink: "Browse the shared current species index",
  },
} as const;

function MediaLocaleChapter({ locale }: { locale: keyof typeof mediaLocaleCopy }) {
  const copy = mediaLocaleCopy[locale];
  return <>
    <section className={`arrival-brief media-arrival media-arrival-${locale}`}>
      <div className="arrival-heading"><span>Anime-first locale</span><h2>Arrival came through<br /><em>the screen.</em></h2><p>This chapter separates an official dub or regional service from selectable core-game language support. Both matter; they are not the same milestone.</p></div>
      <div className="arrival-markers">
        <article><time>{copy.arrivalDate}</time><span>Earliest documented arrival</span><h3>{copy.arrivalTitle}</h3><p>{copy.arrivalText}</p></article>
        <article><time>{copy.laterDate}</time><span>Later turning point</span><h3>{copy.laterTitle}</h3><p>{copy.laterText}</p></article>
      </div>
      <a href={copy.historySource} target="_blank" rel="noreferrer">Locale history evidence trail ↗</a>
    </section>
    <section className="chapter-opening media-locale-opening">
      <div className="chapter-rail"><span>Local perspective</span><b>01</b></div>
      <article><p className="dropcap">{copy.opening}</p><aside><b>Why this chapter exists</b><p>{copy.distinction}</p></aside></article>
    </section>
    {locale in romanizationCopy && <RomanizationGuide locale={locale as RomanizationLocale} />}
    <section className="chapter-timeline">
      <div className="chapter-rail"><span>Time markers</span><b>02</b></div>
      <div className="chapter-events">
        <article><time>{copy.laterDate}</time><div><span>Official distribution</span><h2>{copy.laterTitle}</h2><p>{copy.laterText}</p><a href={copy.digitalSource} target="_blank" rel="noreferrer">Open the dated record ↗</a></div><ExhibitMedia src={copy.media} alt={copy.mediaAlt} label={copy.mediaLabel} tilt="left" /></article>
        <article className="media-name-event"><time>{copy.nameDate}</time><div><span>Naming practice</span><h2>{copy.nameTitle}</h2><p>{copy.nameText}</p><a href={copy.officialSource} target="_blank" rel="noreferrer">Locale evidence ↗</a></div></article>
      </div>
    </section>
    {locale === "brazil" || locale === "russia" || locale === "thailand" || locale === "hindi-india" || locale === "tamil-india" || locale === "telugu-india" ? <MediaLocalePokedex locale={locale} /> : <section className="naming-practice" id="name-library">
      <div><span>Name library status</span><h2>{copy.libraryTitle}</h2><b>{copy.sampleLabel} · {copy.sampleName}</b></div>
      <article><span>What the archive can support</span><p>{copy.libraryStatus}</p><p className="coverage-note">Example now on record: {copy.sampleMeta}</p><a className="library-status-link" href={copy.libraryHref} target={copy.libraryHref.startsWith("http") ? "_blank" : undefined} rel={copy.libraryHref.startsWith("http") ? "noreferrer" : undefined}>{copy.libraryLink} ↗</a></article>
    </section>}
    <section className="chapter-question">
      <div className="chapter-rail"><span>Archive rule</span><b>03</b></div>
      <article><h2>A dub is a locale.<br /><em>Not a game-language claim.</em></h2><p>Pokélingua records the version audiences actually encountered: language, territory, broadcaster or platform, naming practice, and date. That preserves these histories without suggesting a core-series translation that does not exist.</p><div className="record-example"><span>Evidence model</span><code>medium: official animation / service<br />core_game_language: no<br />species_name_system: documented policy<br />unknown dates: shown as unresolved</code></div></article>
    </section>
    <section className="chapter-sources"><span>Sources in this edition</span><a href={copy.historySource} target="_blank" rel="noreferrer">01 · Locale history</a><a href={copy.officialSource} target="_blank" rel="noreferrer">02 · Naming / service record</a><a href={copy.digitalSource} target="_blank" rel="noreferrer">03 · Official / dated media record</a></section>
  </>;
}

function FutureChapter() {
  return <>
    <section className="arrival-brief future-arrival">
      <div className="arrival-heading"><span>Evidence watch · updated August 2026</span><h2>The next language is<br /><em>confirmed. The rest are not.</em></h2><p>This page records announced localization changes without turning community hopes, job listings, regional websites, or rumors into promises.</p></div>
      <div className="arrival-markers"><article><time>2027</time><span>Confirmed core-game language</span><h3>Brazilian Portuguese joins the main series</h3><p>Nintendo’s Brazilian store lists Português Brasileiro among the supported languages for Pokémon Winds and Pokémon Waves. The games launch globally on Nintendo Switch 2 in 2027.</p></article><article><time>BEYOND</time><span>Evidence threshold</span><h3>No other new language is confirmed</h3><p>European Portuguese, Vietnamese, Hindi, Tamil, Telugu, Arabic, and other requested languages remain evidence-watch subjects—not announced core-game localizations.</p></article></div>
      <a href="https://www.nintendo.com/pt-br/store/products/pokemon-waves-switch-2/" target="_blank" rel="noreferrer">Nintendo’s official supported-language list ↗</a>
    </section>
    <section className="chapter-opening future-opening"><div className="chapter-rail"><span>How to read this page</span><b>01</b></div><article><p className="dropcap">Future localization evidence comes in levels. A selectable language on an official platform listing is confirmation. A regional website, translated trailer, dub, hiring notice, fan campaign, or distributor statement can show investment—but does not by itself confirm a core-game language.</p><p>Pokélingua preserves that distinction because anticipation is part of globalization history, while certainty requires a named product, language, and release commitment.</p><aside><b>Confirmed does not mean complete</b><p>The 2027 announcement confirms Brazilian Portuguese game text. Species-name policy, terminology continuity with Brazilian animation, and the exact release date still require future documentation.</p></aside></article></section>
    <section className="future-evidence"><article className="confirmed"><span>Confirmed · 27 Feb 2026</span><h2>Português Brasileiro</h2><p>Pokémon Winds and Pokémon Waves will be fully playable in Brazilian Portuguese in 2027. The official language roster also retains European Spanish and Latin American Spanish as separate options.</p><ExhibitMedia src="/exhibits/winds-waves.jpg" alt="Official Brazilian Portuguese announcement for Pokémon Winds and Waves" label="Official announcement artifact · 2026" tilt="left" /><a href="https://www.pokemon.co.jp/ex/winds_waves/ja/news/202602_03/" target="_blank" rel="noreferrer">Official Pokémon language announcement ↗</a></article><article><span>Not confirmed</span><h2>Evidence watch</h2><p>European Portuguese has a localized Nintendo product page, but the Brazilian Nintendo listing identifies the selectable option specifically as Brazilian Portuguese. Pokémon has substantial Vietnamese and Indian-language animation activity, yet no official source currently commits those languages to a core game.</p><p>This archive will promote a language from “watch” to “confirmed” only when an official product source explicitly names it as supported.</p></article></section>
    <section className="chapter-sources"><span>Sources in this edition</span><a href="https://www.nintendo.com/pt-br/store/products/pokemon-waves-switch-2/" target="_blank" rel="noreferrer">01 · Nintendo Brazil language roster</a><a href="https://www.pokemon.com/uk/pokemon-news/see-the-new-trailer-for-pokemon-winds-and-pokemon-waves-coming-to-nintendo-switch-2" target="_blank" rel="noreferrer">02 · Official Pokémon announcement</a><a href="https://windswaves.pokemon.com/pt-br/" target="_blank" rel="noreferrer">03 · Brazilian Portuguese official site</a></section>
  </>;
}

function UnofficialChapter() {
  return <>
    <section className="unofficial-hub-intro">
      <span>Parallel circulation / contextual archive</span>
      <h2>Not official.<br /><em>Still part of the history.</em></h2>
      <div><p>Fan translations, bootleg cartridges, and ROM hacks often appeared where official localization was late or absent. They can reveal demand, terminology experiments, technical constraints, and the strange paths a text took between languages.</p><p>This index never treats unofficial wording as an official Pokémon name. Every record is labeled by evidence level and linked back to the locale where it circulated or matters historically.</p></div>
    </section>
    <section className="unofficial-archive-grid">
      <article>
        <div className="unofficial-card-meta"><span>ALT / 001</span><time>c. 2001</time><b>Bootleg cartridge</b></div>
        <h2>Pokémon “Vietnamese” Crystal</h2>
        <p className="unofficial-route">Japanese <i>→</i> unlicensed Chinese <i>→</i> broken English</p>
        <p>Despite the nickname, the surviving game is not in Vietnamese. A cartridge reportedly bought in Vietnam became famous for a likely double translation that turned Pokémon into “elf” and produced surreal phrases such as “Volcano Bakemeat.”</p>
        <div className="evidence-badge">Origin uncertain · unofficial · excluded from name tables</div>
        <a href="/locales/vietnam#unofficial-vietnamese-crystal">Read it in the Vietnam chapter →</a>
      </article>
      <article>
        <div className="unofficial-card-meta"><span>ALT / 002</span><time>Pre-2016</time><b>ROM hacks & bootlegs</b></div>
        <h2>Chinese games before official Chinese games</h2>
        <p className="unofficial-route">Japanese / English games <i>→</i> community and pirate translations</p>
        <p>Before Sun and Moon introduced official Simplified and Traditional Chinese in the core series, unofficial Chinese-language hacks and cartridges circulated across the market. Their competing terminology records demand, but not an official standard.</p>
        <div className="evidence-badge">Documented circulation · terminology varies · unofficial</div>
        <a href="/locales/mainland-china#unofficial-chinese-games">Read it in the mainland China chapter →</a>
      </article>
    </section>
    <section className="unofficial-method">
      <span>Admission rule</span><p>A story enters this index only when it materially explains how Pokémon crossed a language barrier and has a traceable evidence trail. Popularity alone is not enough.</p>
      <a href="https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_mainland_China" target="_blank" rel="noreferrer">Chinese unofficial-game record ↗</a>
      <a href="https://ecruteakforest.com/vietcrystal" target="_blank" rel="noreferrer">Vietnamese Crystal investigation ↗</a>
    </section>
  </>;
}

export default async function LocalePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const chapter = chapters[slug as Slug];
  if (!chapter) notFound();
  const isChinese = slug === "hong-kong" || slug === "taiwan" || slug === "mainland-china";
  const isMediaLocale = slug in mediaLocaleCopy;

  return <main className="locale-page">
    <nav className="nav locale-nav">
      <a className="brand" href="/"><span className="brand-mark" aria-hidden="true"><i /></span><span>Pokélingua</span></a>
      <a className="back-link" href="/#locales">← All locales</a>
      <span className="chapter-number">Locale chapter / {chapter.code}</span>
    </nav>
    <header className="locale-hero">
      <div className="locale-code">{chapter.code}</div>
      <div className="locale-title"><span>{chapter.local}</span><h1>{chapter.place}</h1><p>{chapter.deck}</p></div>
      <div className="locale-details"><div><span>Language context</span><b>{chapter.language}</b></div><div><span>Period in focus</span><b>{chapter.period}</b></div><div><span>Archive edition</span><b>{chapter.live ? "Published · v0.1" : "Research in progress"}</b></div></div>
    </header>
    {isChinese ? <ChineseChapter locale={slug as keyof typeof chineseCopy} /> : isMediaLocale ? <MediaLocaleChapter locale={slug as keyof typeof mediaLocaleCopy} /> : slug === "unofficial" ? <UnofficialChapter /> : slug === "future" ? <FutureChapter /> : slug === "japan" ? <JapanChapter /> : slug === "united-states" ? <UnitedStatesChapter /> : slug === "france" ? <FrenchChapter /> : slug === "germany" ? <GermanChapter /> : slug === "italy" ? <ItalianChapter /> : slug === "spain" || slug === "latin-america" ? <SpanishChapter locale={slug} /> : slug === "south-korea" ? <KoreanChapter /> : slug === "vietnam" ? <VietnamChapter /> : !chapter.live ? <Researching chapter={chapter as (typeof chapters)[Exclude<Slug, "south-korea">]} /> : <>
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

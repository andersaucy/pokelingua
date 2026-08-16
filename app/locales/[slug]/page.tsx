import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FrenchPokedex } from "../../components/FrenchPokedex";
import { ItalianPokedex } from "../../components/ItalianPokedex";
import { LocalePokedex } from "../../components/LocalePokedex";
import { VietnamesePokedex } from "../../components/VietnamesePokedex";

const chapters = {
  "south-korea": {
    code: "KR", place: "South Korea", local: "대한민국", language: "Korean · 한국어", period: "1998—today", live: true,
    deck: "How cultural policy, Korean-language media, and a dedicated regional company shaped a distinct Pokémon locale.",
  },
  france: { code: "FR", place: "France", local: "France", language: "French · français", period: "1998—today", live: true, deck: "How a Nintendo France team turned translation into wordplay—and built one of Pokémon’s most distinctive naming traditions." },
  italy: { code: "IT", place: "Italy", local: "Italia", language: "Italian · italiano", period: "1999—today", live: true, deck: "How Italy built a fully localized Pokémon world around mostly unchanged species names—and when it chose to translate them." },
  "hong-kong": { code: "HK", place: "Hong Kong", local: "香港", language: "Cantonese · Traditional Chinese", period: "1998—today", live: true, deck: "A Cantonese naming tradition, a 2016 unification, and a history that cannot be reduced to script alone." },
  taiwan: { code: "TW", place: "Taiwan", local: "台灣", language: "Mandarin · Traditional Chinese", period: "1998—today", live: true, deck: "From established anime vocabulary to a coordinated Chinese-language game localization." },
  "mainland-china": { code: "CN", place: "Mainland China", local: "中国大陆", language: "Mandarin · Simplified Chinese", period: "2000s—today", live: true, deck: "The mainland record of simplified-script terminology, official distribution, games, cards, and media." },
  india: { code: "IN", place: "India", local: "भारत", language: "Hindi · Tamil · Telugu +", period: "2003—today", live: false, deck: "Pokémon across a multilingual broadcast market and a growing official digital archive." },
  brazil: { code: "BR", place: "Brazil", local: "Brasil", language: "Brazilian Portuguese", period: "1999—today", live: false, deck: "A major dub culture, a passionate fan base, and the late arrival of Portuguese in core games." },
  vietnam: { code: "VN", place: "Vietnam", local: "Việt Nam", language: "Vietnamese · Tiếng Việt", period: "2002—today", live: true, deck: "From Japanese-rooted species names in Vietnamese media to the English-name standard announced in May 2026." },
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
  </>;
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
  },
  taiwan: {
    eyebrow: "A Taiwan chapter, not a generic Traditional Chinese page.",
    opening: "Taiwan developed its own long-running Pokémon vocabulary through Mandarin-language animation, publishing, merchandise, and the older franchise label 神奇寶貝. Those memories remain part of the locale even when individual creature names match today’s unified Traditional Chinese forms.",
    note: "The library keeps Taiwan separate because identical characters do not imply identical distributors, broadcast histories, release dates, or audience experiences.",
    date: "26 FEB 2016", event: "Traditional Chinese enters the core games", eventText: "The Sun and Moon announcement established selectable Traditional Chinese in the core series. Taiwan’s current official Pokédex now provides a primary reference for present-day names.",
    official: "https://tw.portal-pokemon.com/play/pokedex",
    arrivalDate: "28 NOV 1998", arrivalTitle: "The animated series begins in Taiwan", arrivalText: "Episode one aired on CTV in Mandarin. This broadcast is the earliest documented broad public arrival in this edition and the beginning of a distinct Taiwan media history.",
    recognitionDate: "DEC 2022", recognitionTitle: "Pokémon Taiwan Co., Ltd. is established", recognitionText: "The creation of a dedicated Taiwan company marks a later form of formal regional investment. Pokémon Center Taipei followed in December 2023.",
    historySource: "https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_Taiwan",
  },
  "mainland-china": {
    eyebrow: "Simplified Chinese is the script. Mainland China is the locale.",
    opening: "Mainland China’s chapter follows more than character conversion. It records when official games, cards, merchandise, websites, and terminology entered a market with its own distribution and media environment.",
    note: "Most current creature names correspond directly with the unified Traditional Chinese list in simplified characters, but mainland-specific revisions and product timelines still require their own record.",
    date: "26 FEB 2016", event: "Simplified Chinese enters the core games", eventText: "Pokémon Sun and Moon announced Simplified Chinese as a selectable language. The official mainland Pokédex is now the primary reference for current simplified-script names.",
    official: "https://dex.pokemon.cn/play/pokedex",
    arrivalDate: "24 DEC 1998", arrivalTitle: "The animated series reaches mainland television", arrivalText: "The first episode aired on Shanghai’s OTV in Mandarin. Public recognition therefore predates official Chinese core games and later direct corporate investment by many years.",
    recognitionDate: "JUL 2020", recognitionTitle: "Pokémon Shanghai is established", recognitionText: "The Pokémon Company created a mainland subsidiary, signaling a new phase of direct local operation. Simplified Chinese TCG products followed in 2022, while game releases remained shaped by separate approval and distribution rules.",
    historySource: "https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_mainland_China",
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
      <article><p className="dropcap">{copy.opening}</p><p>{copy.note}</p><aside><b>Why this is its own locale</b><p>{copy.eyebrow} Pokélingua attaches every term to territory, spoken language, script, medium, and date instead of treating “Chinese” as one undifferentiated field.</p></aside></article>
    </section>
    <section className="chapter-timeline">
      <div className="chapter-rail"><span>Time marker</span><b>02</b></div>
      <div className="chapter-events"><article><time>{copy.date.split(" ").map((part) => <span key={part}>{part}<br /></span>)}</time><div><span>Game language / naming policy</span><h2>{copy.event}</h2><p>{copy.eventText}</p><a href={copy.official} target="_blank" rel="noreferrer">Current official regional Pokédex ↗</a></div></article></div>
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
        <article><time>08 OCT<br />1999</time><div><span>Core games / market launch</span><h2>Pokémon Rouge and Bleu arrive</h2><p>The French Game Boy editions put the localized names, attacks, characters, and places into players’ hands. The launch followed the first Fox Kids broadcast by roughly one month.</p><a href="https://www.jeuxvideo.com/news/1647727/anniversaire-pokemon-en-france-avant-ecarlate-violet-comment-j-ai-decouvert-la-serie-sur-nintendo-switch.htm" target="_blank" rel="noreferrer">France launch history ↗</a></div></article>
        <article><time>29 DEC<br />2000</time><div><span>Contemporary record</span><h2>The localization team enters the archive</h2><p>Le Parisien profiles five Nintendo France localizers at the Cergy test center and reports that the first 150 adaptations took six months. It is unusually valuable evidence because it documents the work while the first-generation phenomenon was still new.</p><a href="https://www.leparisien.fr/archives/ils-ont-invente-les-noms-des-pokemon-29-12-2000-2001854436.php" target="_blank" rel="noreferrer">Contemporary profile · Le Parisien ↗</a></div></article>
        <article><time>GEN V<br />2011</time><div><span>Typography / game text</span><h2>French accents become visible</h2><p>Generations I–IV displayed species names without diacritics, turning Salamèche into SALAMECHE and Évoli into EVOLI inside the games. From Generation V onward, standard French spellings could appear in game text; the name library preserves both display states.</p><a href="https://bulbapedia.bulbagarden.net/wiki/List_of_French_Pok%C3%A9mon_names" target="_blank" rel="noreferrer">French spelling record ↗</a></div></article>
      </div>
    </section>
    <FrenchPokedex />
    <section className="chapter-sources"><span>Sources in this edition</span><a href="https://www.pokemon.com/fr/pokedex" target="_blank" rel="noreferrer">01 · Official French Pokédex</a><a href="https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_France" target="_blank" rel="noreferrer">02 · Pokémon in France</a><a href="https://bulbapedia.bulbagarden.net/wiki/List_of_French_Pok%C3%A9mon_names" target="_blank" rel="noreferrer">03 · French name index</a><a href="https://www.leparisien.fr/archives/ils-ont-invente-les-noms-des-pokemon-29-12-2000-2001854436.php" target="_blank" rel="noreferrer">04 · 2000 team profile</a></section>
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
        <article><time>05 OCT<br />1999</time><div><span>Core games / naming policy in use</span><h2>An Italian game, international species names</h2><p>Pokémon Rosso and Blu establish the pattern that still defines the locale: translated product text paired with English species spellings. The choice makes Italian notably different from French and German, which rebuilt most names in their own languages.</p><a href="https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_Italy" target="_blank" rel="noreferrer">Italy franchise record ↗</a></div></article>
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
    <section className="chapter-timeline vietnam-timeline">
      <div className="chapter-rail"><span>Time markers</span><b>02</b></div>
      <div className="chapter-events">
        <article><time>25 JAN<br />2014</time><div><span>Animation / full dub</span><h2>Black & White begins on HTV3</h2><p>After an audience poll, HTV3 launched a Vietnamese dub based directly on the Japanese version. Characters and Pokémon retained Japanese names while moves, abilities, and items were translated into Vietnamese—a clear record of the locale’s layered naming method.</p><a href="https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_Vietnam" target="_blank" rel="noreferrer">Broadcast and dub record ↗</a></div></article>
        <article><time>28 SEP<br />2015</time><div><span>National television / XY</span><h2>Pokémon returns on VTV2</h2><p>VTV2 introduced Pokémon the Series: XY in its children’s “Giờ ra chơi” block. The broadcaster described the licensed return as a reunion for viewers who remembered the earlier VTV3 run.</p><a href="https://vtv.vn/goc-khan-gia/hom-nay-28-9-pokemon-tro-lai-tren-song-vtv2-20150928154959873.htm" target="_blank" rel="noreferrer">Contemporary announcement · VTV ↗</a></div></article>
        <article><time>17 MAY<br />2019</time><div><span>Digital archive / episode one</span><h2>The original journey is dubbed online</h2><p>POPS Kids began uploading the original series from episode 1. Unlike the early VTV3 voice-over, this edition was dubbed into Vietnamese from the Japanese version, turning a foundational broadcast memory into an on-demand archive.</p><a href="https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_Vietnam" target="_blank" rel="noreferrer">Upload history ↗</a></div></article>
        <article className="vietnam-policy-event"><time>25 MAY<br />2026</time><div><span>Official naming policy</span><h2>English names become the national standard</h2><p>The official Pokémon Vietnam site announced that all future Pokémon content and services in Vietnam would consistently use the English species names. The notice explicitly acknowledged fans attached to the earlier names while establishing a new forward-looking standard.</p><a href="https://vn.portal-pokemon.com/topics/post-5775/" target="_blank" rel="noreferrer">Primary announcement · Pokémon Vietnam ↗</a></div></article>
        <article><time>30 MAY<br />2026</time><div><span>Animation / policy in use</span><h2>Horizons arrives on VTV2</h2><p>Pokémon Horizons: The Series premiered in Vietnamese as <i>Pokémon: Chân Trời Mới</i>. The dub uses English species names—Sprigatito and Fuecoco—putting the new naming policy into a mass-broadcast context five days after its announcement.</p><a href="https://vtv.gov.vn/news/vtv-voi-khan-gia/pokemon-tro-lai-tren-song-vtv2-voi-hanh-trinh-phieu-luu-moi-hap-dan" target="_blank" rel="noreferrer">Broadcast record · VTV ↗</a></div></article>
      </div>
    </section>
    <VietnamesePokedex />
    <section className="chapter-sources"><span>Sources in this edition</span><a href="https://vn.portal-pokemon.com/topics/post-5775/" target="_blank" rel="noreferrer">01 · Official 2026 naming notice</a><a href="https://vn.portal-pokemon.com/play/pokedex" target="_blank" rel="noreferrer">02 · Current official Pokédex</a><a href="https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_Vietnam" target="_blank" rel="noreferrer">03 · Vietnam history index</a><a href="https://bulbapedia.bulbagarden.net/wiki/User:Raltseye/List_of_Vietnamese_Pok%C3%A9mon_names" target="_blank" rel="noreferrer">04 · Earlier-name index</a><a href="https://vtv.vn/goc-khan-gia/hom-nay-28-9-pokemon-tro-lai-tren-song-vtv2-20150928154959873.htm" target="_blank" rel="noreferrer">05 · VTV contemporary archive</a></section>
  </>;
}

export default async function LocalePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const chapter = chapters[slug as Slug];
  if (!chapter) notFound();
  const isChinese = slug === "hong-kong" || slug === "taiwan" || slug === "mainland-china";

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
    {isChinese ? <ChineseChapter locale={slug as keyof typeof chineseCopy} /> : slug === "france" ? <FrenchChapter /> : slug === "italy" ? <ItalianChapter /> : slug === "vietnam" ? <VietnamChapter /> : !chapter.live ? <Researching chapter={chapter as (typeof chapters)[Exclude<Slug, "south-korea">]} /> : <>
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

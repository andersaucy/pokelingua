"use client";

import { useMemo, useState } from "react";
import chinesePokemon from "../data/chinesePokemon.json";
import englishUsPokemon from "../data/englishUsPokemon.json";
import frenchPokemon from "../data/frenchPokemon.json";
import germanPokemon from "../data/germanPokemon.json";
import italianPokemon from "../data/italianPokemon.json";
import koreanPokemon from "../data/koreanPokemon.json";
import mediaPokemon from "../data/mediaPokemon.json";
import vietnamesePokemon from "../data/vietnamesePokemon.json";
import { tamilScriptNames, teluguScriptNames } from "../data/indianScriptNames";
import { spanishPokemon } from "../data/spanishPokemon";
import { dateMethodNote, nameYear, type NameLocale } from "../data/nameDates";
import { nameOriginFor, type OriginField } from "./NameEtymology";

const frenchById = new Map(frenchPokemon.map((entry) => [entry.id, entry]));
const germanById = new Map(germanPokemon.map((entry) => [entry.id, entry]));
const italianById = new Map(italianPokemon.map((entry) => [entry.id, entry]));
const koreanById = new Map(koreanPokemon.map((entry) => [entry.id, entry]));
const chineseById = new Map(chinesePokemon.map((entry) => [entry.id, entry]));
const vietnameseById = new Map(vietnamesePokemon.map((entry) => [entry.id, entry]));
const spanishById = new Map(spanishPokemon.map((entry) => [entry.id, entry]));
const russianById = new Map(mediaPokemon.russian.map((entry) => [entry.id, entry]));
const thaiById = new Map(mediaPokemon.thai.map((entry) => [entry.id, entry]));
const hindiById = new Map(mediaPokemon.hindi.map((entry) => [entry.id, entry]));

const brazilLocalized: Record<number, string> = { 772: "Tipo Nulo", 984: "Presa Grande", 985: "Cauda Brado", 986: "Capuz Bruto", 987: "Juba Sopro", 988: "Asa Rasteira", 989: "Choque Areia", 990: "Trilho Férreo", 991: "Pacote Férreo", 992: "Mãos Férreas", 993: "Jugulares Férreas", 994: "Mariposa Férrea", 995: "Espinhos Férreos", 1005: "Lua Estrondo", 1006: "Valentia Férrea", 1009: "Onda Ando", 1010: "Folhas Férreas", 1020: "Fogo Corrosão", 1021: "Raio Fúria", 1022: "Rocha Férrea", 1023: "Chifres Férreos" };

const records = englishUsPokemon.map((english) => ({
  english,
  french: frenchById.get(english.id)!,
  german: germanById.get(english.id)!,
  italian: italianById.get(english.id)!,
  korean: koreanById.get(english.id)!,
  chinese: chineseById.get(english.id)!,
  vietnamese: vietnameseById.get(english.id)!,
  spanish: spanishById.get(english.id)!,
  russian: russianById.get(english.id) ?? { id: english.id, english: english.english, current: english.english, reading: "No official Cyrillic record indexed" },
  thai: thaiById.get(english.id) ?? { id: english.id, english: english.english, current: english.english, reading: "No official Thai-script record indexed" },
  hindi: hindiById.get(english.id) ?? { id: english.id, english: english.english, current: english.english, reading: "No official Devanāgarī record indexed" },
}));

function searchText(record: (typeof records)[number]) {
  return [record.english.id, record.english.english, record.english.kana, record.english.hepburn, record.english.trademark,
    record.french.french, record.french.legacy ?? "", record.german.german, record.italian.italian,
    record.korean.hangul, record.korean.revised, record.korean.mccune, record.korean.officialRomanization,
    record.korean.historical?.name ?? "", record.chinese.traditional, record.chinese.simplified, record.chinese.pinyin,
    record.chinese.cantonese, ...record.chinese.historical.flatMap((item) => [item.name, item.reading]),
    record.vietnamese.current, record.vietnamese.historical, record.spanish.spanish,
    record.russian.current, record.russian.reading, record.thai.current, record.thai.reading,
    record.hindi.current, record.hindi.reading, record.hindi.former ?? "", record.hindi.formerReading ?? "",
    tamilScriptNames[record.english.id]?.name ?? "", teluguScriptNames[record.english.id]?.name ?? "",
    brazilLocalized[record.english.id] ?? record.english.english].join(" ").toLocaleLowerCase();
}

type CardSpec = { href: string; label: string; name: string; reading?: string; field: OriginField; locale?: NameLocale; year?: string; fallbackField?: OriginField; core: boolean };

function GlobalNameCard({ href, label, name, reading, id, field, locale, year, fallbackField }: Omit<CardSpec, "core"> & { id: number }) {
  return <div className="global-name-card">
    <a href={href}><span>{label}</span><b>{name}</b>{reading && <small>{reading}</small>}</a>
    <details><summary>Origin · {year ?? (locale ? nameYear(id, locale) : "N/A")}</summary><p>{nameOriginFor(id, field, fallbackField)}</p></details>
  </div>;
}

export function GlobalPokemonSearch() {
  const [query, setQuery] = useState("");
  const [coreOnly, setCoreOnly] = useState(true);
  const normalized = query.trim().toLocaleLowerCase();
  const matches = useMemo(() => normalized.length < 2 ? [] : records.filter((record) => searchText(record).includes(normalized)).slice(0, 12), [normalized]);

  return <section className="global-search" id="pokemon-search">
    <div className="section-kicker">02 / Search across languages</div>
    <div className="global-search-head"><div><span>One species · every indexed locale</span><h2>What is this Pokémon<br /><em>called around the world?</em></h2></div><p>Search a name from any indexed game, dub, script, or historical locale record. Compare the core games’ official nine-language set—or open the full exhibition-wide view.</p></div>
    <label className="pokemon-search-box"><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try Charmander, Glumanda, Salamèche, 파이리, 小火龍, or Hitokage…" aria-label="Search Pokémon names across all languages" /><kbd>{normalized.length >= 2 ? `${matches.length}${matches.length === 12 ? "+" : ""} matches` : "1,025 species"}</kbd></label>
    <label className="global-search-mode"><input type="checkbox" checked={coreOnly} onChange={(event) => setCoreOnly(event.target.checked)} /><span><b>Core-game nine only</b><small>Uncheck to compare all 19 locale records currently indexed across the exhibition.</small></span></label>
    {!normalized && <div className="search-suggestion-row"><span>Try a multilingual trail</span>{["Pikachu", "Bisasam", "Salamèche", "파이리", "比卡超", "Hitokage"].map((name) => <button onClick={() => setQuery(name)} key={name}>{name}</button>)}</div>}
    {normalized.length === 1 && <p className="global-search-prompt">Type one more character to begin searching the full multilingual index.</p>}
    {normalized.length >= 2 && !matches.length && <p className="global-search-prompt">No indexed species name matches “{query}”. Try another spelling, reading, script, or Pokédex number.</p>}
    {!!matches.length && <div className="global-results">
      {matches.map((record) => {
        const tamil = tamilScriptNames[record.english.id];
        const telugu = teluguScriptNames[record.english.id];
        const brazil = brazilLocalized[record.english.id] ?? record.english.english;
        const cards: CardSpec[] = [
          { core: true, href: "/locales/japan#name-library", label: "Japan · 日本語", name: record.english.kana, reading: record.english.hepburn, field: "japanese", locale: "japan" },
          { core: true, href: "/locales/united-states#name-library", label: "United States · English", name: record.english.english, field: "english", locale: "united-states" },
          { core: true, href: "/locales/germany#name-library", label: "Germany · Deutsch", name: record.german.german, field: "german", locale: "germany" },
          { core: true, href: "/locales/italy#name-library", label: "Italy · Italiano", name: record.italian.italian, field: "italian", locale: "italy" },
          { core: true, href: "/locales/france#name-library", label: "France · Français", name: record.french.french, field: "french", locale: "france" },
          { core: true, href: "/locales/spain#name-library", label: "Spain · Español", name: record.spanish.spanish, field: "english", locale: "spain" },
          { core: true, href: "/locales/south-korea#name-library", label: "South Korea · 한국어", name: record.korean.hangul, reading: record.korean.revised, field: "korean", locale: "south-korea" },
          { core: true, href: "/locales/taiwan#name-library", label: "Traditional Chinese · Taiwan view", name: record.chinese.traditional, reading: record.chinese.pinyin, field: "chineseMandarin", locale: "taiwan" },
          { core: true, href: "/locales/mainland-china#name-library", label: "Simplified Chinese · Mainland", name: record.chinese.simplified, reading: record.chinese.pinyin, field: "chineseMandarin", locale: "mainland-china" },
          { core: false, href: "/locales/latin-america#name-library", label: "Latin America · Español", name: record.spanish.spanish, reading: "Regional core-game and dub locale", field: "english", locale: "latin-america" },
          { core: false, href: "/locales/hong-kong#name-library", label: "Hong Kong · Cantonese", name: record.chinese.traditional, reading: record.chinese.cantonese, field: "chineseCantonese", locale: "hong-kong" },
          { core: false, href: "/locales/vietnam#name-library", label: "Vietnam · current / earlier", name: record.vietnamese.current, reading: record.vietnamese.changed ? `Earlier: ${record.vietnamese.historical}` : "Same across indexed eras", field: "english", locale: "vietnam" },
          { core: false, href: "/locales/brazil#name-library", label: "Brazil · Português brasileiro", name: brazil, reading: brazil === record.english.english ? "English spelling retained" : "Distinct Brazilian Portuguese record", field: "english", year: brazil === record.english.english ? "N/A" : record.english.id === 772 ? "2016" : "2022" },
          { core: false, href: "/locales/russia#name-library", label: "Russia · Русский", name: record.russian.current, reading: record.russian.reading, field: "english", year: "N/A" },
          { core: false, href: "/locales/thailand#name-library", label: "Thailand · ไทย", name: record.thai.current, reading: record.thai.reading, field: "japanese", year: "N/A" },
          { core: false, href: "/locales/hindi-india#name-library", label: "Hindi in India · हिन्दी", name: record.hindi.current, reading: record.hindi.former ? `Former: ${record.hindi.former}` : record.hindi.reading, field: "english", year: "2025" },
          { core: false, href: "/locales/tamil-india#name-library", label: "Tamil in India · தமிழ்", name: tamil?.name ?? record.english.english, reading: tamil ? "Official Tamil-script media record" : "English name retained in speech · script form N/A", field: "english", year: "N/A" },
          { core: false, href: "/locales/telugu-india#name-library", label: "Telugu in India · తెలుగు", name: telugu?.name ?? record.english.english, reading: telugu ? "Official Telugu-script media record" : "English name retained in speech · script form N/A", field: "english", year: "N/A" },
          { core: false, href: "/locales/turkey", label: "Türkiye · Türkçe dub", name: record.english.english, reading: "English-derived species name retained in the dub record", field: "english", year: "N/A" },
        ];
        const visibleCards = coreOnly ? cards.filter((card) => card.core) : cards;
        return <article className="global-result" key={record.english.id}>
        <header><img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${record.english.id}.png`} alt="" /><div><span>#{String(record.english.id).padStart(4, "0")}</span><h3>{record.english.english}</h3><p lang="ja">{record.english.kana} · {record.english.hepburn}</p></div></header>
        <div className="global-name-grid">
          {visibleCards.map((card) => <GlobalNameCard key={card.href} {...card} id={record.english.id} />)}
        </div>
      </article>;})}
    </div>}
    <p className="global-search-note">The checked view represents the nine selectable language traditions established in the core games; the expanded view separates those languages into the locale chapters and adds official anime-, service-, and script-based records. A repeated spelling is still evidence of a locale’s naming policy. {dateMethodNote}</p>
  </section>;
}

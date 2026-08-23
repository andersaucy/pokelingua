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
import { arabicScriptNames, hebrewScriptNames } from "../data/regionalScriptNames";
import { spanishPokemon } from "../data/spanishPokemon";
import { nameYear, type NameLocale } from "../data/nameDates";
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
  french: frenchById.get(english.id),
  german: germanById.get(english.id),
  italian: italianById.get(english.id),
  korean: koreanById.get(english.id),
  chinese: chineseById.get(english.id),
  vietnamese: vietnameseById.get(english.id),
  spanish: spanishById.get(english.id),
  russian: russianById.get(english.id),
  thai: thaiById.get(english.id),
  hindi: hindiById.get(english.id),
}));

function searchText(record: (typeof records)[number]) {
  return [record.english.id, record.english.english, record.english.kana, record.english.hepburn, record.english.trademark,
    record.french?.french ?? "", record.french?.legacy ?? "", record.german?.german ?? "", record.italian?.italian ?? "",
    record.korean?.hangul ?? "", record.korean?.revised ?? "", record.korean?.mccune ?? "", record.korean?.officialRomanization ?? "",
    record.korean?.historical?.name ?? "", record.chinese?.traditional ?? "", record.chinese?.simplified ?? "", record.chinese?.pinyin ?? "",
    record.chinese?.cantonese ?? "", ...(record.chinese?.historical ?? []).flatMap((item) => [item.name, item.reading]),
    record.vietnamese?.current ?? "", record.vietnamese?.historical ?? "", record.spanish?.spanish ?? "",
    record.russian?.current ?? "", record.russian?.reading ?? "", record.thai?.current ?? "", record.thai?.reading ?? "",
    record.hindi?.current ?? "", record.hindi?.reading ?? "", record.hindi?.former ?? "", record.hindi?.formerReading ?? "",
    tamilScriptNames[record.english.id]?.name ?? "", teluguScriptNames[record.english.id]?.name ?? "",
    arabicScriptNames[record.english.id]?.name ?? "", arabicScriptNames[record.english.id]?.reading ?? "",
    hebrewScriptNames[record.english.id]?.name ?? "", hebrewScriptNames[record.english.id]?.reading ?? "",
    brazilLocalized[record.english.id] ?? record.english.english].join(" ").toLocaleLowerCase();
}

type CardSpec = { label: string; name: string; reading?: string; field: OriginField; locale?: NameLocale; year?: string; fallbackField?: OriginField; core: boolean };

function displayedYear(card: CardSpec, id: number) {
  if (card.name === "N/A") return "N/A";
  return card.year ?? (card.locale ? nameYear(id, card.locale) : "N/A");
}

function GlobalNameCard({ label, name, reading, id, field, locale, year, fallbackField, core }: CardSpec & { id: number }) {
  const isMissing = name === "N/A";
  return <div className={`global-name-card${core ? "" : " global-name-card--media"}`}>
    <details>
      <summary className="global-name-summary"><span>{label}</span><b>{name}</b>{reading && <small>{reading}</small>}</summary>
      <div className="global-name-origin"><strong>Origin · {displayedYear({ label, name, reading, field, locale, year, fallbackField, core }, id)}</strong><p>{isMissing ? "N/A" : nameOriginFor(id, field, fallbackField)}</p></div>
    </details>
  </div>;
}

export function GlobalPokemonSearch() {
  const [query, setQuery] = useState("");
  const [coreOnly, setCoreOnly] = useState(true);
  const normalized = query.trim().toLocaleLowerCase();
  const matches = useMemo(() => normalized.length < 2 ? [] : records.filter((record) => searchText(record).includes(normalized)).slice(0, 12), [normalized]);

  return <section className="global-search" id="pokemon-search">
    <div className="section-kicker">Pokédex / Search across languages</div>
    <div className="global-search-head"><div><span>One species · every indexed locale</span><h2>What is this Pokémon<br /><em>called around the world?</em></h2></div><p>Search a name from any indexed game, dub, script, or historical locale record. Compare the core games’ official nine-language set—or open the full exhibition-wide view.</p></div>
    <label className="pokemon-search-box"><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try Charmander, Glumanda, Salamèche, 파이리, 小火龍, or Hitokage…" aria-label="Search Pokémon names across all languages" /><kbd>{normalized.length >= 2 ? `${matches.length}${matches.length === 12 ? "+" : ""} matches` : "1,025 species"}</kbd></label>
    <label className="global-search-mode"><input type="checkbox" checked={coreOnly} onChange={(event) => setCoreOnly(event.target.checked)} /><span><b>Core-game nine only</b><small>Uncheck to compare all 25 locale records currently indexed across the exhibition.</small></span></label>
    {!normalized && <div className="search-suggestion-row"><span>Try a multilingual trail</span>{["Pikachu", "Bisasam", "Salamèche", "파이리", "比卡超", "Hitokage"].map((name) => <button onClick={() => setQuery(name)} key={name}>{name}</button>)}</div>}
    {normalized.length === 1 && <p className="global-search-prompt">Type one more character to begin searching the full multilingual index.</p>}
    {normalized.length >= 2 && !matches.length && <p className="global-search-prompt">No indexed species name matches “{query}”. Try another spelling, reading, script, or Pokédex number.</p>}
    {!!matches.length && <div className="global-results">
      {matches.map((record) => {
        const tamil = tamilScriptNames[record.english.id];
        const telugu = teluguScriptNames[record.english.id];
        const brazil = brazilLocalized[record.english.id] ?? record.english.english;
        const arabic = arabicScriptNames[record.english.id];
        const hebrew = hebrewScriptNames[record.english.id];
        const cards: CardSpec[] = [
          { core: true, label: "Japan · 日本語", name: record.english.kana, reading: record.english.hepburn, field: "japanese", locale: "japan" },
          { core: true, label: "United States · English", name: record.english.english, field: "english", locale: "united-states" },
          { core: true, label: "Germany · Deutsch", name: record.german?.german ?? "N/A", field: "german", locale: "germany" },
          { core: true, label: "Italy · Italiano", name: record.italian?.italian ?? "N/A", field: "italian", locale: "italy" },
          { core: true, label: "France · Français", name: record.french?.french ?? "N/A", field: "french", locale: "france" },
          { core: true, label: "Spain · Español", name: record.spanish?.spanish ?? "N/A", field: "english", locale: "spain" },
          { core: true, label: "South Korea · 한국어", name: record.korean?.hangul ?? "N/A", reading: record.korean?.revised, field: "korean", locale: "south-korea" },
          { core: true, label: "Traditional Chinese · Taiwan view", name: record.chinese?.traditional ?? "N/A", reading: record.chinese?.pinyin, field: "chineseMandarin", locale: "taiwan" },
          { core: true, label: "Simplified Chinese · Mainland", name: record.chinese?.simplified ?? "N/A", reading: record.chinese?.pinyin, field: "chineseMandarin", locale: "mainland-china" },
          { core: false, label: "Latin America · Español", name: record.spanish?.spanish ?? "N/A", reading: record.spanish ? "Regional core-game and dub locale" : undefined, field: "english", locale: "latin-america" },
          { core: false, label: "Hong Kong · Cantonese", name: record.chinese?.traditional ?? "N/A", reading: record.chinese?.cantonese, field: "chineseCantonese", locale: "hong-kong" },
          { core: false, label: "Vietnam · current / earlier", name: record.vietnamese?.current ?? "N/A", reading: record.vietnamese ? (record.vietnamese.changed ? `Earlier: ${record.vietnamese.historical}` : "Same across indexed eras") : undefined, field: "english", locale: "vietnam" },
          { core: false, label: "Brazil · Português brasileiro", name: brazil, reading: brazil === record.english.english ? "English spelling retained" : "Distinct Brazilian Portuguese record", field: "english", year: brazil === record.english.english ? "N/A" : record.english.id === 772 ? "2016" : "2022" },
          { core: false, label: "Philippines · Filipino / English", name: record.english.english, reading: "International name retained in locale media", field: "english", year: "N/A" },
          { core: false, label: "Portugal · Português europeu", name: record.english.english, reading: "International name retained in locale media", field: "english", year: "N/A" },
          { core: false, label: "Arab world · العربية", name: arabic?.name ?? "N/A", reading: arabic?.reading, field: "english", year: "N/A" },
          { core: false, label: "Israel · עברית", name: hebrew?.name ?? "N/A", reading: hebrew?.reading, field: "english", year: "N/A" },
          { core: false, label: "Malaysia · Bahasa Melayu / English", name: record.english.english, reading: "International name retained in locale media", field: "english", year: "N/A" },
          { core: false, label: "Indonesia · Bahasa Indonesia", name: record.english.english, reading: "International name retained in Indonesian media", field: "english", year: "N/A" },
          { core: false, label: "Russia · Русский", name: record.russian?.current ?? "N/A", reading: record.russian?.reading, field: "english", year: "N/A" },
          { core: false, label: "Thailand · ไทย", name: record.thai?.current ?? "N/A", reading: record.thai?.reading, field: "japanese", year: "N/A" },
          { core: false, label: "Hindi in India · हिन्दी", name: record.hindi?.current ?? "N/A", reading: record.hindi ? (record.hindi.former ? `Former: ${record.hindi.former}` : record.hindi.reading) : undefined, field: "english", year: "2025" },
          { core: false, label: "Tamil in India · தமிழ்", name: tamil?.name ?? "N/A", reading: tamil ? "Official Tamil-script media record" : undefined, field: "english", year: "N/A" },
          { core: false, label: "Telugu in India · తెలుగు", name: telugu?.name ?? "N/A", reading: telugu ? "Official Telugu-script media record" : undefined, field: "english", year: "N/A" },
          { core: false, label: "Türkiye · Türkçe dub", name: "N/A", field: "english", year: "N/A" },
        ];
        const visibleCards = coreOnly
          ? cards.filter((card) => card.core)
          : cards.map((card, index) => ({ card, index, year: Number.parseInt(displayedYear(card, record.english.id), 10) }))
            .sort((a, b) => (Number.isNaN(a.year) ? Number.POSITIVE_INFINITY : a.year) - (Number.isNaN(b.year) ? Number.POSITIVE_INFINITY : b.year) || a.index - b.index)
            .map(({ card }) => card);
        return <article className="global-result" key={record.english.id}>
        <header><img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${record.english.id}.png`} alt="" /><div><span>#{String(record.english.id).padStart(4, "0")}</span><h3>{record.english.english}</h3><p lang="ja">{record.english.kana} · {record.english.hepburn}</p></div></header>
        <div className="global-name-grid">
          {visibleCards.map((card) => <GlobalNameCard key={card.label} {...card} id={record.english.id} />)}
        </div>
      </article>;})}
    </div>}
    <p className="global-search-note">The checked view represents the nine selectable language traditions established in the core games; the expanded view separates those languages into the locale chapters and adds official anime-, service-, and script-based records. A repeated spelling is still evidence of a locale’s naming policy.</p>
  </section>;
}

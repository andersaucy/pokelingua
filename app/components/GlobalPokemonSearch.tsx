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
import { useLang } from "./LanguageProvider";

const copy = {
  en: {
    kicker: "Pokédex / Search across languages",
    eyebrow: "One species · every indexed locale",
    title: "What is this Pokémon",
    titleEm: "called around the world?",
    intro: "Search a name from any indexed game, dub, script, or historical locale record. Compare the core games’ official nine-language set—or open the full exhibition-wide view.",
    placeholder: "Try Charmander, Glumanda, Salamèche, 파이리, 小火龍, or Hitokage…",
    searchLabel: "Search Pokémon names across all languages",
    matches: (n: number, more: boolean) => `${n}${more ? "+" : ""} matches`,
    species: "1,025 species",
    coreOnly: "Core-game nine only",
    coreOnlyNote: "Uncheck to compare all 25 locale records currently indexed across the exhibition.",
    suggest: "Try a multilingual trail",
    oneMore: "Type one more character to begin searching the full multilingual index.",
    noMatch: (query: string) => `No indexed species name matches “${query}”. Try another spelling, reading, script, or Pokédex number.`,
    note: "The checked view represents the nine selectable language traditions established in the core games; the expanded view separates those languages into the locale chapters and adds official anime-, service-, and script-based records. A repeated spelling is still evidence of a locale’s naming policy.",
    origin: "Origin · ",
    na: "N/A",
    labels: { japan: "Japan · 日本語", us: "United States · English", germany: "Germany · Deutsch", italy: "Italy · Italiano", france: "France · Français", spain: "Spain · Español", korea: "South Korea · 한국어", taiwan: "Traditional Chinese · Taiwan view", mainland: "Simplified Chinese · Mainland", latam: "Latin America · Español", hongKong: "Hong Kong · Cantonese", vietnam: "Vietnam · current / earlier", brazil: "Brazil · Português brasileiro", philippines: "Philippines · Filipino / English", portugal: "Portugal · Português europeu", arab: "Arab world · العربية", israel: "Israel · עברית", malaysia: "Malaysia · Bahasa Melayu / English", indonesia: "Indonesia · Bahasa Indonesia", russia: "Russia · Русский", thailand: "Thailand · ไทย", hindi: "Hindi in India · हिन्दी", tamil: "Tamil in India · தமிழ்", telugu: "Telugu in India · తెలుగు", turkiye: "Türkiye · Türkçe dub" },
    latamNote: "Regional core-game and dub locale",
    earlier: (name: string) => `Earlier: ${name}`,
    sameEras: "Same across indexed eras",
    englishRetained: "English spelling retained",
    brazilDistinct: "Distinct Brazilian Portuguese record",
    retainedLocale: "International name retained in locale media",
    retainedIndonesia: "International name retained in Indonesian media",
    former: (name: string) => `Former: ${name}`,
    tamilNote: "Official Tamil-script media record",
    teluguNote: "Official Telugu-script media record",
  },
  es: {
    kicker: "Pokédex / Búsqueda entre idiomas",
    eyebrow: "Una especie · todas las regiones indexadas",
    title: "¿Cómo se llama este Pokémon",
    titleEm: "en todo el mundo?",
    intro: "Busca un nombre de cualquier juego, doblaje, escritura o registro regional histórico indexado. Compara el conjunto oficial de nueve idiomas de los juegos principales—o abre la vista completa de toda la exposición.",
    placeholder: "Prueba Charmander, Glumanda, Salamèche, 파이리, 小火龍 o Hitokage…",
    searchLabel: "Busca nombres de Pokémon en todos los idiomas",
    matches: (n: number, more: boolean) => `${n.toLocaleString("es")}${more ? "+" : ""} resultados`,
    species: "1.025 especies",
    coreOnly: "Solo los nueve de los juegos principales",
    coreOnlyNote: "Desmárcalo para comparar los 25 registros regionales que la exposición indexa actualmente.",
    suggest: "Prueba un rastro multilingüe",
    oneMore: "Escribe un carácter más para empezar a buscar en todo el índice multilingüe.",
    noMatch: (query: string) => `Ningún nombre de especie indexado coincide con “${query}”. Prueba otra grafía, lectura, escritura o número de la Pokédex.`,
    note: "La vista marcada representa las nueve tradiciones lingüísticas seleccionables establecidas en los juegos principales; la vista ampliada separa esos idiomas en los capítulos regionales y añade registros oficiales del anime, de servicios y de sistemas de escritura. Una grafía repetida sigue siendo prueba de la política de nombres de una región.",
    origin: "Origen · ",
    na: "N/D",
    labels: { japan: "Japón · 日本語", us: "Estados Unidos · English", germany: "Alemania · Deutsch", italy: "Italia · Italiano", france: "Francia · Français", spain: "España · Español", korea: "Corea del Sur · 한국어", taiwan: "Chino tradicional · vista de Taiwán", mainland: "Chino simplificado · China continental", latam: "Latinoamérica · Español", hongKong: "Hong Kong · cantonés", vietnam: "Vietnam · actual / anterior", brazil: "Brasil · Português brasileiro", philippines: "Filipinas · Filipino / English", portugal: "Portugal · Português europeu", arab: "Mundo árabe · العربية", israel: "Israel · עברית", malaysia: "Malasia · Bahasa Melayu / English", indonesia: "Indonesia · Bahasa Indonesia", russia: "Rusia · Русский", thailand: "Tailandia · ไทย", hindi: "Hindi en la India · हिन्दी", tamil: "Tamil en la India · தமிழ்", telugu: "Telugu en la India · తెలుగు", turkiye: "Turquía · doblaje en Türkçe" },
    latamNote: "Región con juego principal y doblaje",
    earlier: (name: string) => `Anterior: ${name}`,
    sameEras: "Igual en todas las épocas indexadas",
    englishRetained: "Se conserva la grafía inglesa",
    brazilDistinct: "Registro propio en portugués brasileño",
    retainedLocale: "Nombre internacional conservado en los medios de la región",
    retainedIndonesia: "Nombre internacional conservado en los medios indonesios",
    former: (name: string) => `Antes: ${name}`,
    tamilNote: "Registro mediático oficial en escritura tamil",
    teluguNote: "Registro mediático oficial en escritura telugu",
  },
};

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
  const lang = useLang();
  const t = copy[lang];
  const isMissing = name === "N/A";
  const show = (value: string) => value === "N/A" ? t.na : value;
  return <div className={`global-name-card${core ? "" : " global-name-card--media"}`}>
    <details>
      <summary className="global-name-summary"><span>{label}</span><b>{show(name)}</b>{reading && <small>{reading}</small>}</summary>
      <div className="global-name-origin"><strong>{t.origin}{show(displayedYear({ label, name, reading, field, locale, year, fallbackField, core }, id))}</strong><p>{isMissing ? t.na : show(nameOriginFor(id, field, fallbackField, lang))}</p></div>
    </details>
  </div>;
}

export function GlobalPokemonSearch() {
  const t = copy[useLang()];
  const [query, setQuery] = useState("");
  const [coreOnly, setCoreOnly] = useState(true);
  const normalized = query.trim().toLocaleLowerCase();
  const matches = useMemo(() => normalized.length < 2 ? [] : records.filter((record) => searchText(record).includes(normalized)).slice(0, 12), [normalized]);

  return <section className="global-search" id="pokemon-search">
    <div className="section-kicker">{t.kicker}</div>
    <div className="global-search-head"><div><span>{t.eyebrow}</span><h2>{t.title}<br /><em>{t.titleEm}</em></h2></div><p>{t.intro}</p></div>
    <label className="pokemon-search-box"><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t.placeholder} aria-label={t.searchLabel} /><kbd>{normalized.length >= 2 ? t.matches(matches.length, matches.length === 12) : t.species}</kbd></label>
    <label className="global-search-mode"><input type="checkbox" checked={coreOnly} onChange={(event) => setCoreOnly(event.target.checked)} /><span><b>{t.coreOnly}</b><small>{t.coreOnlyNote}</small></span></label>
    {!normalized && <div className="search-suggestion-row"><span>{t.suggest}</span>{["Pikachu", "Bisasam", "Salamèche", "파이리", "比卡超", "Hitokage"].map((name) => <button onClick={() => setQuery(name)} key={name}>{name}</button>)}</div>}
    {normalized.length === 1 && <p className="global-search-prompt">{t.oneMore}</p>}
    {normalized.length >= 2 && !matches.length && <p className="global-search-prompt">{t.noMatch(query)}</p>}
    {!!matches.length && <div className="global-results">
      {matches.map((record) => {
        const tamil = tamilScriptNames[record.english.id];
        const telugu = teluguScriptNames[record.english.id];
        const brazil = brazilLocalized[record.english.id] ?? record.english.english;
        const arabic = arabicScriptNames[record.english.id];
        const hebrew = hebrewScriptNames[record.english.id];
        const cards: CardSpec[] = [
          { core: true, label: t.labels.japan, name: record.english.kana, reading: record.english.hepburn, field: "japanese", locale: "japan" },
          { core: true, label: t.labels.us, name: record.english.english, field: "english", locale: "united-states" },
          { core: true, label: t.labels.germany, name: record.german?.german ?? "N/A", field: "german", locale: "germany" },
          { core: true, label: t.labels.italy, name: record.italian?.italian ?? "N/A", field: "italian", locale: "italy" },
          { core: true, label: t.labels.france, name: record.french?.french ?? "N/A", field: "french", locale: "france" },
          { core: true, label: t.labels.spain, name: record.spanish?.spanish ?? "N/A", field: "english", locale: "spain" },
          { core: true, label: t.labels.korea, name: record.korean?.hangul ?? "N/A", reading: record.korean?.revised, field: "korean", locale: "south-korea" },
          { core: true, label: t.labels.taiwan, name: record.chinese?.traditional ?? "N/A", reading: record.chinese?.pinyin, field: "chineseMandarin", locale: "taiwan" },
          { core: true, label: t.labels.mainland, name: record.chinese?.simplified ?? "N/A", reading: record.chinese?.pinyin, field: "chineseMandarin", locale: "mainland-china" },
          { core: false, label: t.labels.latam, name: record.spanish?.spanish ?? "N/A", reading: record.spanish ? t.latamNote : undefined, field: "english", locale: "latin-america" },
          { core: false, label: t.labels.hongKong, name: record.chinese?.traditional ?? "N/A", reading: record.chinese?.cantonese, field: "chineseCantonese", locale: "hong-kong" },
          { core: false, label: t.labels.vietnam, name: record.vietnamese?.current ?? "N/A", reading: record.vietnamese ? (record.vietnamese.changed ? t.earlier(record.vietnamese.historical) : t.sameEras) : undefined, field: "english", locale: "vietnam" },
          { core: false, label: t.labels.brazil, name: brazil, reading: brazil === record.english.english ? t.englishRetained : t.brazilDistinct, field: "english", year: brazil === record.english.english ? "N/A" : record.english.id === 772 ? "2016" : "2022" },
          { core: false, label: t.labels.philippines, name: record.english.english, reading: t.retainedLocale, field: "english", year: "N/A" },
          { core: false, label: t.labels.portugal, name: record.english.english, reading: t.retainedLocale, field: "english", year: "N/A" },
          { core: false, label: t.labels.arab, name: arabic?.name ?? "N/A", reading: arabic?.reading, field: "english", year: "N/A" },
          { core: false, label: t.labels.israel, name: hebrew?.name ?? "N/A", reading: hebrew?.reading, field: "english", year: "N/A" },
          { core: false, label: t.labels.malaysia, name: record.english.english, reading: t.retainedLocale, field: "english", year: "N/A" },
          { core: false, label: t.labels.indonesia, name: record.english.english, reading: t.retainedIndonesia, field: "english", year: "N/A" },
          { core: false, label: t.labels.russia, name: record.russian?.current ?? "N/A", reading: record.russian?.reading, field: "english", year: "N/A" },
          { core: false, label: t.labels.thailand, name: record.thai?.current ?? "N/A", reading: record.thai?.reading, field: "japanese", year: "N/A" },
          { core: false, label: t.labels.hindi, name: record.hindi?.current ?? "N/A", reading: record.hindi ? (record.hindi.former ? t.former(record.hindi.former) : record.hindi.reading) : undefined, field: "english", year: "2025" },
          { core: false, label: t.labels.tamil, name: tamil?.name ?? "N/A", reading: tamil ? t.tamilNote : undefined, field: "english", year: "N/A" },
          { core: false, label: t.labels.telugu, name: telugu?.name ?? "N/A", reading: telugu ? t.teluguNote : undefined, field: "english", year: "N/A" },
          { core: false, label: t.labels.turkiye, name: "N/A", field: "english", year: "N/A" },
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
    <p className="global-search-note">{t.note}</p>
  </section>;
}

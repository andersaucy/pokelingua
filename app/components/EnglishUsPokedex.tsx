"use client";

import { useEffect, useMemo, useState } from "react";
import englishUsPokemon from "../data/englishUsPokemon.json";
import { useLang } from "./LanguageProvider";
import { NameEtymology } from "./NameEtymology";

const PAGE_SIZE = 50;

const copy = {
  en: {
    kicker: "English / Japanese name atlas",
    title: ["The translation that", "became international."],
    intro: "Browse all 1,025 species through Pecharunt. Search an English name, Japanese script, Hepburn reading, trademarked romanization, or National Pokédex number—and open a row to see the relationship.",
    coverage: "English US name-library coverage",
    indexed: "English species names indexed",
    distinct: "Distinct from Japanese romanization",
    statusNote: "The comparison is structural, not a claim of sole authorship or literal translation. English names were developed from creature concepts and Japanese source information; some were rebuilt as English wordplay, while globally recognizable forms such as Pikachu were retained.",
    placeholder: "Try Bulbasaur, Fushigidane, フシギダネ, or 001…",
    search: "Search the English and Japanese Pokémon name archive",
    renamedOnly: "English redesigns only",
    showing: (shown: number, total: number) => `Showing ${shown} of ${total}`,
    table: "English US and Japanese Pokémon name library",
    spriteNo: "Sprite / No.",
    englishUs: "English (US)",
    japaneseOriginal: "Japanese original",
    nameRelationship: "Name relationship",
    hepburnReading: (value: string) => `${value} · Hepburn reading`,
    retained: "Retained",
    aligns: "English aligns with a Japanese romanization",
    redesigned: "Redesigned",
    distinctLocalization: "Distinct English localization",
    englishLocalization: "English localization",
    regionTag: "United States · en-US",
    retainedNote: "The English edition retained a form aligned with the Japanese name rather than creating a visibly separate English spelling.",
    redesignedNote: "The English edition uses a distinct localized name, generally designed to communicate the creature’s concept, traits, sound, or wordplay to an English-speaking audience.",
    sourceRecord: "Japanese source record",
    trademarked: (hepburn: string, trademark: string) => `${hepburn} · trademarked form: ${trademark}`,
    sourceNote: "Japanese is the original species-name record. Hepburn and trademarked romanizations are reference aids; neither should be mistaken for an English localization by itself.",
    englishLabel: (name: string) => `${name} · English`,
    japaneseLabel: (name: string) => `${name} · Japanese`,
    noResults: (query: string) => `No indexed record matches “${query}”. Try an English name, Japanese name, reading, or Pokédex number.`,
    loadMore: (count: number) => `Load ${count} more`,
    showAll: (count: number) => `Show all ${count}`,
    method: "Coverage & method",
    citation: "English, Japanese-script, Hepburn, and trademarked romanization fields follow Bulbapedia’s complete Japanese-name index. “Retained” is assigned only when normalized English matches a listed Japanese romanization; it describes visible form, not the full creative or legal naming history.",
    sourceLink: "Japanese-name index ↗",
    num: (value: number) => value.toLocaleString(),
  },
  es: {
    kicker: "Atlas de nombres inglés / japonés",
    title: ["La traducción que", "se volvió internacional."],
    intro: "Recorre las 1.025 especies hasta Pecharunt. Busca un nombre en inglés, escritura japonesa, lectura Hepburn, romanización registrada como marca o número de la Pokédex Nacional—y abre una fila para ver la relación.",
    coverage: "Cobertura de la biblioteca de nombres en inglés de EE. UU.",
    indexed: "Nombres de especie en inglés indexados",
    distinct: "Distintos de la romanización japonesa",
    statusNote: "La comparación es estructural; no afirma una autoría única ni una traducción literal. Los nombres ingleses se desarrollaron a partir del concepto de cada criatura y de la información de origen japonesa; algunos se reconstruyeron como juegos de palabras en inglés, mientras que se conservaron formas reconocibles en todo el mundo, como Pikachu.",
    placeholder: "Prueba Bulbasaur, Fushigidane, フシギダネ o 001…",
    search: "Busca en el archivo de nombres Pokémon en inglés y japonés",
    renamedOnly: "Solo rediseños ingleses",
    showing: (shown: number, total: number) => `Mostrando ${shown} de ${total}`,
    table: "Biblioteca de nombres Pokémon en inglés de EE. UU. y japonés",
    spriteNo: "Sprite / N.º",
    englishUs: "Inglés (EE. UU.)",
    japaneseOriginal: "Original japonés",
    nameRelationship: "Relación entre nombres",
    hepburnReading: (value: string) => `${value} · lectura Hepburn`,
    retained: "Conservado",
    aligns: "El inglés coincide con una romanización japonesa",
    redesigned: "Rediseñado",
    distinctLocalization: "Localización inglesa distinta",
    englishLocalization: "Localización inglesa",
    regionTag: "Estados Unidos · en-US",
    retainedNote: "La edición inglesa conservó una forma alineada con el nombre japonés en lugar de crear una grafía inglesa visiblemente distinta.",
    redesignedNote: "La edición inglesa usa un nombre localizado distinto, concebido en general para transmitir el concepto, los rasgos, el sonido o el juego de palabras de la criatura a un público angloparlante.",
    sourceRecord: "Registro japonés de origen",
    trademarked: (hepburn: string, trademark: string) => `${hepburn} · forma registrada: ${trademark}`,
    sourceNote: "El japonés es el registro original del nombre de especie. Las romanizaciones Hepburn y de marca son ayudas de referencia; ninguna debe confundirse por sí sola con una localización inglesa.",
    englishLabel: (name: string) => `${name} · inglés`,
    japaneseLabel: (name: string) => `${name} · japonés`,
    noResults: (query: string) => `Ningún registro indexado coincide con “${query}”. Prueba un nombre en inglés, un nombre japonés, una lectura o un número de la Pokédex.`,
    loadMore: (count: number) => `Cargar ${count} más`,
    showAll: (count: number) => `Mostrar los ${count}`,
    method: "Cobertura y método",
    citation: "Los campos de inglés, escritura japonesa, Hepburn y romanización de marca siguen el índice completo de nombres japoneses de Bulbapedia. “Conservado” solo se asigna cuando el inglés normalizado coincide con una romanización japonesa registrada; describe la forma visible, no toda la historia creativa o legal del nombre.",
    sourceLink: "Índice de nombres japoneses ↗",
    num: (value: number) => value.toLocaleString("es"),
  },
};

export function EnglishUsPokedex() {
  const t = copy[useLang()];
  const [query, setQuery] = useState("");
  const [renamedOnly, setRenamedOnly] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [limit, setLimit] = useState(PAGE_SIZE);

  const matches = useMemo(() => {
    const q = query.trim().toLocaleLowerCase("en-US");
    return englishUsPokemon.filter((entry) => {
      const searchable = [String(entry.id), entry.english, entry.kana, entry.hepburn, entry.trademark].join(" ").toLocaleLowerCase("en-US");
      return (!q || searchable.includes(q)) && (!renamedOnly || !entry.retained);
    });
  }, [query, renamedOnly]);

  useEffect(() => setLimit(PAGE_SIZE), [query, renamedOnly]);

  const visible = matches.slice(0, limit);
  const renamedCount = englishUsPokemon.filter((entry) => !entry.retained).length;
  const hasMore = visible.length < matches.length;

  return <section className="dex-library us-dex" id="name-library">
    <div className="dex-intro">
      <div><span>{t.kicker}</span><h2>{t.title[0]}<br /><em>{t.title[1]}</em></h2></div>
      <p>{t.intro}</p>
    </div>
    <div className="dex-status" aria-label={t.coverage}>
      <div><b>{t.num(englishUsPokemon.length)}</b><span>{t.indexed}</span></div>
      <div><b>{t.num(renamedCount)}</b><span>{t.distinct}</span></div>
      <p>{t.statusNote}</p>
    </div>
    <div className="dex-controls">
      <label><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t.placeholder} aria-label={t.search} /></label>
      <button className={renamedOnly ? "active" : ""} onClick={() => setRenamedOnly(!renamedOnly)} aria-pressed={renamedOnly}>{t.renamedOnly}</button>
      <span>{t.showing(visible.length, matches.length)}</span>
    </div>
    <div className="dex-table" role="table" aria-label={t.table}>
      <div className="dex-row dex-header" role="row"><span>{t.spriteNo}</span><span>{t.englishUs}</span><span>{t.japaneseOriginal}</span><span>{t.nameRelationship}</span><span /></div>
      {visible.map((entry) => {
        const isOpen = expanded === entry.id;
        return <div className={`dex-record ${isOpen ? "open" : ""}`} key={entry.id}>
          <button className="dex-row" role="row" onClick={() => setExpanded(isOpen ? null : entry.id)} aria-expanded={isOpen}>
            <span className="dex-sprite"><img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${entry.id}.png`} alt="" loading="lazy" /><b>#{String(entry.id).padStart(4, "0")}</b></span>
            <span className="dex-english">{entry.english}</span>
            <span className="dex-current"><b lang="ja">{entry.kana}</b><small>{t.hepburnReading(entry.hepburn)}</small></span>
            <span className="dex-history-summary">{entry.retained ? <><b>{t.retained}</b><small>{t.aligns}</small></> : <><b>{t.redesigned}</b><small>{t.distinctLocalization}</small></>}</span>
            <span className="dex-expand" aria-hidden="true">{isOpen ? "−" : "+"}</span>
          </button>
          {isOpen && <div className="dex-detail">
            <div><span>{t.englishLocalization}</span><b>{entry.english}</b><p>{t.regionTag}</p><small>{entry.retained ? t.retainedNote : t.redesignedNote}</small></div>
            <div><span>{t.sourceRecord}</span><b lang="ja">{entry.kana}</b><p>{t.trademarked(entry.hepburn, entry.trademark)}</p><small>{t.sourceNote}</small></div>
            <NameEtymology id={entry.id} name={entry.english} items={[{ label: t.englishLabel(entry.english), field: "english", locale: "united-states" }, { label: t.japaneseLabel(entry.hepburn), field: "japanese", locale: "japan" }]} />
          </div>}
        </div>;
      })}
      {!visible.length && <div className="dex-no-results">{t.noResults(query)}</div>}
    </div>
    {hasMore && <div className="dex-load-more">
      <button onClick={() => setLimit((current) => current + PAGE_SIZE)}>{t.loadMore(Math.min(PAGE_SIZE, matches.length - visible.length))}</button>
      <button className="text-load" onClick={() => setLimit(matches.length)}>{t.showAll(matches.length)}</button>
    </div>}
    <div className="dex-citation"><span>{t.method}</span><p>{t.citation}</p><a href="https://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_in_Japanese" target="_blank" rel="noreferrer">{t.sourceLink}</a></div>
  </section>;
}

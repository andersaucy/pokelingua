"use client";

import { useEffect, useMemo, useState } from "react";
import italianPokemon from "../data/italianPokemon.json";
import { useLang } from "./LanguageProvider";
import { NameEtymology } from "./NameEtymology";

const PAGE_SIZE = 50;

const copy = {
  en: {
    title: ["The same spelling", "is still a choice."],
    intro: "Browse all 1,025 species through Pêchaminus. Most Italian names preserve the English spelling while being spoken through Italian pronunciation; 21 official names form a small but revealing translated set.",
    coverage: "Italian name-library coverage",
    indexed: "Current Italian records indexed",
    distinct: "Names distinct from English",
    statusNote: "Tipo Zero is the lone pre-Paldea exception. The other distinct names belong to the Paradox Pokémon, whose descriptive labels were translated into Italian while ordinary species names continued to use their English spellings.",
    placeholder: "Try Great Tusk, Grandizanne, Pikachu, or 984…",
    search: "Search the Italian Pokémon name archive",
    localizedOnly: "Italian-only names",
    showing: (shown: number, total: number) => `Showing ${shown} of ${total}`,
    table: "Italian Pokémon name library",
    spriteNo: "Sprite / No.",
    english: "English",
    officialName: "Official Italian name",
    localizationRecord: "Localization record",
    currentSpelling: "Current official Italian spelling",
    translated: "Translated",
    differs: "Italian form differs from English",
    shared: "Shared spelling",
    retained: "English name retained in Italian",
    officialRecord: "Italian official record",
    languageTag: "Italian · it-IT",
    localizedNote: "This species has a distinct Italian name used by the official Italian Pokédex and games.",
    sharedNote: "The Italian edition preserves the official English spelling. In speech, the name is conventionally adapted toward an Italian approximation of the English pronunciation.",
    relationship: "Localization relationship",
    comparison: "English comparison",
    typeNullNote: "Type: Null became Tipo Zero in Generation VII—the first species whose official Italian name differed from English.",
    paradoxNote: "This is a Paradox Pokémon. Italian translates the descriptive, title-like English name rather than retaining it unchanged.",
    identicalNote: "Identical spelling does not mean the rest of the product is untranslated: dialogue, moves, items, places, categories, and descriptions are localized into Italian.",
    italianLabel: (name: string) => `${name} · Italian`,
    noResults: (query: string) => `No indexed Italian record matches “${query}”. Try an English name, Italian name, or Pokédex number.`,
    loadMore: (count: number) => `Load ${count} more`,
    showAll: (count: number) => `Show all ${count}`,
    method: "Coverage & method",
    citation: "Current spellings follow Bulbapedia’s Italian-name index and are checked against the official Italian Pokédex. The archive treats shared English spellings as an explicit localization pattern, not as missing data.",
    sourceLink: "Italian-name index ↗",
    num: (value: number) => value.toLocaleString(),
  },
  es: {
    title: ["La misma grafía", "también es una decisión."],
    intro: "Recorre las 1.025 especies hasta Pêchaminus. La mayoría de los nombres italianos conservan la grafía inglesa, aunque se pronuncian a la italiana; 21 nombres oficiales forman un grupo traducido pequeño pero revelador.",
    coverage: "Cobertura de la biblioteca de nombres en italiano",
    indexed: "Registros actuales en italiano indexados",
    distinct: "Nombres distintos del inglés",
    statusNote: "Tipo Zero es la única excepción anterior a Paldea. Los demás nombres distintos pertenecen a los Pokémon Paradoja, cuyas denominaciones descriptivas se tradujeron al italiano mientras los nombres de especie habituales seguían usando su grafía inglesa.",
    placeholder: "Prueba Great Tusk, Grandizanne, Pikachu o 984…",
    search: "Busca en el archivo de nombres Pokémon en italiano",
    localizedOnly: "Solo nombres propios del italiano",
    showing: (shown: number, total: number) => `Mostrando ${shown} de ${total}`,
    table: "Biblioteca de nombres Pokémon en italiano",
    spriteNo: "Sprite / N.º",
    english: "Inglés",
    officialName: "Nombre oficial en italiano",
    localizationRecord: "Registro de localización",
    currentSpelling: "Grafía oficial actual en italiano",
    translated: "Traducido",
    differs: "La forma italiana difiere de la inglesa",
    shared: "Grafía compartida",
    retained: "Se conserva el nombre inglés en italiano",
    officialRecord: "Registro oficial italiano",
    languageTag: "Italiano · it-IT",
    localizedNote: "Esta especie tiene un nombre italiano propio, usado por la Pokédex oficial italiana y los juegos.",
    sharedNote: "La edición italiana conserva la grafía oficial inglesa. Al hablar, el nombre suele adaptarse a una aproximación italiana de la pronunciación inglesa.",
    relationship: "Relación de localización",
    comparison: "Comparación con el inglés",
    typeNullNote: "Type: Null pasó a ser Tipo Zero en la generación VII—la primera especie cuyo nombre oficial italiano difería del inglés.",
    paradoxNote: "Es un Pokémon Paradoja. El italiano traduce el nombre inglés, descriptivo y a modo de título, en lugar de conservarlo sin cambios.",
    identicalNote: "Una grafía idéntica no significa que el resto del producto esté sin traducir: los diálogos, movimientos, objetos, lugares, categorías y descripciones se localizan al italiano.",
    italianLabel: (name: string) => `${name} · italiano`,
    noResults: (query: string) => `Ningún registro italiano indexado coincide con “${query}”. Prueba un nombre en inglés, un nombre en italiano o un número de la Pokédex.`,
    loadMore: (count: number) => `Cargar ${count} más`,
    showAll: (count: number) => `Mostrar los ${count}`,
    method: "Cobertura y método",
    citation: "Las grafías actuales siguen el índice de nombres italianos de Bulbapedia y se cotejan con la Pokédex oficial italiana. El archivo trata las grafías inglesas compartidas como un patrón de localización explícito, no como datos ausentes.",
    sourceLink: "Índice de nombres italianos ↗",
    num: (value: number) => value.toLocaleString("es"),
  },
};

export function ItalianPokedex() {
  const t = copy[useLang()];
  const [query, setQuery] = useState("");
  const [localizedOnly, setLocalizedOnly] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [limit, setLimit] = useState(PAGE_SIZE);

  const matches = useMemo(() => {
    const q = query.trim().toLocaleLowerCase("it-IT");
    return italianPokemon.filter((entry) => {
      const searchable = [String(entry.id), entry.english, entry.italian].join(" ").toLocaleLowerCase("it-IT");
      return (!q || searchable.includes(q)) && (!localizedOnly || entry.localized);
    });
  }, [localizedOnly, query]);

  useEffect(() => setLimit(PAGE_SIZE), [localizedOnly, query]);

  const visible = matches.slice(0, limit);
  const localizedCount = italianPokemon.filter((entry) => entry.localized).length;
  const hasMore = visible.length < matches.length;

  return <section className="dex-library italy-dex" id="name-library">
    <div className="dex-intro">
      <div><span>Pokédex italiano / indice completo</span><h2>{t.title[0]}<br /><em>{t.title[1]}</em></h2></div>
      <p>{t.intro}</p>
    </div>
    <div className="dex-status" aria-label={t.coverage}>
      <div><b>{t.num(italianPokemon.length)}</b><span>{t.indexed}</span></div>
      <div><b>{localizedCount}</b><span>{t.distinct}</span></div>
      <p>{t.statusNote}</p>
    </div>
    <div className="dex-controls">
      <label><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t.placeholder} aria-label={t.search} /></label>
      <button className={localizedOnly ? "active" : ""} onClick={() => setLocalizedOnly(!localizedOnly)} aria-pressed={localizedOnly}>{t.localizedOnly}</button>
      <span>{t.showing(visible.length, matches.length)}</span>
    </div>
    <div className="dex-table" role="table" aria-label={t.table}>
      <div className="dex-row dex-header" role="row"><span>{t.spriteNo}</span><span>{t.english}</span><span>{t.officialName}</span><span>{t.localizationRecord}</span><span /></div>
      {visible.map((entry) => {
        const isOpen = expanded === entry.id;
        return <div className={`dex-record ${isOpen ? "open" : ""}`} key={entry.id}>
          <button className="dex-row" role="row" onClick={() => setExpanded(isOpen ? null : entry.id)} aria-expanded={isOpen}>
            <span className="dex-sprite"><img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${entry.id}.png`} alt="" loading="lazy" /><b>#{String(entry.id).padStart(4, "0")}</b></span>
            <span className="dex-english">{entry.english}</span>
            <span className="dex-current"><b>{entry.italian}</b><small>{t.currentSpelling}</small></span>
            <span className="dex-history-summary">{entry.localized ? <><b>{t.translated}</b><small>{t.differs}</small></> : <><b>{t.shared}</b><small>{t.retained}</small></>}</span>
            <span className="dex-expand" aria-hidden="true">{isOpen ? "−" : "+"}</span>
          </button>
          {isOpen && <div className="dex-detail">
            <div><span>{t.officialRecord}</span><b>{entry.italian}</b><p>{t.languageTag}</p><small>{entry.localized ? t.localizedNote : t.sharedNote}</small></div>
            <div><span>{t.relationship}</span><b>{entry.english}</b><p>{t.comparison}</p><small>{entry.localized ? (entry.id === 772 ? t.typeNullNote : t.paradoxNote) : t.identicalNote}</small></div>
            <NameEtymology id={entry.id} name={entry.english} items={[{ label: t.italianLabel(entry.italian), field: "italian", locale: "italy" }]} />
          </div>}
        </div>;
      })}
      {!visible.length && <div className="dex-no-results">{t.noResults(query)}</div>}
    </div>
    {hasMore && <div className="dex-load-more">
      <button onClick={() => setLimit((current) => current + PAGE_SIZE)}>{t.loadMore(Math.min(PAGE_SIZE, matches.length - visible.length))}</button>
      <button className="text-load" onClick={() => setLimit(matches.length)}>{t.showAll(matches.length)}</button>
    </div>}
    <div className="dex-citation"><span>{t.method}</span><p>{t.citation}</p><a href="https://bulbapedia.bulbagarden.net/wiki/List_of_Italian_Pok%C3%A9mon_names" target="_blank" rel="noreferrer">{t.sourceLink}</a></div>
  </section>;
}

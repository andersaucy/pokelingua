"use client";

import { useEffect, useMemo, useState } from "react";
import germanPokemon from "../data/germanPokemon.json";
import { useLang } from "./LanguageProvider";
import { NameEtymology } from "./NameEtymology";

const PAGE_SIZE = 50;

const copy = {
  en: {
    title: ["Compounds, clues,", "and creature character."],
    intro: "Browse all 1,025 official German species names through Infamomo. Search in English or German, or by National Pokédex number; open any row to unpack the wordplay.",
    indexed: "Official German names indexed",
    distinct: "Names distinct from English",
    statusNote: <>German localization frequently rebuilds a creature from compact clues: Bisasam draws on <i>bizarr</i>, <i>Saurier</i>, and <i>Samen</i>; Glumanda combines <i>Glut</i> with <i>Salamander</i>. Shared international names remain visible as choices too.</>,
    placeholder: "Try Bulbasaur, Bisasam, Glumanda, or 001…",
    search: "Search the German Pokémon name archive",
    localizedOnly: "German-only names",
    showing: (shown: number, total: number) => `Showing ${shown} of ${total}`,
    table: "German Pokémon name library",
    spriteNo: "Sprite / No.",
    english: "English",
    officialName: "Official German name",
    localizationRecord: "Localization record",
    currentSpelling: "Current official German spelling",
    localized: "Localized",
    shared: "Shared spelling",
    differs: "German form differs from English",
    internationalRetained: "International form retained",
    officialRecord: "German official record",
    regionTag: "Germany · de-DE",
    localizedNote: "A distinct German species name, built to carry the creature’s concept into German vocabulary and sound.",
    sharedNote: "The German edition retains the same official spelling as English; moves, dialogue, categories, places, and descriptions are still localized.",
    comparison: "English comparison",
    distinctForm: "Distinct localized form",
    sharedForm: "Shared international form",
    comparisonNote: "A matching or differing spelling describes the visible relationship between editions, not the full creative history behind the name.",
    germanLabel: (name: string) => `${name} · German`,
    noResults: (query: string) => `No indexed German record matches “${query}”. Try an English name, German name, or Pokédex number.`,
    loadMore: (count: number) => `Load ${count} more`,
    showAll: (count: number) => `Show all ${count}`,
    method: "Coverage & method",
    citation: "Current names follow Bulbapedia’s complete German-name index and are cross-referenced with the official German Pokédex. Expandable origins derive from the name-origin records on each species article.",
    sourceLink: "German-name index ↗",
    num: (value: number) => value.toLocaleString(),
  },
  es: {
    title: ["Compuestos, pistas", "y carácter de criatura."],
    intro: "Recorre los 1.025 nombres oficiales de especie en alemán hasta Infamomo. Busca en inglés o alemán, o por número de la Pokédex Nacional; abre cualquier fila para desentrañar el juego de palabras.",
    indexed: "Nombres oficiales en alemán indexados",
    distinct: "Nombres distintos del inglés",
    statusNote: <>La localización alemana suele reconstruir a la criatura a partir de pistas compactas: Bisasam se apoya en <i>bizarr</i>, <i>Saurier</i> y <i>Samen</i>; Glumanda combina <i>Glut</i> con <i>Salamander</i>. Los nombres internacionales compartidos también quedan a la vista como decisiones.</>,
    placeholder: "Prueba Bulbasaur, Bisasam, Glumanda o 001…",
    search: "Busca en el archivo de nombres Pokémon en alemán",
    localizedOnly: "Solo nombres propios del alemán",
    showing: (shown: number, total: number) => `Mostrando ${shown} de ${total}`,
    table: "Biblioteca de nombres Pokémon en alemán",
    spriteNo: "Sprite / N.º",
    english: "Inglés",
    officialName: "Nombre oficial en alemán",
    localizationRecord: "Registro de localización",
    currentSpelling: "Grafía oficial actual en alemán",
    localized: "Localizado",
    shared: "Grafía compartida",
    differs: "La forma alemana difiere de la inglesa",
    internationalRetained: "Se conserva la forma internacional",
    officialRecord: "Registro oficial alemán",
    regionTag: "Alemania · de-DE",
    localizedNote: "Un nombre de especie propio del alemán, creado para trasladar el concepto de la criatura al vocabulario y la sonoridad alemanes.",
    sharedNote: "La edición alemana mantiene la misma grafía oficial que la inglesa; los movimientos, diálogos, categorías, lugares y descripciones siguen estando localizados.",
    comparison: "Comparación con el inglés",
    distinctForm: "Forma localizada distinta",
    sharedForm: "Forma internacional compartida",
    comparisonNote: "Que la grafía coincida o difiera describe la relación visible entre ediciones, no toda la historia creativa detrás del nombre.",
    germanLabel: (name: string) => `${name} · alemán`,
    noResults: (query: string) => `Ningún registro alemán indexado coincide con “${query}”. Prueba un nombre en inglés, un nombre en alemán o un número de la Pokédex.`,
    loadMore: (count: number) => `Cargar ${count} más`,
    showAll: (count: number) => `Mostrar los ${count}`,
    method: "Cobertura y método",
    citation: "Los nombres actuales siguen el índice completo de nombres alemanes de Bulbapedia y se cotejan con la Pokédex oficial alemana. Los orígenes desplegables derivan de los registros de origen del nombre en el artículo de cada especie.",
    sourceLink: "Índice de nombres alemanes ↗",
    num: (value: number) => value.toLocaleString("es"),
  },
};

export function GermanPokedex() {
  const t = copy[useLang()];
  const [query, setQuery] = useState("");
  const [localizedOnly, setLocalizedOnly] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [limit, setLimit] = useState(PAGE_SIZE);
  const matches = useMemo(() => {
    const q = query.trim().toLocaleLowerCase("de-DE");
    return germanPokemon.filter((entry) => (!q || [entry.id, entry.english, entry.german].join(" ").toLocaleLowerCase("de-DE").includes(q)) && (!localizedOnly || entry.localized));
  }, [localizedOnly, query]);
  useEffect(() => setLimit(PAGE_SIZE), [localizedOnly, query]);
  const visible = matches.slice(0, limit);
  const localizedCount = germanPokemon.filter((entry) => entry.localized).length;

  return <section className="dex-library germany-dex" id="name-library">
    <div className="dex-intro"><div><span>Deutscher Pokédex / vollständiger Index</span><h2>{t.title[0]}<br /><em>{t.title[1]}</em></h2></div><p>{t.intro}</p></div>
    <div className="dex-status"><div><b>{t.num(germanPokemon.length)}</b><span>{t.indexed}</span></div><div><b>{t.num(localizedCount)}</b><span>{t.distinct}</span></div><p>{t.statusNote}</p></div>
    <div className="dex-controls"><label><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t.placeholder} aria-label={t.search} /></label><button className={localizedOnly ? "active" : ""} onClick={() => setLocalizedOnly(!localizedOnly)} aria-pressed={localizedOnly}>{t.localizedOnly}</button><span>{t.showing(visible.length, matches.length)}</span></div>
    <div className="dex-table" role="table" aria-label={t.table}>
      <div className="dex-row dex-header" role="row"><span>{t.spriteNo}</span><span>{t.english}</span><span>{t.officialName}</span><span>{t.localizationRecord}</span><span /></div>
      {visible.map((entry) => { const isOpen = expanded === entry.id; return <div className={`dex-record ${isOpen ? "open" : ""}`} key={entry.id}>
        <button className="dex-row" role="row" onClick={() => setExpanded(isOpen ? null : entry.id)} aria-expanded={isOpen}><span className="dex-sprite"><img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${entry.id}.png`} alt="" loading="lazy" /><b>#{String(entry.id).padStart(4, "0")}</b></span><span className="dex-english">{entry.english}</span><span className="dex-current"><b lang="de">{entry.german}</b><small>{t.currentSpelling}</small></span><span className="dex-history-summary"><b>{entry.localized ? t.localized : t.shared}</b><small>{entry.localized ? t.differs : t.internationalRetained}</small></span><span className="dex-expand" aria-hidden="true">{isOpen ? "−" : "+"}</span></button>
        {isOpen && <div className="dex-detail"><div><span>{t.officialRecord}</span><b lang="de">{entry.german}</b><p>{t.regionTag}</p><small>{entry.localized ? t.localizedNote : t.sharedNote}</small></div><div><span>{t.comparison}</span><b>{entry.english}</b><p>{entry.localized ? t.distinctForm : t.sharedForm}</p><small>{t.comparisonNote}</small></div><NameEtymology id={entry.id} name={entry.english} items={[{ label: t.germanLabel(entry.german), field: "german", locale: "germany" }]} /></div>}
      </div>; })}
      {!visible.length && <div className="dex-no-results">{t.noResults(query)}</div>}
    </div>
    {visible.length < matches.length && <div className="dex-load-more"><button onClick={() => setLimit((current) => current + PAGE_SIZE)}>{t.loadMore(Math.min(PAGE_SIZE, matches.length - visible.length))}</button><button className="text-load" onClick={() => setLimit(matches.length)}>{t.showAll(matches.length)}</button></div>}
    <div className="dex-citation"><span>{t.method}</span><p>{t.citation}</p><a href="https://bulbapedia.bulbagarden.net/wiki/List_of_German_Pok%C3%A9mon_names" target="_blank" rel="noreferrer">{t.sourceLink}</a></div>
  </section>;
}

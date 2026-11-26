"use client";

import { useEffect, useMemo, useState } from "react";
import frenchPokemon from "../data/frenchPokemon.json";
import { useLang } from "./LanguageProvider";
import { NameEtymology } from "./NameEtymology";

const PAGE_SIZE = 50;

const copy = {
  en: {
    title: ["Every pun becomes", "a cultural record."],
    intro: "Browse all 1,025 official French species names through Pêchaminus. Search in English or French, or by National Pokédex number; open a row to inspect the name’s display history.",
    coverage: "French name-library coverage",
    indexed: "Current French names indexed",
    legacy: "Earlier accent-free game renderings reconstructed",
    statusNote: "The old forms are typographic records, not abandoned translations. Generations I–IV could not display French diacritics consistently, so names such as Salamèche appeared as SALAMECHE in game text.",
    placeholder: "Try Charmander, Salamèche, SALAMECHE, or 004…",
    search: "Search the French Pokédex",
    historyOnly: "Earlier renderings only",
    showing: (shown: number, total: number) => `Showing ${shown} of ${total}`,
    table: "French Pokémon name library",
    spriteNo: "Sprite / No.",
    english: "English",
    currentName: "Current French name",
    earlierRendering: "Earlier game rendering",
    currentSpelling: "Current official French spelling",
    legacyRendering: "Generation I–IV game-text rendering",
    noLegacy: "No distinct earlier rendering indexed",
    currentRecord: "Current official record",
    languageTag: "French · fr-FR",
    currentNote: "Current spelling as used by the official French Pokédex.",
    historicalRecord: "Historical display record",
    historicalTag: "Generations I–IV · game text",
    historicalNote: "The translation itself did not necessarily change. Earlier games omitted diacritics and used uppercase display text; later software restored the standard French spelling.",
    researchNote: "Research note",
    noLegacyNote: "No accent-based display difference is indexed for this name. Other changes may still exist in cards, animation, guides, or regional French-language media.",
    frenchLabel: (name: string) => `${name} · French`,
    noResults: (query: string) => `No indexed French record matches “${query}”. Try an English name, French name, or Pokédex number.`,
    loadMore: (count: number) => `Load ${count} more`,
    showAll: (count: number) => `Show all ${count}`,
    method: "Coverage & method",
    citation: "Current French spellings follow Bulbapedia’s complete French-name index and are checked against the official French Pokédex. Accent-free forms are reconstructed only for Generation I–IV species whose modern French name contains a documented unsupported diacritic.",
    sourceLink: "French-name index ↗",
    num: (value: number) => value.toLocaleString(),
  },
  es: {
    title: ["Cada juego de palabras", "es un registro cultural."],
    intro: "Recorre los 1.025 nombres oficiales de especie en francés hasta Pêchaminus. Busca en inglés o francés, o por número de la Pokédex Nacional; abre una fila para examinar cómo se ha mostrado el nombre a lo largo del tiempo.",
    coverage: "Cobertura de la biblioteca de nombres en francés",
    indexed: "Nombres actuales en francés indexados",
    legacy: "Formas sin acentos de los primeros juegos, reconstruidas",
    statusNote: "Las formas antiguas son registros tipográficos, no traducciones abandonadas. Las generaciones I–IV no podían mostrar de forma coherente los diacríticos franceses, así que nombres como Salamèche aparecían como SALAMECHE en el texto del juego.",
    placeholder: "Prueba Charmander, Salamèche, SALAMECHE o 004…",
    search: "Busca en la Pokédex francesa",
    historyOnly: "Solo formas antiguas",
    showing: (shown: number, total: number) => `Mostrando ${shown} de ${total}`,
    table: "Biblioteca de nombres Pokémon en francés",
    spriteNo: "Sprite / N.º",
    english: "Inglés",
    currentName: "Nombre actual en francés",
    earlierRendering: "Forma anterior en los juegos",
    currentSpelling: "Grafía oficial actual en francés",
    legacyRendering: "Forma en el texto de los juegos de las generaciones I–IV",
    noLegacy: "Sin forma anterior distinta indexada",
    currentRecord: "Registro oficial actual",
    languageTag: "Francés · fr-FR",
    currentNote: "Grafía actual tal como la usa la Pokédex oficial francesa.",
    historicalRecord: "Registro histórico de visualización",
    historicalTag: "Generaciones I–IV · texto del juego",
    historicalNote: "La traducción en sí no cambió necesariamente. Los primeros juegos omitían los diacríticos y mostraban el texto en mayúsculas; el software posterior recuperó la grafía francesa estándar.",
    researchNote: "Nota de investigación",
    noLegacyNote: "No hay ninguna diferencia de visualización por acentos indexada para este nombre. Puede haber otros cambios en cartas, animación, guías o medios regionales en francés.",
    frenchLabel: (name: string) => `${name} · francés`,
    noResults: (query: string) => `Ningún registro francés indexado coincide con “${query}”. Prueba un nombre en inglés, un nombre en francés o un número de la Pokédex.`,
    loadMore: (count: number) => `Cargar ${count} más`,
    showAll: (count: number) => `Mostrar los ${count}`,
    method: "Cobertura y método",
    citation: "Las grafías francesas actuales siguen el índice completo de nombres franceses de Bulbapedia y se cotejan con la Pokédex oficial francesa. Las formas sin acentos se reconstruyen solo para especies de las generaciones I–IV cuyo nombre francés moderno contiene un diacrítico no admitido documentado.",
    sourceLink: "Índice de nombres franceses ↗",
    num: (value: number) => value.toLocaleString("es"),
  },
};

export function FrenchPokedex() {
  const t = copy[useLang()];
  const [query, setQuery] = useState("");
  const [historyOnly, setHistoryOnly] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [limit, setLimit] = useState(PAGE_SIZE);

  const matches = useMemo(() => {
    const q = query.trim().toLocaleLowerCase("fr-FR");
    return frenchPokemon.filter((entry) => {
      const searchable = [String(entry.id), entry.english, entry.french, entry.legacy ?? ""].join(" ").toLocaleLowerCase("fr-FR");
      return (!q || searchable.includes(q)) && (!historyOnly || Boolean(entry.legacy));
    });
  }, [historyOnly, query]);

  useEffect(() => setLimit(PAGE_SIZE), [historyOnly, query]);

  const visible = matches.slice(0, limit);
  const legacyCount = frenchPokemon.filter((entry) => entry.legacy).length;
  const hasMore = visible.length < matches.length;

  return <section className="dex-library france-dex" id="name-library">
    <div className="dex-intro">
      <div><span>Pokédex français / index complet</span><h2>{t.title[0]}<br /><em>{t.title[1]}</em></h2></div>
      <p>{t.intro}</p>
    </div>
    <div className="dex-status" aria-label={t.coverage}>
      <div><b>{t.num(frenchPokemon.length)}</b><span>{t.indexed}</span></div>
      <div><b>{legacyCount}</b><span>{t.legacy}</span></div>
      <p>{t.statusNote}</p>
    </div>
    <div className="dex-controls">
      <label><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t.placeholder} aria-label={t.search} /></label>
      <button className={historyOnly ? "active" : ""} onClick={() => setHistoryOnly(!historyOnly)} aria-pressed={historyOnly}>{t.historyOnly}</button>
      <span>{t.showing(visible.length, matches.length)}</span>
    </div>
    <div className="dex-table" role="table" aria-label={t.table}>
      <div className="dex-row dex-header" role="row"><span>{t.spriteNo}</span><span>{t.english}</span><span>{t.currentName}</span><span>{t.earlierRendering}</span><span /></div>
      {visible.map((entry) => {
        const isOpen = expanded === entry.id;
        return <div className={`dex-record ${isOpen ? "open" : ""}`} key={entry.id}>
          <button className="dex-row" role="row" onClick={() => setExpanded(isOpen ? null : entry.id)} aria-expanded={isOpen}>
            <span className="dex-sprite"><img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${entry.id}.png`} alt="" loading="lazy" /><b>#{String(entry.id).padStart(4, "0")}</b></span>
            <span className="dex-english">{entry.english}</span>
            <span className="dex-current"><b>{entry.french}</b><small>{t.currentSpelling}</small></span>
            <span className="dex-history-summary">{entry.legacy ? <><b>{entry.legacy}</b><small>{t.legacyRendering}</small></> : <i>{t.noLegacy}</i>}</span>
            <span className="dex-expand" aria-hidden="true">{isOpen ? "−" : "+"}</span>
          </button>
          {isOpen && <div className="dex-detail">
            <div><span>{t.currentRecord}</span><b>{entry.french}</b><p>{t.languageTag}</p><small>{t.currentNote}</small></div>
            {entry.legacy ? <div><span>{t.historicalRecord}</span><b>{entry.legacy}</b><p>{t.historicalTag}</p><small>{t.historicalNote}</small></div> : <div className="dex-empty-history"><span>{t.researchNote}</span><p>{t.noLegacyNote}</p></div>}
            <NameEtymology id={entry.id} name={entry.english} items={[{ label: t.frenchLabel(entry.french), field: "french", locale: "france" }]} />
          </div>}
        </div>;
      })}
      {!visible.length && <div className="dex-no-results">{t.noResults(query)}</div>}
    </div>
    {hasMore && <div className="dex-load-more">
      <button onClick={() => setLimit((current) => current + PAGE_SIZE)}>{t.loadMore(Math.min(PAGE_SIZE, matches.length - visible.length))}</button>
      <button className="text-load" onClick={() => setLimit(matches.length)}>{t.showAll(matches.length)}</button>
    </div>}
    <div className="dex-citation"><span>{t.method}</span><p>{t.citation}</p><a href="https://bulbapedia.bulbagarden.net/wiki/List_of_French_Pok%C3%A9mon_names" target="_blank" rel="noreferrer">{t.sourceLink}</a></div>
  </section>;
}

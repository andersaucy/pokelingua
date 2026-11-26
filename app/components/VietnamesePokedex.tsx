"use client";

import { useEffect, useMemo, useState } from "react";
import vietnamesePokemon from "../data/vietnamesePokemon.json";
import { useLang } from "./LanguageProvider";
import { NameEtymology } from "./NameEtymology";

const PAGE_SIZE = 50;

const copy = {
  en: {
    title: ["One Pokédex.", "Two naming eras."],
    intro: "Browse all 1,025 species through Pecharunt. Search an English name, its earlier Vietnam-market spelling, or a National Pokédex number—and open any row to compare the record before and after the 2026 policy.",
    coverage: "Vietnamese name-library coverage",
    indexed: "Current English names indexed",
    changed: "Distinct earlier Vietnam-market spellings",
    statusNote: "Before the May 2026 standardization, official Vietnamese media largely used romanized Japanese species names. The current column follows the English-name policy announced for all future Pokémon content and services in Vietnam.",
    placeholder: "Try Charmander, Hitokage, Pikachu, or 004…",
    search: "Search the Vietnamese Pokémon name archive",
    changedOnly: "Changed names only",
    showing: (shown: number, total: number) => `Showing ${shown} of ${total}`,
    table: "Vietnamese Pokémon name history",
    spriteNo: "Sprite / No.",
    english: "English",
    currentPolicy: "Current Vietnam policy",
    earlierSpelling: "Earlier Vietnam spelling",
    standard: "Official English-name standard · from 25 May 2026",
    earlierOfficial: "Earlier official Vietnamese-market spelling",
    sameSpelling: "Same spelling in both eras",
    currentRecord: "Current official record",
    policyTag: "Vietnam · policy announced 25 May 2026",
    policyNote: "Pokémon announced that future content and services in Vietnam would consistently use the English species names.",
    preservedRecord: "Preserved earlier record",
    preservedTag: "Vietnamese anime, merchandise, and official web usage · before 2026",
    changedNote: "The earlier spelling generally follows a romanization of the Japanese species name. It remains searchable here as part of Vietnam’s localization history.",
    unchangedNote: "This spelling already matched the English name, so the policy announcement did not visibly alter it.",
    currentLabel: (name: string) => `${name} · current English-name policy`,
    earlierLabel: (name: string) => `${name} · earlier Vietnam record`,
    noResults: (query: string) => `No indexed Vietnam record matches “${query}”. Try an English name, an earlier spelling, or a Pokédex number.`,
    loadMore: (count: number) => `Load ${count} more`,
    showAll: (count: number) => `Show all ${count}`,
    method: "Coverage & method",
    citation: "The current state is verified against the official Pokémon Vietnam Pokédex and the 25 May 2026 naming announcement. Earlier spellings follow Bulbapedia’s sourced Vietnamese-name index; they describe official Vietnamese-market usage before standardization, not literal Vietnamese translations.",
    sourceLink: "Earlier-name index ↗",
    num: (value: number) => value.toLocaleString(),
  },
  es: {
    title: ["Una Pokédex.", "Dos épocas de nombres."],
    intro: "Recorre las 1.025 especies hasta Pecharunt. Busca un nombre en inglés, su grafía anterior en el mercado vietnamita o un número de la Pokédex Nacional—y abre cualquier fila para comparar el registro antes y después de la política de 2026.",
    coverage: "Cobertura de la biblioteca de nombres en vietnamita",
    indexed: "Nombres ingleses actuales indexados",
    changed: "Grafías anteriores distintas del mercado vietnamita",
    statusNote: "Antes de la estandarización de mayo de 2026, los medios oficiales vietnamitas usaban en gran medida nombres de especie japoneses romanizados. La columna actual sigue la política de nombres ingleses anunciada para todos los futuros contenidos y servicios de Pokémon en Vietnam.",
    placeholder: "Prueba Charmander, Hitokage, Pikachu o 004…",
    search: "Busca en el archivo de nombres Pokémon en vietnamita",
    changedOnly: "Solo nombres cambiados",
    showing: (shown: number, total: number) => `Mostrando ${shown} de ${total}`,
    table: "Historial de nombres Pokémon en vietnamita",
    spriteNo: "Sprite / N.º",
    english: "Inglés",
    currentPolicy: "Política actual en Vietnam",
    earlierSpelling: "Grafía anterior en Vietnam",
    standard: "Estándar oficial de nombres ingleses · desde el 25 de mayo de 2026",
    earlierOfficial: "Grafía oficial anterior del mercado vietnamita",
    sameSpelling: "Misma grafía en ambas épocas",
    currentRecord: "Registro oficial actual",
    policyTag: "Vietnam · política anunciada el 25 de mayo de 2026",
    policyNote: "Pokémon anunció que los futuros contenidos y servicios en Vietnam usarían de forma sistemática los nombres de especie ingleses.",
    preservedRecord: "Registro anterior conservado",
    preservedTag: "Anime, productos y uso web oficial en Vietnam · antes de 2026",
    changedNote: "La grafía anterior suele seguir una romanización del nombre de especie japonés. Aquí sigue siendo posible buscarla como parte de la historia de localización de Vietnam.",
    unchangedNote: "Esta grafía ya coincidía con el nombre inglés, por lo que el anuncio de la política no la alteró visiblemente.",
    currentLabel: (name: string) => `${name} · política actual de nombres ingleses`,
    earlierLabel: (name: string) => `${name} · registro anterior en Vietnam`,
    noResults: (query: string) => `Ningún registro vietnamita indexado coincide con “${query}”. Prueba un nombre en inglés, una grafía anterior o un número de la Pokédex.`,
    loadMore: (count: number) => `Cargar ${count} más`,
    showAll: (count: number) => `Mostrar los ${count}`,
    method: "Cobertura y método",
    citation: "El estado actual se verifica con la Pokédex oficial de Pokémon Vietnam y el anuncio de nombres del 25 de mayo de 2026. Las grafías anteriores siguen el índice documentado de nombres vietnamitas de Bulbapedia; describen el uso oficial en el mercado vietnamita antes de la estandarización, no traducciones literales al vietnamita.",
    sourceLink: "Índice de nombres anteriores ↗",
    num: (value: number) => value.toLocaleString("es"),
  },
};

export function VietnamesePokedex() {
  const t = copy[useLang()];
  const [query, setQuery] = useState("");
  const [changedOnly, setChangedOnly] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [limit, setLimit] = useState(PAGE_SIZE);

  const matches = useMemo(() => {
    const q = query.trim().toLocaleLowerCase("vi-VN");
    return vietnamesePokemon.filter((entry) => {
      const searchable = [String(entry.id), entry.english, entry.current, entry.historical].join(" ").toLocaleLowerCase("vi-VN");
      return (!q || searchable.includes(q)) && (!changedOnly || entry.changed);
    });
  }, [changedOnly, query]);

  useEffect(() => setLimit(PAGE_SIZE), [changedOnly, query]);

  const visible = matches.slice(0, limit);
  const changedCount = vietnamesePokemon.filter((entry) => entry.changed).length;
  const hasMore = visible.length < matches.length;

  return <section className="dex-library vietnam-dex" id="name-library">
    <div className="dex-intro">
      <div><span>Từ điển tên gọi / 1996–2026</span><h2>{t.title[0]}<br /><em>{t.title[1]}</em></h2></div>
      <p>{t.intro}</p>
    </div>
    <div className="dex-status" aria-label={t.coverage}>
      <div><b>{t.num(vietnamesePokemon.length)}</b><span>{t.indexed}</span></div>
      <div><b>{t.num(changedCount)}</b><span>{t.changed}</span></div>
      <p>{t.statusNote}</p>
    </div>
    <div className="dex-controls">
      <label><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t.placeholder} aria-label={t.search} /></label>
      <button className={changedOnly ? "active" : ""} onClick={() => setChangedOnly(!changedOnly)} aria-pressed={changedOnly}>{t.changedOnly}</button>
      <span>{t.showing(visible.length, matches.length)}</span>
    </div>
    <div className="dex-table" role="table" aria-label={t.table}>
      <div className="dex-row dex-header" role="row"><span>{t.spriteNo}</span><span>{t.english}</span><span>{t.currentPolicy}</span><span>{t.earlierSpelling}</span><span /></div>
      {visible.map((entry) => {
        const isOpen = expanded === entry.id;
        return <div className={`dex-record ${isOpen ? "open" : ""}`} key={entry.id}>
          <button className="dex-row" role="row" onClick={() => setExpanded(isOpen ? null : entry.id)} aria-expanded={isOpen}>
            <span className="dex-sprite"><img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${entry.id}.png`} alt="" loading="lazy" /><b>#{String(entry.id).padStart(4, "0")}</b></span>
            <span className="dex-english">{entry.english}</span>
            <span className="dex-current"><b>{entry.current}</b><small>{t.standard}</small></span>
            <span className="dex-history-summary">{entry.changed ? <><b>{entry.historical}</b><small>{t.earlierOfficial}</small></> : <i>{t.sameSpelling}</i>}</span>
            <span className="dex-expand" aria-hidden="true">{isOpen ? "−" : "+"}</span>
          </button>
          {isOpen && <div className="dex-detail">
            <div><span>{t.currentRecord}</span><b>{entry.current}</b><p>{t.policyTag}</p><small>{t.policyNote}</small></div>
            <div><span>{t.preservedRecord}</span><b>{entry.historical}</b><p>{t.preservedTag}</p><small>{entry.changed ? t.changedNote : t.unchangedNote}</small></div>
            <NameEtymology id={entry.id} name={entry.english} items={[{ label: t.currentLabel(entry.current), field: "english", locale: "vietnam" }, { label: t.earlierLabel(entry.historical), field: "vietnamese", fallbackField: "japanese", year: "N/A" }]} />
          </div>}
        </div>;
      })}
      {!visible.length && <div className="dex-no-results">{t.noResults(query)}</div>}
    </div>
    {hasMore && <div className="dex-load-more">
      <button onClick={() => setLimit((current) => current + PAGE_SIZE)}>{t.loadMore(Math.min(PAGE_SIZE, matches.length - visible.length))}</button>
      <button className="text-load" onClick={() => setLimit(matches.length)}>{t.showAll(matches.length)}</button>
    </div>}
    <div className="dex-citation"><span>{t.method}</span><p>{t.citation}</p><a href="https://bulbapedia.bulbagarden.net/wiki/User:Raltseye/List_of_Vietnamese_Pok%C3%A9mon_names" target="_blank" rel="noreferrer">{t.sourceLink}</a></div>
  </section>;
}

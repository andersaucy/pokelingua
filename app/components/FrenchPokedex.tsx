"use client";

import { useEffect, useMemo, useState } from "react";
import frenchPokemon from "../data/frenchPokemon.json";
import { NameEtymology } from "./NameEtymology";

const PAGE_SIZE = 50;

export function FrenchPokedex() {
  const [query, setQuery] = useState("");
  const [historyOnly, setHistoryOnly] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(4);
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
      <div><span>Pokédex français / index complet</span><h2>Every pun becomes<br /><em>a cultural record.</em></h2></div>
      <p>Browse all 1,025 official French species names through Pêchaminus. Search in English or French, or by National Pokédex number; open a row to inspect the name’s display history.</p>
    </div>
    <div className="dex-status" aria-label="French name-library coverage">
      <div><b>{frenchPokemon.length.toLocaleString()}</b><span>Current French names indexed</span></div>
      <div><b>{legacyCount}</b><span>Earlier accent-free game renderings reconstructed</span></div>
      <p>The old forms are typographic records, not abandoned translations. Generations I–IV could not display French diacritics consistently, so names such as Salamèche appeared as SALAMECHE in game text.</p>
    </div>
    <div className="dex-controls">
      <label><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try Charmander, Salamèche, SALAMECHE, or 004…" aria-label="Search the French Pokédex" /></label>
      <button className={historyOnly ? "active" : ""} onClick={() => setHistoryOnly(!historyOnly)} aria-pressed={historyOnly}>Earlier renderings only</button>
      <span>Showing {visible.length} of {matches.length}</span>
    </div>
    <div className="dex-table" role="table" aria-label="French Pokémon name library">
      <div className="dex-row dex-header" role="row"><span>Sprite / No.</span><span>English</span><span>Current French name</span><span>Earlier game rendering</span><span /></div>
      {visible.map((entry) => {
        const isOpen = expanded === entry.id;
        return <div className={`dex-record ${isOpen ? "open" : ""}`} key={entry.id}>
          <button className="dex-row" role="row" onClick={() => setExpanded(isOpen ? null : entry.id)} aria-expanded={isOpen}>
            <span className="dex-sprite"><img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${entry.id}.png`} alt="" loading="lazy" /><b>#{String(entry.id).padStart(4, "0")}</b></span>
            <span className="dex-english">{entry.english}</span>
            <span className="dex-current"><b>{entry.french}</b><small>Current official French spelling</small></span>
            <span className="dex-history-summary">{entry.legacy ? <><b>{entry.legacy}</b><small>Generation I–IV game-text rendering</small></> : <i>No distinct earlier rendering indexed</i>}</span>
            <span className="dex-expand" aria-hidden="true">{isOpen ? "−" : "+"}</span>
          </button>
          {isOpen && <div className="dex-detail">
            <div><span>Current official record</span><b>{entry.french}</b><p>French · fr-FR</p><small>Current spelling as used by the official French Pokédex.</small></div>
            {entry.legacy ? <div><span>Historical display record</span><b>{entry.legacy}</b><p>Generations I–IV · game text</p><small>The translation itself did not necessarily change. Earlier games omitted diacritics and used uppercase display text; later software restored the standard French spelling.</small></div> : <div className="dex-empty-history"><span>Research note</span><p>No accent-based display difference is indexed for this name. Other changes may still exist in cards, animation, guides, or regional French-language media.</p></div>}
            <NameEtymology id={entry.id} name={entry.english} items={[{ label: `${entry.french} · French`, field: "french", locale: "france" }]} />
          </div>}
        </div>;
      })}
      {!visible.length && <div className="dex-no-results">No indexed French record matches “{query}”. Try an English name, French name, or Pokédex number.</div>}
    </div>
    {hasMore && <div className="dex-load-more">
      <button onClick={() => setLimit((current) => current + PAGE_SIZE)}>Load {Math.min(PAGE_SIZE, matches.length - visible.length)} more</button>
      <button className="text-load" onClick={() => setLimit(matches.length)}>Show all {matches.length}</button>
    </div>}
    <div className="dex-citation"><span>Coverage & method</span><p>Current French spellings follow Bulbapedia’s complete French-name index and are checked against the official French Pokédex. Accent-free forms are reconstructed only for Generation I–IV species whose modern French name contains a documented unsupported diacritic.</p><a href="https://bulbapedia.bulbagarden.net/wiki/List_of_French_Pok%C3%A9mon_names" target="_blank" rel="noreferrer">French-name index ↗</a></div>
  </section>;
}

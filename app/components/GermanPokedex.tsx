"use client";

import { useEffect, useMemo, useState } from "react";
import germanPokemon from "../data/germanPokemon.json";
import { NameEtymology } from "./NameEtymology";

const PAGE_SIZE = 50;

export function GermanPokedex() {
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
    <div className="dex-intro"><div><span>Deutscher Pokédex / vollständiger Index</span><h2>Compounds, clues,<br /><em>and creature character.</em></h2></div><p>Browse all 1,025 official German species names through Infamomo. Search in English or German, or by National Pokédex number; open any row to unpack the wordplay.</p></div>
    <div className="dex-status"><div><b>{germanPokemon.length.toLocaleString()}</b><span>Official German names indexed</span></div><div><b>{localizedCount.toLocaleString()}</b><span>Names distinct from English</span></div><p>German localization frequently rebuilds a creature from compact clues: Bisasam draws on <i>bizarr</i>, <i>Saurier</i>, and <i>Samen</i>; Glumanda combines <i>Glut</i> with <i>Salamander</i>. Shared international names remain visible as choices too.</p></div>
    <div className="dex-controls"><label><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try Bulbasaur, Bisasam, Glumanda, or 001…" aria-label="Search the German Pokémon name archive" /></label><button className={localizedOnly ? "active" : ""} onClick={() => setLocalizedOnly(!localizedOnly)} aria-pressed={localizedOnly}>German-only names</button><span>Showing {visible.length} of {matches.length}</span></div>
    <div className="dex-table" role="table" aria-label="German Pokémon name library">
      <div className="dex-row dex-header" role="row"><span>Sprite / No.</span><span>English</span><span>Official German name</span><span>Localization record</span><span /></div>
      {visible.map((entry) => { const isOpen = expanded === entry.id; return <div className={`dex-record ${isOpen ? "open" : ""}`} key={entry.id}>
        <button className="dex-row" role="row" onClick={() => setExpanded(isOpen ? null : entry.id)} aria-expanded={isOpen}><span className="dex-sprite"><img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${entry.id}.png`} alt="" loading="lazy" /><b>#{String(entry.id).padStart(4, "0")}</b></span><span className="dex-english">{entry.english}</span><span className="dex-current"><b lang="de">{entry.german}</b><small>Current official German spelling</small></span><span className="dex-history-summary"><b>{entry.localized ? "Localized" : "Shared spelling"}</b><small>{entry.localized ? "German form differs from English" : "International form retained"}</small></span><span className="dex-expand" aria-hidden="true">{isOpen ? "−" : "+"}</span></button>
        {isOpen && <div className="dex-detail"><div><span>German official record</span><b lang="de">{entry.german}</b><p>Germany · de-DE</p><small>{entry.localized ? "A distinct German species name, built to carry the creature’s concept into German vocabulary and sound." : "The German edition retains the same official spelling as English; moves, dialogue, categories, places, and descriptions are still localized."}</small></div><div><span>English comparison</span><b>{entry.english}</b><p>{entry.localized ? "Distinct localized form" : "Shared international form"}</p><small>A matching or differing spelling describes the visible relationship between editions, not the full creative history behind the name.</small></div><NameEtymology id={entry.id} name={entry.english} items={[{ label: `${entry.german} · German`, field: "german", locale: "germany" }]} /></div>}
      </div>; })}
      {!visible.length && <div className="dex-no-results">No indexed German record matches “{query}”. Try an English name, German name, or Pokédex number.</div>}
    </div>
    {visible.length < matches.length && <div className="dex-load-more"><button onClick={() => setLimit((current) => current + PAGE_SIZE)}>Load {Math.min(PAGE_SIZE, matches.length - visible.length)} more</button><button className="text-load" onClick={() => setLimit(matches.length)}>Show all {matches.length}</button></div>}
    <div className="dex-citation"><span>Coverage & method</span><p>Current names follow Bulbapedia’s complete German-name index and are cross-referenced with the official German Pokédex. Expandable origins derive from the name-origin records on each species article.</p><a href="https://bulbapedia.bulbagarden.net/wiki/List_of_German_Pok%C3%A9mon_names" target="_blank" rel="noreferrer">German-name index ↗</a></div>
  </section>;
}

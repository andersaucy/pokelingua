"use client";

import { useEffect, useMemo, useState } from "react";
import italianPokemon from "../data/italianPokemon.json";
import { NameEtymology } from "./NameEtymology";

const PAGE_SIZE = 50;

export function ItalianPokedex() {
  const [query, setQuery] = useState("");
  const [localizedOnly, setLocalizedOnly] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(984);
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
      <div><span>Pokédex italiano / indice completo</span><h2>The same spelling<br /><em>is still a choice.</em></h2></div>
      <p>Browse all 1,025 species through Pêchaminus. Most Italian names preserve the English spelling while being spoken through Italian pronunciation; 21 official names form a small but revealing translated set.</p>
    </div>
    <div className="dex-status" aria-label="Italian name-library coverage">
      <div><b>{italianPokemon.length.toLocaleString()}</b><span>Current Italian records indexed</span></div>
      <div><b>{localizedCount}</b><span>Names distinct from English</span></div>
      <p>Tipo Zero is the lone pre-Paldea exception. The other distinct names belong to the Paradox Pokémon, whose descriptive labels were translated into Italian while ordinary species names continued to use their English spellings.</p>
    </div>
    <div className="dex-controls">
      <label><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try Great Tusk, Grandizanne, Pikachu, or 984…" aria-label="Search the Italian Pokémon name archive" /></label>
      <button className={localizedOnly ? "active" : ""} onClick={() => setLocalizedOnly(!localizedOnly)} aria-pressed={localizedOnly}>Italian-only names</button>
      <span>Showing {visible.length} of {matches.length}</span>
    </div>
    <div className="dex-table" role="table" aria-label="Italian Pokémon name library">
      <div className="dex-row dex-header" role="row"><span>Sprite / No.</span><span>English</span><span>Official Italian name</span><span>Localization record</span><span /></div>
      {visible.map((entry) => {
        const isOpen = expanded === entry.id;
        return <div className={`dex-record ${isOpen ? "open" : ""}`} key={entry.id}>
          <button className="dex-row" role="row" onClick={() => setExpanded(isOpen ? null : entry.id)} aria-expanded={isOpen}>
            <span className="dex-sprite"><img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${entry.id}.png`} alt="" loading="lazy" /><b>#{String(entry.id).padStart(4, "0")}</b></span>
            <span className="dex-english">{entry.english}</span>
            <span className="dex-current"><b>{entry.italian}</b><small>Current official Italian spelling</small></span>
            <span className="dex-history-summary">{entry.localized ? <><b>Translated</b><small>Italian form differs from English</small></> : <><b>Shared spelling</b><small>English name retained in Italian</small></>}</span>
            <span className="dex-expand" aria-hidden="true">{isOpen ? "−" : "+"}</span>
          </button>
          {isOpen && <div className="dex-detail">
            <div><span>Italian official record</span><b>{entry.italian}</b><p>Italian · it-IT</p><small>{entry.localized ? "This species has a distinct Italian name used by the official Italian Pokédex and games." : "The Italian edition preserves the official English spelling. In speech, the name is conventionally adapted toward an Italian approximation of the English pronunciation."}</small></div>
            <div><span>Localization relationship</span><b>{entry.english}</b><p>English comparison</p><small>{entry.localized ? (entry.id === 772 ? "Type: Null became Tipo Zero in Generation VII—the first species whose official Italian name differed from English." : "This is a Paradox Pokémon. Italian translates the descriptive, title-like English name rather than retaining it unchanged.") : "Identical spelling does not mean the rest of the product is untranslated: dialogue, moves, items, places, categories, and descriptions are localized into Italian."}</small></div>
            <NameEtymology id={entry.id} name={entry.english} items={[{ label: `${entry.italian} · Italian`, field: "italian" }]} />
          </div>}
        </div>;
      })}
      {!visible.length && <div className="dex-no-results">No indexed Italian record matches “{query}”. Try an English name, Italian name, or Pokédex number.</div>}
    </div>
    {hasMore && <div className="dex-load-more">
      <button onClick={() => setLimit((current) => current + PAGE_SIZE)}>Load {Math.min(PAGE_SIZE, matches.length - visible.length)} more</button>
      <button className="text-load" onClick={() => setLimit(matches.length)}>Show all {matches.length}</button>
    </div>}
    <div className="dex-citation"><span>Coverage & method</span><p>Current spellings follow Bulbapedia’s Italian-name index and are checked against the official Italian Pokédex. The archive treats shared English spellings as an explicit localization pattern, not as missing data.</p><a href="https://bulbapedia.bulbagarden.net/wiki/List_of_Italian_Pok%C3%A9mon_names" target="_blank" rel="noreferrer">Italian-name index ↗</a></div>
  </section>;
}

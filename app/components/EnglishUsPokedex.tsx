"use client";

import { useEffect, useMemo, useState } from "react";
import englishUsPokemon from "../data/englishUsPokemon.json";
import { NameEtymology } from "./NameEtymology";

const PAGE_SIZE = 50;

export function EnglishUsPokedex() {
  const [query, setQuery] = useState("");
  const [renamedOnly, setRenamedOnly] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(1);
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
      <div><span>English / Japanese name atlas</span><h2>The translation that<br /><em>became international.</em></h2></div>
      <p>Browse all 1,025 species through Pecharunt. Search an English name, Japanese script, Hepburn reading, trademarked romanization, or National Pokédex number—and open a row to see the relationship.</p>
    </div>
    <div className="dex-status" aria-label="English US name-library coverage">
      <div><b>{englishUsPokemon.length.toLocaleString()}</b><span>English species names indexed</span></div>
      <div><b>{renamedCount.toLocaleString()}</b><span>Distinct from Japanese romanization</span></div>
      <p>The comparison is structural, not a claim of sole authorship or literal translation. English names were developed from creature concepts and Japanese source information; some were rebuilt as English wordplay, while globally recognizable forms such as Pikachu were retained.</p>
    </div>
    <div className="dex-controls">
      <label><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try Bulbasaur, Fushigidane, フシギダネ, or 001…" aria-label="Search the English and Japanese Pokémon name archive" /></label>
      <button className={renamedOnly ? "active" : ""} onClick={() => setRenamedOnly(!renamedOnly)} aria-pressed={renamedOnly}>English redesigns only</button>
      <span>Showing {visible.length} of {matches.length}</span>
    </div>
    <div className="dex-table" role="table" aria-label="English US and Japanese Pokémon name library">
      <div className="dex-row dex-header" role="row"><span>Sprite / No.</span><span>English (US)</span><span>Japanese original</span><span>Name relationship</span><span /></div>
      {visible.map((entry) => {
        const isOpen = expanded === entry.id;
        return <div className={`dex-record ${isOpen ? "open" : ""}`} key={entry.id}>
          <button className="dex-row" role="row" onClick={() => setExpanded(isOpen ? null : entry.id)} aria-expanded={isOpen}>
            <span className="dex-sprite"><img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${entry.id}.png`} alt="" loading="lazy" /><b>#{String(entry.id).padStart(4, "0")}</b></span>
            <span className="dex-english">{entry.english}</span>
            <span className="dex-current"><b lang="ja">{entry.kana}</b><small>{entry.hepburn} · Hepburn reading</small></span>
            <span className="dex-history-summary">{entry.retained ? <><b>Retained</b><small>English aligns with a Japanese romanization</small></> : <><b>Redesigned</b><small>Distinct English localization</small></>}</span>
            <span className="dex-expand" aria-hidden="true">{isOpen ? "−" : "+"}</span>
          </button>
          {isOpen && <div className="dex-detail">
            <div><span>English localization</span><b>{entry.english}</b><p>United States · en-US</p><small>{entry.retained ? "The English edition retained a form aligned with the Japanese name rather than creating a visibly separate English spelling." : "The English edition uses a distinct localized name, generally designed to communicate the creature’s concept, traits, sound, or wordplay to an English-speaking audience."}</small></div>
            <div><span>Japanese source record</span><b lang="ja">{entry.kana}</b><p>{entry.hepburn} · trademarked form: {entry.trademark}</p><small>Japanese is the original species-name record. Hepburn and trademarked romanizations are reference aids; neither should be mistaken for an English localization by itself.</small></div>
            <NameEtymology id={entry.id} name={entry.english} items={[{ label: `${entry.english} · English`, field: "english", locale: "united-states" }, { label: `${entry.hepburn} · Japanese`, field: "japanese", locale: "japan" }]} />
          </div>}
        </div>;
      })}
      {!visible.length && <div className="dex-no-results">No indexed record matches “{query}”. Try an English name, Japanese name, reading, or Pokédex number.</div>}
    </div>
    {hasMore && <div className="dex-load-more">
      <button onClick={() => setLimit((current) => current + PAGE_SIZE)}>Load {Math.min(PAGE_SIZE, matches.length - visible.length)} more</button>
      <button className="text-load" onClick={() => setLimit(matches.length)}>Show all {matches.length}</button>
    </div>}
    <div className="dex-citation"><span>Coverage & method</span><p>English, Japanese-script, Hepburn, and trademarked romanization fields follow Bulbapedia’s complete Japanese-name index. “Retained” is assigned only when normalized English matches a listed Japanese romanization; it describes visible form, not the full creative or legal naming history.</p><a href="https://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_in_Japanese" target="_blank" rel="noreferrer">Japanese-name index ↗</a></div>
  </section>;
}

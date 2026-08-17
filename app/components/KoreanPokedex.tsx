"use client";

import { useEffect, useMemo, useState } from "react";
import koreanPokemon from "../data/koreanPokemon.json";
import { NameEtymology } from "./NameEtymology";

const PAGE_SIZE = 50;

export function KoreanPokedex() {
  const [query, setQuery] = useState("");
  const [variantsOnly, setVariantsOnly] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [limit, setLimit] = useState(PAGE_SIZE);

  const matches = useMemo(() => {
    const q = query.trim().toLocaleLowerCase("ko-KR");
    return koreanPokemon.filter((entry) => {
      const searchable = [String(entry.id), entry.english, entry.hangul, entry.revised, entry.mccune, entry.officialRomanization, entry.historical?.name ?? "", entry.historical?.romanization ?? ""].join(" ").toLocaleLowerCase("ko-KR");
      return (!q || searchable.includes(q)) && (!variantsOnly || Boolean(entry.historical));
    });
  }, [query, variantsOnly]);

  useEffect(() => setLimit(PAGE_SIZE), [query, variantsOnly]);

  const visible = matches.slice(0, limit);
  const variantCount = koreanPokemon.filter((entry) => entry.historical).length;
  const hasMore = visible.length < matches.length;

  return <section className="dex-library korea-dex" id="name-library">
    <div className="dex-intro">
      <div><span>한국어 포켓몬 도감 / complete index</span><h2>Hangul names with<br /><em>more than one ancestry.</em></h2></div>
      <p>Browse all 1,025 species through Pecharunt. Search in English, Hangul, Revised Romanization, McCune–Reischauer, or by National Pokédex number; open any row for the full language record.</p>
    </div>
    <div className="dex-status" aria-label="Korean name-library coverage">
      <div><b>{koreanPokemon.length.toLocaleString()}</b><span>Current Korean names indexed</span></div>
      <div><b>{variantCount}</b><span>Documented Korean game-name variants</span></div>
      <p>Korean naming is not one translation pipeline. The vocabulary combines original Korean coinages, Japanese-derived forms, English-derived forms, and internationally retained names—inside a distinct South Korean media and game history.</p>
    </div>
    <div className="dex-controls">
      <label><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try Bulbasaur, 이상해씨, Isanghaessi, or 001…" aria-label="Search the Korean Pokémon name archive" /></label>
      <button className={variantsOnly ? "active" : ""} onClick={() => setVariantsOnly(!variantsOnly)} aria-pressed={variantsOnly}>Game-name variants only</button>
      <span>Showing {visible.length} of {matches.length}</span>
    </div>
    <div className="dex-table" role="table" aria-label="Korean Pokémon name library">
      <div className="dex-row dex-header" role="row"><span>Sprite / No.</span><span>English</span><span>Current Korean name</span><span>Earlier game record</span><span /></div>
      {visible.map((entry) => {
        const isOpen = expanded === entry.id;
        return <div className={`dex-record ${isOpen ? "open" : ""}`} key={entry.id}>
          <button className="dex-row" role="row" onClick={() => setExpanded(isOpen ? null : entry.id)} aria-expanded={isOpen}>
            <span className="dex-sprite"><img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${entry.id}.png`} alt="" loading="lazy" /><b>#{String(entry.id).padStart(4, "0")}</b></span>
            <span className="dex-english">{entry.english}</span>
            <span className="dex-current"><b lang="ko">{entry.hangul}</b><small>{entry.revised} · Revised Romanization</small></span>
            <span className="dex-history-summary">{entry.historical ? <><b lang="ko">{entry.historical.name}</b><small>{entry.historical.romanization} · {entry.historical.context}</small></> : <i>No distinct earlier game name indexed</i>}</span>
            <span className="dex-expand" aria-hidden="true">{isOpen ? "−" : "+"}</span>
          </button>
          {isOpen && <div className="dex-detail">
            <div><span>Current official Korean record</span><b lang="ko">{entry.hangul}</b><p>{entry.revised} · ko-KR</p><small>McCune–Reischauer: {entry.mccune}. TPCi’s 2012 international-event romanization: {entry.officialRomanization || "not listed"}. Pokémon Korea’s Revised Romanization is the primary reading shown in this archive.</small></div>
            {entry.historical ? <div><span>Preserved earlier record</span><b lang="ko">{entry.historical.name}</b><p>{entry.historical.romanization}</p><small>{entry.historical.context}. This is a documented official-use variant, not a fan translation or a general alternate spelling.</small></div> : <div className="dex-empty-history"><span>Research note</span><p>No separate Korean game name is indexed for this species. Different romanization systems can still render the same Hangul name differently without indicating a rename.</p></div>}
            <NameEtymology id={entry.id} name={entry.english} items={[{ label: `${entry.hangul} · Korean`, field: "korean", locale: "south-korea" }]} />
          </div>}
        </div>;
      })}
      {!visible.length && <div className="dex-no-results">No indexed Korean record matches “{query}”. Try an English name, Hangul name, romanization, or Pokédex number.</div>}
    </div>
    {hasMore && <div className="dex-load-more">
      <button onClick={() => setLimit((current) => current + PAGE_SIZE)}>Load {Math.min(PAGE_SIZE, matches.length - visible.length)} more</button>
      <button className="text-load" onClick={() => setLimit(matches.length)}>Show all {matches.length}</button>
    </div>}
    <div className="dex-citation"><span>Coverage & method</span><p>Hangul and romanization fields follow Bulbapedia’s Korean-name index and are checked against Pokémon Korea’s official Pokédex. Historical rows are limited to the two documented game-name variants; romanization differences alone are not counted as renames.</p><a href="https://bulbapedia.bulbagarden.net/wiki/List_of_Korean_Pok%C3%A9mon_names" target="_blank" rel="noreferrer">Korean-name index ↗</a></div>
  </section>;
}

"use client";

import { useEffect, useMemo, useState } from "react";
import vietnamesePokemon from "../data/vietnamesePokemon.json";
import { NameEtymology } from "./NameEtymology";

const PAGE_SIZE = 50;

export function VietnamesePokedex() {
  const [query, setQuery] = useState("");
  const [changedOnly, setChangedOnly] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(4);
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
      <div><span>Từ điển tên gọi / 1996–2026</span><h2>One Pokédex.<br /><em>Two naming eras.</em></h2></div>
      <p>Browse all 1,025 species through Pecharunt. Search an English name, its earlier Vietnam-market spelling, or a National Pokédex number—and open any row to compare the record before and after the 2026 policy.</p>
    </div>
    <div className="dex-status" aria-label="Vietnamese name-library coverage">
      <div><b>{vietnamesePokemon.length.toLocaleString()}</b><span>Current English names indexed</span></div>
      <div><b>{changedCount.toLocaleString()}</b><span>Distinct earlier Vietnam-market spellings</span></div>
      <p>Before the May 2026 standardization, official Vietnamese media largely used romanized Japanese species names. The current column follows the English-name policy announced for all future Pokémon content and services in Vietnam.</p>
    </div>
    <div className="dex-controls">
      <label><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try Charmander, Hitokage, Pikachu, or 004…" aria-label="Search the Vietnamese Pokémon name archive" /></label>
      <button className={changedOnly ? "active" : ""} onClick={() => setChangedOnly(!changedOnly)} aria-pressed={changedOnly}>Changed names only</button>
      <span>Showing {visible.length} of {matches.length}</span>
    </div>
    <div className="dex-table" role="table" aria-label="Vietnamese Pokémon name history">
      <div className="dex-row dex-header" role="row"><span>Sprite / No.</span><span>English</span><span>Current Vietnam policy</span><span>Earlier Vietnam spelling</span><span /></div>
      {visible.map((entry) => {
        const isOpen = expanded === entry.id;
        return <div className={`dex-record ${isOpen ? "open" : ""}`} key={entry.id}>
          <button className="dex-row" role="row" onClick={() => setExpanded(isOpen ? null : entry.id)} aria-expanded={isOpen}>
            <span className="dex-sprite"><img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${entry.id}.png`} alt="" loading="lazy" /><b>#{String(entry.id).padStart(4, "0")}</b></span>
            <span className="dex-english">{entry.english}</span>
            <span className="dex-current"><b>{entry.current}</b><small>Official English-name standard · from 25 May 2026</small></span>
            <span className="dex-history-summary">{entry.changed ? <><b>{entry.historical}</b><small>Earlier official Vietnamese-market spelling</small></> : <i>Same spelling in both eras</i>}</span>
            <span className="dex-expand" aria-hidden="true">{isOpen ? "−" : "+"}</span>
          </button>
          {isOpen && <div className="dex-detail">
            <div><span>Current official record</span><b>{entry.current}</b><p>Vietnam · policy announced 25 May 2026</p><small>Pokémon announced that future content and services in Vietnam would consistently use the English species names.</small></div>
            <div><span>Preserved earlier record</span><b>{entry.historical}</b><p>Vietnamese anime, merchandise, and official web usage · before 2026</p><small>{entry.changed ? "The earlier spelling generally follows a romanization of the Japanese species name. It remains searchable here as part of Vietnam’s localization history." : "This spelling already matched the English name, so the policy announcement did not visibly alter it."}</small></div>
            <NameEtymology id={entry.id} name={entry.english} items={[{ label: `${entry.current} · current English-name policy`, field: "english", locale: "vietnam" }, { label: `${entry.historical} · earlier Vietnam record`, field: "vietnamese", fallbackField: "japanese", year: "N/A" }]} />
          </div>}
        </div>;
      })}
      {!visible.length && <div className="dex-no-results">No indexed Vietnam record matches “{query}”. Try an English name, an earlier spelling, or a Pokédex number.</div>}
    </div>
    {hasMore && <div className="dex-load-more">
      <button onClick={() => setLimit((current) => current + PAGE_SIZE)}>Load {Math.min(PAGE_SIZE, matches.length - visible.length)} more</button>
      <button className="text-load" onClick={() => setLimit(matches.length)}>Show all {matches.length}</button>
    </div>}
    <div className="dex-citation"><span>Coverage & method</span><p>The current state is verified against the official Pokémon Vietnam Pokédex and the 25 May 2026 naming announcement. Earlier spellings follow Bulbapedia’s sourced Vietnamese-name index; they describe official Vietnamese-market usage before standardization, not literal Vietnamese translations.</p><a href="https://bulbapedia.bulbagarden.net/wiki/User:Raltseye/List_of_Vietnamese_Pok%C3%A9mon_names" target="_blank" rel="noreferrer">Earlier-name index ↗</a></div>
  </section>;
}

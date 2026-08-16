"use client";

import { useEffect, useMemo, useState } from "react";
import englishUsPokemon from "../data/englishUsPokemon.json";
import { NameEtymology } from "./NameEtymology";

const PAGE_SIZE = 50;

export function JapanesePokedex() {
  const [query, setQuery] = useState("");
  const [retainedOnly, setRetainedOnly] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(1);
  const [limit, setLimit] = useState(PAGE_SIZE);
  const matches = useMemo(() => {
    const q = query.trim().toLocaleLowerCase("ja-JP");
    return englishUsPokemon.filter((entry) => (!q || [entry.id, entry.english, entry.kana, entry.hepburn, entry.trademark].join(" ").toLocaleLowerCase("ja-JP").includes(q)) && (!retainedOnly || entry.retained));
  }, [query, retainedOnly]);
  useEffect(() => setLimit(PAGE_SIZE), [query, retainedOnly]);
  const visible = matches.slice(0, limit);
  const retainedCount = englishUsPokemon.filter((entry) => entry.retained).length;

  return <section className="dex-library japan-dex" id="name-library">
    <div className="dex-intro"><div><span>全国図鑑 / Japanese source index</span><h2>The names before<br /><em>they crossed borders.</em></h2></div><p>Browse all 1,025 Japanese species names through モモワロウ. Search kana, Hepburn reading, trademarked romanization, English, or National Pokédex number; open a row for the name’s indexed origin.</p></div>
    <div className="dex-status"><div><b>{englishUsPokemon.length.toLocaleString()}</b><span>Japanese source names indexed</span></div><div><b>{retainedCount.toLocaleString()}</b><span>English names aligned with a Japanese romanization</span></div><p>The Japanese name is the source record. Kana is primary; Hepburn and trademark spellings help readers compare forms but are not interchangeable with the written Japanese name or with later English localization.</p></div>
    <div className="dex-controls"><label><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try フシギダネ, Fushigidane, Bulbasaur, or 001…" aria-label="Search the Japanese Pokémon name archive" /></label><button className={retainedOnly ? "active" : ""} onClick={() => setRetainedOnly(!retainedOnly)} aria-pressed={retainedOnly}>English-retained forms</button><span>Showing {visible.length} of {matches.length}</span></div>
    <div className="dex-table" role="table" aria-label="Japanese Pokémon name library"><div className="dex-row dex-header" role="row"><span>Sprite / No.</span><span>Japanese original</span><span>Hepburn reading</span><span>English relationship</span><span /></div>
      {visible.map((entry) => { const isOpen = expanded === entry.id; return <div className={`dex-record ${isOpen ? "open" : ""}`} key={entry.id}><button className="dex-row" role="row" onClick={() => setExpanded(isOpen ? null : entry.id)} aria-expanded={isOpen}><span className="dex-sprite"><img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${entry.id}.png`} alt="" loading="lazy" /><b>#{String(entry.id).padStart(4, "0")}</b></span><span className="dex-current"><b lang="ja">{entry.kana}</b><small>Japanese written record</small></span><span className="dex-current"><b>{entry.hepburn}</b><small>Hepburn · trademark: {entry.trademark}</small></span><span className="dex-history-summary"><b>{entry.english}</b><small>{entry.retained ? "Form retained into English" : "Distinct English localization"}</small></span><span className="dex-expand" aria-hidden="true">{isOpen ? "−" : "+"}</span></button>
        {isOpen && <div className="dex-detail"><div><span>Japanese source record</span><b lang="ja">{entry.kana}</b><p>{entry.hepburn}</p><small>The kana name is primary. The trademarked Latin spelling is {entry.trademark}; romanization systems can differ without implying a rename.</small></div><div><span>Later English record</span><b>{entry.english}</b><p>{entry.retained ? "Visible form retained" : "Distinct localized name"}</p><small>{entry.retained ? "English kept a form aligned with the Japanese romanization." : "English rebuilt the visible name for its own sound, meaning, or wordplay."}</small></div><NameEtymology id={entry.id} name={entry.english} items={[{ label: `${entry.hepburn} · Japanese`, field: "japanese" }]} /></div>}
      </div>; })}
      {!visible.length && <div className="dex-no-results">No indexed Japanese record matches “{query}”. Try kana, a romanization, English, or Pokédex number.</div>}
    </div>
    {visible.length < matches.length && <div className="dex-load-more"><button onClick={() => setLimit((current) => current + PAGE_SIZE)}>Load {Math.min(PAGE_SIZE, matches.length - visible.length)} more</button><button className="text-load" onClick={() => setLimit(matches.length)}>Show all {matches.length}</button></div>}
    <div className="dex-citation"><span>Coverage & method</span><p>Kana, Hepburn, and trademarked forms follow Bulbapedia’s complete Japanese-name index. Expandable origins come from each species article; the archive keeps script, reading, and trademark spelling as separate fields.</p><a href="https://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_in_Japanese" target="_blank" rel="noreferrer">Japanese-name index ↗</a></div>
  </section>;
}

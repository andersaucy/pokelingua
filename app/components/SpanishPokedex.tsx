"use client";

import { useMemo, useState } from "react";
import { spanishPokemon } from "../data/spanishPokemon";
import { NameEtymology } from "./NameEtymology";

const PAGE_SIZE = 50;

export function SpanishPokedex({ locale }: { locale: "spain" | "latin-america" }) {
  const [query, setQuery] = useState("");
  const [localizedOnly, setLocalizedOnly] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [limit, setLimit] = useState(PAGE_SIZE);
  const isLatam = locale === "latin-america";

  const matches = useMemo(() => {
    const q = query.trim().toLocaleLowerCase("es");
    return spanishPokemon.filter((entry) => {
      const searchable = [String(entry.id), entry.english, entry.spanish].join(" ").toLocaleLowerCase("es");
      return (!q || searchable.includes(q)) && (!localizedOnly || entry.localized);
    });
  }, [localizedOnly, query]);
  const visible = matches.slice(0, limit);

  function updateQuery(value: string) { setQuery(value); setLimit(PAGE_SIZE); }
  function toggleLocalized() { setLocalizedOnly((current) => !current); setLimit(PAGE_SIZE); }

  return <section className="dex-library spanish-dex" id="name-library">
    <div className="dex-intro">
      <div><span>{isLatam ? "Pokédex latinoamericano" : "Pokédex de España"} / índice completo</span><h2>Shared species names,<br /><em>different Spanish worlds.</em></h2></div>
      <p>Browse all 1,025 species through Pecharunt. The official Spanish list keeps most English spellings and translates a small descriptive set; the surrounding dialogue, terminology, voices, and regional register are where Spain and Latin America most clearly diverge.</p>
    </div>
    <div className="dex-status" aria-label="Spanish name-library coverage">
      <div><b>{spanishPokemon.length.toLocaleString()}</b><span>Current Spanish records indexed</span></div>
      <div><b>21</b><span>Names distinct from English</span></div>
      <p>{isLatam ? "Latin American Spanish became a selectable core-game language in Legends: Z-A in 2025. This table records that game standard while preserving earlier media-only variants in expanded notes." : "Spain’s game localization dates to Red and Blue in 1999. Its species-name standard is mostly shared with English, with Código Cero and the translated Paradox Pokémon as notable exceptions."}</p>
    </div>
    <div className="dex-controls">
      <label><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => updateQuery(event.target.value)} placeholder="Try Pikachu, Código Cero, Colmilargo, or 984…" aria-label="Search the Spanish Pokémon name archive" /></label>
      <button className={localizedOnly ? "active" : ""} onClick={toggleLocalized} aria-pressed={localizedOnly}>Translated names only</button>
      <span>Showing {visible.length} of {matches.length}</span>
    </div>
    <div className="dex-table" role="table" aria-label={`${isLatam ? "Latin American" : "Spain"} Spanish Pokémon name library`}>
      <div className="dex-row dex-header" role="row"><span>Sprite / No.</span><span>English</span><span>Official Spanish name</span><span>Localization record</span><span /></div>
      {visible.map((entry) => {
        const isOpen = expanded === entry.id;
        const señorMime = isLatam && entry.id === 122;
        return <div className={`dex-record ${isOpen ? "open" : ""}`} key={entry.id}>
          <button className="dex-row" role="row" onClick={() => setExpanded(isOpen ? null : entry.id)} aria-expanded={isOpen}>
            <span className="dex-sprite"><img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${entry.id}.png`} alt="" loading="lazy" /><b>#{String(entry.id).padStart(4, "0")}</b></span>
            <span className="dex-english">{entry.english}</span>
            <span className="dex-current"><b>{entry.spanish}</b><small>Current official Spanish spelling</small></span>
            <span className="dex-history-summary">{entry.localized ? <><b>Translated</b><small>Spanish form differs from English</small></> : <><b>Shared spelling</b><small>{señorMime ? "Earlier anime variant documented" : "English name retained"}</small></>}</span>
            <span className="dex-expand" aria-hidden="true">{isOpen ? "−" : "+"}</span>
          </button>
          {isOpen && <div className="dex-detail">
            <NameEtymology id={entry.id} name={entry.english} items={[{ label: `${entry.spanish} · source-name origin`, field: "english", locale }]} />
            <div><span>Official name record</span><b>{entry.spanish}</b><p>{isLatam ? "Spanish · es-419" : "Spanish · es-ES"}</p><small>{entry.localized ? "The descriptive English name was translated into Spanish." : "The official Spanish name preserves the English spelling; the surrounding game text remains fully localized."}</small></div>
            <div><span>Regional context</span><b>{señorMime ? "Señor Mime" : entry.english}</b><p>{señorMime ? "Historical Latin American anime variant" : "Current shared species standard"}</p><small>{señorMime ? "Some Latin American anime episodes used Señor Mime. It is preserved here as a media-era variant, not presented as the current official core-game species name." : isLatam ? "The 2025 Latin American game edition distinguishes dialogue, moves, items, and register even where the species spelling matches Spain and English." : "Spain and Latin America can share this species spelling without being the same localization."}</small></div>
          </div>}
        </div>;
      })}
      {!visible.length && <div className="dex-no-results">No indexed Spanish record matches “{query}”.</div>}
    </div>
    {visible.length < matches.length && <div className="dex-load-more"><button onClick={() => setLimit((current) => current + PAGE_SIZE)}>Load {Math.min(PAGE_SIZE, matches.length - visible.length)} more</button><button className="text-load" onClick={() => setLimit(matches.length)}>Show all {matches.length}</button></div>}
    <div className="dex-citation"><span>Coverage & method</span><p>Current names follow Bulbapedia’s Spanish-name index and official regional game material. Shared spellings are recorded as a localization choice; medium-specific historical variants remain explicitly labeled.</p><a href="https://bulbapedia.bulbagarden.net/wiki/List_of_Spanish_Pok%C3%A9mon_names" target="_blank" rel="noreferrer">Spanish-name index ↗</a></div>
  </section>;
}

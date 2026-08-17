"use client";

import { useMemo, useState } from "react";
import englishPokemon from "../data/englishUsPokemon.json";
import mediaPokemon from "../data/mediaPokemon.json";
import { NameEtymology, type OriginField } from "./NameEtymology";

type Locale = "russia" | "thailand" | "hindi-india" | "tamil-india" | "telugu-india";
type IndexedRecord = { id: number; english: string; current: string; reading: string; former?: string; formerReading?: string; formerRomanization?: string };
type Entry = IndexedRecord & { medium: string; recordYear: string };

const PAGE_SIZE = 50;

const copy: Record<Locale, {
  localeName: string;
  currentLabel: string;
  readingLabel: string;
  originField: OriginField;
  medium: string;
  recordYear: string;
  intro: string;
  source: string;
  sourceLabel: string;
}> = {
  russia: {
    localeName: "Russian",
    currentLabel: "Official Cyrillic record",
    readingLabel: "BGN/PCGN romanization",
    originField: "english",
    medium: "Animation · TCG · Pokémon GO / UNITE",
    recordYear: "N/A",
    intro: "Search the official Cyrillic spellings used across the Russian dub, trading cards, localized services, and merchandise. Most represent the English species name in Russian orthography; the table records that real localization layer instead of dismissing it as duplication.",
    source: "https://bulbapedia.bulbagarden.net/wiki/List_of_Russian_Pok%C3%A9mon_names",
    sourceLabel: "Russian-name index",
  },
  thailand: {
    localeName: "Thai",
    currentLabel: "Official Thai record",
    readingLabel: "RTGS transcription",
    originField: "japanese",
    medium: "Animation · TCG · Pokémon GO / Smile",
    recordYear: "N/A",
    intro: "Search the official Thai-script names used by animation, the Thai-language TCG, localized services, and merchandise. These forms generally transcribe the Japanese species names, so the dropdown explains the Japanese name origin that traveled into Thai.",
    source: "https://bulbapedia.bulbagarden.net/wiki/List_of_Thai_Pok%C3%A9mon_names",
    sourceLabel: "Thai-name index",
  },
  "hindi-india": {
    localeName: "Hindi",
    currentLabel: "Current Hindi record",
    readingLabel: "Devanāgarī transliteration",
    originField: "english",
    medium: "Official website / services · animation policy",
    recordYear: "2025",
    intro: "Search the current Devanāgarī spellings based on the English names, plus the localized Hindi forms used from 2023 to 2025 where the archive records one. The former names entered official animation including Pokémon Horizons before its audio was updated.",
    source: "https://bulbapedia.bulbagarden.net/wiki/List_of_Hindi_Pok%C3%A9mon_names",
    sourceLabel: "Hindi-name index",
  },
  "tamil-india": {
    localeName: "Tamil",
    currentLabel: "Anime-dub species record",
    readingLabel: "Current India-wide policy",
    originField: "english",
    medium: "Official Tamil animation",
    recordYear: "N/A",
    intro: "The Tamil dub uses the English species-name set. This table makes that naming choice searchable while keeping the language of the performance visible. A complete authoritative Tamil-script species index is not currently published, so script spellings are not invented here.",
    source: "https://in.portal-pokemon.com/topics/pokemon_names_unified_across_india/",
    sourceLabel: "Official India naming policy",
  },
  "telugu-india": {
    localeName: "Telugu",
    currentLabel: "Anime-dub species record",
    readingLabel: "Current India-wide policy",
    originField: "english",
    medium: "Official Telugu animation",
    recordYear: "N/A",
    intro: "The Telugu dub uses the English species-name set. This table makes that naming choice searchable while keeping the language of the performance visible. A complete authoritative Telugu-script species index is not currently published, so script spellings are not invented here.",
    source: "https://in.portal-pokemon.com/topics/pokemon_names_unified_across_india/",
    sourceLabel: "Official India naming policy",
  },
};

function entriesFor(locale: Locale): Entry[] {
  const metadata = copy[locale];
  if (locale === "russia") return (mediaPokemon.russian as IndexedRecord[]).map((entry) => ({ ...entry, medium: metadata.medium, recordYear: metadata.recordYear }));
  if (locale === "thailand") return (mediaPokemon.thai as IndexedRecord[]).map((entry) => ({ ...entry, medium: metadata.medium, recordYear: metadata.recordYear }));
  if (locale === "hindi-india") return (mediaPokemon.hindi as IndexedRecord[]).map((entry) => ({ ...entry, medium: metadata.medium, recordYear: metadata.recordYear }));
  return englishPokemon.map((entry) => ({ id: entry.id, english: entry.english, current: entry.english, reading: "English name retained in the dub", medium: metadata.medium, recordYear: metadata.recordYear }));
}

export function MediaLocalePokedex({ locale }: { locale: Locale }) {
  const metadata = copy[locale];
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<number | null>(null);
  const [limit, setLimit] = useState(PAGE_SIZE);
  const entries = useMemo(() => entriesFor(locale), [locale]);
  const matches = useMemo(() => {
    const q = query.trim().toLocaleLowerCase();
    return entries.filter((entry) => !q || [entry.id, entry.english, entry.current, entry.reading, entry.former, entry.formerReading, entry.formerRomanization].join(" ").toLocaleLowerCase().includes(q));
  }, [entries, query]);

  const visible = matches.slice(0, limit);

  return <section className="dex-library media-dex" id="name-library">
    <div className="dex-intro"><div><span>{metadata.localeName} name library / official-media record</span><h2>The dub belongs<br /><em>in the table.</em></h2></div><p>{metadata.intro}</p></div>
    <div className="dex-status" aria-label="Library coverage">
      <div><b>{entries.length.toLocaleString()}</b><span>Locale records indexed</span></div>
      <div><b>{locale === "hindi-india" ? entries.filter((entry) => entry.former).length.toLocaleString() : "ANIME"}</b><span>{locale === "hindi-india" ? "Former localized Hindi names retained" : "Dub / official-media naming included"}</span></div>
      <p>The medium is part of every record. “Transcription” means the name crossed scripts; it does not claim that a new etymology or independently translated species name was created.</p>
    </div>
    <div className="dex-controls"><label><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => { setQuery(event.target.value); setLimit(PAGE_SIZE); }} placeholder={`Search ${metadata.localeName}, English, or Pokédex no.…`} aria-label={`Search ${metadata.localeName} Pokémon name library`} /></label><span>Showing {visible.length} of {matches.length}</span></div>
    <div className="dex-table" role="table" aria-label={`${metadata.localeName} Pokémon name library`}>
      <div className="dex-row dex-header" role="row"><span>Sprite / No.</span><span>English</span><span>{metadata.currentLabel}</span><span>Medium / former record</span><span /></div>
      {visible.map((entry) => {
        const isOpen = expanded === entry.id;
        return <div className={`dex-record ${isOpen ? "open" : ""}`} key={entry.id}>
          <button className="dex-row" role="row" onClick={() => setExpanded(isOpen ? null : entry.id)} aria-expanded={isOpen}>
            <span className="dex-sprite"><img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${entry.id}.png`} alt="" loading="lazy" /><b>#{String(entry.id).padStart(4, "0")}</b></span>
            <span className="dex-english">{entry.english}</span>
            <span className="dex-current"><b>{entry.current}</b><small>{entry.reading} · {metadata.readingLabel}</small></span>
            <span className="dex-history-summary">{entry.former ? <><b>{entry.former}</b><small>{entry.formerReading} · former official Hindi record, 2023–2025</small></> : <><i>{entry.medium}</i><small>First name year · {entry.recordYear}</small></>}</span>
            <span className="dex-expand" aria-hidden="true">{isOpen ? "−" : "+"}</span>
          </button>
          {isOpen && <div className="dex-detail">
            <div><span>{metadata.currentLabel}</span><b>{entry.current}</b><p>{entry.reading}</p><small>Documented use: {entry.medium}. First name year: {entry.recordYear}.</small></div>
            {entry.former ? <div><span>Former localized Hindi record</span><b>{entry.former}</b><p>{entry.formerReading}</p><small>Used by official Hindi services and selected animation from 2023; retired under the India-wide naming policy in September 2025. Additional Romanization: {entry.formerRomanization ?? "N/A"}.</small></div> : <div className="dex-empty-history"><span>Translation note</span><p>{locale === "thailand" ? "This Thai spelling represents the Japanese species name in Thai script." : locale === "russia" ? "This Cyrillic spelling generally represents the English species name in Russian orthography." : "The English species name is retained in this official anime dub; a separate translated name is not claimed."}</p></div>}
            <NameEtymology id={entry.id} name={entry.english} items={[{ label: `${entry.current} · source-name origin`, field: metadata.originField, year: entry.recordYear }]} />
          </div>}
        </div>;
      })}
      {!visible.length && <div className="dex-no-results">No indexed record matches “{query}”.</div>}
    </div>
    {visible.length < matches.length && <div className="dex-load-more"><button onClick={() => setLimit((current) => current + PAGE_SIZE)}>Load {Math.min(PAGE_SIZE, matches.length - visible.length)} more</button><button className="text-load" onClick={() => setLimit(matches.length)}>Show all {matches.length}</button></div>}
    <div className="dex-citation"><span>Coverage & method</span><p>Names are indexed as official-media records, with source script, romanization, medium, and historical status kept separate. Missing exact first-use dates are shown as N/A rather than estimated from a generation launch.</p><a href={metadata.source} target="_blank" rel="noreferrer">{metadata.sourceLabel} ↗</a></div>
  </section>;
}

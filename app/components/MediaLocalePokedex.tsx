"use client";

import { useMemo, useState } from "react";
import englishPokemon from "../data/englishUsPokemon.json";
import { tamilScriptNames, teluguScriptNames } from "../data/indianScriptNames";
import mediaPokemon from "../data/mediaPokemon.json";
import { arabicScriptNames, hebrewScriptNames } from "../data/regionalScriptNames";
import { NameEtymology, type OriginField } from "./NameEtymology";

type Locale = "brazil" | "russia" | "thailand" | "indonesia" | "portugal" | "arab-world" | "philippines" | "malaysia" | "israel" | "hindi-india" | "tamil-india" | "telugu-india";
type IndexedRecord = { id: number; english: string; current: string; reading: string; former?: string; formerReading?: string; formerRomanization?: string };
type Entry = IndexedRecord & { medium: string; recordYear: string; attestedScript?: boolean; confirmedScript?: boolean; recordSource?: string };

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
  brazil: {
    localeName: "Brazilian Portuguese",
    currentLabel: "Brazilian Portuguese record",
    readingLabel: "Official media / service usage",
    originField: "english",
    medium: "Animation · TCG · localized games / services",
    recordYear: "N/A",
    intro: "Search the species names used across Brazilian Portuguese animation, cards, localized services, and merchandise. Most retain the English spelling, while Type: Null and the Paradox Pokémon have documented Portuguese names of their own.",
    source: "https://bulbapedia.bulbagarden.net/wiki/List_of_Brazilian_Portuguese_Pok%C3%A9mon_names",
    sourceLabel: "Brazilian Portuguese name index",
  },
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
  indonesia: {
    localeName: "Indonesian",
    currentLabel: "Indonesian-media record",
    readingLabel: "International name retained",
    originField: "english",
    medium: "Indonesian animation · official web / mobile services",
    recordYear: "N/A",
    intro: "Search the international species-name set used inside Indonesian-language Pokémon media. The repeated spelling is the finding: official Indonesian dialogue and presentation coexist with retained English proper names rather than a separately translated full species catalog.",
    source: "https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_Indonesia",
    sourceLabel: "Indonesia media and naming history",
  },
  portugal: {
    localeName: "European Portuguese",
    currentLabel: "Portugal media record",
    readingLabel: "International name retained",
    originField: "english",
    medium: "European Portuguese animation · packaging / manuals",
    recordYear: "N/A",
    intro: "Search the international species-name set used in Portugal. Games historically arrived with English software—even when packaging and manuals were adapted—while the Portuguese dub localized dialogue, titles, songs, moves, and surrounding terminology.",
    source: "https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_Portugal",
    sourceLabel: "Portugal localization history",
  },
  "arab-world": {
    localeName: "Arabic",
    currentLabel: "Arabic anime record",
    readingLabel: "Latin reading of Arabic script",
    originField: "english",
    medium: "Arabic-language animation",
    recordYear: "N/A",
    intro: "Search the Arabic-script species forms directly attested in the dub archive. Most names retain an English-derived identity; only documented spellings are shown, while the remainder stay N/A rather than being automatically transliterated.",
    source: "https://bulbapedia.bulbagarden.net/wiki/User:Raltseye/List_of_Arabic_Pok%C3%A9mon_names",
    sourceLabel: "Arabic anime-name record",
  },
  philippines: {
    localeName: "Filipino / Philippine English",
    currentLabel: "Philippines media record",
    readingLabel: "International name retained",
    originField: "english",
    medium: "Philippine English · Filipino animation",
    recordYear: "N/A",
    intro: "Search the international species names used across the Philippines’ parallel English- and Filipino-language broadcast traditions. Pokémon generally keep their English names and characteristic cries even as dialogue and performance move into Filipino.",
    source: "https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_the_Philippines",
    sourceLabel: "Philippines media history",
  },
  malaysia: {
    localeName: "Malaysia",
    currentLabel: "Malaysia media record",
    readingLabel: "International name retained",
    originField: "english",
    medium: "English · Malay animation / subtitles",
    recordYear: "N/A",
    intro: "Search the international species layer shared across Malaysia’s English and Malay presentations. The surrounding adaptation changed source tracks over time: Diamond and Pearl was made from Japanese, while the later Black and White Malay dub followed the English version.",
    source: "https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_Malaysia",
    sourceLabel: "Malaysia media history",
  },
  israel: {
    localeName: "Hebrew",
    currentLabel: "Hebrew anime record",
    readingLabel: "Latin reading of Hebrew script",
    originField: "english",
    medium: "Hebrew-language animation",
    recordYear: "N/A",
    intro: "Search the Hebrew-script spellings directly attested in animation. The Hebrew dub retains the English species identities, but writing them right-to-left creates a real orthographic record. Unsupported species remain N/A.",
    source: "https://bulbapedia.bulbagarden.net/wiki/User:Raltseye/List_of_Hebrew_Pok%C3%A9mon_names",
    sourceLabel: "Hebrew anime-name record",
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
  if (locale === "russia") return (mediaPokemon.russian as IndexedRecord[]).map((entry) => ({ ...entry, medium: metadata.medium, recordYear: metadata.recordYear, confirmedScript: true }));
  if (locale === "thailand") return (mediaPokemon.thai as IndexedRecord[]).map((entry) => ({ ...entry, medium: metadata.medium, recordYear: metadata.recordYear, confirmedScript: true }));
  if (locale === "hindi-india") return (mediaPokemon.hindi as IndexedRecord[]).map((entry) => ({ ...entry, medium: metadata.medium, recordYear: metadata.recordYear, confirmedScript: true }));
  if (locale === "brazil") {
    const localized: Record<number, string> = { 772: "Tipo Nulo", 984: "Presa Grande", 985: "Cauda Brado", 986: "Capuz Bruto", 987: "Juba Sopro", 988: "Asa Rasteira", 989: "Choque Areia", 990: "Trilho Férreo", 991: "Pacote Férreo", 992: "Mãos Férreas", 993: "Jugulares Férreas", 994: "Mariposa Férrea", 995: "Espinhos Férreos", 1005: "Lua Estrondo", 1006: "Valentia Férrea", 1009: "Onda Ando", 1010: "Folhas Férreas", 1020: "Fogo Corrosão", 1021: "Raio Fúria", 1022: "Rocha Férrea", 1023: "Chifres Férreos" };
    return englishPokemon.map((entry) => ({ id: entry.id, english: entry.english, current: localized[entry.id] ?? entry.english, reading: localized[entry.id] ? "Localized Brazilian Portuguese species name" : "English spelling retained in Brazilian Portuguese", medium: metadata.medium, recordYear: entry.id === 772 ? "2016" : localized[entry.id] ? "2022" : "N/A" }));
  }
  if (locale === "indonesia") return englishPokemon.map((entry) => ({ id: entry.id, english: entry.english, current: entry.english, reading: "International species name retained in Indonesian media", medium: metadata.medium, recordYear: metadata.recordYear }));
  if (locale === "portugal" || locale === "philippines" || locale === "malaysia") return englishPokemon.map((entry) => ({ id: entry.id, english: entry.english, current: entry.english, reading: "International species name retained in locale media", medium: metadata.medium, recordYear: metadata.recordYear }));
  if (locale === "arab-world" || locale === "israel") {
    const scriptNames = locale === "arab-world" ? arabicScriptNames : hebrewScriptNames;
    return englishPokemon.map((entry) => {
      const attested = scriptNames[entry.id];
      return { id: entry.id, english: entry.english, current: attested?.name ?? "N/A", reading: attested?.reading ?? "No directly attested script spelling indexed", medium: attested?.medium ?? metadata.medium, recordYear: metadata.recordYear, attestedScript: Boolean(attested), confirmedScript: Boolean(attested), recordSource: attested?.source };
    });
  }
  const scriptNames = locale === "tamil-india" ? tamilScriptNames : teluguScriptNames;
  return englishPokemon.map((entry) => {
    const attested = scriptNames[entry.id];
    return { id: entry.id, english: entry.english, current: attested?.name ?? "N/A", reading: attested ? "English-derived name written in the locale script" : `${entry.english} is retained in speech; an official script form is not yet indexed`, medium: attested?.medium ?? metadata.medium, recordYear: metadata.recordYear, attestedScript: Boolean(attested), confirmedScript: Boolean(attested), recordSource: attested?.source };
  });
}

export function MediaLocalePokedex({ locale }: { locale: Locale }) {
  const metadata = copy[locale];
  const [query, setQuery] = useState("");
  const [scriptOnly, setScriptOnly] = useState(false);
  const [changedOnly, setChangedOnly] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [limit, setLimit] = useState(PAGE_SIZE);
  const entries = useMemo(() => entriesFor(locale), [locale]);
  const matches = useMemo(() => {
    const q = query.trim().toLocaleLowerCase();
    return entries.filter((entry) => (!scriptOnly || entry.confirmedScript) && (!changedOnly || (entry.former && entry.former.normalize("NFKC") !== entry.current.normalize("NFKC"))) && (!q || [entry.id, entry.english, entry.current, entry.reading, entry.former, entry.formerReading, entry.formerRomanization].join(" ").toLocaleLowerCase().includes(q)));
  }, [changedOnly, entries, query, scriptOnly]);

  const visible = matches.slice(0, limit);
  const attestedScriptCount = entries.filter((entry) => entry.attestedScript).length;
  const confirmedScriptCount = entries.filter((entry) => entry.confirmedScript).length;
  const changedRecordCount = entries.filter((entry) => entry.former && entry.former.normalize("NFKC") !== entry.current.normalize("NFKC")).length;
  const brazilLocalizedCount = locale === "brazil" ? entries.filter((entry) => entry.current !== entry.english).length : 0;
  const hasScriptFilter = !["brazil", "indonesia", "portugal", "philippines", "malaysia"].includes(locale);
  const isPartialScriptLocale = locale === "tamil-india" || locale === "telugu-india" || locale === "arab-world" || locale === "israel";

  return <section className="dex-library media-dex" id="name-library">
    <div className="dex-intro"><div><span>{metadata.localeName} name library / official-media record</span><h2>The dub belongs<br /><em>in the table.</em></h2></div><p>{metadata.intro}</p></div>
    <div className="dex-status" aria-label="Library coverage">
      <div><b>{entries.length.toLocaleString()}</b><span>Locale records indexed</span></div>
      <div><b>{locale === "hindi-india" ? entries.filter((entry) => entry.former).length.toLocaleString() : isPartialScriptLocale ? attestedScriptCount : locale === "brazil" ? brazilLocalizedCount : locale === "indonesia" ? "2001" : "ANIME"}</b><span>{locale === "hindi-india" ? "Former localized Hindi names retained" : isPartialScriptLocale ? "Script spellings directly attested" : locale === "brazil" ? "Names localized beyond English spelling" : locale === "indonesia" ? "Earliest documented dub naming layer" : "Dub / official-media naming included"}</span></div>
      <p>The medium is part of every record. “Transcription” means the name crossed scripts; it does not claim that a new etymology or independently translated species name was created.</p>
    </div>
    <div className={`dex-controls ${locale === "hindi-india" ? "has-history-filter" : ""}`}><label><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => { setQuery(event.target.value); setLimit(PAGE_SIZE); }} placeholder={`Search ${metadata.localeName}, English, or Pokédex no.…`} aria-label={`Search ${metadata.localeName} Pokémon name library`} /></label>{hasScriptFilter && <button className={scriptOnly ? "active" : ""} type="button" aria-pressed={scriptOnly} onClick={() => { setScriptOnly((current) => !current); setExpanded(null); setLimit(PAGE_SIZE); }}>Confirmed script only · {confirmedScriptCount.toLocaleString()}</button>}{locale === "hindi-india" && <button className={changedOnly ? "active" : ""} type="button" aria-pressed={changedOnly} onClick={() => { setChangedOnly((current) => !current); setExpanded(null); setLimit(PAGE_SIZE); }}>Changed from former · {changedRecordCount.toLocaleString()}</button>}<span>Showing {visible.length} of {matches.length}</span></div>
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
            <div><span>{metadata.currentLabel}</span><b>{entry.current}</b><p>{entry.reading}</p><small>Documented use: {entry.medium}. First name year: {entry.recordYear}.</small>{entry.recordSource && <a className="dex-record-source" href={entry.recordSource} target="_blank" rel="noreferrer">Open the official media title ↗</a>}</div>
            {entry.former ? <div><span>Former localized Hindi record</span><b>{entry.former}</b><p>{entry.formerReading}</p><small>Used by official Hindi services and selected animation from 2023; retired under the India-wide naming policy in September 2025. Additional Romanization: {entry.formerRomanization ?? "N/A"}.</small></div> : <div className="dex-empty-history"><span>Translation note</span><p>{locale === "thailand" ? "This Thai spelling represents the Japanese species name in Thai script." : locale === "russia" ? "This Cyrillic spelling generally represents the English species name in Russian orthography." : locale === "indonesia" ? "Indonesian-language media retains this international species name; surrounding dialogue, titles, and presentation are localized." : locale === "brazil" ? entry.current === entry.english ? "Brazilian Portuguese retains this English spelling; pronunciation and surrounding terminology can still be localized." : "This species has a distinct documented Brazilian Portuguese name." : entry.attestedScript ? "The English-derived spoken name is shown here in a script spelling directly attested by official locale media." : "The English-derived name is used in the dub, but no authoritative script spelling is yet indexed for this species."}</p></div>}
            <NameEtymology id={entry.id} name={entry.english} items={[{ label: `${entry.current} · source-name origin`, field: metadata.originField, year: entry.recordYear }]} />
          </div>}
        </div>;
      })}
      {!visible.length && <div className="dex-no-results">No indexed record matches “{query}”.</div>}
    </div>
    {visible.length < matches.length && <div className="dex-load-more"><button onClick={() => setLimit((current) => current + PAGE_SIZE)}>Load {Math.min(PAGE_SIZE, matches.length - visible.length)} more</button><button className="text-load" onClick={() => setLimit(matches.length)}>Show all {matches.length}</button></div>}
    <div className="dex-citation"><span>Coverage & method</span><p>Names are indexed as official-media records, with source script, romanization, medium, and historical status kept separate.</p><a href={metadata.source} target="_blank" rel="noreferrer">{metadata.sourceLabel} ↗</a></div>
  </section>;
}

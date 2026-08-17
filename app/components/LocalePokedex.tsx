"use client";

import { useEffect, useMemo, useState } from "react";
import chinesePokemon from "../data/chinesePokemon.json";
import { NameEtymology } from "./NameEtymology";

type Locale = "hong-kong" | "taiwan" | "mainland-china";
type HistoricalName = { name: string; reading: string; regions: string };
type SourceEntry = (typeof chinesePokemon)[number];
type Entry = {
  id: number;
  english: string;
  current: string;
  reading: string;
  historical: HistoricalName[];
};

const PAGE_SIZE = 50;

const localeLabels: Record<Locale, { current: string; reading: string; regionCodes: string[] }> = {
  "hong-kong": { current: "Current unified name", reading: "Yale-style Cantonese reading", regionCodes: ["HK"] },
  taiwan: { current: "Current Taiwan name", reading: "Hanyu Pinyin reading", regionCodes: ["TW", "TW/CN", "HK/TW"] },
  "mainland-china": { current: "Current mainland name", reading: "Hanyu Pinyin reading", regionCodes: ["CN", "TW/CN", "HK/CN"] },
};

function historyForLocale(entry: SourceEntry, locale: Locale) {
  const regions = localeLabels[locale].regionCodes;
  return entry.historical.filter((record) => regions.includes(record.regions));
}

function entriesFor(locale: Locale): Entry[] {
  return chinesePokemon.map((item) => ({
    id: item.id,
    english: item.english,
    current: locale === "mainland-china" ? item.simplified : item.traditional,
    reading: locale === "hong-kong" ? item.cantonese : item.pinyin,
    historical: historyForLocale(item, locale),
  }));
}

function hasDistinctFormerName(entry: Entry) {
  const current = entry.current.normalize("NFKC");
  return entry.historical.some((record) => record.name.normalize("NFKC") !== current);
}

export function LocalePokedex({ locale }: { locale: Locale }) {
  const [query, setQuery] = useState("");
  const [historyOnly, setHistoryOnly] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [limit, setLimit] = useState(PAGE_SIZE);
  const labels = localeLabels[locale];
  const comparesFormerNames = locale === "hong-kong" || locale === "taiwan";
  const entries = useMemo(() => entriesFor(locale), [locale]);
  const matches = useMemo(() => {
    const q = query.trim().toLocaleLowerCase();
    return entries.filter((entry) => {
      const searchable = [
        String(entry.id),
        entry.english,
        entry.current,
        entry.reading,
        ...entry.historical.flatMap((item) => [item.name, item.reading, item.regions]),
      ].join(" ").toLocaleLowerCase();
      return (!q || searchable.includes(q)) && (!historyOnly || (comparesFormerNames ? hasDistinctFormerName(entry) : entry.historical.length > 0));
    });
  }, [comparesFormerNames, entries, historyOnly, query]);

  useEffect(() => setLimit(PAGE_SIZE), [historyOnly, query]);

  const visible = matches.slice(0, limit);
  const historicalCount = entries.filter((entry) => comparesFormerNames ? hasDistinctFormerName(entry) : entry.historical.length > 0).length;
  const hasMore = visible.length < matches.length;

  return <section className="dex-library" id="name-library">
    <div className="dex-intro">
      <div><span>Locale Pokédex / complete current index</span><h2>Names are records,<br /><em>not replacements.</em></h2></div>
      <p>Browse all 1,025 Pokémon through Pecharunt. Search English names, Chinese characters, romanized readings, or a Pokédex number; open any row to inspect its locale record.</p>
    </div>
    <div className="dex-status" aria-label="Library coverage">
      <div><b>{entries.length.toLocaleString()}</b><span>Current names indexed</span></div>
      <div><b>{historicalCount}</b><span>{comparesFormerNames ? "Current names that differ from a documented former name" : "Pokémon with former names documented for this locale"}</span></div>
      <p>Current-name coverage is complete through National Pokédex No. 1025. Historical coverage is evidence-led and will grow as dated, medium-specific sources are verified.</p>
    </div>
    <div className="dex-controls">
      <label><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try Charmander, Pikachu, 比卡超, or 025…" aria-label="Search locale Pokédex" /></label>
      <button className={historyOnly ? "active" : ""} onClick={() => setHistoryOnly(!historyOnly)} aria-pressed={historyOnly}>{comparesFormerNames ? `Changed from former · ${historicalCount}` : "Historical names only"}</button>
      <span>Showing {visible.length} of {matches.length}</span>
    </div>
    <div className="dex-table" role="table" aria-label="Locale Pokémon name library">
      <div className="dex-row dex-header" role="row"><span>Sprite / No.</span><span>English</span><span>{labels.current}</span><span>Historical record</span><span /></div>
      {visible.map((entry) => {
        const isOpen = expanded === entry.id;
        const hasWadeGilesEnglishName = locale === "taiwan" && entry.id >= 1001 && entry.id <= 1004;
        return <div className={`dex-record ${isOpen ? "open" : ""}`} key={entry.id}>
          <button className="dex-row" role="row" onClick={() => setExpanded(isOpen ? null : entry.id)} aria-expanded={isOpen}>
            <span className="dex-sprite"><img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${entry.id}.png`} alt="" loading="lazy" /><b>#{String(entry.id).padStart(4, "0")}</b></span>
            <span className="dex-english">{entry.english}</span>
            <span className="dex-current"><b>{entry.current}</b><small>{entry.reading} · {labels.reading}</small></span>
            <span className="dex-history-summary">{entry.historical.length ? <><b>{entry.historical[0].name}</b><small>{entry.historical[0].reading} · former {entry.historical[0].regions} record{entry.historical.length > 1 ? ` +${entry.historical.length - 1}` : ""}</small></> : <i>No former locale name indexed</i>}</span>
            <span className="dex-expand" aria-hidden="true">{isOpen ? "−" : "+"}</span>
          </button>
          {isOpen && <div className="dex-detail">
            <div><span>Current official record</span><b>{entry.current}</b><p>{entry.reading}</p><small>Current spelling and reading are recorded separately for this locale.</small></div>
            {entry.historical.map((item) => <div key={`${item.name}-${item.regions}`}><span>Documented former record · {item.regions}</span><b>{item.name}</b><p>{item.reading}</p><small>Date and medium vary. Retained as a former regional name in the cited Chinese-name index; a precise dated source is still required for the timeline layer.</small></div>)}
            {!entry.historical.length && <div className="dex-empty-history"><span>Research note</span><p>No distinct former name is indexed for this Pokémon and locale. This does not claim that none ever appeared in regional media.</p></div>}
            <NameEtymology id={entry.id} name={entry.english} items={[
              { label: locale === "hong-kong" ? `${entry.current} · Cantonese record` : `${entry.current} · Mandarin record`, field: locale === "hong-kong" ? "chineseCantonese" : "chineseMandarin", locale },
              ...(hasWadeGilesEnglishName ? [{ label: `${entry.english} · Wade–Giles clue`, field: "english" as const, locale: "united-states" as const }] : []),
            ]} />
          </div>}
        </div>;
      })}
      {!visible.length && <div className="dex-no-results">No indexed record matches “{query}”. Try an English name, Chinese name, reading, or Pokédex number.</div>}
    </div>
    {hasMore && <div className="dex-load-more">
      <button onClick={() => setLimit((current) => current + PAGE_SIZE)}>Load {Math.min(PAGE_SIZE, matches.length - visible.length)} more</button>
      <button className="text-load" onClick={() => setLimit(matches.length)}>Show all {matches.length}</button>
    </div>}
    <div className="dex-citation"><span>Coverage & method</span><p>All 1,025 current names and romanized readings come from Bulbapedia’s Chinese-name index, cross-checked against the official Taiwan and mainland Pokédexes. Former names appear only for the locales explicitly identified by that index; their exact dates and media remain a separate research task.</p><a href="https://bulbapedia.bulbagarden.net/wiki/List_of_Chinese_Pok%C3%A9mon_names" target="_blank" rel="noreferrer">Chinese-name index ↗</a></div>
  </section>;
}

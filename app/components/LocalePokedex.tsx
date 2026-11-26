"use client";

import { useEffect, useMemo, useState } from "react";
import chinesePokemon from "../data/chinesePokemon.json";
import type { Lang } from "../i18n";
import { useLang } from "./LanguageProvider";
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

const localeRegionCodes: Record<Locale, string[]> = {
  "hong-kong": ["HK"],
  taiwan: ["TW", "TW/CN", "HK/TW"],
  "mainland-china": ["CN", "TW/CN", "HK/CN"],
};

const localeLabels: Record<Lang, Record<Locale, { current: string; reading: string }>> = {
  en: {
    "hong-kong": { current: "Current unified name", reading: "Yale-style Cantonese reading" },
    taiwan: { current: "Current Taiwan name", reading: "Hanyu Pinyin reading" },
    "mainland-china": { current: "Current mainland name", reading: "Hanyu Pinyin reading" },
  },
  es: {
    "hong-kong": { current: "Nombre unificado actual", reading: "Lectura cantonesa estilo Yale" },
    taiwan: { current: "Nombre actual en Taiwán", reading: "Lectura en pinyin hanyu" },
    "mainland-china": { current: "Nombre actual en China continental", reading: "Lectura en pinyin hanyu" },
  },
};

const copy = {
  en: {
    kicker: "Locale Pokédex / complete current index",
    title: ["Names are records,", "not replacements."],
    intro: "Browse all 1,025 Pokémon through Pecharunt. Search English names, Chinese characters, romanized readings, or a Pokédex number; open any row to inspect its locale record.",
    coverage: "Library coverage",
    indexed: "Current names indexed",
    differ: "Current names that differ from a documented former name",
    documented: "Pokémon with former names documented for this locale",
    coverageNote: "Current-name coverage is complete through National Pokédex No. 1025. Historical coverage is evidence-led and will grow as dated, medium-specific sources are verified.",
    placeholder: "Try Charmander, Pikachu, 比卡超, or 025…",
    search: "Search locale Pokédex",
    changed: (count: number) => `Changed from former · ${count}`,
    historicalOnly: "Historical names only",
    showing: (shown: number, total: number) => `Showing ${shown} of ${total}`,
    table: "Locale Pokémon name library",
    spriteNo: "Sprite / No.",
    english: "English",
    historicalRecord: "Historical record",
    formerSummary: (regions: string, extra: string) => `former ${regions} record${extra}`,
    noFormer: "No former locale name indexed",
    currentRecord: "Current official record",
    currentNote: "Current spelling and reading are recorded separately for this locale.",
    formerRecord: (regions: string) => `Documented former record · ${regions}`,
    formerNote: "Date and medium vary. Retained as a former regional name in the cited Chinese-name index; a precise dated source is still required for the timeline layer.",
    researchNote: "Research note",
    noFormerNote: "No distinct former name is indexed for this Pokémon and locale. This does not claim that none ever appeared in regional media.",
    cantoneseRecord: (name: string) => `${name} · Cantonese record`,
    mandarinRecord: (name: string) => `${name} · Mandarin record`,
    wadeGiles: (name: string) => `${name} · Wade–Giles clue`,
    noResults: (query: string) => `No indexed record matches “${query}”. Try an English name, Chinese name, reading, or Pokédex number.`,
    loadMore: (count: number) => `Load ${count} more`,
    showAll: (count: number) => `Show all ${count}`,
    method: "Coverage & method",
    citation: "All 1,025 current names and romanized readings come from Bulbapedia’s Chinese-name index, cross-checked against the official Taiwan and mainland Pokédexes. Former names appear only for the locales explicitly identified by that index; their exact dates and media remain a separate research task.",
    sourceLink: "Chinese-name index ↗",
    num: (value: number) => value.toLocaleString(),
  },
  es: {
    kicker: "Pokédex regional / índice actual completo",
    title: ["Los nombres son registros,", "no sustituciones."],
    intro: "Recorre los 1.025 Pokémon hasta Pecharunt. Busca por nombre en inglés, caracteres chinos, lectura romanizada o número de la Pokédex; abre cualquier fila para examinar su registro regional.",
    coverage: "Cobertura de la biblioteca",
    indexed: "Nombres actuales indexados",
    differ: "Nombres actuales que difieren de un nombre anterior documentado",
    documented: "Pokémon con nombres anteriores documentados en esta región",
    coverageNote: "La cobertura de nombres actuales es completa hasta el n.º 1025 de la Pokédex Nacional. La cobertura histórica se guía por la evidencia y crecerá a medida que se verifiquen fuentes fechadas y específicas de cada medio.",
    placeholder: "Prueba Charmander, Pikachu, 比卡超 o 025…",
    search: "Busca en la Pokédex regional",
    changed: (count: number) => `Cambiados respecto al anterior · ${count}`,
    historicalOnly: "Solo nombres históricos",
    showing: (shown: number, total: number) => `Mostrando ${shown} de ${total}`,
    table: "Biblioteca regional de nombres Pokémon",
    spriteNo: "Sprite / N.º",
    english: "Inglés",
    historicalRecord: "Registro histórico",
    formerSummary: (regions: string, extra: string) => `registro anterior de ${regions}${extra}`,
    noFormer: "Sin nombre regional anterior indexado",
    currentRecord: "Registro oficial actual",
    currentNote: "La grafía y la lectura actuales se registran por separado para esta región.",
    formerRecord: (regions: string) => `Registro anterior documentado · ${regions}`,
    formerNote: "La fecha y el medio varían. Se conserva como nombre regional anterior en el índice de nombres chinos citado; aún se necesita una fuente con fecha precisa para la capa cronológica.",
    researchNote: "Nota de investigación",
    noFormerNote: "No hay un nombre anterior distinto indexado para este Pokémon en esta región. Esto no afirma que nunca apareciera uno en los medios regionales.",
    cantoneseRecord: (name: string) => `${name} · registro cantonés`,
    mandarinRecord: (name: string) => `${name} · registro mandarín`,
    wadeGiles: (name: string) => `${name} · pista Wade–Giles`,
    noResults: (query: string) => `Ningún registro indexado coincide con “${query}”. Prueba un nombre en inglés, un nombre chino, una lectura o un número de la Pokédex.`,
    loadMore: (count: number) => `Cargar ${count} más`,
    showAll: (count: number) => `Mostrar los ${count}`,
    method: "Cobertura y método",
    citation: "Los 1.025 nombres actuales y sus lecturas romanizadas proceden del índice de nombres chinos de Bulbapedia, cotejado con las Pokédex oficiales de Taiwán y China continental. Los nombres anteriores aparecen solo en las regiones que ese índice identifica explícitamente; sus fechas y medios exactos siguen siendo una tarea de investigación aparte.",
    sourceLink: "Índice de nombres chinos ↗",
    num: (value: number) => value.toLocaleString("es"),
  },
};

function historyForLocale(entry: SourceEntry, locale: Locale) {
  const regions = localeRegionCodes[locale];
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
  const lang = useLang();
  const t = copy[lang];
  const [query, setQuery] = useState("");
  const [historyOnly, setHistoryOnly] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [limit, setLimit] = useState(PAGE_SIZE);
  const labels = localeLabels[lang][locale];
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
      <div><span>{t.kicker}</span><h2>{t.title[0]}<br /><em>{t.title[1]}</em></h2></div>
      <p>{t.intro}</p>
    </div>
    <div className="dex-status" aria-label={t.coverage}>
      <div><b>{t.num(entries.length)}</b><span>{t.indexed}</span></div>
      <div><b>{historicalCount}</b><span>{comparesFormerNames ? t.differ : t.documented}</span></div>
      <p>{t.coverageNote}</p>
    </div>
    <div className="dex-controls">
      <label><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t.placeholder} aria-label={t.search} /></label>
      <button className={historyOnly ? "active" : ""} onClick={() => setHistoryOnly(!historyOnly)} aria-pressed={historyOnly}>{comparesFormerNames ? t.changed(historicalCount) : t.historicalOnly}</button>
      <span>{t.showing(visible.length, matches.length)}</span>
    </div>
    <div className="dex-table" role="table" aria-label={t.table}>
      <div className="dex-row dex-header" role="row"><span>{t.spriteNo}</span><span>{t.english}</span><span>{labels.current}</span><span>{t.historicalRecord}</span><span /></div>
      {visible.map((entry) => {
        const isOpen = expanded === entry.id;
        const hasWadeGilesEnglishName = locale === "taiwan" && entry.id >= 1001 && entry.id <= 1004;
        return <div className={`dex-record ${isOpen ? "open" : ""}`} key={entry.id}>
          <button className="dex-row" role="row" onClick={() => setExpanded(isOpen ? null : entry.id)} aria-expanded={isOpen}>
            <span className="dex-sprite"><img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${entry.id}.png`} alt="" loading="lazy" /><b>#{String(entry.id).padStart(4, "0")}</b></span>
            <span className="dex-english">{entry.english}</span>
            <span className="dex-current"><b>{entry.current}</b><small>{entry.reading} · {labels.reading}</small></span>
            <span className="dex-history-summary">{entry.historical.length ? <><b>{entry.historical[0].name}</b><small>{entry.historical[0].reading} · {t.formerSummary(entry.historical[0].regions, entry.historical.length > 1 ? ` +${entry.historical.length - 1}` : "")}</small></> : <i>{t.noFormer}</i>}</span>
            <span className="dex-expand" aria-hidden="true">{isOpen ? "−" : "+"}</span>
          </button>
          {isOpen && <div className="dex-detail">
            <div><span>{t.currentRecord}</span><b>{entry.current}</b><p>{entry.reading}</p><small>{t.currentNote}</small></div>
            {entry.historical.map((item) => <div key={`${item.name}-${item.regions}`}><span>{t.formerRecord(item.regions)}</span><b>{item.name}</b><p>{item.reading}</p><small>{t.formerNote}</small></div>)}
            {!entry.historical.length && <div className="dex-empty-history"><span>{t.researchNote}</span><p>{t.noFormerNote}</p></div>}
            <NameEtymology id={entry.id} name={entry.english} items={[
              { label: locale === "hong-kong" ? t.cantoneseRecord(entry.current) : t.mandarinRecord(entry.current), field: locale === "hong-kong" ? "chineseCantonese" : "chineseMandarin", locale },
              ...(hasWadeGilesEnglishName ? [{ label: t.wadeGiles(entry.english), field: "english" as const, locale: "united-states" as const }] : []),
            ]} />
          </div>}
        </div>;
      })}
      {!visible.length && <div className="dex-no-results">{t.noResults(query)}</div>}
    </div>
    {hasMore && <div className="dex-load-more">
      <button onClick={() => setLimit((current) => current + PAGE_SIZE)}>{t.loadMore(Math.min(PAGE_SIZE, matches.length - visible.length))}</button>
      <button className="text-load" onClick={() => setLimit(matches.length)}>{t.showAll(matches.length)}</button>
    </div>}
    <div className="dex-citation"><span>{t.method}</span><p>{t.citation}</p><a href="https://bulbapedia.bulbagarden.net/wiki/List_of_Chinese_Pok%C3%A9mon_names" target="_blank" rel="noreferrer">{t.sourceLink}</a></div>
  </section>;
}

"use client";

import { useEffect, useMemo, useState } from "react";
import koreanPokemon from "../data/koreanPokemon.json";
import { useLang } from "./LanguageProvider";
import { NameEtymology } from "./NameEtymology";

const PAGE_SIZE = 50;

const copy = {
  en: {
    kicker: "한국어 포켓몬 도감 / complete index",
    title: ["Hangul names with", "more than one ancestry."],
    intro: "Browse all 1,025 species through Pecharunt. Search in English, Hangul, Revised Romanization, McCune–Reischauer, or by National Pokédex number; open any row for the full language record.",
    coverage: "Korean name-library coverage",
    indexed: "Current Korean names indexed",
    variants: "Documented Korean game-name variants",
    statusNote: "Korean naming is not one translation pipeline. The vocabulary combines original Korean coinages, Japanese-derived forms, English-derived forms, and internationally retained names—inside a distinct South Korean media and game history.",
    placeholder: "Try Bulbasaur, 이상해씨, Isanghaessi, or 001…",
    search: "Search the Korean Pokémon name archive",
    variantsOnly: "Game-name variants only",
    showing: (shown: number, total: number) => `Showing ${shown} of ${total}`,
    table: "Korean Pokémon name library",
    spriteNo: "Sprite / No.",
    english: "English",
    currentName: "Current Korean name",
    earlierRecord: "Earlier game record",
    revised: (value: string) => `${value} · Revised Romanization`,
    contexts: {} as Record<string, string>,
    noEarlier: "No distinct earlier game name indexed",
    currentRecord: "Current official Korean record",
    currentNote: (mccune: string, official: string) => `McCune–Reischauer: ${mccune}. TPCi’s 2012 international-event romanization: ${official || "not listed"}. Pokémon Korea’s Revised Romanization is the primary reading shown in this archive.`,
    preservedRecord: "Preserved earlier record",
    preservedNote: (context: string) => `${context}. This is a documented official-use variant, not a fan translation or a general alternate spelling.`,
    researchNote: "Research note",
    noEarlierNote: "No separate Korean game name is indexed for this species. Different romanization systems can still render the same Hangul name differently without indicating a rename.",
    koreanLabel: (name: string) => `${name} · Korean`,
    noResults: (query: string) => `No indexed Korean record matches “${query}”. Try an English name, Hangul name, romanization, or Pokédex number.`,
    loadMore: (count: number) => `Load ${count} more`,
    showAll: (count: number) => `Show all ${count}`,
    method: "Coverage & method",
    citation: "Hangul and romanization fields follow Bulbapedia’s Korean-name index and are checked against Pokémon Korea’s official Pokédex. Historical rows are limited to the two documented game-name variants; romanization differences alone are not counted as renames.",
    sourceLink: "Korean-name index ↗",
    num: (value: number) => value.toLocaleString(),
  },
  es: {
    kicker: "한국어 포켓몬 도감 / índice completo",
    title: ["Nombres en hangul con", "más de un linaje."],
    intro: "Recorre las 1.025 especies hasta Pecharunt. Busca en inglés, hangul, romanización revisada, McCune–Reischauer o por número de la Pokédex Nacional; abre cualquier fila para ver el registro lingüístico completo.",
    coverage: "Cobertura de la biblioteca de nombres en coreano",
    indexed: "Nombres actuales en coreano indexados",
    variants: "Variantes documentadas de nombres en los juegos coreanos",
    statusNote: "Los nombres coreanos no salen de un único proceso de traducción. El vocabulario combina creaciones originales coreanas, formas derivadas del japonés, formas derivadas del inglés y nombres internacionales conservados—dentro de una historia propia de medios y juegos en Corea del Sur.",
    placeholder: "Prueba Bulbasaur, 이상해씨, Isanghaessi o 001…",
    search: "Busca en el archivo de nombres Pokémon en coreano",
    variantsOnly: "Solo variantes de los juegos",
    showing: (shown: number, total: number) => `Mostrando ${shown} de ${total}`,
    table: "Biblioteca de nombres Pokémon en coreano",
    spriteNo: "Sprite / N.º",
    english: "Inglés",
    currentName: "Nombre actual en coreano",
    earlierRecord: "Registro anterior en los juegos",
    revised: (value: string) => `${value} · romanización revisada`,
    contexts: {
      "Animated series, TCG, stickers, and Korean Gold/Silver": "Serie animada, JCC, pegatinas y Oro/Plata en coreano",
      "Korean Gold/Silver": "Oro/Plata en coreano",
    } as Record<string, string>,
    noEarlier: "Sin nombre anterior distinto indexado en los juegos",
    currentRecord: "Registro oficial actual en coreano",
    currentNote: (mccune: string, official: string) => `McCune–Reischauer: ${mccune}. Romanización de TPCi para eventos internacionales de 2012: ${official || "no figura"}. La romanización revisada de Pokémon Korea es la lectura principal que muestra este archivo.`,
    preservedRecord: "Registro anterior conservado",
    preservedNote: (context: string) => `${context}. Se trata de una variante de uso oficial documentada, no de una traducción de fans ni de una grafía alternativa genérica.`,
    researchNote: "Nota de investigación",
    noEarlierNote: "No hay un nombre coreano distinto en los juegos indexado para esta especie. Los distintos sistemas de romanización pueden transcribir el mismo nombre en hangul de forma diferente sin que eso indique un cambio de nombre.",
    koreanLabel: (name: string) => `${name} · coreano`,
    noResults: (query: string) => `Ningún registro coreano indexado coincide con “${query}”. Prueba un nombre en inglés, un nombre en hangul, una romanización o un número de la Pokédex.`,
    loadMore: (count: number) => `Cargar ${count} más`,
    showAll: (count: number) => `Mostrar los ${count}`,
    method: "Cobertura y método",
    citation: "Los campos de hangul y romanización siguen el índice de nombres coreanos de Bulbapedia y se cotejan con la Pokédex oficial de Pokémon Korea. Las filas históricas se limitan a las dos variantes documentadas de nombres en los juegos; las diferencias de romanización por sí solas no cuentan como cambios de nombre.",
    sourceLink: "Índice de nombres coreanos ↗",
    num: (value: number) => value.toLocaleString("es"),
  },
};

export function KoreanPokedex() {
  const t = copy[useLang()];
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
      <div><span>{t.kicker}</span><h2>{t.title[0]}<br /><em>{t.title[1]}</em></h2></div>
      <p>{t.intro}</p>
    </div>
    <div className="dex-status" aria-label={t.coverage}>
      <div><b>{t.num(koreanPokemon.length)}</b><span>{t.indexed}</span></div>
      <div><b>{variantCount}</b><span>{t.variants}</span></div>
      <p>{t.statusNote}</p>
    </div>
    <div className="dex-controls">
      <label><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t.placeholder} aria-label={t.search} /></label>
      <button className={variantsOnly ? "active" : ""} onClick={() => setVariantsOnly(!variantsOnly)} aria-pressed={variantsOnly}>{t.variantsOnly}</button>
      <span>{t.showing(visible.length, matches.length)}</span>
    </div>
    <div className="dex-table" role="table" aria-label={t.table}>
      <div className="dex-row dex-header" role="row"><span>{t.spriteNo}</span><span>{t.english}</span><span>{t.currentName}</span><span>{t.earlierRecord}</span><span /></div>
      {visible.map((entry) => {
        const isOpen = expanded === entry.id;
        const context = entry.historical ? t.contexts[entry.historical.context] ?? entry.historical.context : "";
        return <div className={`dex-record ${isOpen ? "open" : ""}`} key={entry.id}>
          <button className="dex-row" role="row" onClick={() => setExpanded(isOpen ? null : entry.id)} aria-expanded={isOpen}>
            <span className="dex-sprite"><img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${entry.id}.png`} alt="" loading="lazy" /><b>#{String(entry.id).padStart(4, "0")}</b></span>
            <span className="dex-english">{entry.english}</span>
            <span className="dex-current"><b lang="ko">{entry.hangul}</b><small>{t.revised(entry.revised)}</small></span>
            <span className="dex-history-summary">{entry.historical ? <><b lang="ko">{entry.historical.name}</b><small>{entry.historical.romanization} · {context}</small></> : <i>{t.noEarlier}</i>}</span>
            <span className="dex-expand" aria-hidden="true">{isOpen ? "−" : "+"}</span>
          </button>
          {isOpen && <div className="dex-detail">
            <div><span>{t.currentRecord}</span><b lang="ko">{entry.hangul}</b><p>{entry.revised} · ko-KR</p><small>{t.currentNote(entry.mccune, entry.officialRomanization)}</small></div>
            {entry.historical ? <div><span>{t.preservedRecord}</span><b lang="ko">{entry.historical.name}</b><p>{entry.historical.romanization}</p><small>{t.preservedNote(context)}</small></div> : <div className="dex-empty-history"><span>{t.researchNote}</span><p>{t.noEarlierNote}</p></div>}
            <NameEtymology id={entry.id} name={entry.english} items={[{ label: t.koreanLabel(entry.hangul), field: "korean", locale: "south-korea" }]} />
          </div>}
        </div>;
      })}
      {!visible.length && <div className="dex-no-results">{t.noResults(query)}</div>}
    </div>
    {hasMore && <div className="dex-load-more">
      <button onClick={() => setLimit((current) => current + PAGE_SIZE)}>{t.loadMore(Math.min(PAGE_SIZE, matches.length - visible.length))}</button>
      <button className="text-load" onClick={() => setLimit(matches.length)}>{t.showAll(matches.length)}</button>
    </div>}
    <div className="dex-citation"><span>{t.method}</span><p>{t.citation}</p><a href="https://bulbapedia.bulbagarden.net/wiki/List_of_Korean_Pok%C3%A9mon_names" target="_blank" rel="noreferrer">{t.sourceLink}</a></div>
  </section>;
}

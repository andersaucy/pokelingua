"use client";

import { useEffect, useMemo, useState } from "react";
import englishUsPokemon from "../data/englishUsPokemon.json";
import { useLang } from "./LanguageProvider";
import { NameEtymology } from "./NameEtymology";

const PAGE_SIZE = 50;

const copy = {
  en: {
    kicker: "全国図鑑 / Japanese source index",
    title: ["The names before", "they crossed borders."],
    intro: "Browse all 1,025 Japanese species names through モモワロウ. Search kana, Hepburn reading, trademarked romanization, English, or National Pokédex number; open a row for the name’s indexed origin.",
    indexed: "Japanese source names indexed",
    aligned: "English names aligned with a Japanese romanization",
    statusNote: "The Japanese name is the source record. Kana is primary; Hepburn and trademark spellings help readers compare forms but are not interchangeable with the written Japanese name or with later English localization.",
    placeholder: "Try フシギダネ, Fushigidane, Bulbasaur, or 001…",
    search: "Search the Japanese Pokémon name archive",
    retainedOnly: "English-retained forms",
    showing: (shown: number, total: number) => `Showing ${shown} of ${total}`,
    table: "Japanese Pokémon name library",
    spriteNo: "Sprite / No.",
    japaneseOriginal: "Japanese original",
    hepburnReading: "Hepburn reading",
    englishRelationship: "English relationship",
    writtenRecord: "Japanese written record",
    trademark: (value: string) => `Hepburn · trademark: ${value}`,
    retainedForm: "Form retained into English",
    distinctLocalization: "Distinct English localization",
    sourceRecord: "Japanese source record",
    sourceNote: (value: string) => `The kana name is primary. The trademarked Latin spelling is ${value}; romanization systems can differ without implying a rename.`,
    laterRecord: "Later English record",
    visibleRetained: "Visible form retained",
    distinctName: "Distinct localized name",
    retainedNote: "English kept a form aligned with the Japanese romanization.",
    rebuiltNote: "English rebuilt the visible name for its own sound, meaning, or wordplay.",
    japaneseLabel: (name: string) => `${name} · Japanese`,
    noResults: (query: string) => `No indexed Japanese record matches “${query}”. Try kana, a romanization, English, or Pokédex number.`,
    loadMore: (count: number) => `Load ${count} more`,
    showAll: (count: number) => `Show all ${count}`,
    method: "Coverage & method",
    citation: "Kana, Hepburn, and trademarked forms follow Bulbapedia’s complete Japanese-name index. Expandable origins come from each species article; the archive keeps script, reading, and trademark spelling as separate fields.",
    sourceLink: "Japanese-name index ↗",
    num: (value: number) => value.toLocaleString(),
  },
  es: {
    kicker: "全国図鑑 / índice de origen japonés",
    title: ["Los nombres antes", "de cruzar fronteras."],
    intro: "Recorre los 1.025 nombres de especie japoneses hasta モモワロウ. Busca por kana, lectura Hepburn, romanización registrada como marca, inglés o número de la Pokédex Nacional; abre una fila para ver el origen indexado del nombre.",
    indexed: "Nombres japoneses de origen indexados",
    aligned: "Nombres ingleses alineados con una romanización japonesa",
    statusNote: "El nombre japonés es el registro de origen. El kana es lo primario; las grafías Hepburn y de marca ayudan a comparar formas, pero no equivalen al nombre japonés escrito ni a la posterior localización inglesa.",
    placeholder: "Prueba フシギダネ, Fushigidane, Bulbasaur o 001…",
    search: "Busca en el archivo de nombres Pokémon en japonés",
    retainedOnly: "Formas conservadas en inglés",
    showing: (shown: number, total: number) => `Mostrando ${shown} de ${total}`,
    table: "Biblioteca de nombres Pokémon en japonés",
    spriteNo: "Sprite / N.º",
    japaneseOriginal: "Original japonés",
    hepburnReading: "Lectura Hepburn",
    englishRelationship: "Relación con el inglés",
    writtenRecord: "Registro escrito japonés",
    trademark: (value: string) => `Hepburn · marca: ${value}`,
    retainedForm: "Forma conservada en inglés",
    distinctLocalization: "Localización inglesa distinta",
    sourceRecord: "Registro japonés de origen",
    sourceNote: (value: string) => `El nombre en kana es el primario. La grafía latina registrada como marca es ${value}; los sistemas de romanización pueden diferir sin que eso implique un cambio de nombre.`,
    laterRecord: "Registro inglés posterior",
    visibleRetained: "Forma visible conservada",
    distinctName: "Nombre localizado distinto",
    retainedNote: "El inglés mantuvo una forma alineada con la romanización japonesa.",
    rebuiltNote: "El inglés reconstruyó el nombre visible según su propio sonido, significado o juego de palabras.",
    japaneseLabel: (name: string) => `${name} · japonés`,
    noResults: (query: string) => `Ningún registro japonés indexado coincide con “${query}”. Prueba kana, una romanización, inglés o un número de la Pokédex.`,
    loadMore: (count: number) => `Cargar ${count} más`,
    showAll: (count: number) => `Mostrar los ${count}`,
    method: "Cobertura y método",
    citation: "Las formas en kana, Hepburn y de marca siguen el índice completo de nombres japoneses de Bulbapedia. Los orígenes desplegables proceden del artículo de cada especie; el archivo mantiene escritura, lectura y grafía de marca como campos separados.",
    sourceLink: "Índice de nombres japoneses ↗",
    num: (value: number) => value.toLocaleString("es"),
  },
};

export function JapanesePokedex() {
  const t = copy[useLang()];
  const [query, setQuery] = useState("");
  const [retainedOnly, setRetainedOnly] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [limit, setLimit] = useState(PAGE_SIZE);
  const matches = useMemo(() => {
    const q = query.trim().toLocaleLowerCase("ja-JP");
    return englishUsPokemon.filter((entry) => (!q || [entry.id, entry.english, entry.kana, entry.hepburn, entry.trademark].join(" ").toLocaleLowerCase("ja-JP").includes(q)) && (!retainedOnly || entry.retained));
  }, [query, retainedOnly]);
  useEffect(() => setLimit(PAGE_SIZE), [query, retainedOnly]);
  const visible = matches.slice(0, limit);
  const retainedCount = englishUsPokemon.filter((entry) => entry.retained).length;

  return <section className="dex-library japan-dex" id="name-library">
    <div className="dex-intro"><div><span>{t.kicker}</span><h2>{t.title[0]}<br /><em>{t.title[1]}</em></h2></div><p>{t.intro}</p></div>
    <div className="dex-status"><div><b>{t.num(englishUsPokemon.length)}</b><span>{t.indexed}</span></div><div><b>{t.num(retainedCount)}</b><span>{t.aligned}</span></div><p>{t.statusNote}</p></div>
    <div className="dex-controls"><label><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t.placeholder} aria-label={t.search} /></label><button className={retainedOnly ? "active" : ""} onClick={() => setRetainedOnly(!retainedOnly)} aria-pressed={retainedOnly}>{t.retainedOnly}</button><span>{t.showing(visible.length, matches.length)}</span></div>
    <div className="dex-table" role="table" aria-label={t.table}><div className="dex-row dex-header" role="row"><span>{t.spriteNo}</span><span>{t.japaneseOriginal}</span><span>{t.hepburnReading}</span><span>{t.englishRelationship}</span><span /></div>
      {visible.map((entry) => { const isOpen = expanded === entry.id; return <div className={`dex-record ${isOpen ? "open" : ""}`} key={entry.id}><button className="dex-row" role="row" onClick={() => setExpanded(isOpen ? null : entry.id)} aria-expanded={isOpen}><span className="dex-sprite"><img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${entry.id}.png`} alt="" loading="lazy" /><b>#{String(entry.id).padStart(4, "0")}</b></span><span className="dex-current"><b lang="ja">{entry.kana}</b><small>{t.writtenRecord}</small></span><span className="dex-current"><b>{entry.hepburn}</b><small>{t.trademark(entry.trademark)}</small></span><span className="dex-history-summary"><b>{entry.english}</b><small>{entry.retained ? t.retainedForm : t.distinctLocalization}</small></span><span className="dex-expand" aria-hidden="true">{isOpen ? "−" : "+"}</span></button>
        {isOpen && <div className="dex-detail"><div><span>{t.sourceRecord}</span><b lang="ja">{entry.kana}</b><p>{entry.hepburn}</p><small>{t.sourceNote(entry.trademark)}</small></div><div><span>{t.laterRecord}</span><b>{entry.english}</b><p>{entry.retained ? t.visibleRetained : t.distinctName}</p><small>{entry.retained ? t.retainedNote : t.rebuiltNote}</small></div><NameEtymology id={entry.id} name={entry.english} items={[{ label: t.japaneseLabel(entry.hepburn), field: "japanese", locale: "japan" }]} /></div>}
      </div>; })}
      {!visible.length && <div className="dex-no-results">{t.noResults(query)}</div>}
    </div>
    {visible.length < matches.length && <div className="dex-load-more"><button onClick={() => setLimit((current) => current + PAGE_SIZE)}>{t.loadMore(Math.min(PAGE_SIZE, matches.length - visible.length))}</button><button className="text-load" onClick={() => setLimit(matches.length)}>{t.showAll(matches.length)}</button></div>}
    <div className="dex-citation"><span>{t.method}</span><p>{t.citation}</p><a href="https://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_in_Japanese" target="_blank" rel="noreferrer">{t.sourceLink}</a></div>
  </section>;
}

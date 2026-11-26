"use client";

import { useMemo, useState } from "react";
import { spanishPokemon } from "../data/spanishPokemon";
import { useLang } from "./LanguageProvider";
import { NameEtymology } from "./NameEtymology";

const PAGE_SIZE = 50;

const copy = {
  en: {
    title: ["Shared species names,", "different Spanish worlds."],
    intro: "Browse all 1,025 species through Pecharunt. The official Spanish list keeps most English spellings and translates a small descriptive set; the surrounding dialogue, terminology, voices, and regional register are where Spain and Latin America most clearly diverge.",
    coverage: "Spanish name-library coverage",
    indexed: "Current Spanish records indexed",
    distinct: "Names distinct from English",
    latamNote: "Latin American Spanish became a selectable core-game language in Legends: Z-A in 2025. This table records that game standard while preserving earlier media-only variants in expanded notes.",
    spainNote: "Spain’s game localization dates to Red and Blue in 1999. Its species-name standard is mostly shared with English, with Código Cero and the translated Paradox Pokémon as notable exceptions.",
    placeholder: "Try Pikachu, Código Cero, Colmilargo, or 984…",
    search: "Search the Spanish Pokémon name archive",
    translatedOnly: "Translated names only",
    showing: (shown: number, total: number) => `Showing ${shown} of ${total}`,
    table: (isLatam: boolean) => `${isLatam ? "Latin American" : "Spain"} Spanish Pokémon name library`,
    spriteNo: "Sprite / No.",
    english: "English",
    officialName: "Official Spanish name",
    localizationRecord: "Localization record",
    currentSpelling: "Current official Spanish spelling",
    translated: "Translated",
    differs: "Spanish form differs from English",
    shared: "Shared spelling",
    animeVariant: "Earlier anime variant documented",
    retained: "English name retained",
    sourceOrigin: (name: string) => `${name} · source-name origin`,
    officialRecord: "Official name record",
    latamTag: "Spanish · es-419",
    spainTag: "Spanish · es-ES",
    translatedNote: "The descriptive English name was translated into Spanish.",
    sharedNote: "The official Spanish name preserves the English spelling; the surrounding game text remains fully localized.",
    regionalContext: "Regional context",
    mimeVariant: "Historical Latin American anime variant",
    sharedStandard: "Current shared species standard",
    mimeNote: "Some Latin American anime episodes used Señor Mime. It is preserved here as a media-era variant, not presented as the current official core-game species name.",
    latamContext: "The 2025 Latin American game edition distinguishes dialogue, moves, items, and register even where the species spelling matches Spain and English.",
    spainContext: "Spain and Latin America can share this species spelling without being the same localization.",
    noResults: (query: string) => `No indexed Spanish record matches “${query}”.`,
    loadMore: (count: number) => `Load ${count} more`,
    showAll: (count: number) => `Show all ${count}`,
    method: "Coverage & method",
    citation: "Current names follow Bulbapedia’s Spanish-name index and official regional game material. Shared spellings are recorded as a localization choice; medium-specific historical variants remain explicitly labeled.",
    sourceLink: "Spanish-name index ↗",
    num: (value: number) => value.toLocaleString(),
  },
  es: {
    title: ["Nombres de especie compartidos,", "mundos hispanos distintos."],
    intro: "Recorre las 1.025 especies hasta Pecharunt. La lista oficial en español conserva la mayoría de las grafías inglesas y traduce un pequeño grupo descriptivo; es en los diálogos, la terminología, las voces y el registro regional donde España y Latinoamérica se distinguen con más claridad.",
    coverage: "Cobertura de la biblioteca de nombres en español",
    indexed: "Registros actuales en español indexados",
    distinct: "Nombres distintos del inglés",
    latamNote: "El español latinoamericano pasó a ser un idioma seleccionable en un juego principal con Leyendas Pokémon: Z-A en 2025. Esta tabla recoge ese estándar del juego y conserva en las notas desplegables las variantes anteriores exclusivas de otros medios.",
    spainNote: "La localización de los juegos en España se remonta a Rojo y Azul en 1999. Su estándar de nombres de especie coincide mayormente con el inglés, con Código Cero y los Pokémon Paradoja traducidos como excepciones notables.",
    placeholder: "Prueba Pikachu, Código Cero, Colmilargo o 984…",
    search: "Busca en el archivo de nombres Pokémon en español",
    translatedOnly: "Solo nombres traducidos",
    showing: (shown: number, total: number) => `Mostrando ${shown} de ${total}`,
    table: (isLatam: boolean) => `Biblioteca de nombres Pokémon en ${isLatam ? "español latinoamericano" : "español de España"}`,
    spriteNo: "Sprite / N.º",
    english: "Inglés",
    officialName: "Nombre oficial en español",
    localizationRecord: "Registro de localización",
    currentSpelling: "Grafía oficial actual en español",
    translated: "Traducido",
    differs: "La forma española difiere de la inglesa",
    shared: "Grafía compartida",
    animeVariant: "Variante anterior del anime documentada",
    retained: "Se conserva el nombre inglés",
    sourceOrigin: (name: string) => `${name} · origen del nombre original`,
    officialRecord: "Registro del nombre oficial",
    latamTag: "Español · es-419",
    spainTag: "Español · es-ES",
    translatedNote: "El nombre descriptivo inglés se tradujo al español.",
    sharedNote: "El nombre oficial en español conserva la grafía inglesa; el resto del texto del juego está totalmente localizado.",
    regionalContext: "Contexto regional",
    mimeVariant: "Variante histórica del anime latinoamericano",
    sharedStandard: "Estándar actual compartido de la especie",
    mimeNote: "Algunos episodios del anime latinoamericano usaron Señor Mime. Se conserva aquí como variante de una época mediática, no como el nombre oficial actual de la especie en los juegos principales.",
    latamContext: "La edición latinoamericana de 2025 del juego diferencia diálogos, movimientos, objetos y registro incluso cuando la grafía de la especie coincide con la de España y el inglés.",
    spainContext: "España y Latinoamérica pueden compartir esta grafía de especie sin ser la misma localización.",
    noResults: (query: string) => `Ningún registro en español indexado coincide con “${query}”.`,
    loadMore: (count: number) => `Cargar ${count} más`,
    showAll: (count: number) => `Mostrar los ${count}`,
    method: "Cobertura y método",
    citation: "Los nombres actuales siguen el índice de nombres en español de Bulbapedia y el material oficial de los juegos regionales. Las grafías compartidas se registran como una decisión de localización; las variantes históricas propias de cada medio siguen etiquetadas de forma explícita.",
    sourceLink: "Índice de nombres en español ↗",
    num: (value: number) => value.toLocaleString("es"),
  },
};

export function SpanishPokedex({ locale }: { locale: "spain" | "latin-america" }) {
  const t = copy[useLang()];
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
      <div><span>{isLatam ? "Pokédex latinoamericano" : "Pokédex de España"} / índice completo</span><h2>{t.title[0]}<br /><em>{t.title[1]}</em></h2></div>
      <p>{t.intro}</p>
    </div>
    <div className="dex-status" aria-label={t.coverage}>
      <div><b>{t.num(spanishPokemon.length)}</b><span>{t.indexed}</span></div>
      <div><b>21</b><span>{t.distinct}</span></div>
      <p>{isLatam ? t.latamNote : t.spainNote}</p>
    </div>
    <div className="dex-controls">
      <label><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => updateQuery(event.target.value)} placeholder={t.placeholder} aria-label={t.search} /></label>
      <button className={localizedOnly ? "active" : ""} onClick={toggleLocalized} aria-pressed={localizedOnly}>{t.translatedOnly}</button>
      <span>{t.showing(visible.length, matches.length)}</span>
    </div>
    <div className="dex-table" role="table" aria-label={t.table(isLatam)}>
      <div className="dex-row dex-header" role="row"><span>{t.spriteNo}</span><span>{t.english}</span><span>{t.officialName}</span><span>{t.localizationRecord}</span><span /></div>
      {visible.map((entry) => {
        const isOpen = expanded === entry.id;
        const señorMime = isLatam && entry.id === 122;
        return <div className={`dex-record ${isOpen ? "open" : ""}`} key={entry.id}>
          <button className="dex-row" role="row" onClick={() => setExpanded(isOpen ? null : entry.id)} aria-expanded={isOpen}>
            <span className="dex-sprite"><img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${entry.id}.png`} alt="" loading="lazy" /><b>#{String(entry.id).padStart(4, "0")}</b></span>
            <span className="dex-english">{entry.english}</span>
            <span className="dex-current"><b>{entry.spanish}</b><small>{t.currentSpelling}</small></span>
            <span className="dex-history-summary">{entry.localized ? <><b>{t.translated}</b><small>{t.differs}</small></> : <><b>{t.shared}</b><small>{señorMime ? t.animeVariant : t.retained}</small></>}</span>
            <span className="dex-expand" aria-hidden="true">{isOpen ? "−" : "+"}</span>
          </button>
          {isOpen && <div className="dex-detail">
            <NameEtymology id={entry.id} name={entry.english} items={[{ label: t.sourceOrigin(entry.spanish), field: "english", locale }]} />
            <div><span>{t.officialRecord}</span><b>{entry.spanish}</b><p>{isLatam ? t.latamTag : t.spainTag}</p><small>{entry.localized ? t.translatedNote : t.sharedNote}</small></div>
            <div><span>{t.regionalContext}</span><b>{señorMime ? "Señor Mime" : entry.english}</b><p>{señorMime ? t.mimeVariant : t.sharedStandard}</p><small>{señorMime ? t.mimeNote : isLatam ? t.latamContext : t.spainContext}</small></div>
          </div>}
        </div>;
      })}
      {!visible.length && <div className="dex-no-results">{t.noResults(query)}</div>}
    </div>
    {visible.length < matches.length && <div className="dex-load-more"><button onClick={() => setLimit((current) => current + PAGE_SIZE)}>{t.loadMore(Math.min(PAGE_SIZE, matches.length - visible.length))}</button><button className="text-load" onClick={() => setLimit(matches.length)}>{t.showAll(matches.length)}</button></div>}
    <div className="dex-citation"><span>{t.method}</span><p>{t.citation}</p><a href="https://bulbapedia.bulbagarden.net/wiki/List_of_Spanish_Pok%C3%A9mon_names" target="_blank" rel="noreferrer">{t.sourceLink}</a></div>
  </section>;
}

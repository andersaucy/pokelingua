"use client";

import { useMemo, useState } from "react";
import englishPokemon from "../data/englishUsPokemon.json";
import { tamilScriptNames, teluguScriptNames } from "../data/indianScriptNames";
import mediaPokemon from "../data/mediaPokemon.json";
import { arabicScriptNames, hebrewScriptNames } from "../data/regionalScriptNames";
import type { Lang } from "../i18n";
import { useLang } from "./LanguageProvider";
import { NameEtymology, type OriginField } from "./NameEtymology";

type Locale = "brazil" | "russia" | "thailand" | "indonesia" | "portugal" | "arab-world" | "philippines" | "malaysia" | "israel" | "hindi-india" | "tamil-india" | "telugu-india";
type IndexedRecord = { id: number; english: string; current: string; reading: string; former?: string; formerReading?: string; formerRomanization?: string };
type Entry = IndexedRecord & { medium: string; recordYear: string; attestedScript?: boolean; confirmedScript?: boolean; recordSource?: string };
type LocaleCopy = {
  localeName: string;
  currentLabel: string;
  readingLabel: string;
  originField: OriginField;
  medium: string;
  recordYear: string;
  intro: string;
  source: string;
  sourceLabel: string;
};

const PAGE_SIZE = 50;

const copy: Record<Locale, LocaleCopy> = {
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

const esCopy: Record<Locale, Pick<LocaleCopy, "localeName" | "currentLabel" | "readingLabel" | "medium" | "intro" | "sourceLabel">> = {
  brazil: {
    localeName: "en portugués brasileño",
    currentLabel: "Registro en portugués brasileño",
    readingLabel: "Uso en medios / servicios oficiales",
    medium: "Animación · TCG · juegos / servicios localizados",
    intro: "Busca los nombres de especie usados en la animación, las cartas, los servicios localizados y los productos en portugués brasileño. La mayoría conservan la grafía inglesa, mientras que Type: Null y los Pokémon Paradoja tienen nombres portugueses propios documentados.",
    sourceLabel: "Índice de nombres en portugués brasileño",
  },
  russia: {
    localeName: "en ruso",
    currentLabel: "Registro oficial en cirílico",
    readingLabel: "Romanización BGN/PCGN",
    medium: "Animación · TCG · Pokémon GO / UNITE",
    intro: "Busca las grafías oficiales en cirílico usadas en el doblaje ruso, las cartas coleccionables, los servicios localizados y los productos. La mayoría representan el nombre de especie inglés con la ortografía rusa; la tabla recoge esa capa real de localización en lugar de descartarla como duplicación.",
    sourceLabel: "Índice de nombres en ruso",
  },
  thailand: {
    localeName: "en tailandés",
    currentLabel: "Registro oficial en tailandés",
    readingLabel: "Transcripción RTGS",
    medium: "Animación · TCG · Pokémon GO / Smile",
    intro: "Busca los nombres oficiales en escritura tailandesa usados por la animación, el TCG en tailandés, los servicios localizados y los productos. Estas formas suelen transcribir los nombres de especie japoneses, así que el desplegable explica el origen del nombre japonés que viajó al tailandés.",
    sourceLabel: "Índice de nombres en tailandés",
  },
  indonesia: {
    localeName: "en indonesio",
    currentLabel: "Registro de medios en indonesio",
    readingLabel: "Nombre internacional conservado",
    medium: "Animación indonesia · web / servicios móviles oficiales",
    intro: "Busca el conjunto internacional de nombres de especie usado en los medios Pokémon en indonesio. La grafía repetida es el hallazgo: los diálogos y la presentación oficiales en indonesio conviven con nombres propios ingleses conservados, en lugar de un catálogo completo de especies traducido aparte.",
    sourceLabel: "Historia de los medios y los nombres en Indonesia",
  },
  portugal: {
    localeName: "en portugués europeo",
    currentLabel: "Registro de medios en Portugal",
    readingLabel: "Nombre internacional conservado",
    medium: "Animación en portugués europeo · envases / manuales",
    intro: "Busca el conjunto internacional de nombres de especie usado en Portugal. Históricamente, los juegos llegaron con el software en inglés—aunque se adaptaran los envases y los manuales—mientras que el doblaje portugués localizó diálogos, títulos, canciones, movimientos y la terminología asociada.",
    sourceLabel: "Historia de la localización en Portugal",
  },
  "arab-world": {
    localeName: "en árabe",
    currentLabel: "Registro del anime en árabe",
    readingLabel: "Lectura latina de la escritura árabe",
    medium: "Animación en árabe",
    intro: "Busca las formas de especie en escritura árabe atestiguadas directamente en el archivo del doblaje. La mayoría de los nombres conservan una identidad derivada del inglés; solo se muestran las grafías documentadas, y el resto queda como N/A en lugar de transliterarse automáticamente.",
    sourceLabel: "Registro de nombres del anime en árabe",
  },
  philippines: {
    localeName: "en filipino / inglés filipino",
    currentLabel: "Registro de medios en Filipinas",
    readingLabel: "Nombre internacional conservado",
    medium: "Inglés filipino · animación en filipino",
    intro: "Busca los nombres de especie internacionales usados en las tradiciones televisivas paralelas en inglés y en filipino de Filipinas. Los Pokémon suelen conservar sus nombres ingleses y sus gritos característicos, aunque los diálogos y la interpretación pasen al filipino.",
    sourceLabel: "Historia de los medios en Filipinas",
  },
  malaysia: {
    localeName: "de Malasia",
    currentLabel: "Registro de medios en Malasia",
    readingLabel: "Nombre internacional conservado",
    medium: "Inglés · animación / subtítulos en malayo",
    intro: "Busca la capa internacional de nombres de especie compartida por las versiones en inglés y en malayo de Malasia. La adaptación cambió de pista de origen con el tiempo: Diamante y Perla se hizo a partir del japonés, mientras que el posterior doblaje malayo de Negro y Blanco siguió la versión inglesa.",
    sourceLabel: "Historia de los medios en Malasia",
  },
  israel: {
    localeName: "en hebreo",
    currentLabel: "Registro del anime en hebreo",
    readingLabel: "Lectura latina de la escritura hebrea",
    medium: "Animación en hebreo",
    intro: "Busca las grafías en escritura hebrea atestiguadas directamente en la animación. El doblaje hebreo conserva las identidades de especie inglesas, pero escribirlas de derecha a izquierda crea un registro ortográfico real. Las especies sin respaldo quedan como N/A.",
    sourceLabel: "Registro de nombres del anime en hebreo",
  },
  "hindi-india": {
    localeName: "en hindi",
    currentLabel: "Registro actual en hindi",
    readingLabel: "Transliteración devanāgarī",
    medium: "Web / servicios oficiales · política de animación",
    intro: "Busca las grafías actuales en devanāgarī basadas en los nombres ingleses, además de las formas hindi localizadas usadas de 2023 a 2025 cuando el archivo registra alguna. Los nombres anteriores llegaron a la animación oficial, incluida Pokémon Horizontes, antes de que se actualizara su audio.",
    sourceLabel: "Índice de nombres en hindi",
  },
  "tamil-india": {
    localeName: "en tamil",
    currentLabel: "Registro de especies del doblaje del anime",
    readingLabel: "Política actual para toda la India",
    medium: "Animación oficial en tamil",
    intro: "El doblaje en tamil usa el conjunto de nombres de especie ingleses. Esta tabla permite buscar esa decisión de nomenclatura sin perder de vista el idioma de la interpretación. Todavía no se ha publicado un índice completo y autorizado de especies en escritura tamil, así que aquí no se inventan grafías.",
    sourceLabel: "Política oficial de nombres en la India",
  },
  "telugu-india": {
    localeName: "en telugu",
    currentLabel: "Registro de especies del doblaje del anime",
    readingLabel: "Política actual para toda la India",
    medium: "Animación oficial en telugu",
    intro: "El doblaje en telugu usa el conjunto de nombres de especie ingleses. Esta tabla permite buscar esa decisión de nomenclatura sin perder de vista el idioma de la interpretación. Todavía no se ha publicado un índice completo y autorizado de especies en escritura telugu, así que aquí no se inventan grafías.",
    sourceLabel: "Política oficial de nombres en la India",
  },
};

const text = {
  en: {
    kicker: (name: string) => `${name} name library / official-media record`,
    title: ["The dub belongs", "in the table."],
    coverage: "Library coverage",
    indexed: "Locale records indexed",
    hindiFormer: "Former localized Hindi names retained",
    attested: "Script spellings directly attested",
    brazilLocalized: "Names localized beyond English spelling",
    indonesiaLayer: "Earliest documented dub naming layer",
    dubIncluded: "Dub / official-media naming included",
    statusNote: "The medium is part of every record. “Transcription” means the name crossed scripts; it does not claim that a new etymology or independently translated species name was created.",
    placeholder: (name: string) => `Search ${name}, English, or Pokédex no.…`,
    search: (name: string) => `Search ${name} Pokémon name library`,
    confirmedOnly: (count: string) => `Confirmed script only · ${count}`,
    changed: (count: string) => `Changed from former · ${count}`,
    showing: (shown: number, total: number) => `Showing ${shown} of ${total}`,
    table: (name: string) => `${name} Pokémon name library`,
    spriteNo: "Sprite / No.",
    english: "English",
    mediumFormer: "Medium / former record",
    formerSummary: (reading?: string) => `${reading} · former official Hindi record, 2023–2025`,
    firstYear: (year: string) => `First name year · ${year}`,
    documentedUse: (medium: string, year: string) => `Documented use: ${medium}. First name year: ${year}.`,
    openSource: "Open the official media title ↗",
    formerRecord: "Former localized Hindi record",
    formerNote: (romanization?: string) => `Used by official Hindi services and selected animation from 2023; retired under the India-wide naming policy in September 2025. Additional Romanization: ${romanization ?? "N/A"}.`,
    translationNote: "Translation note",
    thaiNote: "This Thai spelling represents the Japanese species name in Thai script.",
    russianNote: "This Cyrillic spelling generally represents the English species name in Russian orthography.",
    indonesianNote: "Indonesian-language media retains this international species name; surrounding dialogue, titles, and presentation are localized.",
    brazilRetainedNote: "Brazilian Portuguese retains this English spelling; pronunciation and surrounding terminology can still be localized.",
    brazilDistinctNote: "This species has a distinct documented Brazilian Portuguese name.",
    attestedNote: "The English-derived spoken name is shown here in a script spelling directly attested by official locale media.",
    unattestedNote: "The English-derived name is used in the dub, but no authoritative script spelling is yet indexed for this species.",
    sourceOrigin: (name: string) => `${name} · source-name origin`,
    noResults: (query: string) => `No indexed record matches “${query}”.`,
    loadMore: (count: number) => `Load ${count} more`,
    showAll: (count: number) => `Show all ${count}`,
    method: "Coverage & method",
    citation: "Names are indexed as official-media records, with source script, romanization, medium, and historical status kept separate.",
    readings: {
      brazilLocalized: "Localized Brazilian Portuguese species name",
      brazilRetained: "English spelling retained in Brazilian Portuguese",
      indonesia: "International species name retained in Indonesian media",
      shared: "International species name retained in locale media",
      unattested: "No directly attested script spelling indexed",
      attested: "English-derived name written in the locale script",
      spoken: (name: string) => `${name} is retained in speech; an official script form is not yet indexed`,
    },
    media: {} as Record<string, string>,
    num: (value: number) => value.toLocaleString(),
  },
  es: {
    kicker: (name: string) => `Biblioteca de nombres ${name} / registro de medios oficiales`,
    title: ["El doblaje merece", "un lugar en la tabla."],
    coverage: "Cobertura de la biblioteca",
    indexed: "Registros regionales indexados",
    hindiFormer: "Nombres hindi localizados anteriores conservados",
    attested: "Grafías atestiguadas directamente",
    brazilLocalized: "Nombres localizados más allá de la grafía inglesa",
    indonesiaLayer: "Primera capa documentada de nombres en el doblaje",
    dubIncluded: "Incluye nombres del doblaje / medios oficiales",
    statusNote: "El medio forma parte de cada registro. “Transcripción” significa que el nombre cambió de escritura; no afirma que se creara una nueva etimología ni un nombre de especie traducido de forma independiente.",
    placeholder: (name: string) => `Busca por nombre ${name}, en inglés o por n.º de Pokédex…`,
    search: (name: string) => `Busca en la biblioteca de nombres Pokémon ${name}`,
    confirmedOnly: (count: string) => `Solo escritura confirmada · ${count}`,
    changed: (count: string) => `Cambiados respecto al anterior · ${count}`,
    showing: (shown: number, total: number) => `Mostrando ${shown} de ${total}`,
    table: (name: string) => `Biblioteca de nombres Pokémon ${name}`,
    spriteNo: "Sprite / N.º",
    english: "Inglés",
    mediumFormer: "Medio / registro anterior",
    formerSummary: (reading?: string) => `${reading} · registro oficial anterior en hindi, 2023–2025`,
    firstYear: (year: string) => `Primer año del nombre · ${year}`,
    documentedUse: (medium: string, year: string) => `Uso documentado: ${medium}. Primer año del nombre: ${year}.`,
    openSource: "Abre el título del medio oficial ↗",
    formerRecord: "Registro hindi localizado anterior",
    formerNote: (romanization?: string) => `Usado por los servicios oficiales en hindi y en parte de la animación desde 2023; retirado en septiembre de 2025 con la política de nombres para toda la India. Romanización adicional: ${romanization ?? "N/A"}.`,
    translationNote: "Nota de traducción",
    thaiNote: "Esta grafía tailandesa representa el nombre de especie japonés en escritura tailandesa.",
    russianNote: "Esta grafía cirílica suele representar el nombre de especie inglés con la ortografía rusa.",
    indonesianNote: "Los medios en indonesio conservan este nombre de especie internacional; los diálogos, los títulos y la presentación que lo rodean están localizados.",
    brazilRetainedNote: "El portugués brasileño conserva esta grafía inglesa; la pronunciación y la terminología asociada pueden estar localizadas igualmente.",
    brazilDistinctNote: "Esta especie tiene un nombre documentado propio en portugués brasileño.",
    attestedNote: "El nombre hablado derivado del inglés se muestra aquí con una grafía atestiguada directamente por medios oficiales de la región.",
    unattestedNote: "El nombre derivado del inglés se usa en el doblaje, pero aún no se ha indexado una grafía autorizada para esta especie.",
    sourceOrigin: (name: string) => `${name} · origen del nombre original`,
    noResults: (query: string) => `Ningún registro indexado coincide con “${query}”.`,
    loadMore: (count: number) => `Cargar ${count} más`,
    showAll: (count: number) => `Mostrar los ${count}`,
    method: "Cobertura y método",
    citation: "Los nombres se indexan como registros de medios oficiales, con la escritura de origen, la romanización, el medio y el estado histórico por separado.",
    readings: {
      brazilLocalized: "Nombre de especie localizado en portugués brasileño",
      brazilRetained: "Grafía inglesa conservada en portugués brasileño",
      indonesia: "Nombre de especie internacional conservado en los medios indonesios",
      shared: "Nombre de especie internacional conservado en los medios de la región",
      unattested: "Sin grafía atestiguada directamente indexada",
      attested: "Nombre derivado del inglés escrito en la escritura de la región",
      spoken: (name: string) => `${name} se conserva en el habla; aún no se ha indexado una forma escrita oficial`,
    },
    media: {
      "Arabic-language animation": "Animación en árabe",
      "Hebrew-language animation": "Animación en hebreo",
      "Official Tamil Animated Pokédex title": "Título oficial de la Pokédex animada en tamil",
      "Official Tamil Detective Pikachu title": "Título oficial de Detective Pikachu en tamil",
      "Official Tamil media title": "Título oficial de un medio en tamil",
      "Official Tamil short-animation title": "Título oficial de un cortometraje animado en tamil",
      "Official Telugu Animated Pokédex title": "Título oficial de la Pokédex animada en telugu",
      "Official Telugu Detective Pikachu title": "Título oficial de Detective Pikachu en telugu",
      "Official Telugu media title": "Título oficial de un medio en telugu",
      "Official Telugu short-animation title": "Título oficial de un cortometraje animado en telugu",
    } as Record<string, string>,
    num: (value: number) => value.toLocaleString("es"),
  },
};

function metadataFor(locale: Locale, lang: Lang): LocaleCopy {
  return lang === "es" ? { ...copy[locale], ...esCopy[locale] } : copy[locale];
}

function entriesFor(locale: Locale, lang: Lang): Entry[] {
  const metadata = metadataFor(locale, lang);
  const t = text[lang];
  const mediumLabel = (medium?: string) => medium === undefined ? metadata.medium : t.media[medium] ?? medium;
  if (locale === "russia") return (mediaPokemon.russian as IndexedRecord[]).map((entry) => ({ ...entry, medium: metadata.medium, recordYear: metadata.recordYear, confirmedScript: true }));
  if (locale === "thailand") return (mediaPokemon.thai as IndexedRecord[]).map((entry) => ({ ...entry, medium: metadata.medium, recordYear: metadata.recordYear, confirmedScript: true }));
  if (locale === "hindi-india") return (mediaPokemon.hindi as IndexedRecord[]).map((entry) => ({ ...entry, medium: metadata.medium, recordYear: metadata.recordYear, confirmedScript: true }));
  if (locale === "brazil") {
    const localized: Record<number, string> = { 772: "Tipo Nulo", 984: "Presa Grande", 985: "Cauda Brado", 986: "Capuz Bruto", 987: "Juba Sopro", 988: "Asa Rasteira", 989: "Choque Areia", 990: "Trilho Férreo", 991: "Pacote Férreo", 992: "Mãos Férreas", 993: "Jugulares Férreas", 994: "Mariposa Férrea", 995: "Espinhos Férreos", 1005: "Lua Estrondo", 1006: "Valentia Férrea", 1009: "Onda Ando", 1010: "Folhas Férreas", 1020: "Fogo Corrosão", 1021: "Raio Fúria", 1022: "Rocha Férrea", 1023: "Chifres Férreos" };
    return englishPokemon.map((entry) => ({ id: entry.id, english: entry.english, current: localized[entry.id] ?? entry.english, reading: localized[entry.id] ? t.readings.brazilLocalized : t.readings.brazilRetained, medium: metadata.medium, recordYear: entry.id === 772 ? "2016" : localized[entry.id] ? "2022" : "N/A" }));
  }
  if (locale === "indonesia") return englishPokemon.map((entry) => ({ id: entry.id, english: entry.english, current: entry.english, reading: t.readings.indonesia, medium: metadata.medium, recordYear: metadata.recordYear }));
  if (locale === "portugal" || locale === "philippines" || locale === "malaysia") return englishPokemon.map((entry) => ({ id: entry.id, english: entry.english, current: entry.english, reading: t.readings.shared, medium: metadata.medium, recordYear: metadata.recordYear }));
  if (locale === "arab-world" || locale === "israel") {
    const scriptNames = locale === "arab-world" ? arabicScriptNames : hebrewScriptNames;
    return englishPokemon.map((entry) => {
      const attested = scriptNames[entry.id];
      return { id: entry.id, english: entry.english, current: attested?.name ?? "N/A", reading: attested?.reading ?? t.readings.unattested, medium: mediumLabel(attested?.medium), recordYear: metadata.recordYear, attestedScript: Boolean(attested), confirmedScript: Boolean(attested), recordSource: attested?.source };
    });
  }
  const scriptNames = locale === "tamil-india" ? tamilScriptNames : teluguScriptNames;
  return englishPokemon.map((entry) => {
    const attested = scriptNames[entry.id];
    return { id: entry.id, english: entry.english, current: attested?.name ?? "N/A", reading: attested ? t.readings.attested : t.readings.spoken(entry.english), medium: mediumLabel(attested?.medium), recordYear: metadata.recordYear, attestedScript: Boolean(attested), confirmedScript: Boolean(attested), recordSource: attested?.source };
  });
}

export function MediaLocalePokedex({ locale }: { locale: Locale }) {
  const lang = useLang();
  const t = text[lang];
  const metadata = metadataFor(locale, lang);
  const [query, setQuery] = useState("");
  const [scriptOnly, setScriptOnly] = useState(false);
  const [changedOnly, setChangedOnly] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [limit, setLimit] = useState(PAGE_SIZE);
  const entries = useMemo(() => entriesFor(locale, lang), [locale, lang]);
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
    <div className="dex-intro"><div><span>{t.kicker(metadata.localeName)}</span><h2>{t.title[0]}<br /><em>{t.title[1]}</em></h2></div><p>{metadata.intro}</p></div>
    <div className="dex-status" aria-label={t.coverage}>
      <div><b>{t.num(entries.length)}</b><span>{t.indexed}</span></div>
      <div><b>{locale === "hindi-india" ? t.num(entries.filter((entry) => entry.former).length) : isPartialScriptLocale ? attestedScriptCount : locale === "brazil" ? brazilLocalizedCount : locale === "indonesia" ? "2001" : "ANIME"}</b><span>{locale === "hindi-india" ? t.hindiFormer : isPartialScriptLocale ? t.attested : locale === "brazil" ? t.brazilLocalized : locale === "indonesia" ? t.indonesiaLayer : t.dubIncluded}</span></div>
      <p>{t.statusNote}</p>
    </div>
    <div className={`dex-controls ${locale === "hindi-india" ? "has-history-filter" : ""}`}><label><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => { setQuery(event.target.value); setLimit(PAGE_SIZE); }} placeholder={t.placeholder(metadata.localeName)} aria-label={t.search(metadata.localeName)} /></label>{hasScriptFilter && <button className={scriptOnly ? "active" : ""} type="button" aria-pressed={scriptOnly} onClick={() => { setScriptOnly((current) => !current); setExpanded(null); setLimit(PAGE_SIZE); }}>{t.confirmedOnly(t.num(confirmedScriptCount))}</button>}{locale === "hindi-india" && <button className={changedOnly ? "active" : ""} type="button" aria-pressed={changedOnly} onClick={() => { setChangedOnly((current) => !current); setExpanded(null); setLimit(PAGE_SIZE); }}>{t.changed(t.num(changedRecordCount))}</button>}<span>{t.showing(visible.length, matches.length)}</span></div>
    <div className="dex-table" role="table" aria-label={t.table(metadata.localeName)}>
      <div className="dex-row dex-header" role="row"><span>{t.spriteNo}</span><span>{t.english}</span><span>{metadata.currentLabel}</span><span>{t.mediumFormer}</span><span /></div>
      {visible.map((entry) => {
        const isOpen = expanded === entry.id;
        return <div className={`dex-record ${isOpen ? "open" : ""}`} key={entry.id}>
          <button className="dex-row" role="row" onClick={() => setExpanded(isOpen ? null : entry.id)} aria-expanded={isOpen}>
            <span className="dex-sprite"><img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${entry.id}.png`} alt="" loading="lazy" /><b>#{String(entry.id).padStart(4, "0")}</b></span>
            <span className="dex-english">{entry.english}</span>
            <span className="dex-current"><b>{entry.current}</b><small>{entry.reading} · {metadata.readingLabel}</small></span>
            <span className="dex-history-summary">{entry.former ? <><b>{entry.former}</b><small>{t.formerSummary(entry.formerReading)}</small></> : <><i>{entry.medium}</i><small>{t.firstYear(entry.recordYear)}</small></>}</span>
            <span className="dex-expand" aria-hidden="true">{isOpen ? "−" : "+"}</span>
          </button>
          {isOpen && <div className="dex-detail">
            <div><span>{metadata.currentLabel}</span><b>{entry.current}</b><p>{entry.reading}</p><small>{t.documentedUse(entry.medium, entry.recordYear)}</small>{entry.recordSource && <a className="dex-record-source" href={entry.recordSource} target="_blank" rel="noreferrer">{t.openSource}</a>}</div>
            {entry.former ? <div><span>{t.formerRecord}</span><b>{entry.former}</b><p>{entry.formerReading}</p><small>{t.formerNote(entry.formerRomanization)}</small></div> : <div className="dex-empty-history"><span>{t.translationNote}</span><p>{locale === "thailand" ? t.thaiNote : locale === "russia" ? t.russianNote : locale === "indonesia" ? t.indonesianNote : locale === "brazil" ? entry.current === entry.english ? t.brazilRetainedNote : t.brazilDistinctNote : entry.attestedScript ? t.attestedNote : t.unattestedNote}</p></div>}
            <NameEtymology id={entry.id} name={entry.english} items={[{ label: t.sourceOrigin(entry.current), field: metadata.originField, year: entry.recordYear }]} />
          </div>}
        </div>;
      })}
      {!visible.length && <div className="dex-no-results">{t.noResults(query)}</div>}
    </div>
    {visible.length < matches.length && <div className="dex-load-more"><button onClick={() => setLimit((current) => current + PAGE_SIZE)}>{t.loadMore(Math.min(PAGE_SIZE, matches.length - visible.length))}</button><button className="text-load" onClick={() => setLimit(matches.length)}>{t.showAll(matches.length)}</button></div>}
    <div className="dex-citation"><span>{t.method}</span><p>{t.citation}</p><a href={metadata.source} target="_blank" rel="noreferrer">{metadata.sourceLabel} ↗</a></div>
  </section>;
}

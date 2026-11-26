"use client";

import Image from "next/image";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { DonateButton } from "../components/DonateButton";
import { LanguageToggle } from "../components/LanguageToggle";

type Locale = {
  id: string;
  slug: string;
  flag: string;
  place: string;
  local: string;
  languages: string;
  note: string;
  years: string;
  coreGame: string;
  coreYear: number | null;
  animeYear: number | null;
};

const heroBallVariants = [
  { className: "classic", symbol: "A" },
  { className: "great-ball", symbol: "字" },
  { className: "ultra-ball", symbol: "あ" },
  { className: "premier-ball", symbol: "Д" },
  { className: "dusk-ball", symbol: "अ" },
  { className: "heal-ball", symbol: "ก" },
  { className: "luxury-ball", symbol: "한" },
];

const locales: Locale[] = [
  { id: "jp", slug: "japan", flag: "JP", place: "Japón", local: "日本", languages: "Japonés", note: "El sistema de nombres de origen: kana, juegos de palabras, romanización y el mundo de 1996 del que parte cada edición regional posterior.", years: "1996—hoy", coreGame: "27 feb 1996 · Rojo / Verde", coreYear: 1996, animeYear: 1997 },
  { id: "us", slug: "united-states", flag: "US", place: "Estados Unidos", local: "United States", languages: "Inglés (EE. UU.)", note: "La primera reinvención internacional—y el vocabulario inglés que se convirtió en la base de mercados posteriores.", years: "1998—hoy", coreGame: "28 sep 1998 · Rojo / Azul", coreYear: 1998, animeYear: 1998 },
  { id: "de", slug: "germany", flag: "DE", place: "Alemania", local: "Deutschland", languages: "Alemán", note: "Un denso vocabulario de palabras compuestas, juegos de palabras y pistas sobre las criaturas, pensado para jugadores germanohablantes.", years: "1999—hoy", coreGame: "05 oct 1999 · Rot / Blau", coreYear: 1999, animeYear: 1999 },
  { id: "it", slug: "italy", flag: "IT", place: "Italia", local: "Italia", languages: "Italiano", note: "Grafías inglesas para las especies, pronunciación italiana y un pequeño grupo de reveladoras excepciones traducidas.", years: "1999—hoy", coreGame: "05 oct 1999 · Rosso / Blu", coreYear: 1999, animeYear: 2000 },
  { id: "es", slug: "spain", flag: "ES", place: "España", local: "España", languages: "Español (España)", note: "La tradición de los juegos en español de España: diálogos y terminología localizados junto a nombres de especie mayormente compartidos.", years: "1999—hoy", coreGame: "05 oct 1999 · Rojo / Azul", coreYear: 1999, animeYear: 1999 },
  { id: "fr", slug: "france", flag: "FR", place: "Francia", local: "France", languages: "Francés", note: "Uno de los sistemas de nombres más ingeniosos, construido sobre juegos de palabras más que sobre la simple transliteración.", years: "1999—hoy", coreGame: "08 oct 1999 · Rouge / Bleu", coreYear: 1999, animeYear: 1999 },
  { id: "kr", slug: "south-korea", flag: "KR", place: "Corea del Sur", local: "대한민국", languages: "Coreano", note: "Una historia de localización marcada por la política cultural, la televisión y una empresa regional dedicada.", years: "1998—hoy", coreGame: "24 abr 2002 · Oro / Plata", coreYear: 2002, animeYear: 1999 },
  { id: "hk", slug: "hong-kong", flag: "HK", place: "Hong Kong", local: "香港", languages: "Cantonés · chino tradicional", note: "Una tradición de nombres en cantonés, una unificación en 2016 y una historia que no puede reducirse solo a la escritura.", years: "1998—hoy", coreGame: "18 nov 2016 · Sol / Luna", coreYear: 2016, animeYear: 1998 },
  { id: "tw", slug: "taiwan", flag: "TW", place: "Taiwán", local: "台灣", languages: "Mandarín · chino tradicional", note: "Décadas de historia propia de Taiwán en anime y publicaciones se encuentran con una localización coordinada de los juegos en chino.", years: "1998—hoy", coreGame: "18 nov 2016 · Sol / Luna", coreYear: 2016, animeYear: 1998 },
  { id: "cn", slug: "mainland-china", flag: "CN", place: "China continental", local: "中国大陆", languages: "Mandarín · chino simplificado", note: "El registro continental de la entrada oficial, la terminología en escritura simplificada, los juegos, las cartas y los medios.", years: "Años 2000—hoy", coreGame: "18 nov 2016 · Sol / Luna", coreYear: 2016, animeYear: 1998 },
  { id: "la", slug: "latin-america", flag: "LAT", place: "América Latina", local: "América Latina", languages: "Español (Latinoamérica)", note: "Un vocabulario de doblaje regional desde 1999—y su primera edición en español seleccionable de un juego principal en Leyendas: Z-A.", years: "1999—hoy", coreGame: "16 oct 2025 · Leyendas: Z-A", coreYear: 2025, animeYear: 1999 },
  { id: "br", slug: "brazil", flag: "BR", place: "Brasil", local: "Brasil", languages: "Portugués de Brasil", note: "Una larga cultura del doblaje junto a juegos que históricamente llegaron sin soporte en portugués.", years: "1999—hoy", coreGame: "Anunciado para 2027 · Winds / Waves", coreYear: 2027, animeYear: 1999 },
  { id: "ph", slug: "philippines", flag: "PH", place: "Filipinas", local: "Pilipinas", languages: "Filipino · inglés filipino", note: "Tradiciones televisivas paralelas en inglés y filipino, construidas en torno a los nombres de especie internacionales.", years: "1999—hoy", coreGame: "Sin juego principal en filipino", coreYear: null, animeYear: 1999 },
  { id: "pt", slug: "portugal", flag: "PT", place: "Portugal", local: "Portugal", languages: "Portugués europeo", note: "Juegos en inglés rodeados de envases, manuales, diálogos televisivos, canciones y títulos en portugués.", years: "1999—hoy", coreGame: "Sin juego principal en portugués europeo", coreYear: null, animeYear: 1999 },
  { id: "tr", slug: "turkey", flag: "TR", place: "Turquía", local: "Türkiye", languages: "Turco", note: "Un debut televisivo en 2000, una interrupción polémica y un posterior regreso digital oficial en turco.", years: "2000—hoy", coreGame: "Sin juego principal en turco", coreYear: null, animeYear: 2000 },
  { id: "il", slug: "israel", flag: "IL", place: "Israel", local: "ישראל", languages: "Hebreo", note: "Identidades de especie en inglés escritas en hebreo de derecha a izquierda, con un largo paréntesis y el regreso a la televisión en 2016.", years: "2000—hoy", coreGame: "Sin juego principal en hebreo", coreYear: null, animeYear: 2000 },
  { id: "ar", slug: "arab-world", flag: "AR", place: "Mundo árabe", local: "العالم العربي", languages: "Árabe", note: "Un doblaje panregional moldeado por estudios sirios y libaneses, material fuente en inglés, interrupciones y un renacimiento.", years: "2000—hoy", coreGame: "Sin juego principal en árabe", coreYear: null, animeYear: 2000 },
  { id: "my", slug: "malaysia", flag: "MY", place: "Malasia", local: "Malaysia", languages: "Malayo · inglés", note: "Una historia mediática multilingüe cuyo doblaje al malayo alternó entre las ediciones fuente japonesa e inglesa.", years: "2000—hoy", coreGame: "Sin juego principal en malayo", coreYear: null, animeYear: 2000 },
  { id: "ru", slug: "russia", flag: "RU", place: "Rusia", local: "Россия", languages: "Ruso", note: "Un doblaje construido a partir de la adaptación inglesa, con nombres de especie conservados y una presentación cada vez más localizada.", years: "2000—hoy", coreGame: "Sin juego principal en ruso", coreYear: null, animeYear: 2000 },
  { id: "id", slug: "indonesia", flag: "ID", place: "Indonesia", local: "Indonesia", languages: "Indonesio · Bahasa Indonesia", note: "Un mercado con el anime primero y de escala móvil, con publicaciones web, apps, cartas, eventos y doblajes en indonesio.", years: "2001—hoy", coreGame: "Sin juego principal en indonesio", coreYear: null, animeYear: 2001 },
  { id: "th", slug: "thailand", flag: "TH", place: "Tailandia", local: "ประเทศไทย", languages: "Tailandés", note: "Nombres de raíz japonesa en escritura tailandesa, desde la emisión televisiva hasta una Pokédex regional oficial y un canal propio.", years: "2001—hoy", coreGame: "Sin juego principal en tailandés", coreYear: null, animeYear: 2001 },
  { id: "vn", slug: "vietnam", flag: "VN", place: "Vietnam", local: "Việt Nam", languages: "Vietnamita", note: "Nombres de especie de raíz japonesa, medios en vietnamita y el estándar de nombres en inglés anunciado en mayo de 2026.", years: "2002—hoy", coreGame: "Sin juego principal en vietnamita", coreYear: null, animeYear: 2002 },
  { id: "hi", slug: "hindi-india", flag: "HI", place: "Hindi en la India", local: "हिन्दी", languages: "Hindi", note: "Del debut televisivo de 2003 a la distribución oficial en YouTube y un documentado cambio de rumbo en la política de nombres de especie.", years: "2003—hoy", coreGame: "Sin juego principal en hindi", coreYear: null, animeYear: 2003 },
  { id: "ta", slug: "tamil-india", flag: "TA", place: "Tamil en la India", local: "தமிழ்", languages: "Tamil", note: "Una tradición de doblaje regional que después recibió su propio canal oficial de Pokémon y un archivo digital semanal.", years: "2004—hoy", coreGame: "Sin juego principal en tamil", coreYear: null, animeYear: 2004 },
  { id: "te", slug: "telugu-india", flag: "TE", place: "Telugu en la India", local: "తెలుగు", languages: "Telugu", note: "Una historia televisiva regional que hoy continúa a través de un canal digital oficial en su propio idioma.", years: "2004—hoy", coreGame: "Sin juego principal en telugu", coreYear: null, animeYear: 2004 },
  { id: "in", slug: "india", flag: "IN", place: "India: panorama", local: "भारत", languages: "Hindi · tamil · telugu · bengalí +", note: "El panorama general de un mercado multilingüe que conecta los capítulos de cada idioma y su historia de distribución compartida.", years: "2003—hoy", coreGame: "Sin juego principal en idiomas regionales", coreYear: null, animeYear: 2003 },
  { id: "alt", slug: "unofficial", flag: "ALT", place: "Colección de contexto", local: "Ediciones no oficiales", languages: "Traducciones de fans · copias piratas · ROM hacks", note: "Un índice cuidadosamente documentado de las rutas no oficiales que llenaron vacíos lingüísticos—y de las regiones a las que pertenecen esas historias.", years: "Años 90—hoy", coreGame: "Índice de contexto · fuera de la cronología oficial", coreYear: null, animeYear: null },
];

const curatedLocaleOrder = new Map(locales.map((locale, index) => [locale.id, index]));
const featuredLocales = locales.filter((locale) => locale.id !== "alt");
const indiaLanguageIds = new Set(["hi", "ta", "te"]);

function localDateKey() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

function subscribeToCalendarDay(onChange: () => void) {
  const timer = window.setInterval(onChange, 60_000);
  return () => window.clearInterval(timer);
}

function featuredLocaleFor(dateKey: string) {
  if (dateKey === "server") return featuredLocales[0];
  const [year, month, day] = dateKey.split("-").map(Number);
  const dayNumber = Math.floor(Date.UTC(year, month - 1, day) / 86_400_000);
  return featuredLocales[((dayNumber % featuredLocales.length) + featuredLocales.length) % featuredLocales.length];
}

function compareLocales(a: Locale, b: Locale, basis: "games" | "anime") {
  if (a.id === "alt") return b.id === "alt" ? 0 : 1;
  if (b.id === "alt") return -1;

  if (a.id === "in" && indiaLanguageIds.has(b.id)) return -1;
  if (b.id === "in" && indiaLanguageIds.has(a.id)) return 1;

  if (basis === "anime") {
    return (a.animeYear ?? Number.POSITIVE_INFINITY) - (b.animeYear ?? Number.POSITIVE_INFINITY)
      || (curatedLocaleOrder.get(a.id)! - curatedLocaleOrder.get(b.id)!);
  }

  const aHasCoreGame = a.coreYear !== null;
  const bHasCoreGame = b.coreYear !== null;
  if (aHasCoreGame !== bHasCoreGame) return aHasCoreGame ? -1 : 1;
  if (aHasCoreGame && bHasCoreGame) {
    return a.coreYear! - b.coreYear!
      || (curatedLocaleOrder.get(a.id)! - curatedLocaleOrder.get(b.id)!);
  }

  return (a.animeYear ?? Number.POSITIVE_INFINITY) - (b.animeYear ?? Number.POSITIVE_INFINITY)
    || (curatedLocaleOrder.get(a.id)! - curatedLocaleOrder.get(b.id)!);
}

const coreLanguageTimeline = [
  { year: 1996, entries: [{ label: "Japonés", place: "Japón", href: "/locales/japan", detail: "Pocket Monsters Rojo / Verde" }] },
  { year: 1998, entries: [{ label: "Inglés", place: "Estados Unidos", href: "/locales/united-states", detail: "Pokémon Rojo / Azul" }] },
  { year: 1999, entries: [
    { label: "Alemán", place: "Alemania", href: "/locales/germany", detail: "Pokémon Rojo / Azul" },
    { label: "Italiano", place: "Italia", href: "/locales/italy", detail: "Pokémon Rojo / Azul" },
    { label: "Francés", place: "Francia", href: "/locales/france", detail: "Pokémon Rojo / Azul" },
    { label: "Español de España", place: "España", href: "/locales/spain", detail: "Pokémon Rojo / Azul" },
  ] },
  { year: 2002, entries: [{ label: "Coreano", place: "Corea del Sur", href: "/locales/south-korea", detail: "Pokémon Oro / Plata" }] },
  { year: 2016, entries: [
    { label: "Chino tradicional", place: "Hong Kong", href: "/locales/hong-kong", detail: "Pokémon Sol / Luna" },
    { label: "Chino tradicional", place: "Taiwán", href: "/locales/taiwan", detail: "Pokémon Sol / Luna" },
    { label: "Chino simplificado", place: "China continental", href: "/locales/mainland-china", detail: "Pokémon Sol / Luna" },
  ] },
  { year: 2025, entries: [{ label: "Español latinoamericano", place: "América Latina", href: "/locales/latin-america", detail: "Leyendas Pokémon: Z-A" }] },
  { year: 2027, entries: [{ label: "Portugués de Brasil", place: "Brasil · anunciado", href: "/locales/future", detail: "Pokémon Winds / Waves", future: true }] },
];

const animeLocalizationTimeline = [
  { year: 1997, entries: [{ label: "Original japonés", place: "Japón", href: "/locales/japan", detail: "Emisión televisiva original · 1 abr" }] },
  { year: 1998, entries: [
    { label: "Doblaje en inglés", place: "Estados Unidos", href: "/locales/united-states", detail: "Primera emisión · 7 sep" },
    { label: "Doblaje en cantonés", place: "Hong Kong", href: "/locales/hong-kong", detail: "Primera emisión · 16 nov" },
    { label: "Doblaje en mandarín", place: "Taiwán", href: "/locales/taiwan", detail: "Primera emisión · 28 nov" },
    { label: "Doblaje en mandarín", place: "China continental", href: "/locales/mainland-china", detail: "Primera emisión · 24 dic" },
  ] },
  { year: 1999, entries: [
    { label: "Español latinoamericano", place: "América Latina", href: "/locales/latin-america", detail: "Primera emisión regional · 26 abr" },
    { label: "Portugués de Brasil", place: "Brasil", href: "/locales/brazil", detail: "Primera emisión · 10 may" },
    { label: "Doblaje en coreano", place: "Corea del Sur", href: "/locales/south-korea", detail: "Primera emisión · 14 jul" },
    { label: "Doblaje en alemán", place: "Alemania", href: "/locales/germany", detail: "Primera emisión · 1 sep" },
    { label: "Doblaje en francés", place: "Francia", href: "/locales/france", detail: "Primera emisión · 5 sep" },
    { label: "Inglés filipino", place: "Filipinas", href: "/locales/philippines", detail: "Primera emisión · 1 oct" },
    { label: "Portugués europeo", place: "Portugal", href: "/locales/portugal", detail: "Primera emisión · 2 oct" },
    { label: "Español de España", place: "España", href: "/locales/spain", detail: "Primera emisión · 20 dic" },
  ] },
  { year: 2000, entries: [
    { label: "Doblaje en italiano", place: "Italia", href: "/locales/italy", detail: "Primera emisión · 10 ene" },
    { label: "Doblaje en turco", place: "Turquía", href: "/locales/turkey", detail: "Primera emisión · 31 ene" },
    { label: "Doblaje en hebreo", place: "Israel", href: "/locales/israel", detail: "Primer periodo documentado · inicios de 2000" },
    { label: "Doblaje en árabe", place: "Mundo árabe", href: "/locales/arab-world", detail: "Primera emisión en MBC · día exacto sin confirmar" },
    { label: "Malayo / inglés", place: "Malasia", href: "/locales/malaysia", detail: "Primera emisión · 25 nov" },
    { label: "Doblaje en ruso", place: "Rusia", href: "/locales/russia", detail: "Primera emisión · 18 dic" },
  ] },
  { year: 2001, entries: [
    { label: "Doblaje en indonesio", place: "Indonesia", href: "/locales/indonesia", detail: "Primera emisión · 3 mar" },
    { label: "Doblaje en tailandés", place: "Tailandia", href: "/locales/thailand", detail: "Primera emisión · 24 mar" },
  ] },
  { year: 2002, entries: [{ label: "Locución en vietnamita", place: "Vietnam", href: "/locales/vietnam", detail: "Primera emisión documentada" }] },
  { year: 2003, entries: [{ label: "Doblaje en hindi", place: "India", href: "/locales/hindi-india", detail: "Primera emisión · 12 may" }] },
  { year: 2004, entries: [
    { label: "Doblaje en tamil", place: "India", href: "/locales/tamil-india", detail: "Primer doblaje regional documentado" },
    { label: "Doblaje en telugu", place: "India", href: "/locales/telugu-india", detail: "Primer doblaje regional documentado" },
  ] },
];

const animeMarkerBySlug = Object.fromEntries(animeLocalizationTimeline.flatMap((group) => group.entries.map((entry) => [entry.href.replace("/locales/", ""), `${group.year} · ${entry.detail}`])));

const localeMedia: Record<string, { src: string; alt: string; kind: string }> = {
  jp: { src: "/exhibits/red-green.jpg", alt: "Cajas japonesas de Game Boy de Pokémon Rojo y Verde", kind: "Juego principal · 1996" },
  us: { src: "/exhibits/red-blue.jpg", alt: "Cajas de Game Boy de Pokémon Rojo y Azul", kind: "Juego principal · 1998" },
  de: { src: "/exhibits/german-red-blue.jpg", alt: "Cajas alemanas de Game Boy de Pokémon Rote y Blaue Edition", kind: "Juegos principales en alemán · 1999" },
  it: { src: "/exhibits/italian-blue.webp", alt: "Caja italiana de Game Boy de Pokémon Versione Blu", kind: "Juego principal en italiano · 1999" },
  fr: { src: "/exhibits/french-blue.jpg", alt: "Caja francesa de Game Boy de Pokémon Version Bleue", kind: "Juego principal en francés · 1999" },
  kr: { src: "/exhibits/gold-silver-korea.jpg", alt: "Cajas coreanas de Game Boy Color de Pokémon Oro y Plata", kind: "Juego principal en coreano · 2002" },
  es: { src: "/exhibits/spanish-red.jpg", alt: "Caja española de Game Boy de Pokémon Edición Roja", kind: "Juego principal en español · 1999" },
  hk: { src: "/exhibits/chinese-sun-moon-traditional.jpg", alt: "Cajas regionales de Pokémon Sol y Luna con títulos en chino tradicional", kind: "Primeros juegos principales en chino · 2016" },
  tw: { src: "/exhibits/chinese-sun-moon-traditional.jpg", alt: "Cajas taiwanesas de Pokémon Sol y Luna con títulos en chino tradicional", kind: "Juegos principales en chino tradicional · 2016" },
  cn: { src: "/exhibits/chinese-sun-moon-simplified.jpg", alt: "Ilustración oficial del lanzamiento de Pokémon Sol y Luna con títulos en chino simplificado", kind: "Arte de lanzamiento en chino simplificado · 2016" },
  la: { src: "/exhibits/legends-za-latam.jpg", alt: "Portada comercial latinoamericana de Leyendas Pokémon: Z-A", kind: "Primer juego principal en español latinoamericano · 2025" },
  br: { src: "/exhibits/brazil-horizons.jpg", alt: "Póster del anime Pokémon Horizontes en portugués de Brasil", kind: "Anime en portugués de Brasil" },
  ph: { src: "/exhibits/philippines-portal.png", alt: "Ilustración del portal oficial de Pokémon Filipinas", kind: "Portal oficial de Filipinas" },
  pt: { src: "/exhibits/portugal-horizons-logo.png", alt: "Logotipo de Pokémon Horizontes en portugués europeo", kind: "Título del anime en Portugal" },
  tr: { src: "/exhibits/anime-original.jpg", alt: "Ilustración de la serie animada de Pokémon que representa su debut en la televisión turca", kind: "Historia del anime en Turquía · 2000" },
  il: { src: "/exhibits/hebrew-pokemon-logo.png", alt: "Logotipo oficial del título de Pokémon en hebreo", kind: "Pieza del título en hebreo" },
  ar: { src: "/exhibits/arabic-pokemon-logo.png", alt: "Logotipo oficial del título de Pokémon en árabe", kind: "Pieza del título en árabe" },
  my: { src: "/exhibits/malaysia-portal.png", alt: "Ilustración del portal oficial de Pokémon Malasia", kind: "Portal oficial de Malasia" },
  ru: { src: "/exhibits/anime-original.jpg", alt: "Ilustración de la serie animada de Pokémon que representa su debut en la televisión rusa", kind: "Historia del anime en Rusia · 2000" },
  id: { src: "/exhibits/indonesia-pokemon-go.png", alt: "Arte promocional de Pokémon GO del portal oficial de apps de Pokémon en Indonesia", kind: "Ecosistema móvil indonesio" },
  th: { src: "/exhibits/thai-horizons.jpg", alt: "Ilustración oficial de un episodio de Pokémon Horizontes en tailandés", kind: "Archivo oficial del anime en tailandés" },
  vn: { src: "/exhibits/vietnam-horizons.jpg", alt: "Póster del anime Pokémon Chân Trời Mới en vietnamita", kind: "Anime en vietnamita" },
  hi: { src: "/exhibits/india-horizons.jpg", alt: "Póster de Pokémon Horizontes en la India que representa la edición oficial en hindi", kind: "Archivo del anime en hindi" },
  ta: { src: "/exhibits/india-horizons.jpg", alt: "Póster de Pokémon Horizontes en la India que representa la edición oficial en tamil", kind: "Archivo del anime en tamil" },
  te: { src: "/exhibits/india-horizons.jpg", alt: "Póster de Pokémon Horizontes en la India que representa la edición oficial en telugu", kind: "Archivo del anime en telugu" },
  in: { src: "/exhibits/india-horizons.jpg", alt: "Póster de Pokémon Horizontes de Hungama para la India", kind: "Emisión del anime en la India" },
};

function timelineMediaFor(href: string) {
  if (href === "/locales/future") return { src: "/exhibits/winds-waves.jpg", alt: "Ilustración del anuncio de Pokémon Winds y Waves", kind: "Juegos principales anunciados · 2027" };
  const slug = href.replace("/locales/", "");
  const locale = locales.find((item) => item.slug === slug);
  return locale ? localeMedia[locale.id] : undefined;
}

export default function Home() {
  const [heroBallIndex, setHeroBallIndex] = useState(0);
  useEffect(() => {
    const cycle = window.setInterval(() => setHeroBallIndex((index) => (index + 1) % heroBallVariants.length), 12000);
    return () => window.clearInterval(cycle);
  }, []);
  const heroBall = heroBallVariants[heroBallIndex];
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [timelineMode, setTimelineMode] = useState<"games" | "anime">("games");
  const [localeSort, setLocaleSort] = useState<"games" | "anime">("games");
  const calendarDay = useSyncExternalStore(subscribeToCalendarDay, localDateKey, () => "server");
  const featuredLocale = featuredLocaleFor(calendarDay);
  const featuredDate = calendarDay === "server" ? "Rotación diaria" : new Intl.DateTimeFormat("es-ES", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(`${calendarDay}T12:00:00`));
  const featuredAnimeMarker = animeMarkerBySlug[featuredLocale.slug];

  const visibleLocales = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = !q ? locales : locales.filter((locale) =>
      [locale.place, locale.local, locale.languages, locale.note, locale.coreGame].join(" ").toLowerCase().includes(q),
    );
    return [...filtered].sort((a, b) => compareLocales(a, b, localeSort));
  }, [localeSort, query]);

  const activeTimeline = timelineMode === "games" ? coreLanguageTimeline : animeLocalizationTimeline;

  return (
    <main>
      <nav className="nav" aria-label="Navegación principal">
        <a className="brand" href="#top" aria-label="Inicio de Pokélingua">
          <span className="brand-mark" aria-hidden="true"><i /></span>
          <span>Pokélingua</span>
        </a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Abrir o cerrar el menú">Menú</button>
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <a href="/about">Sobre la exposición</a>
          <a href="#locales">Regiones</a>
          <a href="/map">Mapa mundial</a>
          <a href="/name-routes">Rutas de nombres</a>
          <a href="/history">Historia</a>
          <a href="#featured-locale">Región del día</a>
        </div>
        <a className="nav-cta" href="#locales">Explora el atlas <span>↗</span></a>
        <DonateButton /><LanguageToggle />
      </nav>

      <section className="hero-poster" id="top" aria-labelledby="hero-title">
        <h1 className="visually-hidden" id="hero-title">Pokélingua — Un mundo. Muchos Pokémon.</h1>
        <div className="hero-poster-art">
          <Image
            className="hero-poster-image"
            src="/og.png"
            alt="Un globo terráqueo rodeado de rótulos en japonés, español, francés, coreano, chino, alemán, tailandés, italiano, portugués, árabe y ruso."
            width={1731}
            height={909}
            priority
            sizes="100vw"
          />
          <div className="hero-morph" aria-hidden="true">
            <div className="hero-morph-object"><div className={`hero-pokeball ${heroBall.className}`}><i /><em>{heroBall.symbol}</em><b /></div></div>
          </div>
        </div>
        <div className="hero-poster-bar hero-introduction-link"><a href="/about">Entra en Sobre la exposición para descubrir cómo Pokémon se convirtió en un caso de estudio de la globalización cultural a través de nombres, idiomas, juegos, animación y tiempo. <span>→</span></a></div>
      </section>

      <section className="intro-section" id="locales">
        <div className="section-kicker">01 / El atlas de regiones</div>
        <div className="intro-grid">
          <h2>El idioma es solo<br />el comienzo.</h2>
          <div>
            <p>Una edición regional es más que una traducción. Es el encuentro particular de idioma, territorio, emisora, distribuidora, política y época.</p>
            <p>Cada capítulo sigue esas decisiones—y conserva las versiones que vinieron antes.</p>
            <p className="locale-order-note"><b>Elige la cronología:</b> ordena la cuadrícula por el primer juego localizado de la serie principal o por el primer doblaje oficial del anime. En la vista de juegos, las regiones sin un juego principal en su idioma siguen el orden del doblaje del anime. La colección de contexto no oficial siempre cierra la cuadrícula.</p>
          </div>
        </div>
        <div className={`locale-timeline mode-${timelineMode}`} aria-label={`Cronología de ${timelineMode === "games" ? "idiomas en juegos principales" : "localizaciones oficiales del anime"}`}>
          <div className="locale-timeline-toolbar">
            <div className="locale-timeline-head"><span>{timelineMode === "games" ? "1996" : "1997"}</span><b>{timelineMode === "games" ? "Primer idioma jugable" : "Primera localización oficial del anime"}</b><span>{timelineMode === "games" ? "2027+" : "2003+"}</span></div>
            <label className="timeline-mode-control"><span>Base de la cronología</span><select value={timelineMode} onChange={(event) => setTimelineMode(event.target.value as "games" | "anime")}><option value="games">Juegos de la serie principal</option><option value="anime">Doblajes oficiales del anime</option></select></label>
          </div>
          <div className="locale-timeline-track">
            {activeTimeline.map((group) => <div className="locale-timeline-year" key={`${timelineMode}-${group.year}`}><div className="timeline-node-cluster">{group.entries.map((item) => { const media = timelineMode === "games" ? timelineMediaFor(item.href) : undefined; return <a href={item.href} className={`locale-timeline-node ${"future" in item && item.future ? "future" : ""}`} key={`${group.year}-${item.place}-${item.label}`} aria-label={`${group.year}: ${item.label}, ${item.place}`}><i /><span>{media && <img src={media.src} alt={media.alt} loading="lazy" />}<b>{item.label}</b><small>{item.place}<br />{item.detail}</small></span></a>; })}</div><time>{group.year}</time></div>)}
          </div>
          <p>{timelineMode === "games" ? "Cada nodo marca la primera vez que ese idioma pudo seleccionarse en un nuevo juego de la serie principal de Pokémon. Las regiones que debutan el mismo año comparten un punto agrupado; el soporte futuro anunciado se distingue visualmente." : "Cada nodo marca la emisión televisiva oficial localizada más antigua documentada en esta exposición. Esta vista conserva historias de doblaje y nombres regionales consolidados que comenzaron fuera de los juegos."}</p>
        </div>
        <div className="locale-grid-tools">
          <label className="search-box">
            <span>⌕</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Busca un lugar, idioma o escritura…" aria-label="Buscar regiones" />
            <kbd>{visibleLocales.length} regiones</kbd>
          </label>
          <label className="locale-sort-control"><span>Ordenar regiones por</span><select value={localeSort} onChange={(event) => setLocaleSort(event.target.value as "games" | "anime")}><option value="games">Primer idioma en juego principal</option><option value="anime">Primer doblaje oficial del anime</option></select><small>Las regiones sin este hito aparecen al final.</small></label>
        </div>
        <div className="locale-grid">
          {visibleLocales.map((locale, index) => (
            <a className="locale-card" href={`/locales/${locale.slug}`} key={locale.id} style={{ "--delay": `${index * 45}ms` } as React.CSSProperties}>
              <div className="locale-top"><span className="flag">{locale.flag}</span></div>
              {localeMedia[locale.id] && <figure className={`locale-card-media media-${locale.id}`}><img src={localeMedia[locale.id].src} alt={localeMedia[locale.id].alt} loading="lazy" /><figcaption>{localeMedia[locale.id].kind}</figcaption></figure>}
              <div className="locale-place">{locale.place}</div>
              <h3 className="locale-local">{locale.local}</h3>
              <div className="locale-language">{locale.languages}</div>
              <div className="locale-game-release"><span>{localeSort === "games" ? "Hito de la serie principal" : "Hito del anime"}</span><b>{localeSort === "games" ? locale.coreGame : animeMarkerBySlug[locale.slug] ?? "Sin hito oficial del anime registrado"}</b></div>
              <p>{locale.note}</p>
              <div className="locale-bottom"><span>{locale.years}</span><span>Leer capítulo ↗</span></div>
            </a>
          ))}
        </div>
        {visibleLocales.length === 0 && <div className="empty">Esa región no está en esta primera selección de investigación—por ahora.</div>}
      </section>

      <section className="story-section" id="featured-locale" aria-live="polite">
        <div className="story-aside">
          <div className="section-kicker light">Región del día / {featuredDate}</div>
          <div className="hangul featured-script" aria-hidden="true">{featuredLocale.local}</div>
          <div className="story-index">{featuredLocale.flag}<br />{featuredLocale.coreYear ? `JUEGO ${featuredLocale.coreYear}` : "ANIME PRIMERO"}<br />CAMBIA CADA DÍA</div>
        </div>
        <article className="story-body">
          <div className="story-label"><span>{featuredLocale.local}</span> {featuredLocale.place}</div>
          <h2>Parada de hoy:<br /><em>{featuredLocale.place}.</em></h2>
          <p className="story-lede">{featuredLocale.note}</p>
          <div className="story-columns">
            <p><b>Hito del juego principal.</b> {featuredLocale.coreGame}. Registra el primer idioma seleccionable de la serie principal, cuando existe; las regiones con el anime primero siguen formando parte del atlas aunque no tengan una edición traducida de un juego principal.</p>
            <p><b>Hito mediático.</b> {featuredAnimeMarker ?? "Aún no hay registrado un hito oficial del estreno del anime."} El capítulo completo sigue los nombres, las escrituras, las emisiones, los lanzamientos y las pruebas que sustentan la cronología de esta región.</p>
          </div>
          <div className="fact-strip">
            <div><b>{featuredLocale.coreYear ?? "—"}</b><span>{featuredLocale.coreYear ? "Primer idioma seleccionable en un juego principal" : "Sin juego principal en su idioma"}</span></div>
            <div><b>{featuredLocale.animeYear ?? "—"}</b><span>{featuredLocale.animeYear ? "Primer hito registrado de anime / emisión" : "Hito del anime no registrado"}</span></div>
            <div><b>{featuredLocale.flag}</b><span>{featuredLocale.languages} · {featuredLocale.years}</span></div>
          </div>
          <div className="source-row">
            <span>Rotación diaria de la exposición</span>
            <a href={`/locales/${featuredLocale.slug}`}>Abre el rastro documental de este capítulo ↗</a>
          </div>
          <a className="chapter-link" href={`/locales/${featuredLocale.slug}`}>Entra en el capítulo completo: {featuredLocale.place} <span>→</span></a>
        </article>
      </section>

      <section className="notes-section" id="locale-notes">
        <div className="section-kicker">03 / Cuando un idioma no es una sola región</div>
        <div className="notes-head">
          <h2>Las notas al pie son<br /><em>parte de la historia.</em></h2>
          <p>Las escrituras, los idiomas hablados, los mercados y las etiquetas oficiales no siempre coinciden. Pokélingua señala la diferencia justo cuando importa.</p>
        </div>

        <article className="case-study chinese-case">
          <div className="case-meta"><span>Nota de caso 001</span><b>Localización al chino</b><small>Hong Kong · Taiwán · China continental</small></div>
          <div className="case-content">
            <div className="timestamp"><span>26</span><b>FEB<br />2016</b><small>23:00 HKT<br />franja del anuncio</small></div>
            <div className="case-copy">
              <h3>Dos escrituras no significan dos idiomas hablados.</h3>
              <p>Pokémon Sol y Luna introdujeron texto tanto en chino simplificado como en chino tradicional. Pero los nombres cantoneses consolidados de Hong Kong no encajaban con facilidad en un estándar escrito unificado, pensado también para los mercados de habla mandarín.</p>
              <div className="name-compare">
                <div><span>Hong Kong, cantonés consolidado</span><b>比卡超</b><small>bei-kaa-chiu</small></div>
                <div className="change-arrow">→</div>
                <div><span>Caracteres chinos unificados</span><b>皮卡丘</b><small>pí-kǎ-qiū en mandarín<br />pei-kaa-jau en cantonés</small></div>
              </div>
              <aside className="footnote"><sup>1</sup><p><b>El chino tradicional es un sistema de escritura—no un sinónimo de cantonés.</b> Los mismos caracteres pueden leerse de forma distinta según la variedad hablada. Por eso un nombre escrito elegido para el mandarín puede no sonar como “Pikachu” al leerse en cantonés.</p></aside>
            </div>
          </div>
          <div className="social-moment">
            <div className="social-icon">f</div>
            <div><span className="social-label">Un momento preservado / Reacción en Facebook</span><blockquote>“Pikachu es 比卡超, no 皮卡丘.”</blockquote><p>Una campaña reunió más de 6.000 firmas; los fans llenaron de objeciones la página de Facebook de Nintendo Hong Kong, y después llegó una protesta callejera el 31 de mayo de 2016.</p></div>
            <a href="https://kotaku.com/hong-kong-pokemon-fans-protest-pikachus-name-change-1779471301" target="_blank" rel="noreferrer">Ver la crónica de la época ↗</a>
          </div>
        </article>

        <article className="case-study iberia-case" id="spanish-localization">
          <div className="case-meta"><span>Nota de caso 002</span><b>Español y portugués</b><small>Europa · América Latina · Brasil</small></div>
          <div className="case-content">
            <div className="timestamp"><span>27</span><b>FEB<br />2025</b><small>confirmación oficial<br />español de Latinoamérica</small></div>
            <div className="case-copy">
              <h3>Una opción de idioma por fin se vuelve regional.</h3>
              <p>Durante años, el “español” de los juegos principales significó la localización hecha para España. Rojo y Azul en español se lanzaron allí en 1999 y establecieron un vocabulario peninsular para movimientos, objetos, personajes y diálogos. Esas ediciones se distribuyeron después o pudieron seleccionarse de forma más amplia, pero su registro seguía dirigiéndose a los jugadores de España.</p>
              <p>El público latinoamericano tenía otra tradición: una serie animada con doblaje regional desde 1999, basada por lo general en la adaptación televisiva en inglés, con voces y terminología propias. Así, un jugador podía crecer oyendo un vocabulario Pokémon en español en la televisión mientras encontraba el inglés—o, más tarde, el español de España—dentro de los juegos. Diferencias como <i>Placaje</i> frente a <i>Tacleada</i>, giros propios de cada región y palabras con significados distintos a cada lado del Atlántico hacían de “el español ya existe” una respuesta incompleta.</p>
              <p>Pokémon GO añadió el español latinoamericano en 2024; el Juego de Cartas Coleccionables latinoamericano lo siguió en marzo de 2025; y el español latinoamericano se convirtió en un idioma propio seleccionable en un juego principal con Leyendas Pokémon: Z-A el 16 de octubre de 2025. La distinción recoge dos historias de público consolidadas, no la pretensión de que alguna de las variedades represente a todos los hablantes de su región.</p>
              <div className="locale-split">
                <div><i>ES-EU</i><b>Español de España</b><span>Localización de juegos principales de larga trayectoria</span></div>
                <div><i>ES-LA</i><b>Español latinoamericano</b><span>Juegos principales desde Leyendas: Z-A</span></div>
                <div><i>PT-BR</i><b>Portugués de Brasil</b><span>Anunciado para Winds & Waves en 2027</span></div>
                <div><i>PT-PT</i><b>Portugués europeo</b><span>Sin juego principal anunciado</span></div>
              </div>
              <figure className="case-artifact"><img src="/exhibits/spanish-red.jpg" alt="Caja española de Game Boy de Pokémon Edición Roja" loading="lazy" /><figcaption>Pieza localizada de juego principal · debut en español de España · 1999</figcaption></figure>
              <aside className="footnote"><sup>2</sup><p><b>Las etiquetas de español y portugués dependen de cada producto.</b> Un doblaje de anime, un sitio web, un lanzamiento de cartas, un juego móvil y un juego principal pueden admitir cada uno un conjunto distinto de ediciones regionales en fechas diferentes. Pokélingua registra el medio junto a cada afirmación sobre idiomas.</p></aside>
            </div>
          </div>
          <div className="social-moment video-moment">
            <div className="social-icon">▶</div>
            <div><span className="social-label">Un momento preservado / YouTube · 16 mar 2024</span><blockquote>“Juegos de Pokémon en español latinoamericano después de 25 años.”</blockquote><p>La cobertura de la campaña del creador verificado N Deluxe superó las 21.000 visualizaciones y los 1.800 “me gusta”—y capturó el hito de la comunidad antes de la llegada del idioma a los juegos en 2025.</p></div>
            <a href="https://www.youtube.com/watch?v=8VU79bLuq3E" target="_blank" rel="noreferrer">Ver el momento archivado ↗</a>
          </div>
          <div className="social-moment professional-moment"><div className="social-icon">in</div><div><span className="social-label">Una decisión preservada / LinkedIn · 27 feb 2025</span><blockquote>“Los juegos principales y los spin-offs…tendrán subtítulos en español latino desde su lanzamiento.”</blockquote><p>Tomás Cortijo, director regional para América Latina de The Pokémon Company International, describió un equipo de localización con personas de toda la región y marcó públicamente la transición de la campaña a la política de producto.</p></div><a href="https://www.linkedin.com/posts/tomascortijo_pok%C3%A9mon-presents-2272025-activity-7301045323886415872-GPT1" target="_blank" rel="noreferrer">Ver la publicación del anuncio ↗</a></div>
        </article>
      </section>

      <a className="timeline-portal" href="/history"><span>Capítulo de historia</span><strong>Sigue las decisiones que hicieron global a Pokémon.</strong><p>Los juegos, las empresas, los doblajes del anime y las políticas de nombres de cada región tienen ahora su propia historia documentada con fuentes.</p><b>Abrir Historia →</b></a>
      <a className="timeline-portal name-routes-portal" href="/name-routes"><span>Capítulo comparativo</span><strong>Descubre qué fuente sigue cada sistema de nombres.</strong><p>El sonido japonés, los nombres de referencia en inglés, los juegos de palabras locales, los hanzi y los sistemas mixtos se convierten en un único mapa visual de rutas.</p><b>Abrir rutas de nombres →</b></a>

      <footer><a className="brand footer-brand" href="#top"><span className="brand-mark" aria-hidden="true"><i /></span><span>Pokélingua</span></a><p>Un atlas vivo de la localización de Pokémon.</p><a href="https://github.com/andersaucy/pokelingua" target="_blank" rel="noreferrer">Investigación abierta, construida en público ↗</a></footer>
    </main>
  );
}

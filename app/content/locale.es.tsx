import { DonateButton } from "../components/DonateButton";
import { LanguageToggle } from "../components/LanguageToggle";
import { EnglishUsPokedex } from "../components/EnglishUsPokedex";
import { FrenchPokedex } from "../components/FrenchPokedex";
import { GermanPokedex } from "../components/GermanPokedex";
import { ItalianPokedex } from "../components/ItalianPokedex";
import { JapanesePokedex } from "../components/JapanesePokedex";
import { KoreanPokedex } from "../components/KoreanPokedex";
import { LocalePokedex } from "../components/LocalePokedex";
import { MediaLocalePokedex } from "../components/MediaLocalePokedex";
import { SpanishPokedex } from "../components/SpanishPokedex";
import { VietnamesePokedex } from "../components/VietnamesePokedex";

export const chapters = {
  unofficial: { code: "ALT", place: "Ediciones no oficiales", local: "Traducciones de fans · copias piratas · ROM hacks", language: "Varios idiomas y mercados", period: "Años 90—hoy", live: true, deck: "Las rutas no oficiales que llevaron Pokémon más allá de las barreras lingüísticas antes de la localización autorizada—o al margen de ella." },
  "united-states": { code: "US", place: "Estados Unidos", local: "United States", language: "Inglés · en-US", period: "1998—hoy", live: true, deck: "La primera reinvención internacional: cómo los nombres, los diálogos, la marca y la animación japoneses se convirtieron en el vocabulario Pokémon en inglés que se usa en todo el mundo." },
  japan: { code: "JP", place: "Japón", local: "日本", language: "Japonés · 日本語", period: "1996—hoy", live: true, deck: "El capítulo de origen: cómo los nombres, los juegos, la animación y la historia corporativa de Japón crearon el vocabulario que cada edición regional posterior iba a interpretar." },
  "south-korea": {
    code: "KR", place: "Corea del Sur", local: "대한민국", language: "Coreano · 한국어", period: "1998—hoy", live: true,
    deck: "Cómo la política cultural, los medios en coreano y una empresa regional dedicada dieron forma a una edición regional de Pokémon con identidad propia.",
  },
  france: { code: "FR", place: "Francia", local: "France", language: "Francés · français", period: "1998—hoy", live: true, deck: "Cómo un equipo de Nintendo France convirtió la traducción en juegos de palabras—y construyó una de las tradiciones de nombres más singulares de Pokémon." },
  germany: { code: "DE", place: "Alemania", local: "Deutschland", language: "Alemán · Deutsch", period: "1999—hoy", live: true, deck: "Cómo los compuestos y los juegos de palabras del alemán transformaron conceptos de Pokémon en un vocabulario de criaturas propio desde la primera oleada europea de la franquicia." },
  italy: { code: "IT", place: "Italia", local: "Italia", language: "Italiano · italiano", period: "1999—hoy", live: true, deck: "Cómo Italia construyó un mundo Pokémon totalmente localizado en torno a nombres de especie casi sin cambios—y cuándo decidió traducirlos." },
  spain: { code: "ES", place: "España", local: "España", language: "Español · español (España)", period: "1999—hoy", live: true, deck: "La tradición de los juegos en español de España: un mundo totalmente localizado construido en torno a nombres de especie internacionales en su mayoría compartidos." },
  "latin-america": { code: "LAT", place: "Latinoamérica", local: "América Latina", language: "Español · español (Latinoamérica)", period: "1999—hoy", live: true, deck: "Una tradición propia de doblaje regional—y la llegada en 2025 del español latinoamericano como idioma seleccionable en los juegos principales." },
  "hong-kong": { code: "HK", place: "Hong Kong", local: "香港", language: "Cantonés · Chino tradicional", period: "1998—hoy", live: true, deck: "Una tradición de nombres en cantonés, una unificación en 2016 y una historia que no puede reducirse solo a la escritura." },
  taiwan: { code: "TW", place: "Taiwán", local: "台灣", language: "Mandarín · Chino tradicional", period: "1998—hoy", live: true, deck: "Del vocabulario consolidado del anime a una localización coordinada de los juegos en chino." },
  "mainland-china": { code: "CN", place: "China continental", local: "中国大陆", language: "Mandarín · Chino simplificado", period: "Años 2000—hoy", live: true, deck: "El registro continental de la terminología en escritura simplificada, la distribución oficial, los juegos, las cartas y los medios." },
  india: { code: "IN", place: "India", local: "भारत", language: "Hindi · Tamil · Telugu +", period: "2003—hoy", live: false, deck: "Pokémon en un mercado televisivo multilingüe y un archivo digital oficial en crecimiento." },
  "hindi-india": { code: "HI", place: "Hindi en la India", local: "हिन्दी", language: "Hindi · हिन्दी", period: "2003—hoy", live: true, deck: "Del debut televisivo en hindi a los canales digitales oficiales y un cambio documentado en la política de nombres de Pokémon." },
  "tamil-india": { code: "TA", place: "Tamil en la India", local: "தமிழ்", language: "Tamil · தமிழ்", period: "2004—hoy", live: true, deck: "Una historia de doblaje regional, un canal digital oficial propio y una práctica de nombres ligada al vocabulario de especies en inglés." },
  "telugu-india": { code: "TE", place: "Telugu en la India", local: "తెలుగు", language: "Telugu · తెలుగు", period: "2004—hoy", live: true, deck: "Una historia de doblaje regional, un canal digital oficial propio y una práctica de nombres ligada al vocabulario de especies en inglés." },
  thailand: { code: "TH", place: "Tailandia", local: "ประเทศไทย", language: "Tailandés · ภาษาไทย", period: "2001—hoy", live: true, deck: "Nombres de especie de raíz japonesa en escritura tailandesa, desde las emisiones de televisión hasta una Pokédex y un canal regionales oficiales." },
  indonesia: { code: "ID", place: "Indonesia", local: "Indonesia", language: "Indonesio · Bahasa Indonesia", period: "2001—hoy", live: true, deck: "Un mercado Pokémon con el anime primero y a escala móvil, donde los medios, apps, cartas y eventos en indonesio conforman una edición regional sin un idioma seleccionable en los juegos principales." },
  portugal: { code: "PT", place: "Portugal", local: "Portugal", language: "Portugués europeo · português europeu", period: "1999—hoy", live: true, deck: "Juegos en inglés, envoltorios en portugués europeo y una tradición de doblaje que fue llevando gradualmente a la pantalla una parte cada vez mayor de la presentación de Pokémon." },
  "arab-world": { code: "AR", place: "Mundo árabe", local: "العالم العربي", language: "Árabe · العربية", period: "2000—hoy", live: true, deck: "Una historia transfronteriza del doblaje árabe marcada por varios estudios, la adaptación desde el inglés, la transcripción de la escritura, la interrupción y el regreso." },
  philippines: { code: "PH", place: "Filipinas", local: "Pilipinas", language: "Filipino · Inglés filipino", period: "1999—hoy", live: true, deck: "Tradiciones televisivas paralelas en inglés y en filipino, construidas en torno a los nombres de especie internacionales conservados y a diálogos interpretados localmente." },
  malaysia: { code: "MY", place: "Malasia", local: "Malaysia", language: "Malayo · Bahasa Melayu · Inglés", period: "2000—hoy", live: true, deck: "Un mercado multilingüe cuyo doblaje al malayo alternó entre las ediciones de origen japonesa e inglesa en distintos momentos de su historia." },
  israel: { code: "IL", place: "Israel", local: "ישראל", language: "Hebreo · עברית", period: "2000—hoy", live: true, deck: "Identidades de especie en inglés escritas de derecha a izquierda, un largo paréntesis televisivo y un regreso a las pantallas en hebreo en la era de Pokémon GO." },
  russia: { code: "RU", place: "Rusia", local: "Россия", language: "Ruso · русский", period: "2000—hoy", live: true, deck: "Una historia de la animación en ruso construida a partir de la adaptación inglesa, con nombres de especie conservados y una presentación localizada." },
  turkey: { code: "TR", place: "Turquía", local: "Türkiye", language: "Turco · Türkçe", period: "2000—hoy", live: true, deck: "Un debut en la televisión turca, una interrupción polémica y un posterior regreso oficial a través de los juegos y la animación digital." },
  brazil: { code: "BR", place: "Brasil", local: "Brasil", language: "Portugués brasileño · português brasileiro", period: "1998—2027+", live: true, deck: "De los envoltorios localizados de Rojo y Azul y un doblaje televisivo histórico a la confirmación del portugués brasileño como idioma de los juegos principales." },
  vietnam: { code: "VN", place: "Vietnam", local: "Việt Nam", language: "Vietnamita · Tiếng Việt", period: "2002—hoy", live: true, deck: "De los nombres de especie de raíz japonesa en los medios vietnamitas al estándar de nombres en inglés anunciado en mayo de 2026." },
  future: { code: "FWD", place: "Localizaciones futuras", local: "Seguimiento de pruebas", language: "Incorporaciones confirmadas y posibilidades sin resolver", period: "2027—en adelante", live: true, deck: "Una lista de seguimiento con fuentes que separa el soporte de idiomas ya anunciado de las rutas de localización futuras plausibles—pero sin confirmar." },
} as const;

export type Slug = keyof typeof chapters;

const localeArtifactWalls: Record<Slug, string[]> = {
  unofficial: ["/exhibits/red-green.jpg", "/exhibits/sun-moon.jpg", "/exhibits/anime-original.jpg"],
  "united-states": ["/exhibits/red-blue.jpg", "/exhibits/anime-original.jpg", "/exhibits/x-box.jpg"],
  japan: ["/exhibits/red-green.jpg", "/exhibits/anime-original.jpg", "/exhibits/sun-moon.jpg"],
  "south-korea": ["/exhibits/gold-silver-korea.jpg", "/exhibits/platinum-korea.png", "/exhibits/white-logo-korea.png"],
  france: ["/exhibits/french-blue.jpg", "/exhibits/anime-original.jpg", "/exhibits/x-box.jpg"],
  germany: ["/exhibits/german-red-blue.jpg", "/exhibits/anime-original.jpg", "/exhibits/x-box.jpg"],
  italy: ["/exhibits/italian-blue.webp", "/exhibits/anime-original.jpg", "/exhibits/x-box.jpg"],
  spain: ["/exhibits/spanish-red.jpg", "/exhibits/anime-original.jpg", "/exhibits/legends-za.jpg"],
  "latin-america": ["/exhibits/legends-za-latam.jpg", "/exhibits/anime-original.jpg", "/exhibits/legends-za.jpg"],
  "hong-kong": ["/exhibits/chinese-sun-moon-traditional.jpg", "/exhibits/hong-kong-sword-traditional.jpg", "/exhibits/anime-original.jpg"],
  taiwan: ["/exhibits/chinese-sun-moon-traditional.jpg", "/exhibits/taiwan-scarlet-traditional.jpg", "/exhibits/taiwan-shenqibaobei-title.png"],
  "mainland-china": ["/exhibits/chinese-sun-moon-simplified.jpg", "/exhibits/mainland-scarlet-simplified-official.jpg", "/exhibits/anime-original.jpg"],
  india: ["/exhibits/india-horizons.jpg", "/exhibits/anime-original.jpg", "/exhibits/x-box.jpg"],
  "hindi-india": ["/exhibits/india-horizons.jpg", "/exhibits/anime-original.jpg", "/exhibits/x-box.jpg"],
  "tamil-india": ["/exhibits/india-horizons.jpg", "/exhibits/anime-original.jpg", "/exhibits/x-box.jpg"],
  "telugu-india": ["/exhibits/india-horizons.jpg", "/exhibits/anime-original.jpg", "/exhibits/x-box.jpg"],
  thailand: ["/exhibits/thai-horizons.jpg", "/exhibits/anime-original.jpg", "/exhibits/sun-moon.jpg"],
  indonesia: ["/exhibits/indonesia-pokemon-go.png", "/exhibits/indonesia-tcg-pocket.png", "/exhibits/indonesia-pokemon-unite.png"],
  portugal: ["/exhibits/anime-original.jpg", "/exhibits/red-blue.jpg", "/exhibits/portugal-horizons-logo.png"],
  "arab-world": ["/exhibits/anime-original.jpg", "/exhibits/x-box.jpg", "/exhibits/arabic-pokemon-logo.png"],
  philippines: ["/exhibits/philippines-portal.png", "/exhibits/anime-original.jpg", "/exhibits/red-blue.jpg"],
  malaysia: ["/exhibits/malaysia-portal.png", "/exhibits/anime-original.jpg", "/exhibits/x-box.jpg"],
  israel: ["/exhibits/anime-original.jpg", "/exhibits/x-box.jpg", "/exhibits/hebrew-pokemon-logo.png"],
  russia: ["/exhibits/anime-original.jpg", "/exhibits/x-box.jpg", "/exhibits/red-blue.jpg"],
  turkey: ["/exhibits/anime-original.jpg", "/exhibits/x-box.jpg", "/exhibits/red-blue.jpg"],
  brazil: ["/exhibits/brazil-horizons.jpg", "/exhibits/red-blue.jpg", "/exhibits/winds-waves.jpg"],
  vietnam: ["/exhibits/vietnam-horizons.jpg", "/exhibits/anime-original.jpg", "/exhibits/x-box.jpg"],
  future: ["/exhibits/winds-waves.jpg", "/exhibits/legends-za-latam.jpg", "/exhibits/sun-moon.jpg"],
};

function Researching({ chapter }: { chapter: (typeof chapters)[Exclude<Slug, "south-korea">] }) {
  return <>
    <section className="locale-placeholder">
      <div><span className="research-pulse" /> Capítulo en investigación</div>
      <h2>Esta historia merece<br />más que un resumen.</h2>
      <p>{chapter.deck}</p>
      <p>Esta URL ya forma parte del atlas. El capítulo publicado comenzará con una reseña propia sobre la llegada y después separará juegos, animación, nombres, sitios web y lanzamientos regionales—con una fuente y una marca temporal asociadas a cada hito.</p>
      <a href="/#locales">Volver al atlas de regiones →</a>
    </section>
    <section className="research-board">
      <div><span>Línea de investigación 01</span><b>Primera llegada oficial</b><p>Confirmar de forma independiente las fechas del primer juego, emisión, carta y sitio web con licencia.</p></div>
      <div><span>Línea de investigación 02</span><b>Sistema de nombres</b><p>Registrar los términos originales, las revisiones, las pronunciaciones y las relaciones con el idioma de origen.</p></div>
      <div><span>Línea de investigación 03</span><b>Momentos clave</b><p>Archivar los anuncios oficiales y reacciones sociales representativas de cada época.</p></div>
    </section>
    <section className="research-library-status" id="name-library"><span>Estado de la biblioteca de nombres</span><h2>Aún no publicada.</h2><p>Por ahora, este capítulo no afirma contar con una lista completa de nombres Pokémon propia de esta región. Solo aparecerá una tabla consultable cuando puedan verificarse la política de nombres y el conjunto completo de registros; hasta entonces, la ausencia se señala en lugar de rellenarse con traducciones supuestas.</p></section>
  </>;
}

function ExhibitMedia({ src, alt, label, tilt = "right" }: { src: string; alt: string; label: string; tilt?: "left" | "right" }) {
  return <figure className={`exhibit-media ${tilt}`}><img src={src} alt={alt} loading="lazy" /><figcaption>{label}</figcaption></figure>;
}

const romanizationCopy = {
  japan: { script: "Kana → letras latinas", system: "Lectura de estilo Hepburn", text: "La biblioteca de nombres usa lecturas Hepburn para que los visitantes puedan pronunciar el kana y comparar los nombres japoneses con sus formas latinas oficiales registradas como marca. La romanización es una capa de lectura: フシギダネ sigue siendo el nombre japonés aunque se muestre como Fushigidane.", source: "https://www.loc.gov/catdir/cpso/romanization/romguide/Japanese-Romanization-Table-revised.pdf", sourceLabel: "Tabla de romanización del japonés de la Library of Congress" },
  "hong-kong": { script: "Chino tradicional → lectura en cantonés", system: "Tabla de estilo Yale · Jyutping para ampliar", text: "Los datos de nombres actuales de Pokélingua usan la conocida grafía cantonesa de estilo Yale, con diacríticos y una h que marca los tonos bajos. Jyutping es un esquema distinto y muy sistemático, creado por la Linguistic Society of Hong Kong en 1993; escribe los tonos con números y resulta especialmente útil para diccionarios, enseñanza y escritura con teclado.", source: "https://lshk.org/jyutping-scheme/", sourceLabel: "Linguistic Society of Hong Kong · esquema Jyutping" },
  taiwan: { script: "Chino tradicional → lectura en mandarín", system: "Tabla en Hanyu Pinyin · contexto Wade–Giles", text: "La tabla usa Hanyu Pinyin con marcas tonales para ofrecer una lectura coherente en mandarín. El panorama real de la romanización en Taiwán es más amplio: Wade–Giles sigue presente en nombres de persona, topónimos y documentos históricos, junto a Hanyu Pinyin y otros sistemas. Son formas alternativas de representar sonidos—no grafías chinas alternativas de los Pokémon.", source: "https://www.boca.gov.tw/cp-2-8194-ee028-1.html", sourceLabel: "Bureau of Consular Affairs de Taiwán · cuatro sistemas de romanización" },
  "mainland-china": { script: "Chino simplificado → lectura en mandarín", system: "Hanyu Pinyin", text: "El Hanyu Pinyin con marcas tonales aporta la capa de lectura de los nombres en chino simplificado. Las marcas tonales importan: registran la pronunciación del mandarín con más precisión que una grafía latina sin marcas, mientras que los caracteres chinos siguen siendo el campo del nombre oficial.", source: "https://www.loc.gov/catdir/cpso/roman", sourceLabel: "Referencia de romanización del chino de la Library of Congress" },
  "south-korea": { script: "Hangul → letras latinas", system: "Revised Romanization + McCune–Reischauer", text: "La tabla sitúa primero la Revised Romanization y conserva McCune–Reischauer para comparar. Los sistemas toman decisiones distintas—eo frente a ŏ es un ejemplo conocido—, así que dos formas latinas pueden remitir al mismo nombre en hangul sin cambios. La imagen de marca de un evento puede introducir una tercera grafía de apariencia oficial.", source: "https://www.korean.go.kr/front_eng/roman/roman_01.do", sourceLabel: "National Institute of Korean Language · Revised Romanization" },
  thailand: { script: "Escritura tailandesa → letras latinas", system: "Referencia de romanización del tailandés", text: "En Tailandia, la terminología Pokémon se escribe en escritura tailandesa y suele seguir el sonido del nombre de especie japonés. Una transcripción latina como Ashirene es una ayuda analítica para la lectura, no un segundo nombre oficial del Pokémon; las distintas tablas generales de romanización del tailandés pueden resolver los detalles de otra manera.", source: "https://www.loc.gov/catdir/cpso/roman", sourceLabel: "Tabla de romanización del tailandés de la Library of Congress" },
  russia: { script: "Cirílico → letras latinas", system: "Transliteración del ruso", text: "La transliteración convierte las letras cirílicas en caracteres latinos para facilitar la búsqueda y la catalogación. No debe confundirse con la traducción de un nombre ni con una guía de pronunciación exacta: el doblaje ruso puede escribir en cirílico un nombre Pokémon derivado del inglés sin alterar la identidad de la especie.", source: "https://www.loc.gov/catdir/cpso/roman", sourceLabel: "Tabla de romanización del ruso de la Library of Congress" },
  "hindi-india": { script: "Devanagari → letras latinas", system: "Romanización del hindi", text: "La romanización permite que lectores que no conocen el devanagari puedan buscar un título o un diálogo escrito en hindi. Pokélingua mantiene esa ayuda separada de la política actual, común a toda la India, de usar nombres de especie basados en el inglés; transliterar हिन्दी no crea un nuevo canon de nombres de especie.", source: "https://www.loc.gov/catdir/cpso/roman", sourceLabel: "Tabla de romanización del hindi de la Library of Congress" },
  "tamil-india": { script: "Escritura tamil → letras latinas", system: "Romanización del tamil", text: "La romanización del tamil representa esta escritura con letras latinas para facilitar la comparación y el descubrimiento. No sustituye la ortografía ni la interpretación en tamil, ni implica que los nombres de especie Pokémon compartidos, basados en el inglés, se tradujeran de forma independiente.", source: "https://www.loc.gov/catdir/cpso/roman", sourceLabel: "Tabla de romanización del tamil de la Library of Congress" },
  "telugu-india": { script: "Escritura telugu → letras latinas", system: "Romanización del telugu", text: "La romanización del telugu es un puente para la lectura y la búsqueda, no un reemplazo de la escritura telugu. El doblaje de esta región sigue siendo en telugu aunque la política oficial actual de nombres de especie conserve formas basadas en el inglés.", source: "https://www.loc.gov/catdir/cpso/roman", sourceLabel: "Tabla de romanización del telugu de la Library of Congress" },
  "arab-world": { script: "Escritura árabe → letras latinas", system: "Romanización del árabe", text: "El árabe se escribe de derecha a izquierda, mientras que el campo de lectura transcribe en letras latinas las grafías documentadas del doblaje para poder compararlas. Como muchos nombres de especie llegaron a través del inglés, la romanización registra cómo la escritura árabe acomodó un nombre propio importado; no es una etimología traducida de nuevo.", source: "https://www.loc.gov/catdir/cpso/roman", sourceLabel: "Tabla de romanización del árabe de la Library of Congress" },
  israel: { script: "Escritura hebrea → letras latinas", system: "Romanización del hebreo", text: "El hebreo escribe de derecha a izquierda las identidades de especie conservadas del inglés. La lectura latina es un puente archivístico entre escrituras, no un nombre oficial alternativo, y ayuda a revelar decisiones como qué vocales y consonantes hace explícitas la grafía de un doblaje.", source: "https://www.loc.gov/catdir/cpso/roman", sourceLabel: "Tabla de romanización del hebreo de la Library of Congress" },
} as const;

type RomanizationLocale = keyof typeof romanizationCopy;

function RomanizationGuide({ locale }: { locale: RomanizationLocale }) {
  const copy = romanizationCopy[locale];
  return <section className={`romanization-guide romanization-${locale}`} id="romanization-guide">
    <div><span>Leer la escritura / para ampliar</span><h2>{copy.system}</h2><b>{copy.script}</b></div>
    <article><p>{copy.text}</p><aside><b>Romanizar no es renombrar</b><p>Permite que más visitantes puedan buscar y pronunciar una escritura no latina. La forma en su escritura original sigue siendo el nombre de referencia, y varios sistemas de romanización pueden describir el mismo nombre sin cambios.</p></aside><a href={copy.source} target="_blank" rel="noreferrer">{copy.sourceLabel} ↗</a></article>
    {locale === "taiwan" && <div className="wade-giles-fact"><span>Dato lingüístico Pokémon / Generación IX</span><h3>Cuatro nombres en inglés conservan un aire Wade–Giles.</h3><p>Wo-Chien, Chien-Pao, Ting-Lu y Chi-Yu siguen una romanización de estilo Wade–Giles. Sus nombres oficiales en Taiwán son compuestos de caracteres chinos distintos, que se muestran aquí con su lectura en Hanyu Pinyin y las raíces chinas que hay detrás de cada nombre en inglés.</p><div>{[
      { id: 1001, name: "Wo-Chien", chinese: "古簡蝸", pinyin: "Gǔjiǎnwō", roots: "蝸 wō + 簡 jiǎn", clue: "caracol + tablillas de bambú" },
      { id: 1002, name: "Chien-Pao", chinese: "古劍豹", pinyin: "Gǔjiànbào", roots: "劍 jiàn + 豹 bào", clue: "espada + leopardo" },
      { id: 1003, name: "Ting-Lu", chinese: "古鼎鹿", pinyin: "Gǔdǐnglù", roots: "鼎 dǐng + 鹿 lù", clue: "caldero + ciervo" },
      { id: 1004, name: "Chi-Yu", chinese: "古玉魚", pinyin: "Gǔyùyú", roots: "鯽魚 jìyú + 玉 yù", clue: "carpa cruciana + jade" },
    ].map((item) => <section key={item.name}><img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.id}.png`} alt={`Sprite de ${item.name}`} loading="lazy" /><b>{item.name}</b><strong lang="zh-Hant">{item.chinese}</strong><small>{item.pinyin} · nombre oficial en Taiwán</small><p><span lang="zh-Hant">{item.roots}</span><em>{item.clue}</em></p></section>)}</div><a href="https://bulbapedia.bulbagarden.net/wiki/Chien-Pao_(Pok%C3%A9mon)#Name_origin" target="_blank" rel="noreferrer">Sigue el rastro del origen de los nombres de los Tesoros Funestos ↗</a></div>}
  </section>;
}

const chineseCopy = {
  "hong-kong": {
    eyebrow: "Se habla cantonés. Se escribe en chino tradicional.",
    opening: "La historia de Pokémon en Hong Kong no es simplemente una edición en chino tradicional de una historia en mandarín. Los nombres cantoneses ya consolidados circularon a través de la animación y los medios locales, y crearon un vocabulario que sonaba propio al leerse en voz alta.",
    note: "En 2016, el paso hacia nombres unificados en caracteres chinos hizo visible la brecha: las nuevas formas escritas podían compartirse con otros mercados de habla china, pero sonaban muy distintas en cantonés.",
    date: "26 FEB 2016", event: "Se anuncian los nombres chinos unificados", eventText: "El anuncio en chino de Pokémon Sol y Luna incorporó el chino simplificado y el chino tradicional a los juegos principales y unificó muchos nombres entre mercados. En Hong Kong, la reacción se centró en lo que los caracteres compartidos borraban del habla cantonesa.",
    official: "https://www.pokemon.com.hk/",
    arrivalDate: "16 NOV 1998", arrivalTitle: "Pokémon llega a la televisión de Hong Kong", arrivalText: "El primer episodio de la serie animada se emitió en TVB. Es la llegada masiva más temprana documentada en esta edición—no una afirmación de que todos los productos Pokémon estuvieran disponibles oficialmente ese día.",
    recognitionDate: "2016", recognitionTitle: "Una política de nombres unificada llega a la región", recognitionText: "Los juegos principales en chino y los nombres unificados en caracteres chinos hicieron explícita la estrategia lingüística regional de The Pokémon Company, mientras que la respuesta reveló la fuerza del vocabulario cantonés ya establecido en Hong Kong.",
    historySource: "https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_Hong_Kong",
    media: "/exhibits/chinese-sun-moon-traditional.jpg", mediaAlt: "Cajas regionales de Pokémon Sol y Luna con títulos en chino tradicional", mediaLabel: "Cajas regionales en chino tradicional · 2016",
  },
  taiwan: {
    eyebrow: "Un capítulo sobre Taiwán, no una página genérica en chino tradicional.",
    opening: "Taiwán desarrolló su propio vocabulario Pokémon de larga trayectoria a través de la animación, las publicaciones y el merchandising en mandarín, además de la antigua marca de la franquicia 神奇寶貝 (Shénqí Bǎobèi). Esos recuerdos siguen formando parte de la región aunque los nombres de cada criatura coincidan con las actuales formas unificadas en chino tradicional.",
    note: "La biblioteca mantiene Taiwán por separado porque unos caracteres idénticos no implican distribuidores, historias de emisión, fechas de lanzamiento ni experiencias del público idénticos.",
    date: "26 FEB 2016", event: "El chino tradicional llega a los juegos principales", eventText: "El anuncio de Sol y Luna estableció el chino tradicional como idioma seleccionable en la serie principal. La Pokédex oficial actual de Taiwán es hoy la referencia principal para los nombres vigentes.",
    official: "https://tw.portal-pokemon.com/play/pokedex",
    arrivalDate: "28 NOV 1998", arrivalTitle: "La serie animada se estrena en Taiwán", arrivalText: "El primer episodio se emitió en CTV en mandarín. Esta emisión es la llegada pública amplia más temprana documentada en esta edición y el comienzo de una historia mediática propia de Taiwán.",
    recognitionDate: "DIC 2022", recognitionTitle: "Se funda Pokémon Taiwan Co., Ltd.", recognitionText: "La creación de una empresa dedicada a Taiwán marca una forma posterior de inversión regional formal. El Pokémon Center Taipei llegó después, en diciembre de 2023.",
    historySource: "https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_Taiwan",
    media: "/exhibits/chinese-sun-moon-traditional.jpg", mediaAlt: "Cajas taiwanesas de Pokémon Sol y Luna con títulos en chino tradicional", mediaLabel: "Cajas de lanzamiento en Taiwán · 2016",
  },
  "mainland-china": {
    eyebrow: "El chino simplificado es la escritura. China continental es la región.",
    opening: "El capítulo de China continental va más allá de la conversión de caracteres. Registra cuándo los juegos, las cartas, el merchandising, los sitios web y la terminología oficiales entraron en un mercado con su propio entorno de distribución y de medios.",
    note: "La mayoría de los nombres actuales de criaturas corresponden directamente a la lista unificada en chino tradicional, escrita en caracteres simplificados, pero las revisiones propias del continente y los calendarios de productos aún requieren su propio registro. Sol y Luna no tuvieron una edición comercial específica para el continente: el sitio oficial en chino simplificado remitía a los jugadores al software de las regiones japonesa o de chino tradicional, donde el chino simplificado podía seleccionarse dentro del juego.",
    date: "26 FEB 2016", event: "El chino simplificado llega a los juegos principales", eventText: "Pokémon Sol y Luna anunciaron el chino simplificado como idioma seleccionable. La Pokédex oficial del continente es ahora la referencia principal para los nombres actuales en escritura simplificada.",
    official: "https://dex.pokemon.cn/play/pokedex",
    arrivalDate: "24 DIC 1998", arrivalTitle: "La serie animada llega a la televisión del continente", arrivalText: "El primer episodio se emitió en OTV de Shanghái en mandarín. Por tanto, el reconocimiento público precede en muchos años a los juegos principales oficiales en chino y a la posterior inversión corporativa directa.",
    recognitionDate: "JUL 2020", recognitionTitle: "Se funda Pokémon Shanghai", recognitionText: "The Pokémon Company creó una filial en el continente, señal de una nueva fase de operación local directa. Los productos del TCG en chino simplificado llegaron en 2022, mientras que los lanzamientos de juegos siguieron condicionados por normas propias de aprobación y distribución.",
    historySource: "https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_mainland_China",
    media: "/exhibits/chinese-sun-moon-simplified.jpg", mediaAlt: "Arte oficial de lanzamiento de Pokémon Sol y Luna con títulos en chino simplificado", mediaLabel: "Arte oficial de lanzamiento en chino simplificado · 2016",
  },
} as const;

function ChineseChapter({ locale }: { locale: keyof typeof chineseCopy }) {
  const copy = chineseCopy[locale];
  return <>
    <section className="arrival-brief">
      <div className="arrival-heading"><span>Llegada y reconocimiento</span><h2>Cómo llegó Pokémon<br /><em>a esta región.</em></h2><p>La llegada pública y el reconocimiento corporativo son hitos distintos. Este capítulo registra ambos sin tratar ninguno como el momento único en que Pokémon “comenzó”.</p></div>
      <div className="arrival-markers">
        <article><time>{copy.arrivalDate}</time><span>Primera llegada masiva en esta edición</span><h3>{copy.arrivalTitle}</h3><p>{copy.arrivalText}</p></article>
        <article><time>{copy.recognitionDate}</time><span>Reconocimiento / inversión oficial posterior</span><h3>{copy.recognitionTitle}</h3><p>{copy.recognitionText}</p></article>
      </div>
      <a href={copy.historySource} target="_blank" rel="noreferrer">Rastro documental de esta región ↗</a>
    </section>
    <section className="chapter-opening chinese-opening">
      <div className="chapter-rail"><span>Perspectiva local</span><b>01</b></div>
      <article><p className="dropcap">{copy.opening}</p><p>{copy.note}</p>{locale === "taiwan" && <figure className="perspective-artifact"><img src="/exhibits/taiwan-shenqibaobei-title.png" alt="Cartela de título taiwanesa de Pokémon Best Wishes con la antigua marca de la franquicia 神奇寶貝" loading="lazy" /><figcaption><b lang="zh-Hant">神奇寶貝</b><span>Shénqí Bǎobèi · Cartela de título de la época del anime en Taiwán</span><a href="https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_Best_Wishes_Theme_Song" target="_blank" rel="noreferrer">Registro del artefacto ↗</a></figcaption></figure>}<aside><b>Por qué es una región propia</b><p>{copy.eyebrow} Pokélingua vincula cada término a un territorio, una lengua hablada, una escritura, un medio y una fecha, en lugar de tratar el “chino” como un único campo indiferenciado.</p></aside></article>
    </section>
    <RomanizationGuide locale={locale} />
    {locale === "hong-kong" && <section className="locale-distinction hk-distinction">
      <div><span>Por qué Hong Kong sigue siendo distinto</span><h2>Los caracteres compartidos no crearon<br /><em>un nombre hablado compartido.</em></h2></div>
      <article><p>El público de Hong Kong conocía a Pikachu como 比卡超—<i>bei-kaa-chiu</i>—gracias a la animación y los medios en cantonés desde finales de los noventa. La política lingüística de 2016 para los juegos en chino estandarizó la forma escrita 皮卡丘 tanto en chino simplificado como en chino tradicional. Esa forma se aproxima a “Pikachu” en mandarín, pero se lee de manera muy distinta en cantonés.</p><p>Por tanto, la disputa no era una preferencia entre dos grafías de una misma pronunciación. Se trataba de si un estándar escrito unificado debía desplazar un vocabulario cultural cantonés ya establecido. Los fans enviaron peticiones a Nintendo Hong Kong, publicaron objeciones en su página de Facebook y se manifestaron frente al consulado japonés.</p><div className="distinction-compare"><div><span>Uso establecido en Hong Kong</span><b>比卡超</b><small>bei-kaa-chiu · cantonés</small></div><div><span>Caracteres unificados de 2016</span><b>皮卡丘</b><small>pí-kǎ-qiū · mandarín<br />pei-kaa-jau · cantonés</small></div></div><a href="https://www.hk01.com/%E7%A4%BE%E6%9C%83%E6%96%B0%E8%81%9E/23471/20%E4%BA%BA%E9%81%8A%E8%A1%8C%E6%8D%8D%E8%A1%9B-%E6%AF%94%E5%8D%A1%E8%B6%85-%E5%90%8D%E5%AD%97-%E6%8B%92%E7%B5%95-%E7%9A%AE%E5%8D%A1%E4%B8%98-%E5%86%80%E6%97%A5%E9%A0%98%E4%BA%8B%E6%AD%A3%E8%A6%96" target="_blank" rel="noreferrer">Crónica de la época sobre la protesta en Hong Kong ↗</a></article>
    </section>}
    {locale === "mainland-china" && <section className="unofficial-context china-unofficial" id="unofficial-chinese-games">
      <div><span>Capa de traducción no oficial</span><time>ANTES DE 2016</time></div>
      <article><h2>La brecha lingüística ya se estaba llenando.</h2><p>Antes de que Sol y Luna ofrecieran la primera localización oficial al chino de un juego principal, circulaban ampliamente hacks de ROM y cartuchos piratas en chino. Su terminología era inconsistente y no autorizada, pero su existencia deja constancia de una demanda sostenida de juegos que los jugadores pudieran leer en su propio idioma.</p><p>Pokélingua no fusiona esos nombres con la Pokédex oficial. Los conserva como contexto: la terminología de 2016 llegó tras años de práctica de traducción no oficial, no a un mercado vacío.</p><a href="https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_mainland_China" target="_blank" rel="noreferrer">Historia de los juegos oficiales y no oficiales ↗</a></article>
    </section>}
    <section className="chapter-timeline">
      <div className="chapter-rail"><span>Marca temporal</span><b>02</b></div>
      <div className="chapter-events"><article><time>{copy.date.split(" ").map((part) => <span key={part}>{part}<br /></span>)}</time><div><span>Idioma del juego / política de nombres</span><h2>{copy.event}</h2><p>{copy.eventText}</p><a href={copy.official} target="_blank" rel="noreferrer">Pokédex regional oficial actual ↗</a></div><ExhibitMedia src={copy.media} alt={copy.mediaAlt} label={copy.mediaLabel} /></article></div>
    </section>
    <LocalePokedex locale={locale} />
    <section className="chapter-sources"><span>Fuentes de esta edición</span><a href={copy.official} target="_blank" rel="noreferrer">01 · Pokédex regional oficial</a><a href={copy.historySource} target="_blank" rel="noreferrer">02 · Historia de la región</a><a href="https://bulbapedia.bulbagarden.net/wiki/List_of_Chinese_Pok%C3%A9mon_names" target="_blank" rel="noreferrer">03 · Índice histórico de nombres chinos</a></section>
  </>;
}

function FrenchChapter() {
  return <>
    <section className="arrival-brief france-arrival">
      <div className="arrival-heading"><span>Encargo y llegada</span><h2>A Francia se le pidió<br /><em>hacerlo local.</em></h2><p>La edición francesa no fue una simple conversión del texto inglés. Antes del lanzamiento, el equipo de localización de Nintendo France defendió que los nombres de las criaturas debían reconstruirse en torno al sonido, el significado, el humor y las referencias culturales franceses.</p></div>
      <div className="arrival-markers">
        <article><time>1998</time><span>Encargo de localización · día exacto aún sin documentar</span><h3>Toma forma el encargo de los nombres</h3><p>Relatos posteriores de Julien Bardakoff sitúan el primer trabajo de nombres en francés en 1998. Al principio, Nintendo dudó en sustituir los nombres japoneses o internacionales; el argumento de la localización francesa se impuso y abrió paso a nombres como Bulbizarre, Salamèche y Carapuce.</p></article>
        <article><time>05 SEP 1999</time><span>Primera llegada pública documentada</span><h3>La serie animada llega a Francia</h3><p>Fox Kids emitió el primer episodio en francés un mes antes del lanzamiento en Game Boy. Así, el público conoció a Sacha, Pikachu y el vocabulario localizado como un sistema hablado y televisado—no solo como una lista dentro de un juego.</p></article>
      </div>
      <a href="https://www.lemonde.fr/pixels/article/2016/11/23/de-pikachu-a-joey-stari-les-mille-et-une-manieres-de-baptiser-un-pokemon_5036514_4408996.html" target="_blank" rel="noreferrer">Relato de la localización y defensa de los nombres ↗</a>
    </section>
    <section className="chapter-opening france-opening">
      <div className="chapter-rail"><span>Método de localización</span><b>01</b></div>
      <article><p className="dropcap">Los nombres franceses de Pokémon se diseñaron para transmitir varias ideas a la vez: el cuerpo de la criatura, su tipo, su comportamiento, su sonido y, a menudo, un chiste. Salamèche une <i>salamandre</i> con <i>mèche</i>; Feunard funde fuego y zorro en una referencia que aun así suena a nombre propio.</p><p>Julien Bardakoff es el localizador más conocido de los primeros años y afirma haber dirigido el trabajo de nombres de las dos primeras generaciones. Sin embargo, un reportaje de la época, publicado en 2000, menciona un grupo de cinco personas de Nintendo France—Bardakoff, Jean-Baptiste Fleury, Daniel Charbit, Nicolas Robert y Nicolas Gourio—y afirma que adaptar los 150 originales llevó seis meses.</p><aside><b>Nota editorial</b><p>Pokélingua registra a la vez el testimonio individual y el crédito colectivo. Un traductor destacado puede explicar el método sin convertirse en el único autor de cada nombre francés en todas las generaciones.</p></aside></article>
    </section>
    <section className="chapter-timeline france-timeline">
      <div className="chapter-rail"><span>Marcas temporales</span><b>02</b></div>
      <div className="chapter-events">
        <article><time>1998</time><div><span>Política de nombres</span><h2>La traducción se convierte en adaptación</h2><p>Se acepta la propuesta francesa de traducir los nombres de especie. En lugar de conservar cada etiqueta japonesa o inglesa, el equipo desarrolla nombres que reproducen la idea de cada criatura mediante el vocabulario y los juegos de palabras del francés. Los relatos públicos que se conservan identifican el año, pero no un día exacto del encargo.</p><a href="https://www.lemonde.fr/pixels/article/2016/11/23/de-pikachu-a-joey-stari-les-mille-et-une-manieres-de-baptiser-un-pokemon_5036514_4408996.html" target="_blank" rel="noreferrer">Retrospectiva · Le Monde ↗</a></div></article>
        <article><time>08 OCT<br />1999</time><div><span>Juegos principales / lanzamiento comercial</span><h2>Llegan Pokémon Rouge y Bleu</h2><p>Las ediciones francesas para Game Boy pusieron en manos de los jugadores los nombres, ataques, personajes y lugares localizados. El lanzamiento llegó aproximadamente un mes después de la primera emisión de Fox Kids.</p><a href="https://www.jeuxvideo.com/news/1647727/anniversaire-pokemon-en-france-avant-ecarlate-violet-comment-j-ai-decouvert-la-serie-sur-nintendo-switch.htm" target="_blank" rel="noreferrer">Historia del lanzamiento en Francia ↗</a></div><ExhibitMedia src="/exhibits/red-blue.jpg" alt="Cajas de Pokémon Rojo y Azul para Game Boy" label="Pieza de juego principal · Lanzamiento europeo" /></article>
        <article><time>29 DIC<br />2000</time><div><span>Registro de la época</span><h2>El equipo de localización entra en el archivo</h2><p>Le Parisien retrata a cinco localizadores de Nintendo France en el centro de pruebas de Cergy e informa de que las primeras 150 adaptaciones llevaron seis meses. Es una prueba excepcionalmente valiosa porque documenta el trabajo cuando el fenómeno de la primera generación aún era reciente.</p><a href="https://www.leparisien.fr/archives/ils-ont-invente-les-noms-des-pokemon-29-12-2000-2001854436.php" target="_blank" rel="noreferrer">Perfil de la época · Le Parisien ↗</a></div></article>
        <article><time>GEN V<br />2011</time><div><span>Tipografía / texto del juego</span><h2>Los acentos franceses se hacen visibles</h2><p>Las generaciones I–IV mostraban los nombres de especie sin diacríticos, lo que convertía Salamèche en SALAMECHE y Évoli en EVOLI dentro de los juegos. A partir de la quinta generación, las grafías francesas estándar pudieron aparecer en el texto del juego; la biblioteca de nombres conserva ambos estados de visualización.</p><a href="https://bulbapedia.bulbagarden.net/wiki/List_of_French_Pok%C3%A9mon_names" target="_blank" rel="noreferrer">Registro ortográfico francés ↗</a></div></article>
      </div>
    </section>
    <FrenchPokedex />
    <section className="chapter-sources"><span>Fuentes de esta edición</span><a href="https://www.pokemon.com/fr/pokedex" target="_blank" rel="noreferrer">01 · Pokédex oficial en francés</a><a href="https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_France" target="_blank" rel="noreferrer">02 · Pokémon en Francia</a><a href="https://bulbapedia.bulbagarden.net/wiki/List_of_French_Pok%C3%A9mon_names" target="_blank" rel="noreferrer">03 · Índice de nombres franceses</a><a href="https://www.leparisien.fr/archives/ils-ont-invente-les-noms-des-pokemon-29-12-2000-2001854436.php" target="_blank" rel="noreferrer">04 · Perfil del equipo (2000)</a></section>
  </>;
}

function UnitedStatesChapter() {
  return <>
    <section className="arrival-brief us-arrival">
      <div className="arrival-heading"><span>Debut internacional y marco de nombres</span><h2>Estados Unidos recibió<br /><em>un mundo con nombres nuevos.</em></h2><p>Estados Unidos no fue simplemente otra parada lingüística. Su edición de 1998 estableció los nombres, la terminología, el eslogan y la presentación mediática en inglés que se convertirían en material de partida para muchas localizaciones internacionales posteriores.</p></div>
      <div className="arrival-markers">
        <article><time>07 SEP 1998</time><span>Primera llegada a los medios nacionales</span><h3>La serie animada entra en sindicación</h3><p><i>Pokémon—I Choose You!</i> presentó a Ash, Misty, Brock y los nombres de especie en inglés en la televisión estadounidense. La emisión llegó antes que los juegos, por lo que muchos espectadores oyeron por primera vez el vocabulario localizado como diálogo e interpretación de personajes.</p></article>
        <article><time>28 SEP 1998</time><span>Primer lanzamiento localizado de la serie principal</span><h3>Se lanzan Pokémon Rojo y Azul</h3><p>Norteamérica se convirtió en el primer mercado de la franquicia fuera de Japón en recibir los juegos principales. Rojo y Azul combinaron el material original japonés con un guion en inglés, nuevos nombres de especie, topónimos adaptados y una identidad de marketing coordinada.</p></article>
      </div>
      <a href="https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_Red_and_Blue_Versions" target="_blank" rel="noreferrer">Registro de juegos y lanzamientos en Norteamérica ↗</a>
    </section>
    <section className="chapter-opening us-opening">
      <div className="chapter-rail"><span>Método de localización</span><b>01</b></div>
      <article><p className="dropcap">Los nombres en inglés buscaban que cada criatura resultara inmediatamente comprensible para los niños estadounidenses. フシギダネ <i>Fushigidane</i> pasó a ser Bulbasaur; ヒトカゲ <i>Hitokage</i>, Charmander. Los nuevos nombres condensaban aspecto, elemento, comportamiento y juegos de palabras en formas que podían funcionar en juegos, televisión, cartas, juguetes y conversaciones en el patio de recreo.</p><p>Participantes de la época describen un grupo de nombres de Nintendo of America que trabajaba a partir de los conceptos de criaturas de Game Freak. Bill Giese y Sara Bush han hablado de cómo proponían nombres; Hiro Nakamura ayudó a dirigir la localización estadounidense en su conjunto. Nob Ogasawara tradujo el texto del juego, pero más tarde subrayó que los términos destacados en mayúsculas—incluidos los nombres de especies y personajes—se trabajaron por separado.</p><aside><b>Nota editorial</b><p>Pokélingua distingue el crédito de los nombres de especie, la traducción del guion, el doblaje y el marketing. Formaron un único lanzamiento coordinado, pero no necesariamente los escribieron las mismas personas.</p></aside></article>
    </section>
    <section className="chapter-timeline us-timeline">
      <div className="chapter-rail"><span>Marcas temporales</span><b>02</b></div>
      <div className="chapter-events">
        <article><time>27 FEB<br />1996</time><div><span>Edición original / Japón</span><h2>Nace el sistema de nombres original</h2><p>Pokémon Rojo y Verde se lanzó en Japón con 151 nombres de especie japoneses. La edición estadounidense heredaría las criaturas y los conceptos dos años y medio después, pero sin tratar sus nombres como una capa intocable.</p><a href="https://corporate.pokemon.co.jp/en/aboutus/history/" target="_blank" rel="noreferrer">Historia corporativa oficial ↗</a></div></article>
        <article className="us-launch-event"><time>SEP<br />1998</time><div><span>Localización al inglés / lanzamiento coordinado</span><h2>Los nombres se convierten en un sistema transmedia</h2><p>La emisión televisiva comenzó el 7 de septiembre y Rojo y Azul llegaron el 28 de septiembre. Ash, Pallet Town, la terminología de la Pokédex, “Gotta Catch ’Em All” y los nombres de especie en inglés se diseñaron para circular juntos en lugar de quedar aislados dentro de un cartucho.</p><a href="https://time.com/6796536/history-origins-pokemon/" target="_blank" rel="noreferrer">Historia de la localización estadounidense · TIME ↗</a></div><ExhibitMedia src="/exhibits/red-blue.jpg" alt="Cajas de Pokémon Rojo y Azul para Game Boy" label="Artefacto de juego principal · 1998" /></article>
        <article><time>FEB<br />2001</time><div><span>Estructura empresarial</span><h2>Se funda Pokémon USA</h2><p>La creación de Pokémon USA, Inc.—más tarde parte de The Pokémon Company International—dio a la franquicia una organización estadounidense propia. La gestión en lengua inglesa se estaba convirtiendo en una infraestructura permanente y no en un proyecto de lanzamiento puntual.</p><a href="https://corporate.pokemon.co.jp/en/aboutus/history/" target="_blank" rel="noreferrer">Historia oficial de la empresa ↗</a></div></article>
        <article><time>12 OCT<br />2013</time><div><span>Modelo de lanzamiento mundial</span><h2>El inglés ya no espera a Japón</h2><p>Pokémon X e Y fueron los primeros títulos de la serie principal lanzados simultáneamente en todo el mundo. La edición estadounidense pasó de ser una exportación diferida a uno de los idiomas seleccionables dentro de un lanzamiento global coordinado.</p><a href="https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_X_and_Y" target="_blank" rel="noreferrer">Registro del lanzamiento mundial ↗</a></div></article>
      </div>
    </section>
    <EnglishUsPokedex />
    <section className="chapter-sources"><span>Fuentes de esta edición</span><a href="https://www.pokemon.com/us/pokedex" target="_blank" rel="noreferrer">01 · Pokédex oficial de EE. UU.</a><a href="https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_Red_and_Blue_Versions" target="_blank" rel="noreferrer">02 · Registro del lanzamiento de Rojo y Azul</a><a href="https://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_in_Japanese" target="_blank" rel="noreferrer">03 · Índice de nombres japoneses</a><a href="https://time.com/6796536/history-origins-pokemon/" target="_blank" rel="noreferrer">04 · Historia oral de la localización estadounidense</a><a href="https://www.youtube.com/watch?v=YZ0xJ1x5kMA" target="_blank" rel="noreferrer">05 · Entrevista a Nob Ogasawara</a></section>
  </>;
}

function SpanishChapter({ locale }: { locale: "spain" | "latin-america" }) {
  const isLatam = locale === "latin-america";
  return <>
    <section className={`arrival-brief ${isLatam ? "latam-arrival" : "spain-arrival"}`}>
      <div className="arrival-heading"><span>Llegada y marco regional</span><h2>{isLatam ? <>Primero llegó el doblaje.<br /><em>Después, el idioma del juego.</em></> : <>España construyó el primer<br /><em>mundo de juego en español.</em></>}</h2><p>{isLatam ? "Pokémon tuvo una voz, un público y un vocabulario en español latinoamericano desde 1999, pero sus juegos principales siguieron ofreciendo la edición en español orientada a España durante más de veinticinco años. Leyendas: Z-A permitió seleccionar el español latinoamericano por separado en 2025." : "Pokémon Rojo y Azul dieron a España una edición en español de un juego principal en 1999. Esa localización se convirtió en la referencia duradera del español de los juegos de la franquicia, distinta de la tradición de doblaje latinoamericana que se desarrollaba al mismo tiempo."}</p></div>
      <div className="arrival-markers">
        <article><time>{isLatam ? "26 ABR 1999" : "05 OCT 1999"}</time><span>{isLatam ? "Llegada oficial del anime" : "Primeros juegos principales en español"}</span><h3>{isLatam ? "Comienza el doblaje regional" : "Rojo y Azul llegan a España"}</h3><p>{isLatam ? "La serie animada entró en la región mediante una adaptación al español latinoamericano con reparto, registro, títulos e historial de emisión propios." : "Las ediciones en español localizaron diálogos, movimientos, objetos, lugares y textos de la historia, pero conservaron la mayoría de las grafías inglesas de los nombres de especie."}</p></article>
        <article><time>{isLatam ? "16 OCT 2025" : "20 DIC 1999"}</time><span>{isLatam ? "Primera edición regional seleccionable en un juego principal" : "Llegada oficial del anime"}</span><h3>{isLatam ? "Leyendas: Z-A añade el español latinoamericano" : "El doblaje de España llega a la televisión"}</h3><p>{isLatam ? "La ficha de Nintendo México menciona Español (América Latina) por separado entre los idiomas compatibles, lo que hace visible la distinción regional dentro del propio juego." : "España recibió un doblaje propio en lugar de importar la adaptación latinoamericana, lo que reforzó dos tradiciones paralelas de localización audiovisual."}</p></article>
      </div>
      <a href={isLatam ? "https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_Latin_America" : "https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_Spain"} target="_blank" rel="noreferrer">Historia y registro de lanzamientos de la región ↗</a>
    </section>
    <section className="chapter-opening spanish-opening">
      <div className="chapter-rail"><span>Por qué dos localizaciones</span><b>01</b></div>
      <article><p className="dropcap">“Español” designa una lengua compartida, no una única edición intercambiable para todo el público. España y América Latina difieren en vocabulario cotidiano, pronombres, modismos, elección de voces, infraestructura de emisión, clasificaciones por edades, marketing y expectativas sobre lo que suena a diálogo natural.</p><p>{isLatam ? "Durante décadas, el público latinoamericano escuchó un anime adaptado a la región mientras los jugadores seleccionaban el texto en español orientado a España. La incorporación de una opción latinoamericana independiente reconoce que ambas tradiciones están relacionadas, pero no son equivalentes." : "La traducción de los juegos para España se consolidó antes de que existiera una opción latinoamericana en los juegos principales. Su longevidad explica por qué el español de España aparece antes en la cronología de los juegos principales, aunque la historia del anime en América Latina comenzó meses antes."}</p><aside><b>Los nombres son solo una capa</b><p>La mayoría de las grafías de especie coinciden en las dos ediciones en español. La distinción regional se aprecia con más claridad en los diálogos, la terminología, el registro, el doblaje, la distribución y el calendario—no en obligar a cada Pokémon a tener dos nombres distintos.</p></aside></article>
    </section>
    <section className="chapter-timeline spanish-timeline">
      <div className="chapter-rail"><span>Hitos temporales</span><b>02</b></div>
      <div className="chapter-events">
        {isLatam ? <>
          <article><time>26 ABR<br />1999</time><div><span>Animación / localización regional</span><h2>Una voz latinoamericana antes que una opción en el juego</h2><p>La adaptación regional del anime consolidó un vocabulario y una tradición interpretativa de Pokémon reconociblemente latinoamericanos mucho antes de que la serie principal reconociera la región en su menú de idiomas.</p><a href="https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_Latin_America" target="_blank" rel="noreferrer">Historial de emisión ↗</a></div></article>
          <article><time>16 OCT<br />2025</time><div><span>Juegos principales / idioma seleccionable</span><h2>El español latinoamericano entra en el juego</h2><p>Leyendas Pokémon: Z-A incluye Español y Español (América Latina) como idiomas compatibles independientes. El sitio oficial es-mx también usa formas regionales como Ciudad Luminalia, lo que hace visible la localización más allá de la etiqueta del menú.</p><a href="https://www.nintendo.com/es-mx/store/products/pokemon-legends-z-a-switch/" target="_blank" rel="noreferrer">Ficha de idiomas de Nintendo México ↗</a></div><ExhibitMedia src="/exhibits/legends-za-latam.jpg" alt="Portada comercial latinoamericana de Leyendas Pokémon: Z-A" label="Edición comercial latinoamericana · 2025" /></article>
        </> : <>
          <article><time>05 OCT<br />1999</time><div><span>Juegos principales / España</span><h2>El español se vuelve jugable</h2><p>Pokémon Edición Roja y Edición Azul iniciaron el linaje en español de España de la serie principal. Este es el hito que se usa para situar a España en la cronología de juegos de la página de inicio.</p><a href="https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_Spain" target="_blank" rel="noreferrer">Registro de lanzamientos en España ↗</a></div><ExhibitMedia src="/exhibits/spanish-red.jpg" alt="Caja española de Pokémon Edición Roja para Game Boy" label="Caja española de juego principal · 1999" tilt="left" /></article>
          <article><time>20 DIC<br />1999</time><div><span>Animación / doblaje de España</span><h2>Le sigue una adaptación televisiva independiente</h2><p>La edición televisiva de España se desarrolló de forma independiente del doblaje latinoamericano. Así, ambos públicos podían compartir las grafías de las especies mientras escuchaban guiones, interpretaciones y decisiones lingüísticas regionales diferentes.</p><a href="https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_Spain" target="_blank" rel="noreferrer">Registro de emisión en España ↗</a></div></article>
        </>}
      </div>
    </section>
    {isLatam && <section className="locale-distinction spanish-distinction"><div><span>Un hito contemporáneo</span><h2>La distinción se volvió<br /><em>visible—y compartible.</em></h2></div><article><p>El anuncio de localización de 2025 fue importante porque los fans llevaban años preguntando por qué una franquicia con un gran público latinoamericano ofrecía un guion de juego orientado a España, pero un anime adaptado a la región. La ficha oficial de idiomas es la prueba decisiva del producto; la publicación contemporánea de un colaborador de la localización conserva cómo presentó el momento alguien que participó en él.</p><a href="https://www.linkedin.com/posts/tomascortijo_pok%C3%A9mon-presents-2272025-activity-7301045323886415872-GPT1" target="_blank" rel="noreferrer">Publicación representativa del anuncio de localización ↗</a></article></section>}
    <SpanishPokedex locale={locale} />
    <section className="chapter-sources"><span>Fuentes de esta edición</span><a href="https://bulbapedia.bulbagarden.net/wiki/List_of_Spanish_Pok%C3%A9mon_names" target="_blank" rel="noreferrer">01 · Índice de nombres en español</a><a href={isLatam ? "https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_Latin_America" : "https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_Spain"} target="_blank" rel="noreferrer">02 · Historia de la región</a><a href={isLatam ? "https://www.nintendo.com/es-mx/store/products/pokemon-legends-z-a-switch/" : "https://legends.pokemon.com/es-es/news/release-date"} target="_blank" rel="noreferrer">03 · Registro oficial del juego regional</a></section>
  </>;
}

function ItalianChapter() {
  return <>
    <section className="arrival-brief italy-arrival">
      <div className="arrival-heading"><span>Llegada y marco de nombres</span><h2>Italia tradujo<br /><em>todo lo que rodea al nombre.</em></h2><p>Pokémon llegó a Italia con ediciones localizadas para Game Boy en el otoño de 1999 y se convirtió en un fenómeno televisivo en enero de 2000. Los juegos, los diálogos, los lugares, los movimientos y los medios eran italianos—aunque casi todas las especies conservaban su grafía inglesa.</p></div>
      <div className="arrival-markers">
        <article><time>05 OCT 1999</time><span>Primera llegada documentada de la franquicia</span><h3>Se lanzan Pokémon Rosso y Blu</h3><p>Las ediciones italianas para Game Boy marcan el primer lanzamiento oficial de la franquicia en la región. Sus títulos y textos se tradujeron, pero Bulbasaur, Charmander, Squirtle y el resto de las especies llegaron con los nombres internacionales en inglés.</p></article>
        <article><time>10 ENE 2000</time><span>Llegada a la televisión de masas</span><h3>Italia 1 emite el primer episodio</h3><p><i>L’inizio di una grande avventura</i> presentó la serie animada a través de Italia 1, de Mediaset. El doblaje conservó los nombres de personajes y especies de la adaptación inglesa, pero dio a la serie un guion, un reparto y una identidad musical italianos.</p></article>
      </div>
      <a href="https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_Italy" target="_blank" rel="noreferrer">Registro de lanzamientos, emisión y doblaje en Italia ↗</a>
    </section>
    <section className="chapter-opening italy-opening">
      <div className="chapter-rail"><span>Método de nombres</span><b>01</b></div>
      <article><p className="dropcap">La localización italiana estableció una distinción duradera entre escritura y pronunciación. La mayoría de los nombres de especie se escriben exactamente como en inglés, pero las referencias italianas los describen con una pronunciación que aproxima el sonido inglés mediante la fonología italiana: Pikachu, por ejemplo, suena aproximadamente <i>pìcaciu</i>.</p><p>Esto no es una ausencia de localización. Las mismas ediciones traducen movimientos, habilidades, objetos, lugares, diálogos, textos de la Pokédex, títulos de episodios y nombres de personajes humanos. Las grafías de especie ocupan una capa internacional protegida dentro de un mundo por lo demás italiano.</p><aside><b>La excepción revela la regla</b><p>Solo 21 de las primeras 1.025 especies tienen una grafía distinta de la inglesa: Tipo Zero y 20 Pokémon paradójicos. Su construcción descriptiva, a modo de título, invitaba a traducirlos de una manera que los nombres propios convencionales no.</p></aside></article>
    </section>
    <section className="chapter-timeline italy-timeline">
      <div className="chapter-rail"><span>Hitos temporales</span><b>02</b></div>
      <div className="chapter-events">
        <article><time>05 OCT<br />1999</time><div><span>Juegos principales / política de nombres en uso</span><h2>Un juego italiano, nombres de especie internacionales</h2><p>Pokémon Rosso y Blu establecen el patrón que todavía define la región: texto del producto traducido junto con grafías de especie en inglés. La decisión distingue notablemente al italiano del francés y el alemán, que reconstruyeron la mayoría de los nombres en sus propias lenguas.</p><a href="https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_Italy" target="_blank" rel="noreferrer">Registro de la franquicia en Italia ↗</a></div><ExhibitMedia src="/exhibits/red-blue.jpg" alt="Cajas de Pokémon Rojo y Azul para Game Boy" label="Pieza de juego principal · lanzamiento italiano" tilt="left" /></article>
        <article><time>2000—<br />2008</time><div><span>Animación / localización musical</span><h2>La televisión italiana crea su propio sonido</h2><p>Durante las diez primeras temporadas de Mediaset, el doblaje italiano usó nueve temas de creación local, incluido uno para Crónicas Pokémon. Bulbapedia señala que Italia es el único doblaje fuera de Asia—aparte del inglés—que creó música original para la serie animada.</p><a href="https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_Italy#Music" target="_blank" rel="noreferrer">Registro musical y de emisión en Italia ↗</a></div></article>
        <article className="italy-exception-event"><time>23 NOV<br />2016</time><div><span>Generación VII / primera excepción de nombre</span><h2>Type: Null pasa a ser Tipo Zero</h2><p>Pokémon Sole y Luna introdujeron la primera especie cuya grafía oficial italiana difiere de la inglesa. Tipo Zero traduce la designación construida en lugar de tratarla como un nombre propio corriente, lo que abrió una excepción muy limitada a una política mantenida durante mucho tiempo.</p><a href="https://www.pokemon.com/it/pokedex/silvally" target="_blank" rel="noreferrer">Registro oficial de la Pokédex italiana ↗</a></div></article>
        <article className="italy-exception-event"><time>18 NOV<br />2022</time><div><span>Generación IX / familia de nombres traducidos</span><h2>Los Pokémon paradójicos amplían la excepción</h2><p>Pokémon Scarlatto y Violetto dieron nombres descriptivos italianos a las especies paradójicas: Great Tusk pasó a ser Grandizanne, Iron Treads pasó a ser Solcoferreo, y el patrón continuó con las incorporaciones posteriores de Paldea. Koraidon y Miraidon conservaron sus grafías internacionales.</p><a href="https://www.pokemon.com/it/novita/affronta-grandizanne-e-solcoferreo-nei-raid-teracristal" target="_blank" rel="noreferrer">Registro oficial de nombres y lanzamiento ↗</a></div></article>
      </div>
    </section>
    <ItalianPokedex />
    <section className="chapter-sources"><span>Fuentes de esta edición</span><a href="https://www.pokemon.com/it/pokedex" target="_blank" rel="noreferrer">01 · Pokédex oficial italiana</a><a href="https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_Italy" target="_blank" rel="noreferrer">02 · Pokémon en Italia</a><a href="https://bulbapedia.bulbagarden.net/wiki/List_of_Italian_Pok%C3%A9mon_names" target="_blank" rel="noreferrer">03 · Índice de nombres en italiano</a><a href="https://www.pokemon.com/it/pokedex/silvally" target="_blank" rel="noreferrer">04 · Registro oficial de Tipo Zero</a><a href="https://www.pokemon.com/it/novita/affronta-grandizanne-e-solcoferreo-nei-raid-teracristal" target="_blank" rel="noreferrer">05 · Registro oficial de los nombres paradójicos</a></section>
  </>;
}

function VietnamChapter() {
  return <>
    <section className="arrival-brief vietnam-arrival">
      <div className="arrival-heading"><span>Llegada y marco de nombres</span><h2>Vietnam localizó<br /><em>el mundo que rodea a los nombres.</em></h2><p>Pokémon llegó al público vietnamita a través de la televisión y las publicaciones a comienzos de la década de 2000. Durante buena parte del registro oficial, los diálogos y la terminología en vietnamita rodearon nombres de especie romanizados del japonés, en lugar de traducidos de nuevo al vietnamita.</p></div>
      <div className="arrival-markers">
        <article><time>2002</time><span>Primera llegada televisiva documentada · día exacto pendiente</span><h3>La serie original llega a VTV3</h3><p>La cadena nacional emitió la serie original con una traducción al vietnamita en voz superpuesta. Un reportaje retrospectivo posterior de VTV confirma que Pokémon ya había aparecido en la programación infantil de VTV3; el registro de emisiones de Bulbapedia fecha esa primera emisión en 2002.</p></article>
        <article><time>2003</time><span>Publicaciones con licencia</span><h3>Pokémon Adventures llega a la imprenta</h3><p>Kim Đồng Publishing House obtuvo la licencia del manga, lo tradujo y publicó los volúmenes 1–12 antes de que terminara la primera tirada. La prensa escrita y la televisión fueron, por tanto, vías tempranas distintas de entrada a la región, cada una con sus propias decisiones de traducción.</p></article>
      </div>
      <a href="https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_Vietnam" target="_blank" rel="noreferrer">Registro de la franquicia y de emisiones en Vietnam ↗</a>
    </section>
    <section className="chapter-opening vietnam-opening">
      <div className="chapter-rail"><span>Método de nombres</span><b>01</b></div>
      <article><p className="dropcap">Un nombre de Pokémon en Vietnam no solía ser ni una importación del inglés ni una traducción descriptiva al vietnamita. El anime oficial, el merchandising, las redes sociales y los materiales web transcribían en gran medida el nombre japonés de la especie en letras latinas: Bulbasaur pasó a ser Fushigidane, Charmander pasó a ser Hitokage, y Pikachu siguió siendo Pikachu.</p><p>Eso convirtió a Vietnam en una región con un sistema de nombres propio, aunque las grafías remitieran a menudo a Japón. La lengua vietnamita dio forma a los diálogos, los movimientos, las habilidades, los objetos y las descripciones que los rodean; la capa de nombres de especie siguió otra política.</p><aside><b>Nota editorial</b><p>Pokélingua las etiqueta como grafías anteriores del mercado vietnamita—no como “traducciones al vietnamita”. La mayoría son romanizaciones de nombres japoneses, y cuatro formas documentadas—Mizugrou, Peplipper, Kewassu y Shigarogo—se apartan notablemente de las romanizaciones japonesas correspondientes.</p></aside></article>
    </section>
    <section className="unofficial-context vietnamese-crystal" id="unofficial-vietnamese-crystal">
      <div><span>Folclore pirata / relevo de traducciones</span><time>c. 2001</time></div>
      <article><h2>“Vietnamese Crystal” en realidad no era vietnamita.</h2><p>El infame cartucho se ganó su apodo porque, según se cuenta, una copia se compró en Vietnam. Su texto está en inglés—no en vietnamita—y los investigadores creen que lo más probable es que pasara del japonés original por una traducción china sin licencia y de ahí a un inglés defectuoso.</p><p>Cada relevo acumuló errores hasta que Pokémon se convirtió en “elf”, los diálogos corrientes produjeron frases como “I am a monster” y una comida casera se transformó en el célebre “Volcano Bakemeat” de internet. La broma también sirve de advertencia: el lugar de venta de un cartucho, su idioma, su ruta de traducción y su apodo son cuatro pruebas distintas.</p><aside><b>Estado de archivo</b><p>No oficial, de origen incierto y excluido de la tabla oficial de nombres vietnamitas. Está aquí porque los cartuchos piratas fueron una de las vías por las que Pokémon cruzó fronteras lingüísticas cuando no existían ediciones locales autorizadas.</p></aside><a href="https://ecruteakforest.com/vietcrystal" target="_blank" rel="noreferrer">Investigación de la cadena de traducción ↗</a>
      </article>
    </section>
    <section className="chapter-timeline vietnam-timeline">
      <div className="chapter-rail"><span>Hitos temporales</span><b>02</b></div>
      <div className="chapter-events">
        <article><time>25 ENE<br />2014</time><div><span>Animación / doblaje completo</span><h2>Negro y Blanco se estrena en HTV3</h2><p>Tras una encuesta al público, HTV3 lanzó un doblaje vietnamita basado directamente en la versión japonesa. Los personajes y los Pokémon conservaron sus nombres japoneses, mientras que los movimientos, las habilidades y los objetos se tradujeron al vietnamita—un registro claro del método de nombres por capas de la región.</p><a href="https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_Vietnam" target="_blank" rel="noreferrer">Registro de emisión y doblaje ↗</a></div><ExhibitMedia src="/exhibits/anime-original.jpg" alt="Póster expositivo de la serie animada de Pokémon" label="Pieza sobre la localización del anime" /></article>
        <article><time>28 SEP<br />2015</time><div><span>Televisión nacional / XY</span><h2>Pokémon regresa en VTV2</h2><p>VTV2 presentó Pokémon, la serie: XY en su franja infantil “Giờ ra chơi”. La cadena describió el regreso con licencia como un reencuentro para los espectadores que recordaban la emisión anterior en VTV3.</p><a href="https://vtv.vn/goc-khan-gia/hom-nay-28-9-pokemon-tro-lai-tren-song-vtv2-20150928154959873.htm" target="_blank" rel="noreferrer">Anuncio contemporáneo · VTV ↗</a></div></article>
        <article><time>17 MAY<br />2019</time><div><span>Archivo digital / primer episodio</span><h2>El viaje original, doblado en línea</h2><p>POPS Kids empezó a subir la serie original desde el episodio 1. A diferencia de la antigua voz superpuesta de VTV3, esta edición se dobló al vietnamita a partir de la versión japonesa, lo que convirtió un recuerdo televisivo fundacional en un archivo a la carta.</p><a href="https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_Vietnam" target="_blank" rel="noreferrer">Historial de subidas ↗</a></div></article>
        <article className="vietnam-policy-event"><time>25 MAY<br />2026</time><div><span>Política oficial de nombres</span><h2>Los nombres ingleses se convierten en el estándar nacional</h2><p>El sitio oficial de Pokémon Vietnam anunció que todo el contenido y los servicios futuros de Pokémon en Vietnam usarían de forma sistemática los nombres de especie en inglés. El aviso reconocía explícitamente a los fans apegados a los nombres anteriores, a la vez que establecía un nuevo estándar de cara al futuro.</p><a href="https://vn.portal-pokemon.com/topics/post-5775/" target="_blank" rel="noreferrer">Anuncio original · Pokémon Vietnam ↗</a></div></article>
        <article><time>30 MAY<br />2026</time><div><span>Animación / política en uso</span><h2>Horizontes llega a VTV2</h2><p>Horizontes Pokémon: la serie se estrenó en vietnamita como <i>Pokémon: Chân Trời Mới</i>. El doblaje usa los nombres de especie en inglés—Sprigatito y Fuecoco—, lo que llevó la nueva política de nombres a un contexto de emisión masiva cinco días después de su anuncio.</p><a href="https://vtv.gov.vn/news/vtv-voi-khan-gia/pokemon-tro-lai-tren-song-vtv2-voi-hanh-trinh-phieu-luu-moi-hap-dan" target="_blank" rel="noreferrer">Registro de emisión · VTV ↗</a></div><ExhibitMedia src="/exhibits/anime-original.jpg" alt="Póster expositivo de la serie animada de Pokémon" label="Pieza sobre la política del anime · 2026" tilt="left" /></article>
      </div>
    </section>
    <VietnamesePokedex />
    <section className="chapter-sources"><span>Fuentes de esta edición</span><a href="https://vn.portal-pokemon.com/topics/post-5775/" target="_blank" rel="noreferrer">01 · Aviso oficial de nombres de 2026</a><a href="https://vn.portal-pokemon.com/play/pokedex" target="_blank" rel="noreferrer">02 · Pokédex oficial actual</a><a href="https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_Vietnam" target="_blank" rel="noreferrer">03 · Índice histórico de Vietnam</a><a href="https://bulbapedia.bulbagarden.net/wiki/User:Raltseye/List_of_Vietnamese_Pok%C3%A9mon_names" target="_blank" rel="noreferrer">04 · Índice de nombres anteriores</a><a href="https://vtv.vn/goc-khan-gia/hom-nay-28-9-pokemon-tro-lai-tren-song-vtv2-20150928154959873.htm" target="_blank" rel="noreferrer">05 · Archivo contemporáneo de VTV</a><a href="https://ecruteakforest.com/vietcrystal" target="_blank" rel="noreferrer">06 · Investigación sobre Vietnamese Crystal</a></section>
  </>;
}

function JapanChapter() {
  return <>
    <section className="arrival-brief japan-arrival">
      <div className="arrival-heading"><span>Punto de origen</span><h2>Antes de la globalización,<br /><em>hubo un mundo local.</em></h2><p>Japón no se trata como la edición “neutral”. Es la primera región concreta: un juego en japonés moldeado por juegos de palabras locales, sistemas de escritura, hábitos mediáticos, empresas y el mercado de Game Boy de 1996.</p></div>
      <div className="arrival-markers"><article><time>27 FEB 1996</time><span>Origen de la franquicia / primeros juegos principales</span><h3>Rojo y Verde se lanzan en Japón</h3><p>Poketto Monsutā Aka y Midori establecieron las criaturas, las regiones, el vocabulario de combate y los primeros 151 nombres japoneses de los que partió toda localización posterior.</p></article><article><time>01 ABR 1997</time><span>La animación amplía el idioma</span><h3>Comienza la serie de televisión</h3><p>El anime dio voz al vocabulario, frases recurrentes y una audiencia nacional semanal, y después se convirtió en uno de los principales vehículos de la franquicia para cruzar fronteras.</p></article></div>
      <a href="https://www.nintendo.com/jp/topics/c/article/ac09b3a5-d9d0-11e5-a9b1-063b7ac45a6d.html" target="_blank" rel="noreferrer">Registro de Nintendo sobre el origen de Rojo y Verde ↗</a>
    </section>
    <section className="chapter-opening japan-opening"><div className="chapter-rail"><span>Idioma de origen</span><b>01</b></div><article><p className="dropcap">Los nombres japoneses de los Pokémon condensan biología, comportamiento, simbolismo sonoro, bromas y pistas visuales en formas breves que funcionan con naturalidad en kana. フシギダネ puede sugerir a la vez una “semilla misteriosa” y la expresión “¿no es extraño?”: una doble lectura que los idiomas posteriores deben recrear, sustituir, explicar o abandonar.</p><p>Por eso Pokélingua separa el kana escrito, una lectura Hepburn y la forma latina oficial registrada como marca. Esos campos facilitan la comparación, pero ninguno convierte el original japonés en un nombre inglés.</p><aside><b>El origen también es una región</b><p>Japón ocupa el primer lugar en la cronología, no un lugar por encima de ella. La exposición trata las decisiones del idioma de origen con las mismas etiquetas de territorio, medio, fecha y evidencia que se usan en todas las demás.</p></aside></article></section>
    <RomanizationGuide locale="japan" />
    <section className="chapter-timeline japan-timeline"><div className="chapter-rail"><span>Hitos temporales</span><b>02</b></div><div className="chapter-events">
      <article><time>27 FEB<br />1996</time><div><span>Juegos principales</span><h2>Entra en juego el primer vocabulario Pokémon</h2><p>Rojo y Verde se lanzan para Game Boy en Japón. El intercambio entre versiones convierte un sistema de nombres local en un vocabulario social compartido.</p><a href="https://www.nintendo.com/jp/topics/c/article/ac09b3a5-d9d0-11e5-a9b1-063b7ac45a6d.html" target="_blank" rel="noreferrer">Historia del lanzamiento según Nintendo ↗</a></div><ExhibitMedia src="/exhibits/red-green.jpg" alt="Cajas japonesas de Pokémon Rojo y Verde" label="Pieza de juego principal · 1996" /></article>
      <article><time>15 OCT<br />1996</time><div><span>Edición revisada</span><h2>Azul revisa el registro original</h2><p>Pokémon Azul llegó después con gráficos y descripciones de la Pokédex revisados, un recordatorio temprano de que ni siquiera la edición de origen quedó congelada tras su lanzamiento.</p><a href="https://www.nintendo.com/jp/topics/c/article/ac09b3a5-d9d0-11e5-a9b1-063b7ac45a6d.html" target="_blank" rel="noreferrer">Comparativa de ediciones de Nintendo ↗</a></div></article>
      <article><time>01 ABR<br />1997</time><div><span>Animación</span><h2>Los nombres se vuelven cultura hablada semanal</h2><p>La serie de televisión lleva Pokémon más allá del texto de los juegos y fija pronunciaciones, voces de personajes, música e historias antes de la expansión internacional.</p><a href="https://www.tv-tokyo.co.jp/anime/pokemon/" target="_blank" rel="noreferrer">Archivo oficial de TV Tokyo ↗</a></div><ExhibitMedia src="/exhibits/anime-original.jpg" alt="Póster de la serie animada original de Pokémon" label="Pieza de anime · serie original" tilt="left" /></article>
      <article><time>23 ABR<br />1998</time><div><span>Estructura empresarial</span><h2>Se funda Pokémon Center Co., Ltd.</h2><p>La empresa, que más tarde pasó a llamarse The Pokémon Company, creó una base organizativa para gestionar una franquicia en rápida expansión y su futuro global.</p><a href="https://corporate.pokemon.co.jp/en/aboutus/history" target="_blank" rel="noreferrer">Historia corporativa oficial ↗</a></div></article>
    </div></section>
    <JapanesePokedex />
    <section className="chapter-sources"><span>Fuentes de esta edición</span><a href="https://www.pokemon.co.jp/ex/zukan/" target="_blank" rel="noreferrer">01 · Pokédex oficial japonesa</a><a href="https://www.nintendo.com/jp/topics/c/article/ac09b3a5-d9d0-11e5-a9b1-063b7ac45a6d.html" target="_blank" rel="noreferrer">02 · Historia de Rojo / Verde según Nintendo</a><a href="https://corporate.pokemon.co.jp/en/aboutus/history" target="_blank" rel="noreferrer">03 · Historia de The Pokémon Company</a><a href="https://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_in_Japanese" target="_blank" rel="noreferrer">04 · Índice de nombres japoneses</a></section>
  </>;
}

function KoreanChapter() {
  return <>
    <section className="arrival-brief korea-arrival">
      <div className="arrival-heading"><span>Política, emisión y primeros juegos</span><h2>Un mundo que no podía<br /><em>importarse sin más.</em></h2><p>La llegada de Pokémon a Corea coincidió con la apertura escalonada de Corea del Sur a la cultura popular japonesa. La emisión, el idioma, el hardware y la estructura empresarial llegaron cada uno con su propio calendario.</p></div>
      <div className="arrival-markers"><article><time>20 OCT 1998</time><span>Contexto de política nacional</span><h3>La primera fase de apertura cultural</h3><p>Corea del Sur anunció una apertura gradual, por categorías, a la cultura popular japonesa. Esto no lanzó Pokémon por sí mismo, pero define las condiciones del mercado en torno a la llegada de la franquicia.</p></article><article><time>14 JUL 1999</time><span>Primera llegada masiva documentada</span><h3>El anime coreano se estrena en SBS</h3><p>El primer episodio en coreano llevó a la televisión un vocabulario localizado de personajes y especies casi tres años antes de que existiera un juego principal traducido oficialmente al coreano.</p></article></div>
      <a href="https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_South_Korea" target="_blank" rel="noreferrer">Historia de lanzamientos en Corea del Sur ↗</a>
    </section>
    <section className="chapter-opening korea-opening"><div className="chapter-rail"><span>Método de nombres</span><b>01</b></div><article><p className="dropcap">Los nombres coreanos de los Pokémon no siguen un único idioma de origen. Algunos son creaciones originales en coreano, otros adaptan el nombre japonés, otros siguen al inglés y otros conservan una forma internacional. 이상해씨 combina “extraño” con “semilla”, mientras que 님피아 sigue al japonés Nymphia y 테일로 sigue al inglés Taillow.</p><p>El hangul es el registro escrito oficial. La romanización es una ayuda de lectura, no un segundo nombre: la Romanización Revisada, el sistema McCune–Reischauer y las grafías propias de cada evento pueden transcribir el mismo hangul de formas distintas.</p><aside><b>Regla de nombres históricos</b><p>La biblioteca solo señala cambios documentados en el propio nombre coreano. No fabrica “variantes” a partir de distintos sistemas de romanización al alfabeto latino.</p></aside></article></section>
    <RomanizationGuide locale="south-korea" />
    <section className="korea-technology">
      <div className="korea-technology-head"><span>Hardware, escritura y compatibilidad</span><h2>La localización también fue<br /><em>un sistema técnico.</em></h2><p>El coreano no avanzó en línea recta por las primeras generaciones. La representación del hangul, la compatibilidad de caracteres y la comunicación entre cartuchos regionales determinaron qué podía lanzarse y qué jugadores podían conectarse.</p></div>
      <div className="korea-technology-grid">
        <article><time>2002 · GEN II</time><h3>El hangul necesitaba el hardware Color</h3><p>A diferencia de las ediciones en otros idiomas, Oro y Plata en coreano eran exclusivos de Game Boy Color. Su memoria adicional era necesaria para mostrar los caracteres coreanos, así que la Game Boy monocromática original no podía ejecutarlos.</p><a href="https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_Gold_and_Silver_Versions" target="_blank" rel="noreferrer">Nota sobre el hardware de Oro y Plata ↗</a></article>
        <article><time>GEN III · SIN SOFTWARE EN COREANO</time><h3>Desaparece una generación localizada</h3><p>Cristal y todos los títulos de la tercera generación se quedaron sin software en coreano. En su lugar, Rubí y Zafiro se importaron en japonés con embalaje y manuales en coreano: un objeto comercial localizado que envolvía un juego sin traducir.</p><a href="https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_South_Korea" target="_blank" rel="noreferrer">Registro de lanzamientos en Corea del Sur ↗</a></article>
        <article><time>14 FEB 2008 · GEN IV</time><h3>El coreano vuelve dentro de una isla de compatibilidad</h3><p>Diamante y Perla en coreano recuperaron los juegos principales localizados, pero las demás ediciones regionales de la cuarta generación carecían de caracteres coreanos. Los intercambios directos en la Sala Unión y el Club Wi-Fi estaban bloqueados; la GTS solo podía conectar las versiones alterando algunos nombres y el texto del Entrenador Original.</p><a href="https://bulbapedia.bulbagarden.net/wiki/Global_Trade_System" target="_blank" rel="noreferrer">Nota sobre la compatibilidad de la cuarta generación ↗</a></article>
        <article><time>21 ABR 2011 · GEN V</time><h3>Negro y Blanco cierran la brecha</h3><p>Negro y Blanco en coreano podían comunicarse con normalidad con las ediciones internacionales. Para los jugadores coreanos, la quinta generación por fin reunió software traducido y plena compatibilidad entre regiones en un mismo lanzamiento.</p><a href="https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_Black_and_White_Versions" target="_blank" rel="noreferrer">Nota sobre la compatibilidad de Negro y Blanco ↗</a></article>
      </div>
    </section>
    <section className="chapter-timeline korea-timeline"><div className="chapter-rail"><span>Hitos temporales</span><b>02</b></div><div className="chapter-events">
      <article><time>14 JUL<br />1999</time><div><span>Animación</span><h2>Pokémon habla coreano en SBS</h2><p>El debut televisivo establece un vocabulario público temprano antes de los juegos principales en coreano.</p><a href="https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_South_Korea" target="_blank" rel="noreferrer">Registro de emisión ↗</a></div><ExhibitMedia src="/exhibits/anime-original.jpg" alt="Póster de la serie animada original de Pokémon" label="Pieza de anime · emisión coreana" /></article>
      <article><time>24 ABR<br />2002</time><div><span>Juegos principales · hardware</span><h2>Oro y Plata llegan en coreano</h2><p>Los primeros juegos principales localizados oficialmente al coreano necesitaban la memoria adicional de la Game Boy Color para mostrar el hangul. Por eso estas ediciones fueron exclusivas de Color, a diferencia de Oro y Plata en otros lugares.</p><a href="https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_Gold_and_Silver_Versions" target="_blank" rel="noreferrer">Historia del juego y del hardware ↗</a></div><ExhibitMedia src="/exhibits/gold-silver-korea.jpg" alt="Cajas coreanas de Pokémon Oro y Plata" label="Pieza de juego principal coreano · 2002" tilt="left" /></article>
      <article><time>AGO<br />2006</time><div><span>Estructura empresarial</span><h2>Se funda Pokémon Korea</h2><p>Una empresa regional propia marcó una nueva fase de organización directa para juegos, cartas, eventos y el mercado coreano en general.</p><a href="https://corporate.pokemon.co.jp/en/aboutus/history/" target="_blank" rel="noreferrer">Historia corporativa oficial ↗</a></div></article>
      <article><time>14 FEB<br />2008</time><div><span>Juegos principales · compatibilidad</span><h2>Diamante y Perla recuperan el texto en coreano</h2><p>La localización regresó tras el vacío de la tercera generación, pero los cartuchos coreanos y no coreanos de la cuarta generación no podían intercambiar directamente porque las ediciones internacionales no incluían datos de caracteres coreanos.</p><a href="https://bulbapedia.bulbagarden.net/wiki/Global_Trade_System" target="_blank" rel="noreferrer">Registro de compatibilidad ↗</a></div><ExhibitMedia src="/exhibits/platinum-korea.png" alt="Portada coreana de Pokémon Platino" label="Pieza coreana de la cuarta generación · Platino" /></article>
      <article><time>21 ABR<br />2011</time><div><span>Juegos principales · compatibilidad</span><h2>Negro y Blanco eliminan la barrera regional</h2><p>Las ediciones coreanas podían comunicarse con juegos de todas las demás regiones sin el problema de texto de la cuarta generación, completando la transición hacia un lanzamiento coreano plenamente interoperable.</p><a href="https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_Black_and_White_Versions" target="_blank" rel="noreferrer">Registro de lanzamiento de la quinta generación ↗</a></div><ExhibitMedia src="/exhibits/white-logo-korea.png" alt="Logotipo coreano de Pokémon Blanco" label="Imagen de marca coreana de la quinta generación · Blanco" tilt="left" /></article>
      <article><time>12 OCT<br />2013</time><div><span>Lanzamiento mundial</span><h2>El coreano se suma al lanzamiento simultáneo</h2><p>Pokémon X e Y se lanzaron en todo el mundo con el coreano disponible desde el primer día, sustituyendo el retraso anterior por un calendario global compartido.</p><a href="https://www.pokemon.com/us/pokemon-news/a-pokemon-first" target="_blank" rel="noreferrer">Anuncio de la época ↗</a></div><ExhibitMedia src="/exhibits/x-box.jpg" alt="Portada de Pokémon X para Nintendo 3DS" label="Pieza de juego principal mundial · 2013" /></article>
    </div></section>
    <KoreanPokedex />
    <section className="chapter-sources"><span>Fuentes de esta edición</span><a href="https://pokemonkorea.com/pokedex" target="_blank" rel="noreferrer">01 · Pokédex oficial coreana</a><a href="https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_South_Korea" target="_blank" rel="noreferrer">02 · Historia en Corea del Sur</a><a href="https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_Gold_and_Silver_Versions" target="_blank" rel="noreferrer">03 · Hardware de Oro y Plata</a><a href="https://bulbapedia.bulbagarden.net/wiki/Global_Trade_System" target="_blank" rel="noreferrer">04 · Compatibilidad de la cuarta generación</a><a href="https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_Black_and_White_Versions" target="_blank" rel="noreferrer">05 · Compatibilidad de la quinta generación</a><a href="https://bulbapedia.bulbagarden.net/wiki/List_of_Korean_Pok%C3%A9mon_names" target="_blank" rel="noreferrer">06 · Índice de nombres coreanos</a><a href="https://theme.archives.go.kr/next/chronology/archiveDetail.do?evntId=0049291994&flag=2" target="_blank" rel="noreferrer">07 · Registro de política de los Archivos Nacionales</a></section>
  </>;
}

function GermanChapter() {
  return <>
    <section className="arrival-brief germany-arrival">
      <div className="arrival-heading"><span>Televisión y primeros juegos</span><h2>Alemania conoció Pokémon<br /><em>dos veces en cinco semanas.</em></h2><p>La serie animada alemana llegó primero, seguida muy de cerca por las ediciones localizadas Rojo y Azul para Game Boy. Juntas establecieron un mundo traducido cuyos compactos nombres de especie se volvieron vocabulario cotidiano.</p></div>
      <div className="arrival-markers"><article><time>01 SEP 1999</time><span>Primera llegada pública documentada</span><h3>RTL II emite “Pika – Pikachu”</h3><p>El primer episodio alemán presentó a Ash, a Pikachu y la terminología localizada a través de la interpretación televisiva antes de que los juegos llegaran a las tiendas.</p></article><article><time>05 OCT 1999</time><span>Primer lanzamiento de un juego principal en alemán</span><h3>Se lanzan Rote y Blaue Edition</h3><p>El registro de lanzamientos de Nintendo en Alemania fecha las ediciones de Game Boy el 5 de octubre. Los jugadores ya podían explorar en alemán toda la aventura, los diálogos, los movimientos, los lugares y los nombres de las criaturas.</p></article></div>
      <a href="https://www.nintendo.com/de-de/Spiele/Game-Boy/Pokemon-Blaue-Edition-266054.html" target="_blank" rel="noreferrer">Registro oficial de lanzamiento de Nintendo ↗</a>
    </section>
    <section className="chapter-opening germany-opening"><div className="chapter-rail"><span>Método de localización</span><b>01</b></div><article><p className="dropcap">Los nombres alemanes suelen comportarse como definiciones en miniatura. Bisasam superpone <i>bizarr</i>, <i>Saurier</i> y <i>Samen</i>; Glumanda une <i>Glut</i> con <i>Salamander</i>. Quien juega puede oír el cuerpo, el tipo o el temperamento de la criatura dentro de un nombre propio compacto.</p><p>El sistema es selectivo, no absoluto. Muchas especies reciben juegos de palabras alemanes propios, mientras que los nombres que ya funcionan bien a nivel internacional pueden quedar sin cambios.</p><aside><b>Lo que añade el desplegable</b><p>Abre cualquier fila del archivo para ver el origen indexado del nombre alemán. La “grafía compartida” se registra como una decisión de localización, no se trata como un dato ausente.</p></aside></article></section>
    <section className="chapter-timeline germany-timeline"><div className="chapter-rail"><span>Hitos temporales</span><b>02</b></div><div className="chapter-events">
      <article><time>01 SEP<br />1999</time><div><span>Animación</span><h2>Comienza la voz alemana de Pokémon</h2><p>RTL II emite el primer episodio e inicia un vocabulario televisivo que crecería junto a los juegos y las cartas coleccionables.</p><a href="https://www.nintendo.com/de-de/News/2009/RTL-II-Sprechercasting-auf-den-Pokemon-Days-257233.html" target="_blank" rel="noreferrer">Registro de aniversario de Nintendo ↗</a></div><ExhibitMedia src="/exhibits/anime-original.jpg" alt="Póster de la serie animada original de Pokémon" label="Pieza de anime · televisión alemana" /></article>
      <article><time>05 OCT<br />1999</time><div><span>Juegos principales</span><h2>Los nombres alemanes entran en la Pokédex</h2><p>Rote y Blaue Edition hacen que el sistema de nombres localizado se pueda buscar, jugar y repetir a lo largo de toda una generación.</p><a href="https://www.nintendo.com/de-de/Spiele/Game-Boy/Pokemon-Blaue-Edition-266054.html" target="_blank" rel="noreferrer">Página oficial de lanzamiento ↗</a></div><ExhibitMedia src="/exhibits/red-blue.jpg" alt="Cajas de Pokémon Rojo y Azul para Game Boy" label="Pieza de juego principal · lanzamiento alemán" tilt="left" /></article>
      <article><time>12 OCT<br />2013</time><div><span>Lanzamiento mundial</span><h2>El alemán pasa a un único reloj global</h2><p>X e Y fueron el primer lanzamiento mundial simultáneo de la serie principal, con el alemán disponible desde el primer día en lugar de seguir una ventana europea aparte.</p><a href="https://www.pokemon.com/us/pokemon-news/a-pokemon-first" target="_blank" rel="noreferrer">Anuncio de la época ↗</a></div></article>
    </div></section>
    <GermanPokedex />
    <section className="chapter-sources"><span>Fuentes de esta edición</span><a href="https://www.pokemon.com/de/pokedex" target="_blank" rel="noreferrer">01 · Pokédex oficial alemana</a><a href="https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_Germany" target="_blank" rel="noreferrer">02 · Historia en Alemania</a><a href="https://bulbapedia.bulbagarden.net/wiki/List_of_German_Pok%C3%A9mon_names" target="_blank" rel="noreferrer">03 · Índice de nombres alemanes</a></section>
  </>;
}

const mediaLocaleCopy = {
  brazil: {
    opening: "La historia de Pokémon en Brasil es mucho más que un idioma que por fin aparece en un juego futuro. Las ediciones localizadas de Rojo y Azul llegaron al mercado en 1998, y el anime en portugués de Brasil se convirtió en un fenómeno de masas al año siguiente. Los juegos, la televisión, las cartas, los servicios móviles y los estudios de doblaje construyeron una edición regional sólida mucho antes de que los textos de los juegos de la serie principal estuvieran disponibles en portugués.",
    distinction: "El portugués de Brasil y el portugués europeo comparten idioma, pero no una misma historia mediática, norma de pronunciación, industria del doblaje ni mercado. Este capítulo sigue específicamente el registro brasileño.",
    arrivalDate: "1998", arrivalTitle: "Pokémon Rojo y Azul llegan a Brasil", arrivalText: "Gradiente distribuyó Pokémon – Versão Vermelha y Pokémon – Versão Azul. El empaque y la presentación comercial se localizaron, pero el software de Game Boy no ofrecía textos en portugués; el día exacto de lanzamiento sigue sin confirmarse.",
    laterDate: "10 MAY 1999", laterTitle: "Se estrena “Pokémon, Eu Escolho Você!”", laterText: "El primer episodio del anime en portugués de Brasil se emitió en RecordTV dentro de Eliana & Alegria. El doblaje se convirtió en el vocabulario hablado central de la región y llegó a Cartoon Network ese mismo año.",
    nameDate: "27 FEB 2026 → 2027", nameTitle: "El portugués pasa de los medios circundantes a los juegos principales", nameText: "La ficha brasileña de Nintendo confirma el Português Brasileiro como idioma seleccionable en Pokémon Winds y Pokémon Waves, que se lanzarán en todo el mundo en 2027. La fecha del anuncio y el año de lanzamiento futuro se registran por separado.",
    sampleLabel: "Nombre de especie localizado documentado", sampleName: "Presa Grande", sampleMeta: "Great Tusk · registro de medios oficiales en portugués de Brasil",
    media: "/exhibits/brazil-horizons.jpg", mediaAlt: "Póster de Pokémon Horizontes en portugués de Brasil", mediaLabel: "Anime en portugués de Brasil · 2024",
    historySource: "https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_Brazil",
    officialSource: "https://www.nintendo.com/pt-br/store/products/pokemon-waves-switch-2/",
    digitalSource: "https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_Brazil#Pok%C3%A9mon_animation",
    libraryTitle: "Índice de medios oficiales en portugués de Brasil",
    libraryStatus: "La mayoría de las especies conservan su grafía inglesa en portugués de Brasil, mientras que Type: Null y los Pokémon paradoja tienen nombres localizados documentados. La tabla registra ambos resultados.",
    libraryHref: "https://bulbapedia.bulbagarden.net/wiki/List_of_Brazilian_Portuguese_Pok%C3%A9mon_names",
    libraryLink: "Abre el índice de nombres en portugués de Brasil",
  },
  thailand: {
    opening: "El vocabulario Pokémon de Tailandia creció primero a través de la televisión y los medios con licencia, no de un juego principal en tailandés. El resultado es una verdadera historia de localización, con su propia escritura, cadenas de televisión, servicios digitales y páginas de referencia oficiales—aunque los nombres de especie suelen seguir la pronunciación japonesa.",
    distinction: "El tailandés es un idioma consolidado en los medios y servicios oficiales. Actualmente no es un idioma seleccionable en los juegos de la serie principal, por lo que este capítulo registra la transcripción y el uso en lugar de inventar una Pokédex traducida aparte.",
    arrivalDate: "24 MAR 2001", arrivalTitle: "El anime se estrena en ModernNine TV", arrivalText: "La primera emisión televisiva tailandesa documentada presentó Pokémon al público de todo el país. Esa llegada precede en más de dos décadas al actual portal oficial tailandés y a sus canales digitales.",
    laterDate: "30 AGO 2024", laterTitle: "Horizontes entra en el archivo oficial tailandés", laterText: "Pokémon Thailand Official publicó en YouTube el primer episodio en tailandés de Pokémon Horizontes, creando un registro público y fechado del doblaje actual.",
    nameDate: "2001—HOY", nameTitle: "Sonido japonés, escritura tailandesa", nameText: "El uso oficial tailandés suele transcribir al tailandés el nombre de especie japonés. La Pokédex oficial, por ejemplo, registra a Primarina como อชิเรน (Ashirene), siguiendo el japonés y no el nombre inglés.",
    sampleLabel: "Registro de nombre verificado", sampleName: "อชิเรน", sampleMeta: "Primarina · del japonés アシレーヌ · Pokédex oficial tailandesa",
    media: "/exhibits/thai-horizons.jpg", mediaAlt: "Ilustración oficial de un episodio de Pokémon Horizontes en tailandés", mediaLabel: "Publicación oficial tailandesa · 2024",
    historySource: "https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_Thailand",
    officialSource: "https://th.portal-pokemon.com/play/pokedex/0730",
    digitalSource: "https://www.youtube.com/watch?v=KHgJk2AB4sM",
    libraryTitle: "Verificación del índice tailandés en curso",
    libraryStatus: "Existe una Pokédex oficial en tailandés, así que esta región podrá admitir con el tiempo un índice de nombres más amplio. Pokélingua aún no ha verificado ni incorporado los 1.025 registros en escritura tailandesa; hasta completar esa revisión documental, la página muestra solo ejemplos con fuente en lugar de presentar una extracción incompleta como una biblioteca terminada.",
    libraryHref: "https://th.portal-pokemon.com/play/pokedex",
    libraryLink: "Explora la Pokédex oficial tailandesa",
  },
  indonesia: {
    opening: "Indonesia demuestra por qué la globalización de Pokémon no puede medirse solo por el menú de idiomas de un juego de consola. El anime estableció una voz indonesia en 2001; hoy, un portal oficial en bahasa indonesia conecta animación, juegos móviles, cartas, productos y eventos para una de las mayores audiencias digitales del sudeste asiático.",
    distinction: "El indonesio es un idioma oficial de los medios y el mercado de Pokémon, pero no es un idioma seleccionable en los juegos de la serie principal. Sus capas de localización mejor documentadas son el doblaje, la publicación web, el ecosistema indonesio del Juego de Cartas Coleccionables y la distribución móvil.",
    arrivalDate: "03 MAR 2001", arrivalTitle: "El anime indonesio se estrena en SCTV", arrivalText: "El primer episodio inauguró la primera emisión oficial documentada de Pokémon en indonesio. El doblaje solía seguir la producción japonesa pero conservaba los nombres propios en inglés, lo que dio lugar a una interpretación localizada sin un catálogo de especies traducido de nuevo.",
    laterDate: "06 AGO 2021", laterTitle: "Nace un archivo digital oficial en indonesio", laterText: "El canal oficial de YouTube de Pokémon Indonesia publicó los primeros cinco episodios de XY doblados al indonesio. Viajes llegó en 2022, y Horizontes comenzó sus estrenos oficiales en televisión y YouTube en abril de 2024.",
    nameDate: "2001—HOY", nameTitle: "Diálogos en indonesio, nombres de especie internacionales", nameText: "La práctica de doblaje documentada suele conservar los nombres propios en inglés de los Pokémon. Pokélingua lo registra como una decisión real de la edición regional en lugar de llenar la tabla con traducciones inventadas al bahasa indonesia.",
    sampleLabel: "Práctica de nomenclatura documentada", sampleName: "Pikachu", sampleMeta: "Nombre de especie internacional conservado · interpretación en indonesio",
    media: "/exhibits/indonesia-pokemon-go.png", mediaAlt: "Arte promocional de Pokémon GO en el portal oficial de apps de Pokémon en Indonesia", mediaLabel: "Portal oficial de apps de Indonesia · Pokémon GO",
    historySource: "https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_Indonesia",
    officialSource: "https://id.portal-pokemon.com/apps/",
    digitalSource: "https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_Indonesia#Pok%C3%A9mon_anime",
    libraryTitle: "Registro de medios oficiales en indonesio",
    libraryStatus: "El doblaje indonesio suele conservar los nombres de especie internacionales en inglés. La tabla permite buscar esa política e indica su nivel de evidencia; no afirma la existencia de un canon aparte de 1.025 nombres traducidos al bahasa indonesia.",
    libraryHref: "https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_Indonesia",
    libraryLink: "Abre el índice histórico de Indonesia",
  },
  portugal: {
    opening: "Pokémon llegó a Portugal a través de juegos en inglés y de una voz televisiva en portugués europeo. El software no se tradujo al portugués, pero el empaque, los manuales, los diálogos, las canciones, los títulos y la terminología crearon a su alrededor una capa de localización considerable.",
    distinction: "El portugués europeo y el de Brasil son tradiciones de producción distintas. El doblaje, la pronunciación, los distribuidores y los títulos traducidos de Portugal merecen un capítulo aparte de la historia de Brasil y de su futuro idioma en los juegos principales.",
    arrivalDate: "02 OCT 1999", arrivalTitle: "El anime se estrena en SIC", arrivalText: "La primera emisión documentada en Portugal presentó una interpretación en portugués europeo que conservaba el conjunto internacional de nombres de especie.",
    laterDate: "c. 2010", laterTitle: "Biggs inicia una nueva etapa de emisión", laterText: "Biggs adquirió la serie hacia el otoño de 2010. La presentación posterior, ya en la etapa de TPCi, amplió la capa visible en portugués, incluida la imagen de temporada localizada en pantalla.",
    nameDate: "1999—HOY", nameTitle: "Nombres internacionales, entorno portugués", nameText: "Los nombres de especie suelen mantenerse internacionales. El trabajo de localización se aprecia sobre todo en los diálogos, los ataques, las canciones, los títulos de episodios, el empaque y los manuales—no en una Pokédex completa traducida aparte.",
    sampleLabel: "Estrategia de nombres de especie", sampleName: "Pikachu", sampleMeta: "Grafía internacional conservada · diálogos en portugués europeo",
    media: "/exhibits/portugal-horizons-logo.png", mediaAlt: "Logotipo del título Pokémon Horizontes en portugués europeo", mediaLabel: "Pokémon Horizontes · pieza del título en Portugal",
    historySource: "https://bulbapedia.bulbagarden.net/wiki/Pokemon_in_Portugal", officialSource: "https://www.pokemon.com/pt", digitalSource: "https://bulbapedia.bulbagarden.net/wiki/Pokemon_in_Portugal#Pok%C3%A9mon_animation",
    libraryTitle: "Registro de nombres internacionales", libraryStatus: "La tabla con búsqueda registra las 1.025 especies con sus nombres internacionales conservados y marca como N/A los años de primer uso por especie sin respaldo documental.", libraryHref: "https://bulbapedia.bulbagarden.net/wiki/Pokemon_in_Portugal", libraryLink: "Abre el índice histórico de Portugal",
  },
  "arab-world": {
    opening: "El Pokémon en árabe cruzó fronteras gracias a la televisión por satélite compartida. Las primeras producciones sirias y libanesas solían partir de la adaptación inglesa y luego remodelaban diálogos y terminología para las familias arabófonas; un renacimiento posterior en streaming se acercó más al material original inglés contemporáneo.",
    distinction: "El árabe abarca muchos territorios, cadenas y centros de doblaje. Este capítulo es regional, en lugar de fingir que un solo país produjo o recibió cada episodio en árabe de la misma manera.",
    arrivalDate: "2000", arrivalTitle: "Pokémon comienza en MBC", arrivalText: "La primera emisión televisiva en árabe llevó un doblaje producido en Siria a un público panárabe. El registro conservado respalda el año, no un único día de estreno para toda la región.",
    laterDate: "2019—2021", laterTitle: "El streaming revive el archivo en árabe", laterText: "Mewtwo contraataca—Evolución devolvió Pokémon oficial en árabe en 2019; Pokémon Viajes le siguió en 2021, tras una larga interrupción.",
    nameDate: "2000—HOY", nameTitle: "Identidades inglesas en escritura árabe", nameText: "La mayoría de las especies conservan identidades derivadas del inglés en escritura árabe. Las primeras adaptaciones podían ser más libres: el Team Rocket pasó a ser la Banda de la Túnica Blanca, Pueblo Paleta se convirtió en Shoreback y Clefable llegó a llamarse Ariala.",
    sampleLabel: "Forma escrita atestiguada en el anime", sampleName: "بيكاتشو", sampleMeta: "Pikachu · Bīkātshū · animación en árabe",
    media: "/exhibits/arabic-pokemon-logo.png", mediaAlt: "Logotipo oficial del título de Pokémon en árabe", mediaLabel: "Tratamiento del título en árabe · era del streaming",
    historySource: "https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_the_Arab_world", officialSource: "https://bulbapedia.bulbagarden.net/wiki/User:Raltseye/List_of_Arabic_Pok%C3%A9mon_names", digitalSource: "https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_the_Arab_world#Pok%C3%A9mon_animation",
    libraryTitle: "Archivo parcial de nombres del anime en árabe", libraryStatus: "Solo se muestran las formas en escritura árabe atestiguadas directamente. El filtro de escritura confirmada aísla esos registros; toda especie sin respaldo sigue como N/A.", libraryHref: "https://bulbapedia.bulbagarden.net/wiki/User:Raltseye/List_of_Arabic_Pok%C3%A9mon_names", libraryLink: "Abre el registro de nombres del anime en árabe",
  },
  philippines: {
    opening: "Filipinas conoció Pokémon primero en inglés y después a través del doblaje al filipino. Ambas tradiciones se superponen: la interpretación y los diálogos locales rodean nombres de especie y gritos característicos que, por lo general, siguen siendo internacionales.",
    distinction: "Un doblaje en filipino no es el mismo artefacto que la emisión filipina en inglés. Registrar ambos explica por qué el público puede compartir un mismo vocabulario de especies y, al mismo tiempo, recordar voces y canales distintos.",
    arrivalDate: "01 OCT 1999", arrivalTitle: "El anime en inglés llega a GMA", arrivalText: "La emisión de GMA asentó Pokémon en la televisión filipina a través de la adaptación en inglés.",
    laterDate: "2008", laterTitle: "Un doblaje en filipino entra en la programación", laterText: "GMA y Alta Productions incorporaron diálogos en filipino. El día exacto del estreno sigue sin confirmarse en el registro disponible.",
    nameDate: "1999—HOY", nameTitle: "Nombres y gritos siguen siendo internacionales", nameText: "Los Pokémon suelen conservar los nombres de especie en inglés y sus vocalizaciones características; los Pokémon que hablan, como Meowth, son una excepción interpretativa notable.",
    sampleLabel: "Estrategia de nombres de especie", sampleName: "Charmander", sampleMeta: "Se conserva la grafía inglesa · diálogos en filipino",
    media: "/exhibits/philippines-portal.png", mediaAlt: "Imagen de título del portal oficial de Pokémon en Filipinas", mediaLabel: "Artefacto del portal oficial de Filipinas",
    historySource: "https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_the_Philippines", officialSource: "https://ph.portal-pokemon.com/about/", digitalSource: "https://ph.portal-pokemon.com/apps/",
    libraryTitle: "Registro filipino de nombres en los medios", libraryStatus: "La tabla completa trata la grafía conservada como prueba de una política, mientras que las fechas de primer uso por especie sin respaldo documental figuran como N/D.", libraryHref: "https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_the_Philippines", libraryLink: "Abre el índice histórico de Filipinas",
  },
  malaysia: {
    opening: "La historia de Pokémon en Malasia transita entre medios en malayo, inglés y chino. Su detalle más revelador está en el origen: una serie en malayo se adaptó directamente del japonés, mientras que otra posterior siguió la versión inglesa.",
    distinction: "Una misma lengua de destino puede dar lugar a guiones, ritmos, chistes y terminología distintos según la edición de origen que reciba el estudio. Malasia hace inusualmente visible esa decisión de producción que suele pasar desapercibida.",
    arrivalDate: "25 NOV 2000", arrivalTitle: "El primer episodio llega a la televisión malasia", arrivalText: "La emisión documentada más antigua inició una historia multilingüe que incluyó presentaciones tanto en inglés como en malayo.",
    laterDate: "02 FEB 2011", laterTitle: "Diamante y Perla llega desde el japonés", laterText: "El doblaje malayo de Diamante y Perla se produjo directamente a partir de la versión japonesa: una distinción importante en la ruta de origen.",
    nameDate: "27 FEB 2017", nameTitle: "Negro y Blanco sigue la fuente inglesa", nameText: "El posterior doblaje malayo de Negro y Blanco se basó en la adaptación inglesa. Los nombres de especie siguieron siendo internacionales, pero la ruta que los rodeaba cambió.",
    sampleLabel: "Estrategia de nombres de especie", sampleName: "Pikachu", sampleMeta: "Nombre internacional · interpretación en malayo · la edición de origen varía",
    media: "/exhibits/malaysia-portal.png", mediaAlt: "Imagen de título del portal oficial de Pokémon en Malasia", mediaLabel: "Artefacto del portal oficial de Malasia",
    historySource: "https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_Malaysia", officialSource: "https://my.portal-pokemon.com/about/", digitalSource: "https://my.portal-pokemon.com/apps/",
    libraryTitle: "Registro malasio de nombres en los medios", libraryStatus: "La tabla completa registra los nombres internacionales conservados; el capítulo documenta la cambiante ruta de origen —japonesa o inglesa— que los rodea.", libraryHref: "https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_Malaysia", libraryLink: "Abre el índice histórico de Malasia",
  },
  israel: {
    opening: "El Pokémon en hebreo conserva las identidades de especie inglesas, pero las escribe de derecha a izquierda. Esa transcripción fija los sonidos en otro alfabeto, mientras que los diálogos en hebreo aportan gramática, interpretación, títulos y contexto cultural.",
    distinction: "El archivo de Israel se define por la ortografía hebrea y por sus propias discontinuidades televisivas. Una larga pausa y un regreso posterior hacen que las fechas sean tan significativas como los diálogos.",
    arrivalDate: "INICIOS DE 2000", arrivalTitle: "El anime en hebreo llega a la televisión", arrivalText: "Israeli Children Channel inició la primera emisión en hebreo. Las fuentes disponibles identifican el periodo, pero no el día exacto del estreno.",
    laterDate: "03 JUL—04 SEP 2016", laterTitle: "Pokémon GO ayuda a recuperar la pantalla", laterText: "Las reposiciones de la serie original volvieron en julio; el 4 de septiembre siguió un nuevo doblaje hebreo de XY, tras años sin episodios recién doblados.",
    nameDate: "2000—HOY", nameTitle: "Sonido inglés, dirección hebrea", nameText: "Las identidades de especie suelen seguir derivando del inglés, mientras que la escritura hebrea las representa de derecha a izquierda. El archivo muestra solo grafías atestiguadas directamente en la animación.",
    sampleLabel: "Forma escrita atestiguada en el anime", sampleName: "פיקאצ'ו", sampleMeta: "Pikachu · animación en hebreo",
    media: "/exhibits/hebrew-pokemon-logo.png", mediaAlt: "Logotipo oficial del título de Pokémon en hebreo", mediaLabel: "Tratamiento del título en hebreo · era del streaming",
    historySource: "https://bulbapedia.bulbagarden.net/wiki/Pokemon_in_Israel", officialSource: "https://bulbapedia.bulbagarden.net/wiki/User:Raltseye/List_of_Hebrew_Pok%C3%A9mon_names", digitalSource: "https://bulbapedia.bulbagarden.net/wiki/Pokemon_in_Israel#Pok%C3%A9mon_animation",
    libraryTitle: "Archivo parcial de nombres del anime en hebreo", libraryStatus: "Solo se muestran las formas en escritura hebrea atestiguadas directamente. Puedes filtrar por registros confirmados; las especies sin respaldo documental figuran como N/D.", libraryHref: "https://bulbapedia.bulbagarden.net/wiki/User:Raltseye/List_of_Hebrew_Pok%C3%A9mon_names", libraryLink: "Abre el registro de nombres del anime en hebreo",
  },
  russia: {
    opening: "La historia de Pokémon en Rusia comenzó con un doblaje televisivo realizado a partir de la adaptación en inglés. Esa ruta de producción influyó en algo más que los diálogos: se conservaron los nombres ingleses de personajes y especies para que la animación siguiera siendo reconocible junto a las cartas importadas y la imagen de marca internacional.",
    distinction: "El ruso es idioma oficial de doblaje y de interfaz en algunas partes de la franquicia, pero no un idioma seleccionable en los juegos principales. Por eso la presentación en cirílico tiene cabida en el archivo sin confundirse con una Pokédex completa renombrada de forma independiente.",
    arrivalDate: "18 DIC 2000", arrivalTitle: "Pokémon se estrena en ORT", arrivalText: "Channel One, entonces conocido como ORT, inició la primera emisión televisiva documentada en ruso. El doblaje se basó en la adaptación inglesa, en lugar de producirse directamente a partir del japonés.",
    laterDate: "2014", laterTitle: "La presentación en pantalla pasa al ruso", laterText: "La etapa de emisión en 2×2 amplió la localización más allá de los diálogos: la imagen de las temporadas, los rótulos de título, los eyecatches y los nombres de Pokémon en pantalla aparecieron en ruso.",
    nameDate: "2000—HOY", nameTitle: "Nombres conservados entre escrituras", nameText: "El doblaje suele mantener el vocabulario de especies inglés, representado en cirílico cuando el medio lo requiere. Se trata de transliteración y adaptación gramatical, no de una prueba de un canon ruso independiente de nombres de especie.",
    sampleLabel: "Práctica de nombres documentada", sampleName: "Покемон", sampleMeta: "Pokémon · plural Покемоны · uso ruso derivado del inglés",
    media: "/exhibits/anime-original.jpg", mediaAlt: "Ilustración original de la serie animada de Pokémon que representa la primera etapa de emisión en Rusia", mediaLabel: "Región con el anime primero · 2000",
    historySource: "https://bulbapedia.bulbagarden.net/wiki/Rossia",
    officialSource: "https://www.netflix.com/title/81665799",
    digitalSource: "https://bulbapedia.bulbagarden.net/wiki/Rossia#Pok%C3%A9mon_anime",
    libraryTitle: "No se reivindica una lista rusa de especies propia",
    libraryStatus: "Los medios rusos suelen conservar los nombres de especie internacionales en inglés y los representan en cirílico cuando es necesario. Esas grafías pueden variar según el medio y la gramática, por lo que Pokélingua no reivindica un canon ruso fijo e independiente de 1.025 nombres. Consulta el índice común en inglés para ver la lista oficial de especies de referencia.",
    libraryHref: "/locales/united-states#name-library",
    libraryLink: "Explora el índice común de especies en inglés",
  },
  turkey: {
    opening: "El primer auge de Pokémon en Türkiye llegó a través de la televisión. Su historia es inusualmente discontinua: a un temprano estreno nacional le siguieron una polémica pública y la interrupción de la emisión, y después un regreso que se desplegó a través de nuevos canales, juegos para móviles localizados y animación digital oficial.",
    distinction: "La localización al turco es más sólida en la animación y en servicios concretos como Pokémon GO. La mayoría de los nombres de especie conservan la forma inglesa, y el turco no se ha ofrecido como idioma seleccionable en los juegos de la serie principal.",
    arrivalDate: "31 ENE 2000", arrivalTitle: "El anime se estrena en ATV", arrivalText: "ATV inició la primera emisión documentada en turco. Pokémon se convirtió rápidamente en una parte muy visible de la cultura televisiva infantil.",
    laterDate: "13 DIC 2000", laterTitle: "Se interrumpe la emisión", laterText: "Tras incidentes relacionados con la seguridad infantil ampliamente difundidos, el gobierno suspendió la serie. Pokémon volvió a la televisión turca el 9 de diciembre de 2002, lo que convierte la interrupción y el regreso en ejes de la historia de esta región.",
    nameDate: "2000—HOY", nameTitle: "Un vocabulario de especies derivado del inglés", nameText: "La mayoría de los nombres de Pokémon en los lanzamientos turcos siguen siendo los ingleses. Las interfaces y los diálogos localizados crean igualmente una edición regional turca, pero no equivalen a un catálogo de criaturas renombrado por completo.",
    sampleLabel: "Estado de la cobertura", sampleName: "Pikachu", sampleMeta: "Se conserva la forma inglesa de la especie · sin nombres turcos en los juegos principales",
    media: "/exhibits/anime-original.jpg", mediaAlt: "Ilustración original de la serie animada de Pokémon que representa la primera etapa de emisión en Türkiye", mediaLabel: "Llegada a la televisión turca · 2000",
    historySource: "https://bulbapedia.bulbagarden.net/wiki/T%C3%BCrkiye",
    officialSource: "https://www.youtube.com/@PokemonTR",
    digitalSource: "https://bulbapedia.bulbagarden.net/wiki/T%C3%BCrkiye#Pok%C3%A9mon_anime",
    libraryTitle: "No se reivindica una lista turca de especies propia",
    libraryStatus: "La animación y los servicios oficiales en turco suelen conservar los nombres internacionales de los Pokémon en inglés. Como no existe una Pokédex de juego principal localizada al turco de forma independiente, una segunda tabla de 1.025 filas solo duplicaría la inglesa y sugeriría un sistema de nombres que las pruebas no respaldan.",
    libraryHref: "/locales/united-states#name-library",
    libraryLink: "Explora el índice común de especies en inglés",
  },
  "hindi-india": {
    opening: "El hindi llevó Pokémon al mercado televisivo masivo de la India y, más tarde, se convirtió en la primera rama en una lengua india con un archivo oficial propio en YouTube. Su historia de nombres es especialmente reveladora: un breve experimento con nombres de especie localizados en hindi fue sustituido después por un único estándar para toda la India derivado del inglés.",
    distinction: "El hindi tiene sus propias fechas de emisión, producciones de voz, canal e historia de políticas de nombres. Mantenerlo separado de una página genérica sobre la India hace visibles esas decisiones, mientras que la visión general de la India puede seguir conectando la distribución compartida.",
    arrivalDate: "12 MAY 2003", arrivalTitle: "Pokémon comienza en hindi en Cartoon Network", arrivalText: "La primera emisión televisiva en la India se lanzó en hindi en Cartoon Network India, lo que estableció la relación lingüística a gran escala más temprana de la franquicia en ese mercado.",
    laterDate: "29 OCT 2021", laterTitle: "Comienza un archivo oficial en hindi en YouTube", laterText: "The Pokémon Company lanzó Viajes Pokémon doblado al hindi en su canal regional oficial de YouTube, lo que convirtió una historia televisiva en una colección digital pública y fechada.",
    nameDate: "SEP 2023 → 25 SEP 2025", nameTitle: "Nombres localizados y, después, un estándar nacional", nameText: "Los servicios en hindi introdujeron nombres de Pokémon localizados en hindi en septiembre de 2023. El 25 de septiembre de 2025, el portal oficial de la India anunció que el hindi se alinearía con el tamil, el telugu y el bengalí con nombres basados en el inglés.",
    sampleLabel: "Política oficial vigente", sampleName: "Nombres basados en el inglés", sampleMeta: "Unificados en hindi, tamil, telugu y bengalí · 25 SEP 2025",
    media: "/exhibits/india-horizons.jpg", mediaAlt: "Ilustración de Horizontes Pokémon para la India que representa la edición oficial en hindi", mediaLabel: "Anime oficial en lenguas de la India",
    historySource: "https://bulbapedia.bulbagarden.net/wiki/Sri_Lanka#India",
    officialSource: "https://in.portal-pokemon.com/topics/pokemon_names_unified_across_india/",
    digitalSource: "https://in.portal-pokemon.com/topics/211029090019_hindi-dubbed_version_of_pokemon_journeys_is_now_available_on_youtube/",
    libraryTitle: "La lista actual sigue nombres basados en el inglés",
    libraryStatus: "La política oficial de 2025 para la India unificó el hindi, el tamil, el telugu y el bengalí en torno a nombres de Pokémon basados en el inglés. Por eso, una tabla independiente en hindi duplicaría la columna de especies en inglés; la historia propia del hindi reside en la escritura, el doblaje y el cambio de política documentado entre 2023 y 2025 que la rodean.",
    libraryHref: "/locales/united-states#name-library",
    libraryLink: "Explora el índice común de especies vigente",
  },
  "tamil-india": {
    opening: "El Pokémon en tamil se desarrolló como una práctica televisiva regional antes de encontrar un hogar digital oficial duradero. La lengua comparte con el hindi y el telugu los hitos de distribución en toda la India, pero sus interpretaciones, su público, su escritura y su archivo son lo bastante distintos como para seguirlos en una página propia.",
    distinction: "La fecha exacta del primer episodio en tamil sigue sin confirmarse en el registro disponible. Pokélingua utiliza el periodo documentado más antiguo en lugar de inventar un día, y gana precisión cuando las fechas de los canales oficiales aportan marcas temporales primarias.",
    arrivalDate: "c. 2004", arrivalTitle: "Se amplía el doblaje regional al tamil", arrivalText: "Hay versiones en tamil documentadas durante las primeras emisiones televisivas en la India, que se vuelven habituales en las temporadas de la etapa de Johto. Las pruebas actuales respaldan el periodo, no una fecha de estreno exacta.",
    laterDate: "14 ENE 2022", laterTitle: "El canal oficial en tamil estrena Viajes", laterText: "Viajes Pokémon se lanzó en un canal oficial de YouTube dedicado al tamil. Horizontes Pokémon se sumó después al archivo semanal del canal en julio de 2024.",
    nameDate: "25 SEP 2025", nameTitle: "Se confirma el estándar común basado en el inglés", nameText: "El portal oficial de la India indica que el tamil, el telugu, el bengalí y el hindi siguen ahora un estándar común de nombres de Pokémon basado en los nombres ingleses. Aquí no se reivindica ninguna Pokédex completa traducida al tamil.",
    sampleLabel: "Política oficial vigente", sampleName: "Nombres basados en el inglés", sampleMeta: "Diálogos y escritura en tamil · estándar común de nombres de especie",
    media: "/exhibits/india-horizons.jpg", mediaAlt: "Ilustración de Horizontes Pokémon para la India que representa la edición oficial en tamil", mediaLabel: "Canal oficial de anime en tamil",
    historySource: "https://bulbapedia.bulbagarden.net/wiki/Sri_Lanka#India",
    officialSource: "https://in.portal-pokemon.com/topics/pokemon_names_unified_across_india/",
    digitalSource: "https://in.portal-pokemon.com/topics/pokemon_horizons_is_now_available_on_youtube_also_pokemon_south_asia_official_english_channel_has_be/",
    libraryTitle: "La lista actual sigue nombres basados en el inglés",
    libraryStatus: "La política oficial de 2025 para la India establece que el tamil comparte con el hindi, el telugu y el bengalí un estándar de nombres de especie basado en el inglés. En lugar de duplicar 1.025 filas en inglés y presentarlas como traducciones, este capítulo enlaza con el índice común y conserva aquí el contexto mediático y de escritura propio del tamil.",
    libraryHref: "/locales/united-states#name-library",
    libraryLink: "Explora el índice común de especies vigente",
  },
  "telugu-india": {
    opening: "El Pokémon en telugu se desarrolló como una práctica televisiva regional antes de encontrar un hogar digital oficial duradero. Su cronología se superpone con la del tamil y el hindi, pero un capítulo dedicado a esta lengua preserva sus propias interpretaciones, escritura, público y registro de publicaciones.",
    distinction: "La fecha exacta del primer episodio en telugu sigue sin confirmarse en el registro disponible. Pokélingua indica con honestidad el periodo documentado más antiguo y solo usa fechas exactas cuando los anuncios de los canales oficiales las respaldan.",
    arrivalDate: "c. 2004", arrivalTitle: "Se amplía el doblaje regional al telugu", arrivalText: "Hay versiones en telugu documentadas durante las primeras emisiones televisivas en la India, que se vuelven habituales en las temporadas de la etapa de Johto. Las pruebas actuales respaldan el periodo, no una fecha de estreno exacta.",
    laterDate: "14 ENE 2022", laterTitle: "El canal oficial en telugu estrena Viajes", laterText: "Viajes Pokémon se lanzó en un canal oficial de YouTube dedicado al telugu. Horizontes Pokémon se sumó después al archivo semanal del canal en julio de 2024.",
    nameDate: "25 SEP 2025", nameTitle: "Se confirma el estándar común basado en el inglés", nameText: "El portal oficial de la India indica que el telugu, el tamil, el bengalí y el hindi siguen ahora un estándar común de nombres de Pokémon basado en los nombres ingleses. Aquí no se reivindica ninguna Pokédex completa traducida al telugu.",
    sampleLabel: "Política oficial vigente", sampleName: "Nombres basados en el inglés", sampleMeta: "Diálogos y escritura en telugu · estándar común de nombres de especie",
    media: "/exhibits/india-horizons.jpg", mediaAlt: "Ilustración de Horizontes Pokémon para la India que representa la edición oficial en telugu", mediaLabel: "Canal oficial de anime en telugu",
    historySource: "https://bulbapedia.bulbagarden.net/wiki/Sri_Lanka#India",
    officialSource: "https://in.portal-pokemon.com/topics/pokemon_names_unified_across_india/",
    digitalSource: "https://in.portal-pokemon.com/topics/pokemon_horizons_is_now_available_on_youtube_also_pokemon_south_asia_official_english_channel_has_be/",
    libraryTitle: "La lista actual sigue nombres basados en el inglés",
    libraryStatus: "La política oficial de 2025 para la India establece que el telugu comparte con el hindi, el tamil y el bengalí un estándar de nombres de especie basado en el inglés. El índice común aporta los nombres completos; esta página registra la escritura, el doblaje, la cronología y la presentación regional del telugu que los rodean.",
    libraryHref: "/locales/united-states#name-library",
    libraryLink: "Explora el índice común de especies vigente",
  },
} as const;

function MediaLocaleChapter({ locale }: { locale: keyof typeof mediaLocaleCopy }) {
  const copy = mediaLocaleCopy[locale];
  return <>
    <section className={`arrival-brief media-arrival media-arrival-${locale}`}>
      <div className="arrival-heading"><span>Región con el anime primero</span><h2>La llegada fue a través<br /><em>de la pantalla.</em></h2><p>Este capítulo distingue un doblaje o servicio regional oficial de la compatibilidad con el idioma seleccionable en los juegos principales. Ambos importan; no son el mismo hito.</p></div>
      <div className="arrival-markers">
        <article><time>{copy.arrivalDate}</time><span>Primera llegada documentada</span><h3>{copy.arrivalTitle}</h3><p>{copy.arrivalText}</p></article>
        <article><time>{copy.laterDate}</time><span>Punto de inflexión posterior</span><h3>{copy.laterTitle}</h3><p>{copy.laterText}</p></article>
      </div>
      <a href={copy.historySource} target="_blank" rel="noreferrer">Rastro documental de la historia regional ↗</a>
    </section>
    <section className="chapter-opening media-locale-opening">
      <div className="chapter-rail"><span>Perspectiva local</span><b>01</b></div>
      <article><p className="dropcap">{copy.opening}</p><aside><b>Por qué existe este capítulo</b><p>{copy.distinction}</p></aside></article>
    </section>
    {locale === "indonesia" && <section className="indonesia-mobile-exhibit">
      <div className="indonesia-mobile-head"><span>Mirada al mercado / el móvil a gran escala</span><h2>El teléfono forma parte<br /><em>de la historia de la localización.</em></h2><p>El informe de Google de 2025 sobre el Sudeste Asiático atribuye a Indonesia aproximadamente el 40 % de las descargas de juegos para móviles de la región y el 35 % de los ingresos de las aplicaciones de juegos. El portal oficial de Pokémon en Indonesia atiende a ese público con un catálogo de aplicaciones propio, y no con una edición localizada de los juegos principales.</p><a href="https://blog.google/intl/id-id/company-news/outreach-initiatives/e-conomy-sea-2025-ekonomi-digital-indonesia-mendekati-gmv-us100-miliar/" target="_blank" rel="noreferrer">Lee el informe de Google sobre el mercado indonesio ↗</a></div>
      <div className="indonesia-app-grid">
        <a href="https://id.portal-pokemon.com/topics/pokemon_go/" target="_blank" rel="noreferrer"><img src="/exhibits/indonesia-pokemon-go.png" alt="Logotipo e ilustración promocional de Pokémon GO" /><span>Juego basado en la ubicación</span><h3>Pokémon GO</h3><p>Una página informativa oficial en indonesio explica el juego y su dinámica en el mundo real.</p></a>
        <a href="https://id.portal-pokemon.com/apps/" target="_blank" rel="noreferrer"><img src="/exhibits/indonesia-tcg-pocket.png" alt="Logotipo e ilustración promocional de Pokémon Trading Card Game Pocket" /><span>Colección de cartas en el móvil</span><h3>Pokémon TCG Pocket</h3><p>La aplicación convive con un ecosistema maduro del JCC físico localizado por separado en indonesio.</p></a>
        <a href="https://id.portal-pokemon.com/topics/210818140837_unite/" target="_blank" rel="noreferrer"><img src="/exhibits/indonesia-pokemon-unite.png" alt="Icono de la aplicación Pokémon UNITE" /><span>22 SEP 2021 · smartphone</span><h3>Pokémon UNITE</h3><p>El anuncio en indonesio aporta una fecha exacta de lanzamiento en móviles y enlaces a las tiendas locales.</p></a>
        <a href="https://id.portal-pokemon.com/apps/" target="_blank" rel="noreferrer"><img src="/exhibits/indonesia-pokemon-sleep.png" alt="Icono de la aplicación Pokémon Sleep" /><span>Aplicación para la vida cotidiana</span><h3>Pokémon Sleep</h3><p>Forma parte de un catálogo del portal indonesio que va más allá de los combates y llega a la rutina diaria.</p></a>
      </div>
      <aside><b>Las cartas forman otra infraestructura</b><p>El Juego de Cartas Coleccionables Pokémon en indonesio tiene su propio sitio oficial de productos, buscador de tiendas y eventos, reglamento, juego organizado y vía de acceso a las Asia Championship Series.</p><a href="https://asia.pokemon-card.com/id/" target="_blank" rel="noreferrer">Entra en el portal del JCC en indonesio ↗</a></aside>
    </section>}
    {locale in romanizationCopy && <RomanizationGuide locale={locale as RomanizationLocale} />}
    <section className="chapter-timeline">
      <div className="chapter-rail"><span>Marcas temporales</span><b>02</b></div>
      <div className="chapter-events">
        <article><time>{copy.laterDate}</time><div><span>Distribución oficial</span><h2>{copy.laterTitle}</h2><p>{copy.laterText}</p><a href={copy.digitalSource} target="_blank" rel="noreferrer">Abre el registro fechado ↗</a></div><ExhibitMedia src={copy.media} alt={copy.mediaAlt} label={copy.mediaLabel} tilt="left" /></article>
        <article className="media-name-event"><time>{copy.nameDate}</time><div><span>Práctica de nombres</span><h2>{copy.nameTitle}</h2><p>{copy.nameText}</p><a href={copy.officialSource} target="_blank" rel="noreferrer">Fuentes de la región ↗</a></div></article>
      </div>
    </section>
    {locale === "brazil" || locale === "russia" || locale === "thailand" || locale === "indonesia" || locale === "portugal" || locale === "arab-world" || locale === "philippines" || locale === "malaysia" || locale === "israel" || locale === "hindi-india" || locale === "tamil-india" || locale === "telugu-india" ? <MediaLocalePokedex locale={locale} /> : <section className="naming-practice" id="name-library">
      <div><span>Estado de la biblioteca de nombres</span><h2>{copy.libraryTitle}</h2><b>{copy.sampleLabel} · {copy.sampleName}</b></div>
      <article><span>Lo que el archivo puede respaldar</span><p>{copy.libraryStatus}</p><p className="coverage-note">Ejemplo ya registrado: {copy.sampleMeta}</p><a className="library-status-link" href={copy.libraryHref} target={copy.libraryHref.startsWith("http") ? "_blank" : undefined} rel={copy.libraryHref.startsWith("http") ? "noreferrer" : undefined}>{copy.libraryLink} ↗</a></article>
    </section>}
    <section className="chapter-question">
      <div className="chapter-rail"><span>Norma del archivo</span><b>03</b></div>
      <article><h2>Un doblaje es una edición regional.<br /><em>No una afirmación sobre el idioma del juego.</em></h2><p>Pokélingua registra la versión que el público conoció realmente: idioma, territorio, cadena o plataforma, práctica de nombres y fecha. Así se preservan estas historias sin sugerir una traducción de la serie principal que no existe.</p><div className="record-example"><span>Modelo de pruebas</span><code>medio: animación / servicio oficial<br />idioma_juego_principal: no<br />sistema_nombres_especie: política documentada<br />fechas desconocidas: se muestran sin confirmar</code></div></article>
    </section>
    <section className="chapter-sources"><span>Fuentes de esta edición</span><a href={copy.historySource} target="_blank" rel="noreferrer">01 · Historia regional</a><a href={copy.officialSource} target="_blank" rel="noreferrer">02 · Registro de nombres / servicio</a><a href={copy.digitalSource} target="_blank" rel="noreferrer">03 · Registro mediático oficial / fechado</a></section>
  </>;
}

function FutureChapter() {
  return <>
    <section className="arrival-brief future-arrival">
      <div className="arrival-heading"><span>Vigilancia de evidencias · actualizado en agosto de 2026</span><h2>La próxima lengua está<br /><em>confirmada. Las demás, no.</em></h2><p>Esta página registra los cambios de localización anunciados sin convertir en promesas los deseos de la comunidad, las ofertas de empleo, los sitios web regionales ni los rumores.</p></div>
      <div className="arrival-markers"><article><time>2027</time><span>Lengua confirmada en un juego principal</span><h3>El portugués brasileño llega a la serie principal</h3><p>La tienda brasileña de Nintendo incluye el Português Brasileiro entre los idiomas compatibles de Pokémon Winds y Pokémon Waves. Los juegos se lanzarán en todo el mundo en Nintendo Switch 2 en 2027.</p></article><article><time>DESPUÉS</time><span>Umbral de evidencia</span><h3>Ninguna otra lengua nueva está confirmada</h3><p>El portugués europeo, el vietnamita, el hindi, el tamil, el telugu, el árabe y otras lenguas solicitadas siguen bajo vigilancia de evidencias: no son localizaciones anunciadas de un juego principal.</p></article></div>
      <a href="https://www.nintendo.com/pt-br/store/products/pokemon-waves-switch-2/" target="_blank" rel="noreferrer">Lista oficial de idiomas compatibles de Nintendo ↗</a>
    </section>
    <section className="chapter-opening future-opening"><div className="chapter-rail"><span>Cómo leer esta página</span><b>01</b></div><article><p className="dropcap">Las evidencias sobre futuras localizaciones tienen distintos niveles. Un idioma seleccionable en la ficha de una plataforma oficial es una confirmación. Un sitio web regional, un tráiler traducido, un doblaje, una oferta de empleo, una campaña de fans o una declaración de un distribuidor pueden mostrar inversión, pero no confirman por sí solos una lengua en un juego principal.</p><p>Pokélingua preserva esa distinción porque la expectativa forma parte de la historia de la globalización, mientras que la certeza exige un producto, una lengua y un compromiso de lanzamiento concretos.</p><aside><b>Confirmado no significa completo</b><p>El anuncio de 2027 confirma el texto del juego en portugués brasileño. La política de nombres de especie, la continuidad terminológica con la animación brasileña y la fecha exacta de lanzamiento aún requieren documentación futura.</p></aside></article></section>
    <section className="future-evidence"><article className="confirmed"><span>Confirmado · 27 FEB 2026</span><h2>Português Brasileiro</h2><p>Pokémon Winds y Pokémon Waves podrán jugarse íntegramente en portugués brasileño en 2027. La lista oficial de idiomas también mantiene el español de España y el español latinoamericano como opciones separadas.</p><ExhibitMedia src="/exhibits/winds-waves.jpg" alt="Anuncio oficial del portugués brasileño para Pokémon Winds y Waves" label="Artefacto del anuncio oficial · 2026" tilt="left" /><a href="https://www.pokemon.co.jp/ex/winds_waves/ja/news/202602_03/" target="_blank" rel="noreferrer">Anuncio oficial de idiomas de Pokémon ↗</a></article><article><span>Sin confirmar</span><h2>Vigilancia de evidencias</h2><p>El portugués europeo cuenta con una página de producto localizada de Nintendo, pero la ficha brasileña de Nintendo identifica la opción seleccionable específicamente como portugués brasileño. Pokémon tiene una actividad considerable de animación en vietnamita y en lenguas de la India, pero ninguna fuente oficial vincula por ahora esas lenguas a un juego principal.</p><p>Este archivo solo pasará una lengua de “vigilancia” a “confirmada” cuando una fuente oficial del producto la mencione explícitamente como compatible.</p></article></section>
    <section className="chapter-sources"><span>Fuentes de esta edición</span><a href="https://www.nintendo.com/pt-br/store/products/pokemon-waves-switch-2/" target="_blank" rel="noreferrer">01 · Lista de idiomas de Nintendo Brasil</a><a href="https://www.pokemon.com/uk/pokemon-news/see-the-new-trailer-for-pokemon-winds-and-pokemon-waves-coming-to-nintendo-switch-2" target="_blank" rel="noreferrer">02 · Anuncio oficial de Pokémon</a><a href="https://windswaves.pokemon.com/pt-br/" target="_blank" rel="noreferrer">03 · Sitio oficial en portugués brasileño</a></section>
  </>;
}

function UnofficialChapter() {
  return <>
    <section className="unofficial-hub-intro">
      <span>Circulación paralela / archivo contextual</span>
      <h2>No es oficial.<br /><em>Pero también es historia.</em></h2>
      <div><p>Las traducciones de fans, los cartuchos piratas y los ROM hacks solían aparecer donde la localización oficial llegaba tarde o no existía. Pueden revelar demanda, experimentos terminológicos, limitaciones técnicas y los extraños caminos que recorrió un texto entre lenguas.</p><p>Este índice nunca trata una formulación no oficial como un nombre oficial de Pokémon. Cada registro está etiquetado según su nivel de evidencia y enlazado con la región donde circuló o donde tiene importancia histórica.</p></div>
    </section>
    <section className="unofficial-archive-grid">
      <article>
        <div className="unofficial-card-meta"><span>ALT / 001</span><time>c. 2001</time><b>Cartucho pirata</b></div>
        <h2>Pokémon Cristal “vietnamita”</h2>
        <p className="unofficial-route">Japonés <i>→</i> chino sin licencia <i>→</i> inglés defectuoso</p>
        <p>Pese al apodo, el juego que se conserva no está en vietnamita. Un cartucho supuestamente comprado en Vietnam se hizo famoso por una probable doble traducción que convirtió a los Pokémon en “elf” y produjo frases surrealistas como “Volcano Bakemeat”.</p>
        <div className="evidence-badge">Origen incierto · no oficial · excluido de las tablas de nombres</div>
        <a href="/locales/vietnam#unofficial-vietnamese-crystal">Léelo en el capítulo de Vietnam →</a>
      </article>
      <article>
        <div className="unofficial-card-meta"><span>ALT / 002</span><time>Antes de 2016</time><b>ROM hacks y cartuchos piratas</b></div>
        <h2>Juegos en chino antes de los juegos oficiales en chino</h2>
        <p className="unofficial-route">Juegos en japonés / inglés <i>→</i> traducciones comunitarias y piratas</p>
        <p>Antes de que Sol y Luna introdujeran el chino simplificado y el chino tradicional oficiales en la serie principal, circulaban por el mercado hacks y cartuchos no oficiales en chino. Su terminología dispar demuestra la demanda, pero no constituye un estándar oficial.</p>
        <div className="evidence-badge">Circulación documentada · terminología variable · no oficial</div>
        <a href="/locales/mainland-china#unofficial-chinese-games">Léelo en el capítulo de China continental →</a>
      </article>
    </section>
    <section className="unofficial-method">
      <span>Criterio de admisión</span><p>Una historia entra en este índice solo cuando explica de forma sustancial cómo Pokémon cruzó una barrera lingüística y cuenta con un rastro documental verificable. La popularidad por sí sola no basta.</p>
      <a href="https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_mainland_China" target="_blank" rel="noreferrer">Registro de juegos no oficiales en chino ↗</a>
      <a href="https://ecruteakforest.com/vietcrystal" target="_blank" rel="noreferrer">Investigación sobre el Cristal vietnamita ↗</a>
    </section>
  </>;
}

export default function LocalePage({ slug }: { slug: Slug }) {
  const chapter = chapters[slug];
  const isChinese = slug === "hong-kong" || slug === "taiwan" || slug === "mainland-china";
  const isMediaLocale = slug in mediaLocaleCopy;

  return <main className="locale-page">
    <nav className="nav locale-nav">
      <a className="brand" href="/"><span className="brand-mark" aria-hidden="true"><i /></span><span>Pokélingua</span></a>
      <a className="back-link" href="/#locales">← Todas las regiones</a>
      <span className="chapter-number">Capítulo regional / {chapter.code}</span>
      <DonateButton /><LanguageToggle />
    </nav>
    <header className="locale-hero">
      <div className="locale-artifact-wall" aria-hidden="true">{localeArtifactWalls[slug as Slug].map((src, index) => <img src={src} alt="" key={`${src}-${index}`} />)}</div>
      <div className="locale-code">{chapter.code}</div>
      <div className="locale-title"><span>{chapter.local}</span><h1>{chapter.place}</h1><p>{chapter.deck}</p></div>
      <div className="locale-details"><div><span>Contexto lingüístico</span><b>{chapter.language}</b></div><div><span>Período en foco</span><b>{chapter.period}</b></div><div><span>Edición del archivo</span><b>{chapter.live ? "Publicado · v0.1" : "Investigación en curso"}</b></div></div>
    </header>
    {isChinese ? <ChineseChapter locale={slug as keyof typeof chineseCopy} /> : isMediaLocale ? <MediaLocaleChapter locale={slug as keyof typeof mediaLocaleCopy} /> : slug === "unofficial" ? <UnofficialChapter /> : slug === "future" ? <FutureChapter /> : slug === "japan" ? <JapanChapter /> : slug === "united-states" ? <UnitedStatesChapter /> : slug === "france" ? <FrenchChapter /> : slug === "germany" ? <GermanChapter /> : slug === "italy" ? <ItalianChapter /> : slug === "spain" || slug === "latin-america" ? <SpanishChapter locale={slug} /> : slug === "south-korea" ? <KoreanChapter /> : slug === "vietnam" ? <VietnamChapter /> : !chapter.live ? <Researching chapter={chapter as (typeof chapters)[Exclude<Slug, "south-korea">]} /> : <>
      <section className="chapter-opening">
        <div className="chapter-rail"><span>Contexto inicial</span><b>01</b></div>
        <article><p className="dropcap">Pokémon no entró en todos los mercados en igualdad de condiciones. En Corea del Sur, su llegada coincidió con una revisión nacional de cómo podía circular la cultura popular japonesa tras décadas de restricciones.</p><p>Esa historia política no explica cada decisión de localización, pero sí establece las condiciones que las rodearon: qué podía importarse, por qué canales y cuándo una franquicia japonesa podía presentarse abiertamente como japonesa.</p><aside><b>Nota editorial</b><p>Este capítulo distingue la apertura gradual a la cultura popular japonesa de los lanzamientos concretos de Pokémon. Una fecha política es contexto, no automáticamente una fecha de lanzamiento de Pokémon.</p></aside></article>
      </section>
      <section className="chapter-timeline">
        <div className="chapter-rail"><span>Hitos temporales</span><b>02</b></div>
        <div className="chapter-events">
          <article><time>20 OCT<br />1998</time><div><span>Contexto político</span><h2>La primera apertura</h2><p>Corea del Sur anuncia la primera etapa de una apertura gradual a la cultura popular japonesa. El Archivo Nacional la describe como un enfoque pensado para avanzar por categorías y por etapas.</p><a href="https://theme.archives.go.kr/next/chronology/archiveDetail.do?evntId=0049291994&flag=2" target="_blank" rel="noreferrer">Fuente primaria · Archivo Nacional de Corea ↗</a></div></article>
          <article><time>AGO<br />2006</time><div><span>Estructura empresarial</span><h2>Una empresa coreana propia</h2><p>Se funda Pokémon Korea, Inc. Es un hito corporativo, no el comienzo de toda la historia de Pokémon en Corea, pero marca un nuevo nivel de organización regional oficial.</p><a href="https://corporate.pokemon.co.jp/en/aboutus/history" target="_blank" rel="noreferrer">Historia oficial · The Pokémon Company ↗</a></div></article>
          <article className="research-event"><time>FECHA<br />PENDIENTE</time><div><span>Próxima revisión de evidencias</span><h2>Juegos, emisiones y nombres</h2><p>La próxima edición fechará de forma independiente la primera animación con licencia, los lanzamientos de juegos en coreano, los estándares de nombres, la distribución del TCG, los sitios web y las publicaciones en canales oficiales.</p><b>Marcado como incompleto: sin fechas supuestas</b></div></article>
        </div>
      </section>
      <section className="chapter-question">
        <div className="chapter-rail"><span>¿Por qué “región”?</span><b>03</b></div>
        <article><h2>한국어 es la lengua.<br /><em>Corea del Sur es la región.</em></h2><p>Esta distinción permite al archivo vincular un nombre en coreano con el producto, el territorio, la fecha, el distribuidor y el público concretos que lo usaron. Si un término cambia más adelante, o aparece de otra forma en otro contexto de habla coreana, el registro anterior sigue visible.</p><div className="record-example"><span>Ejemplo de estructura de registro</span><code>locale: ko-KR<br />medium: televisión animada<br />term: [fuente pendiente]<br />valid_from: [fecha pendiente]<br />evidence: obligatoria</code></div></article>
      </section>
      <section className="chapter-sources"><span>Fuentes de esta edición</span><a href="https://theme.archives.go.kr/next/chronology/archiveDetail.do?evntId=0049291994&flag=2" target="_blank" rel="noreferrer">01 · Archivo Nacional de Corea</a><a href="https://corporate.pokemon.co.jp/en/aboutus/history" target="_blank" rel="noreferrer">02 · Historia corporativa de The Pokémon Company</a><a href="/#locale-notes">Siguiente: explora las notas regionales de China y del español →</a></section>
    </>}
    <footer><a className="brand footer-brand" href="/"><span className="brand-mark" aria-hidden="true"><i /></span><span>Pokélingua</span></a><p>{chapter.place} / capítulo regional</p><a href="/#locales">Sigue explorando ↗</a></footer>
  </main>;
}

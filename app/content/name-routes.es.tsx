import { DonateButton } from "../components/DonateButton";
import { LanguageToggle } from "../components/LanguageToggle";

type RouteKind = "source" | "recreated" | "japanese" | "english" | "hanzi" | "mixed";

const routeFamilies: Array<{ kind: RouteKind; label: string; title: string; text: string; locales: string }> = [
  { kind: "recreated", label: "Significado recreado", title: "Nuevos juegos de palabras en el idioma local", text: "El sonido puede cambiar por completo mientras la anatomía, el comportamiento, el humor u otra pista se reconstruyen para un nuevo público.", locales: "Estados Unidos · Francia · Alemania" },
  { kind: "japanese", label: "El sonido japonés se conserva", title: "Transcripción en lugar de un nuevo nombre", text: "Otro sistema de escritura registra la pronunciación japonesa. El juego de palabras original puede volverse menos evidente, pero la identidad sonora se mantiene cercana.", locales: "Tailandia · Vietnam (etapa histórica) · parte de Corea" },
  { kind: "english", label: "Referencia internacional / inglesa", title: "Un vocabulario de especies compartido", text: "Se conserva la grafía inglesa o internacional, se pronuncia a la manera local o se representa en otra escritura, mientras que los diálogos que la rodean se traducen.", locales: "Italia · España · Latinoamérica · Brasil · Portugal · Filipinas · Malasia · Indonesia · árabe · hebreo · Rusia · Turquía · India actual · Vietnam actual" },
  { kind: "hanzi", label: "Transcreación con caracteres chinos", title: "Sonido, significado o ambos a través del hanzi", text: "Los nombres chinos pueden aproximar un sonido, describir a la criatura, crear un compuesto nuevo o combinar esos métodos. El chino tradicional y el simplificado son formas de escritura; el mandarín y el cantonés son lecturas habladas.", locales: "Hong Kong · Taiwán · China continental" },
  { kind: "mixed", label: "Sistema local mixto", title: "Ninguna fuente se impone", text: "Algunos catálogos combinan acuñaciones locales, formas de origen japonés, formas de origen inglés, nombres internacionales compartidos y revisiones hechas en distintos momentos.", locales: "Corea del Sur · registro histórico en hindi" },
];

const localeRoutes: Array<{ locale: string; local: string; href: string; kind: RouteKind; route: string; note: string; history?: string }> = [
  { locale: "Japón", local: "日本", href: "/locales/japan", kind: "source", route: "Vocabulario de origen", note: "Los nombres japoneses aportan los primeros sonidos, conceptos, juegos de palabras y pistas visuales." },
  { locale: "Estados Unidos", local: "United States", href: "/locales/united-states", kind: "recreated", route: "Recreación en inglés", note: "La mayoría de las primeras especies recibieron nuevos nombres en inglés pensados a partir de sus características." },
  { locale: "Francia", local: "France", href: "/locales/france", kind: "recreated", route: "Recreación en francés", note: "Una tradición muy visible de compuestos y juegos de palabras locales." },
  { locale: "Alemania", local: "Deutschland", href: "/locales/germany", kind: "recreated", route: "Recreación en alemán", note: "Los compuestos suelen reconstruir una pista sobre la criatura dentro del nombre alemán." },
  { locale: "Italia", local: "Italia", href: "/locales/italy", kind: "english", route: "Se conservan los nombres internacionales", note: "La grafía de las especies suele coincidir con la inglesa, con unas pocas excepciones traducidas." },
  { locale: "España", local: "España", href: "/locales/spain", kind: "english", route: "Se conservan los nombres internacionales", note: "Los juegos traducen el mundo que rodea a las criaturas, pero en general comparten los nombres de especie en inglés." },
  { locale: "Latinoamérica", local: "América Latina", href: "/locales/latin-america", kind: "english", route: "Se conservan los nombres internacionales", note: "Su propia tradición mediática en español mantiene, en general, la capa internacional de especies." },
  { locale: "Brasil", local: "Brasil", href: "/locales/brazil", kind: "english", route: "Base inglesa con excepciones", note: "La mayoría de los medios conserva los nombres de especie en inglés; algunas categorías oficiales, como los Pokémon Paradoja, tienen registros localizados." },
  { locale: "Indonesia", local: "Indonesia", href: "/locales/indonesia", kind: "english", route: "Se conservan los nombres internacionales", note: "La animación y los servicios en indonesio suelen conservar la capa de nombres propios en inglés." },
  { locale: "Portugal", local: "Portugal", href: "/locales/portugal", kind: "english", route: "Se conservan los nombres internacionales", note: "El portugués europeo localiza diálogos, canciones, títulos, empaques y manuales en torno al vocabulario de especies compartido." },
  { locale: "Filipinas", local: "Pilipinas", href: "/locales/philippines", kind: "english", route: "Se conservan los nombres internacionales", note: "Las emisiones en inglés y en filipino suelen compartir la capa internacional de especies y sus gritos característicos." },
  { locale: "Malasia", local: "Malaysia", href: "/locales/malaysia", kind: "english", route: "Se conservan los nombres internacionales", note: "La presentación en malayo conserva la capa de especies aunque su edición de origen alterne entre la japonesa y la inglesa." },
  { locale: "Mundo árabe", local: "العالم العربي", href: "/locales/arab-world", kind: "english", route: "Inglés → escritura árabe", note: "Los registros del anime suelen escribir en árabe identidades de origen inglés, con algunas decisiones más libres en los primeros doblajes." },
  { locale: "Israel", local: "ישראל", href: "/locales/israel", kind: "english", route: "Inglés → escritura hebrea", note: "El doblaje representa las identidades de especie conservadas de derecha a izquierda, con ortografía hebrea." },
  { locale: "Corea del Sur", local: "대한민국", href: "/locales/south-korea", kind: "mixed", route: "Sistema coreano mixto", note: "Las acuñaciones coreanas conviven con formas de origen japonés, de origen inglés e internacionales." },
  { locale: "Hong Kong", local: "香港", href: "/locales/hong-kong", kind: "hanzi", route: "Hanzi · lectura en cantonés", note: "Los nombres en caracteres mezclan sonido y significado; las formas antiguas de los medios en cantonés siguen teniendo importancia histórica.", history: "La coordinación de 2016 cambió varios registros ya establecidos." },
  { locale: "Taiwán", local: "台灣", href: "/locales/taiwan", kind: "hanzi", route: "Hanzi · lectura en mandarín", note: "Los caracteres tradicionales recogen un conjunto coordinado de nombres chinos, leídos en el mandarín de Taiwán." },
  { locale: "China continental", local: "中国大陆", href: "/locales/mainland-china", kind: "hanzi", route: "Hanzi · lectura en mandarín", note: "Los caracteres simplificados representan los nombres chinos coordinados, con algunas revisiones posteriores exclusivas del continente." },
  { locale: "Tailandia", local: "ประเทศไทย", href: "/locales/thailand", kind: "japanese", route: "Japonés → escritura tailandesa", note: "La mayoría de los nombres de especie oficiales son transcripciones ortográficas de sus nombres japoneses." },
  { locale: "Vietnam", local: "Việt Nam", href: "/locales/vietnam", kind: "english", route: "Estándar inglés desde 2026", note: "El contenido oficial actual usa los nombres de especie en inglés.", history: "Los medios vietnamitas anteriores solían usar formas de raíz japonesa." },
  { locale: "Rusia", local: "Россия", href: "/locales/russia", kind: "english", route: "Inglés → cirílico", note: "El doblaje suele conservar las identidades de especie de origen inglés y las representa en cirílico cuando es necesario." },
  { locale: "Turquía", local: "Türkiye", href: "/locales/turkey", kind: "english", route: "Se conservan los nombres internacionales", note: "La presentación y los diálogos en turco conviven con el vocabulario de especies en inglés." },
  { locale: "India (panorama)", local: "भारत", href: "/locales/india", kind: "english", route: "Política común de base inglesa", note: "La política nacional actual unifica las ediciones en cada idioma en torno a nombres de base inglesa." },
  { locale: "Hindi en India", local: "हिन्दी", href: "/locales/hindi-india", kind: "english", route: "Estándar inglés desde 2025", note: "Los nombres en hindi se unificaron con el registro de base inglesa del tamil, el telugu y el bengalí.", history: "Desde 2023 existió una capa de nombres propia en hindi en los servicios compatibles." },
  { locale: "Tamil en India", local: "தமிழ்", href: "/locales/tamil-india", kind: "english", route: "Capa de especies de base inglesa", note: "El doblaje sigue siendo en tamil, mientras que las identidades de especie compartidas siguen al inglés." },
  { locale: "Telugu en India", local: "తెలుగు", href: "/locales/telugu-india", kind: "english", route: "Capa de especies de base inglesa", note: "El doblaje sigue siendo en telugu, mientras que las identidades de especie compartidas siguen al inglés." },
];

const bulbasaurRoutes = [
  { code: "JP", script: "フシギダネ", reading: "Fushigidane", route: "source", origin: "fushigi · misterioso + tane · semilla; también evoca “¿no es extraño?”" },
  { code: "EN", script: "Bulbasaur", reading: "Inglés", route: "recreated", origin: "bulb (bulbo) + dinosaur (dinosaurio)" },
  { code: "FR", script: "Bulbizarre", reading: "Francés", route: "recreated", origin: "bulbe (bulbo) + bizarre (extraño)" },
  { code: "DE", script: "Bisasam", reading: "Alemán", route: "recreated", origin: "bizarr (extraño) + Saurier (saurio) + Samen (semilla)" },
  { code: "ZH", script: "妙蛙種子", reading: "Miàowāzhǒngzǐ", route: "hanzi", origin: "maravilloso + rana + semilla" },
  { code: "TH", script: "ฟุชิกิดาเนะ", reading: "Fuchikidane", route: "japanese", origin: "el sonido japonés escrito en escritura tailandesa" },
  { code: "KO", script: "이상해씨", reading: "Isanghaessi", route: "mixed", origin: "extraño + semilla; una recreación coreana" },
];

export default function NameRoutesPage() {
  return <main className="name-routes-page" id="top">
    <nav className="nav name-routes-nav" aria-label="Navegación de Rutas de nombres">
      <a className="brand" href="/" aria-label="Inicio de Pokélingua"><span className="brand-mark" aria-hidden="true"><i /></span><span>Pokélingua</span></a>
      <div className="nav-links"><a href="#routes">Rutas</a><a href="#one-pokemon">Un Pokémon</a><a href="#locale-ledger">Todas las regiones</a><a href="#reflection">Reflexión</a></div>
      <a className="nav-cta" href="/#locales">Explora las regiones <span>↗</span></a>
      <DonateButton /><LanguageToggle />
    </nav>

    <header className="name-routes-hero">
      <div className="name-routes-index"><span>Capítulo comparativo / 02</span><b>名<br />NAME<br />이름</b><small>Sonido · significado · escritura · política</small></div>
      <div className="name-routes-intro"><span>Cómo viaja la identidad de una especie</span><h1>¿Debe un nombre<br /><em>tener sentido?</em></h1><p>Los catálogos globales de Pokémon responden a esa pregunta de formas radicalmente distintas. Unos reconstruyen el juego de palabras japonés. Otros conservan el sonido japonés. Otros heredan el inglés. Y otros usan caracteres para tender un nuevo puente entre sonido y significado.</p><div><a className="primary-button" href="#routes">Sigue las rutas <span>↓</span></a><a className="text-link" href="#reflection">Salta a la pregunta <span>↗</span></a></div></div>
    </header>

    <section className="name-routes-correction">
      <div><span>Verificación / Nombres chinos</span><h2>No son “los mismos kanji”.<br /><em>El hanzi abre otra ruta.</em></h2></div>
      <article><p>Kanji es el término japonés para los caracteres chinos que se usan en japonés. Los nombres chinos de Pokémon se escriben con <b>hanzi</b>, pero no se copian sin más del nombre japonés: muchos nombres de especie japoneses se escriben en kana, y el catálogo chino toma sus propias decisiones.</p><div className="hanzi-examples"><section><span>Prioridad al sonido</span><b lang="zh-Hant">皮卡丘</b><small>Píkǎqiū · Pikachu</small><p>Los caracteres aproximan el sonido conocido.</p></section><section><span>Prioridad al significado</span><b lang="zh-Hant">小火龍</b><small>Xiǎohuǒlóng · Charmander</small><p>“Pequeño dragón de fuego” describe a la criatura.</p></section><section><span>Compuesto</span><b lang="zh-Hant">妙蛙種子</b><small>Miàowāzhǒngzǐ · Bulbasaur</small><p>“Semilla de rana maravillosa” crea una imagen semántica china.</p></section></div><aside><b>Un estándar escrito, varias historias habladas</b><p>El catálogo actual está coordinado entre el chino tradicional y el simplificado, pero el cantonés y el mandarín no pronuncian igual esos caracteres. Por eso Hong Kong, Taiwán y China continental siguen siendo capítulos regionales separados.</p></aside></article>
    </section>

    <section className="name-route-map" id="routes">
      <div className="name-route-map-head"><span>Mapa de rutas / tendencias dominantes</span><h2>Un origen.<br /><em>Cinco caminos hacia fuera.</em></h2><p>Son agrupaciones curatoriales, no familias lingüísticas rígidas. Un mismo catálogo puede pasar de una ruta a otra según la especie, la generación, el medio o la fecha de una política.</p></div>
      <div className="name-route-board"><aside><span>Registro de origen</span><b>日本語</b><strong>Nombres japoneses</strong><p>Sonidos, juegos de palabras, conceptos visuales y referencias culturales entran en circulación.</p><i aria-hidden="true">→</i></aside><div>{routeFamilies.map((family) => <article className={`route-${family.kind}`} key={family.kind}><span>{family.label}</span><h3>{family.title}</h3><p>{family.text}</p><small>{family.locales}</small></article>)}</div></div>
    </section>

    <section className="one-pokemon-routes" id="one-pokemon">
      <div className="one-pokemon-head"><span>Comparación controlada / #0001</span><h2>Deja quieta a la criatura.<br /><em>Mira cómo cambia la estrategia.</em></h2><p>Bulbasaur demuestra por qué “traducido” y “no traducido” son etiquetas insuficientes. Cada ruta conserva una parte distinta del nombre original.</p></div>
      <div className="bulbasaur-route-grid">{bulbasaurRoutes.map((item) => <article className={`route-${item.route}`} key={item.code}><span>{item.code}</span><b lang={item.code === "ZH" ? "zh-Hant" : undefined}>{item.script}</b><small>{item.reading}</small><p>{item.origin}</p></article>)}</div>
      <a href="#pokedex">Abre otro Pokémon en la Pokédex multilingüe →</a>
    </section>

    <section className="locale-route-ledger" id="locale-ledger">
      <div className="locale-route-ledger-head"><div><span>Todas las regiones publicadas / mejor clasificación actual</span><h2>El registro de rutas</h2></div><p>La “ruta dominante” describe la práctica general actual del catálogo. No afirma que todas las especies la sigan. Los cambios históricos de política siguen visibles en lugar de quedar sustituidos por el estándar actual.</p></div>
      <div className="locale-route-grid">{localeRoutes.map((item) => <a href={item.href} className={`locale-route-card route-${item.kind}`} key={item.href}><span>{item.locale}</span><h3>{item.local}</h3><b>{item.route}</b><p>{item.note}</p>{item.history && <small>{item.history}</small>}<i>Abrir región →</i></a>)}</div>
      <div className="route-ledger-note"><b>Fuera de la clasificación</b><p>El capítulo Ediciones no oficiales aporta contexto documental, no un catálogo regional estandarizado. El capítulo Futuro también queda excluido hasta que un producto publicado establezca una práctica de nombres observable.</p></div>
    </section>

    <section className="name-policy-evidence">
      <div><span>Lo que establece el registro público</span><h2>La decisión corporativa es visible.<br /><em>La cultural es más difícil de probar.</em></h2></div>
      <div className="policy-evidence-grid">
        <article><span>Documentado</span><h3>El significado era un objetivo explícito.</h3><p>Junichi Masuda explicó que nombres como Bulbasaur se recrearon para que los jugadores de cada idioma pudieran percibir el significado y los matices del nombre japonés. Los traductores fueron tratados como creadores, no como máquinas de transcribir.</p><a href="https://www.4gamer.net/games/451/G045125/20191112090/" target="_blank" rel="noreferrer">Lee la entrevista a Masuda ↗</a></article>
        <article><span>Documentado</span><h3>La ruta de producción cambió.</h3><p>Antes del flujo de trabajo mundial de X e Y, los guiones de los juegos pasaban del japonés al inglés y de ahí a idiomas como el francés y el alemán. En X e Y, en cambio, se tradujo directamente del japonés a cada idioma disponible.</p><a href="https://iwataasks.nintendo.com/interviews/3ds/pokemonxy/0/0/" target="_blank" rel="noreferrer">Lee Iwata Asks ↗</a></article>
        <article><span>Documentado</span><h3>La coherencia puede pesar más que los nombres locales.</h3><p>La política de India de 2025 unificó el hindi con los nombres de base inglesa que ya se usaban en tamil, telugu y bengalí. Vietnam anunció en 2026 el mismo principio de nombres en inglés para el contenido futuro.</p><div><a href="https://in.portal-pokemon.com/topics/pokemon_names_unified_across_india/" target="_blank" rel="noreferrer">Política de India ↗</a><a href="https://vn.portal-pokemon.com/topics/post-5775/" target="_blank" rel="noreferrer">Política de Vietnam ↗</a></div></article>
        <article className="inference-card"><span>Interpretación—no es una política confirmada</span><h3>La “afinidad cultural” es plausible, pero insuficiente.</h3><p>La familiaridad con los medios japoneses, las rutas de producción del doblaje, las convenciones de escritura, las marcas registradas, el merchandising heredado y el reconocimiento del público pueden influir en un nombre. Salvo que una fuente identifique el motivo, Pokélingua registra la ruta sin inventar una motivación corporativa.</p></article>
      </div>
    </section>

    <section className="name-routes-reflection" id="reflection">
      <span>La pregunta abierta</span><blockquote>¿<em>Tenían</em> que cambiarse<br />los nombres de Pokémon<br />para Occidente?</blockquote><div><p><b>Lingüísticamente, no.</b> El catálogo de raíz japonesa de Tailandia demuestra que un público enorme puede aprender nombres cuyo juego de palabras interno no resulta evidente en su propio idioma. Italia y España demuestran que unos juegos traducidos pueden conservar un vocabulario de especies internacional y compartido.</p><p><b>Creativamente, los primeros equipos tenían un motivo.</b> Los nombres en inglés, francés y alemán intentaban que cada criatura fuera inmediatamente legible, memorable y divertida. No era la única solución posible; era una filosofía de localización—y acabó formando parte de lo que es Pokémon en Occidente.</p></div><strong>La comparación no revela un error. Revela una elección.</strong>
    </section>

    <section className="name-routes-sources"><span>Rastro documental</span><a href="https://www.4gamer.net/games/451/G045125/20191112090/" target="_blank" rel="noreferrer">01 · Masuda sobre conservar el significado</a><a href="https://iwataasks.nintendo.com/interviews/3ds/pokemonxy/0/0/" target="_blank" rel="noreferrer">02 · Flujo de trabajo de localización</a><a href="https://bulbapedia.bulbagarden.net/wiki/List_of_Chinese_Pok%C3%A9mon_names" target="_blank" rel="noreferrer">03 · Registro de nombres chinos</a><a href="https://bulbapedia.bulbagarden.net/wiki/List_of_Thai_Pok%C3%A9mon_names" target="_blank" rel="noreferrer">04 · Registro de nombres tailandeses</a><a href="https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_in_South_Korea" target="_blank" rel="noreferrer">05 · Sistema mixto coreano</a><a href="https://in.portal-pokemon.com/topics/pokemon_names_unified_across_india/" target="_blank" rel="noreferrer">06 · Política de India</a><a href="https://vn.portal-pokemon.com/topics/post-5775/" target="_blank" rel="noreferrer">07 · Política de Vietnam</a></section>

    <footer className="name-routes-footer"><a className="brand footer-brand" href="/"><span className="brand-mark" aria-hidden="true"><i /></span><span>Pokélingua</span></a><p>Un atlas vivo de la localización de Pokémon.</p><a href="#top">Volver arriba ↑</a></footer>
  </main>;
}

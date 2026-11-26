import { DonateButton } from "../components/DonateButton";
import { LanguageToggle } from "../components/LanguageToggle";

const exhibitLenses = [
  { ball: "poke", title: "Los nombres son diseño", text: "Un nombre de Pokémon puede contener a la vez anatomía, sonido, humor, mitología y marketing. Traducirlo implica decidir qué ideas deben sobrevivir—y qué resultará memorable en otro idioma." },
  { ball: "great", title: "Los medios llegan de forma distinta", text: "Un doblaje televisivo puede consolidar una edición regional años antes que un juego traducido. Las cartas, los cines, los sitios web, los servicios móviles y el comercio pueden introducir, cada uno, otro vocabulario y otra fecha oficial." },
  { ball: "master", title: "El público guarda el archivo", text: "Los nombres antiguos no desaparecen cuando una empresa cambia de política. Permanecen en la memoria de la infancia, en emisiones grabadas, en envases, en el habla de los fans y, a veces, en la polémica pública." },
];

const readingRoutes = [
  { label: "Por lugar", title: "Entra en una región", text: "Sigue las llegadas, los sistemas de nombres, las escrituras, las cadenas, los lanzamientos y las revisiones de un territorio.", href: "/#locales", action: "Abre el atlas de regiones" },
  { label: "Por criatura", title: "Abre la Pokédex", text: "Fija la especie y compara en qué se convirtió su nombre en los archivos lingüísticos ya completados.", href: "#pokedex", action: "Compara entre idiomas" },
  { label: "Por época", title: "Sigue la cronología", text: "Compara la expansión corporativa, los idiomas jugables, los doblajes oficiales del anime y las decisiones de nombres propias de cada región.", href: "/history", action: "Abre Historia" },
  { label: "Por ruta de nombres", title: "Rastrea la fuente", text: "Descubre qué regiones reconstruyen el significado japonés, conservan el sonido japonés, heredan los nombres en inglés o crean otra ruta.", href: "/name-routes", action: "Sigue los nombres" },
];

export default function AboutExhibitPage() {
  return <main className="introduction-page">
    <nav className="nav intro-nav" aria-label="Navegación de Sobre la exposición">
      <a className="brand" href="/" aria-label="Página de inicio de Pokélingua"><span className="brand-mark" aria-hidden="true"><i /></span><span>Pokélingua</span></a>
      <div className="nav-links"><a href="#premise">Premisa</a><a href="#lenses">Enfoques de la exposición</a><a href="#reading">Cómo explorar</a></div>
      <a className="nav-cta" href="/#locales">Entra en el atlas <span>↗</span></a>
      <DonateButton /><LanguageToggle />
    </nav>

    <header className="intro-hero" id="top">
      <div className="intro-hero-index"><span>Declaración curatorial</span><b>SOBRE<br />000</b><small>Nombres · medios · mercados · memoria</small></div>
      <div className="intro-hero-copy">
        <p className="eyebrow"><span className="pulse" /> Por qué existe esta exposición</p>
        <h1>Cómo un mundo local se convirtió<br /><em>en un idioma global.</em></h1>
        <p className="intro-hero-lede">Pokémon es uno de los ejemplos vivos más claros de globalización cultural: un mundo creado en japonés, reinterpretado una y otra vez para nuevos lugares y vuelto familiar a través de juegos, voces, nombres, imágenes, productos y rituales compartidos.</p>
        <div className="intro-hero-actions"><a className="primary-button" href="#premise">Lee la declaración <span>↓</span></a><a className="text-link" href="/#locales">Salta al atlas <span>→</span></a></div>
      </div>
    </header>

    <section className="intro-premise" id="premise">
      <div><span>Premisa de la exposición / 01</span><h2>El éxito global no fue<br /><em>una simple exportación.</em></h2></div>
      <article>
        <p className="intro-dropcap">Pokémon no se volvió mundial solo porque el mismo objeto se enviara a todas partes. Su éxito dependió de miles de decisiones: qué podía seguir siendo japonés, qué había que traducir, qué debía cambiar de nombre, cómo podía viajar un chiste y qué voz o escritura haría que ese mundo se sintiera local.</p>
        <p>Un niño podía descubrir Pokémon a través de un cartucho de Game Boy en un país, un episodio doblado en televisión en otro, una carta coleccionable en un tercero o un canal oficial de YouTube décadas después. No son versiones secundarias que orbitan alrededor de un único lanzamiento “real”. Juntas, son la historia de cómo la franquicia se volvió global.</p>
        <aside><b>La idea central</b><p>La localización no es el último paso después de la creación. Es uno de los procesos mediante los cuales Pokémon se volvió culturalmente legible, emocionalmente familiar y duradero a lo largo de generaciones.</p></aside>
      </article>
    </section>

    <section className="intro-process" aria-label="Proceso de globalización cultural">
      <div><span>Origen</span><b>Conceptos, nombres y medios japoneses</b></div><i aria-hidden="true">→</i>
      <div><span>Interpretación</span><b>Idioma, políticas y criterio regional</b></div><i aria-hidden="true">→</i>
      <div><span>Circulación</span><b>Juegos, animación, cartas, web y comercio</b></div><i aria-hidden="true">→</i>
      <div><span>Memoria</span><b>El vocabulario local se vuelve historia cultural</b></div>
    </section>

    <section className="intro-lenses" id="lenses">
      <div className="intro-lenses-head"><span>Tres enfoques de la exposición / 02</span><h2>La traducción deja<br /><em>rastro.</em></h2><p>Pokélingua trata cada nombre, fecha, escritura y lanzamiento como el registro de una decisión—no como una curiosidad desligada de las personas y los medios que la transmitieron.</p></div>
      <div className="intro-lens-grid">{exhibitLenses.map((lens) => <article key={lens.title}><div className={`intro-lens-ball ${lens.ball}`} aria-hidden="true"><i /><span /></div><h3>{lens.title}</h3><p>{lens.text}</p></article>)}</div>
    </section>

    <section className="intro-record">
      <div><span>Lo que registra el atlas / 03</span><h2>Un mismo hecho puede tener<br /><em>varias fechas verdaderas.</em></h2></div>
      <div className="intro-record-grid">
        <article><b>Territorio</b><p>Dónde tomó forma la historia de este público y de su distribución.</p></article>
        <article><b>Idioma y escritura</b><p>Qué se habló, escribió, romanizó, conservó o acuñó por primera vez.</p></article>
        <article><b>Medio</b><p>Si la evidencia procede de un juego principal, un doblaje, una carta, un sitio web, un producto o un evento.</p></article>
        <article><b>Marca temporal</b><p>Cuándo apareció por primera vez esa versión, cambió de política o entró en un archivo oficial.</p></article>
        <article><b>Origen del nombre</b><p>Las palabras, sonidos, mitos y conceptos que contiene un nombre de Pokémon localizado.</p></article>
        <article><b>Nivel de evidencia</b><p>Qué es oficial, histórico, no oficial, sin resolver o aún pendiente de una fuente sólida.</p></article>
      </div>
    </section>

    <section className="intro-reading" id="reading">
      <div className="intro-reading-head"><span>Elige una entrada / 04</span><h2>No hay una única ruta<br /><em>por la exposición.</em></h2></div>
      <div className="intro-reading-grid">{readingRoutes.map((route) => <a href={route.href} key={route.label}><span>{route.label}</span><h3>{route.title}</h3><p>{route.text}</p><b>{route.action} →</b></a>)}</div>
    </section>

    <section className="intro-closing">
      <span>Pokélingua / una exposición viva</span>
      <blockquote>Un mundo.<br />Muchos Pokémon.<br /><em>Muchas historias de cómo se volvió familiar.</em></blockquote>
      <p>Este archivo educativo independiente está hecho para crecer. Su propósito no es declarar definitiva una localización, sino situar cada versión en su propio territorio, medio, idioma y momento.</p>
      <a className="primary-button" href="/#locales">Empieza por el atlas de regiones <span>↗</span></a>
    </section>

    <footer className="intro-footer"><a className="brand" href="/"><span>Pokélingua</span></a><p>Independiente, no oficial y sin afiliación con Nintendo, Creatures, Game Freak ni The Pokémon Company.</p><a href="/">Volver al inicio ↑</a></footer>
  </main>;
}

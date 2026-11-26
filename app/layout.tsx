import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "./components/LanguageProvider";
import { PokedexDrawer } from "./components/PokedexDrawer";
import { getLang } from "./i18n-server";

const copy = {
  en: {
    title: "Pokélingua — A living atlas of Pokémon localization",
    description: "Trace how Pokémon names, stories, and media crossed borders—and what changed along the way.",
    ogTitle: "Pokélingua — One world. Many Pokémon.",
    ogDescription: "A living atlas of Pokémon localization.",
  },
  es: {
    title: "Pokélingua — Un atlas vivo de la localización de Pokémon",
    description: "Descubre cómo los nombres, las historias y los medios de Pokémon cruzaron fronteras, y qué cambió en el camino.",
    ogTitle: "Pokélingua — Un mundo. Muchos Pokémon.",
    ogDescription: "Un atlas vivo de la localización de Pokémon.",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  const t = copy[lang];
  return {
    metadataBase: new URL("https://pokelingua.vercel.app"),
    title: t.title,
    description: t.description,
    icons: {
      icon: [
        { url: "/favicon-64-v3.png", type: "image/png", sizes: "64x64" },
      ],
      shortcut: "/favicon-64-v3.png",
      apple: "/apple-touch-icon-v3.png",
    },
    openGraph: {
      title: t.ogTitle,
      description: t.ogDescription,
      type: "website",
      locale: lang === "es" ? "es_ES" : "en_US",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: t.ogTitle }],
    },
    twitter: { card: "summary_large_image", images: ["/og.png"] },
  };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const lang = await getLang();
  return <html lang={lang}><body><LanguageProvider lang={lang}>{children}<PokedexDrawer /></LanguageProvider></body></html>;
}

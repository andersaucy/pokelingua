import type { Metadata } from "next";
import AboutEn from "../content/about.en";
import AboutEs from "../content/about.es";
import { getLang } from "../i18n-server";

const metadata: Record<"en" | "es", Metadata> = {
  en: {
    title: "About the Exhibit — Pokélingua",
    description: "Why Pokémon localization is a history of cultural globalization across names, games, animation, and regional media.",
  },
  es: {
    title: "Sobre la exposición — Pokélingua",
    description: "Por qué la localización de Pokémon es una historia de globalización cultural a través de nombres, juegos, animación y medios regionales.",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return metadata[await getLang()];
}

export default async function AboutExhibitPage() {
  return (await getLang()) === "es" ? <AboutEs /> : <AboutEn />;
}

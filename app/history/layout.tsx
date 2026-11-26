import type { Metadata } from "next";
import { getLang } from "../i18n-server";

const metadata: Record<"en" | "es", Metadata> = {
  en: {
    title: "History — Pokélingua",
    description: "A sourced history of Pokémon globalization across companies, games, anime, and locale-specific naming decisions.",
  },
  es: {
    title: "Historia — Pokélingua",
    description: "Una historia documentada de la globalización de Pokémon a través de empresas, juegos, anime y decisiones de nombres propias de cada región.",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return metadata[await getLang()];
}

export default function HistoryLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}

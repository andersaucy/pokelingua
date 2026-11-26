import type { Metadata } from "next";
import { getLang } from "../i18n-server";

const metadata: Record<"en" | "es", Metadata> = {
  en: {
    title: "History — Pokélingua",
    description: "A sourced chronology of the games, anime dubs, companies, and locale decisions that made Pokémon global.",
  },
  es: {
    title: "Historia — Pokélingua",
    description: "Una cronología documentada de los juegos, doblajes de anime, empresas y decisiones regionales que hicieron global a Pokémon.",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return metadata[await getLang()];
}

export default function TimelineLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}

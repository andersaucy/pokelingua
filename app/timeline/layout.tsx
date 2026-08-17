import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Timeline — Pokélingua",
  description: "A sourced chronology of the games, anime dubs, companies, and locale decisions that made Pokémon global.",
};

export default function TimelineLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "History — Pokélingua",
  description: "A sourced history of Pokémon globalization across companies, games, anime, and locale-specific naming decisions.",
};

export default function HistoryLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}

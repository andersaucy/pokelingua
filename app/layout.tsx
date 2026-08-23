import type { Metadata } from "next";
import "./globals.css";
import { PokedexDrawer } from "./components/PokedexDrawer";

export const metadata: Metadata = {
  metadataBase: new URL("https://pokelingua.vercel.app"),
  title: "Pokélingua — A living atlas of Pokémon localization",
  description: "Trace how Pokémon names, stories, and media crossed borders—and what changed along the way.",
  icons: {
    icon: [
      { url: "/favicon-64-v3.png", type: "image/png", sizes: "64x64" },
    ],
    shortcut: "/favicon-64-v3.png",
    apple: "/apple-touch-icon-v3.png",
  },
  openGraph: {
    title: "Pokélingua — One world. Many Pokémon.",
    description: "A living atlas of Pokémon localization.",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Pokélingua — One world. Many Pokémon." }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}<PokedexDrawer /></body></html>;
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pokélingua — A living atlas of Pokémon localization",
  description: "Trace how Pokémon names, stories, and media crossed borders—and what changed along the way.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "Pokélingua — One world. Many Pokémon.",
    description: "A living atlas of Pokémon localization.",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Pokélingua — One world. Many Pokémon." }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}

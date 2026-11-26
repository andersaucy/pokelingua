import type { Metadata } from "next";
import NameRoutesEn from "../content/name-routes.en";
import NameRoutesEs from "../content/name-routes.es";
import { getLang } from "../i18n-server";

const metadata: Record<"en" | "es", Metadata> = {
  en: {
    title: "Name Routes — Pokélingua",
    description: "A visual exhibition of how Pokémon names travel through Japanese sound, English reference forms, local wordplay, Chinese characters, and changing regional policies.",
  },
  es: {
    title: "Rutas de nombres — Pokélingua",
    description: "Una exposición visual de cómo viajan los nombres Pokémon a través del sonido japonés, las formas de referencia en inglés, los juegos de palabras locales, los caracteres chinos y las políticas regionales cambiantes.",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return metadata[await getLang()];
}

export default async function NameRoutesPage() {
  return (await getLang()) === "es" ? <NameRoutesEs /> : <NameRoutesEn />;
}

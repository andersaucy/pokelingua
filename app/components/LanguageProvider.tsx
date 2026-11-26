"use client";

import { createContext, useContext } from "react";
import type { Lang } from "../i18n";

const LanguageContext = createContext<Lang>("en");

export function LanguageProvider({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return <LanguageContext value={lang}>{children}</LanguageContext>;
}

export function useLang() {
  return useContext(LanguageContext);
}

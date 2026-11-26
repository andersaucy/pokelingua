"use client";

import { useLang } from "./LanguageProvider";

const TIP_URL = "https://streamlabs.com/andersaucy/tip";

const copy = {
  en: { title: "Even the smallest amount keeps the dream alive. · 連最小的抖內能為我夢想加火。", aria: "Support Pokélingua — leave a tip", label: "Support" },
  es: { title: "Hasta la cantidad más pequeña mantiene vivo el sueño. · 連最小的抖內能為我夢想加火。", aria: "Apoya a Pokélingua: deja una propina", label: "Apoyar" },
};

export function DonateButton() {
  const t = copy[useLang()];
  return (
    <a
      className="nav-donate"
      href={TIP_URL}
      target="_blank"
      rel="noopener noreferrer"
      title={t.title}
      aria-label={t.aria}
    >
      <span className="nav-donate-mark" aria-hidden="true">♥</span>
      <span className="nav-donate-label">{t.label}</span>
    </a>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { LANG_COOKIE, languageOptions, type Lang } from "../i18n";
import { useLang } from "./LanguageProvider";

function persistLang(lang: Lang) {
  document.cookie = `${LANG_COOKIE}=${lang}; path=/; max-age=31536000; samesite=lax`;
}

export function LanguageToggle() {
  const lang = useLang();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const choose = (next: Lang) => {
    if (next === lang) return;
    persistLang(next);
    startTransition(() => router.refresh());
  };

  return (
    <div className={`lang-toggle${pending ? " pending" : ""}`} role="group" aria-label={lang === "es" ? "Idioma del sitio" : "Site language"}>
      {languageOptions.map((option) => (
        <button
          key={option.code}
          type="button"
          lang={option.code}
          title={option.name}
          aria-label={option.name}
          aria-pressed={lang === option.code}
          onClick={() => choose(option.code)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

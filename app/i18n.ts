export type Lang = "en" | "es";

export const LANG_COOKIE = "lang";

export const languageOptions: Array<{ code: Lang; label: string; name: string }> = [
  { code: "en", label: "EN", name: "English" },
  { code: "es", label: "ES", name: "Español" },
];

export function toLang(value: string | undefined | null): Lang {
  return value === "es" ? "es" : "en";
}

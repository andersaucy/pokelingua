import etymologies from "../data/nameEtymologies.json";
import { nameYear, type NameLocale } from "../data/nameDates";
import type { Lang } from "../i18n";
import { useLang } from "./LanguageProvider";

export type OriginField = "english" | "japanese" | "french" | "german" | "italian" | "korean" | "chineseMandarin" | "chineseCantonese" | "vietnamese";
type OriginItem = { label: string; field: OriginField; fallbackField?: OriginField; locale?: NameLocale; year?: string };

const byId = new Map(etymologies.map((entry) => [entry.id, entry]));

const copy = {
  en: { english: "English", origin: "Name origin", year: "First documented name year · ", source: (name: string) => `Source note for ${name} ↗` },
  es: { english: "Inglés", origin: "Origen del nombre", year: "Primer año documentado del nombre · ", source: (name: string) => `Nota de fuente sobre ${name} ↗` },
};

export function expandedOrigin(origin: (typeof etymologies)[number], field: OriginField, fallbackField?: OriginField, lang: Lang = "en") {
  const value = origin[field] || (fallbackField ? origin[fallbackField] : "");
  if (/^Same as English name/i.test(value) && origin.english) return `${value}. ${copy[lang].english}: ${origin.english}`;
  return value;
}

export function nameOriginFor(id: number, field: OriginField, fallbackField?: OriginField, lang: Lang = "en") {
  const origin = byId.get(id);
  return origin ? expandedOrigin(origin, field, fallbackField, lang) || "N/A" : "N/A";
}

export function NameEtymology({ id, name, items }: { id: number; name: string; items: OriginItem[] }) {
  const lang = useLang();
  const t = copy[lang];
  const origin = byId.get(id);
  if (!origin) return null;
  const visible = items.map((item) => ({ ...item, text: expandedOrigin(origin, item.field, item.fallbackField, lang) })).filter((item) => item.text);
  if (!visible.length) return null;
  const articleUrl = `https://bulbapedia.bulbagarden.net/wiki/${encodeURIComponent(name.replaceAll(" ", "_"))}_(Pok%C3%A9mon)#Name_origin`;

  return <div className="dex-etymology">
    <span>{t.origin}</span>
    <div className="dex-origin-grid">
      {visible.map((item) => <section key={`${item.label}-${item.field}`}><b>{item.label}</b><time>{t.year}{item.year ?? (item.locale ? nameYear(id, item.locale) : "N/A")}</time><p>{item.text}</p></section>)}
    </div>
    <a href={articleUrl} target="_blank" rel="noreferrer">{t.source(name)}</a>
  </div>;
}

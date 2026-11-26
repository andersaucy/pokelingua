import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LocalePageEn, { chapters as chaptersEn, type Slug } from "../../content/locale.en";
import LocalePageEs, { chapters as chaptersEs } from "../../content/locale.es";
import { getLang } from "../../i18n-server";

function isSlug(slug: string): slug is Slug {
  return slug in chaptersEn;
}

export function generateStaticParams() { return Object.keys(chaptersEn).map((slug) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (!isSlug(slug)) return {};
  const chapter = (await getLang()) === "es" ? chaptersEs[slug] : chaptersEn[slug];
  return { title: `${chapter.place} — Pokélingua`, description: chapter.deck };
}

export default async function LocalePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!isSlug(slug)) notFound();
  return (await getLang()) === "es" ? <LocalePageEs slug={slug} /> : <LocalePageEn slug={slug} />;
}

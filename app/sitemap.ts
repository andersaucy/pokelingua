import type { MetadataRoute } from "next";

const baseUrl = "https://pokelingua.vercel.app";

const localeSlugs = [
  "unofficial",
  "united-states",
  "japan",
  "south-korea",
  "france",
  "germany",
  "italy",
  "spain",
  "latin-america",
  "hong-kong",
  "taiwan",
  "mainland-china",
  "india",
  "hindi-india",
  "tamil-india",
  "telugu-india",
  "thailand",
  "indonesia",
  "portugal",
  "arab-world",
  "philippines",
  "malaysia",
  "israel",
  "russia",
  "turkey",
  "brazil",
  "vietnam",
  "future",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const chapters = localeSlugs.map((slug) => ({
    url: `${baseUrl}/locales/${slug}`,
    changeFrequency: "monthly" as const,
    priority: slug === "unofficial" || slug === "future" ? 0.6 : 0.8,
  }));

  return [
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/history`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/name-routes`, changeFrequency: "monthly", priority: 0.8 },
    ...chapters,
  ];
}

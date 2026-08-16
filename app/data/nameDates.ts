export type NameLocale = "japan" | "united-states" | "germany" | "italy" | "france" | "south-korea" | "hong-kong" | "taiwan" | "mainland-china" | "vietnam";

const generations = [151, 251, 386, 493, 649, 721, 809, 905, 1025];
const years: Record<NameLocale, Array<number | null>> = {
  japan: [1996, 1999, 2002, 2006, 2010, 2013, 2016, 2019, 2022],
  "united-states": [1998, 2000, 2003, 2007, 2011, 2013, 2016, 2019, 2022],
  germany: [1999, 2001, 2003, 2007, 2011, 2013, 2016, 2019, 2022],
  italy: [1999, 2001, 2003, 2007, 2011, 2013, 2016, 2019, 2022],
  france: [1999, 2001, 2003, 2007, 2011, 2013, 2016, 2019, 2022],
  "south-korea": [null, 2002, null, 2008, 2011, 2013, 2016, 2019, 2022],
  "hong-kong": [2016, 2016, 2016, 2016, 2016, 2016, 2016, 2019, 2022],
  taiwan: [2016, 2016, 2016, 2016, 2016, 2016, 2016, 2019, 2022],
  "mainland-china": [2016, 2016, 2016, 2016, 2016, 2016, 2016, 2019, 2022],
  vietnam: [2026, 2026, 2026, 2026, 2026, 2026, 2026, 2026, 2026],
};

export function generationFor(id: number) { return generations.findIndex((last) => id <= last); }

export function nameYear(id: number, locale: NameLocale) {
  const generation = generationFor(id);
  return generation < 0 ? "N/A" : years[locale][generation]?.toString() ?? "N/A";
}

export const dateMethodNote = "Year denotes the earliest defensible introduction of this locale’s current name through a localized core game or coordinated naming standard. N/A means the archive cannot yet support a species-level first-use year; it does not mean the name was unused.";

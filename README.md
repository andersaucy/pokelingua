# Pokélingua

**One world. Many Pokémon.**

Pokélingua is a living digital exhibition about how Pokémon crossed borders. It treats localization as cultural history—not merely translation—by connecting creature names to a particular locale, script, medium, release, company decision, and moment in time.

## Explore the exhibition

The homepage locale grid can be sorted by either the first localized core-series game or the first official anime dub; locales without the selected milestone move to the end. A clickable visual timeline offers the same two historical lenses and continues to a Future evidence desk for announced localizations. Each finished name-library chapter combines an arrival brief, dated timeline, localization notes, sources, and a searchable index covering all 1,025 Pokémon through Pecharunt.

The current edition includes twelve full name-library chapters plus six anime-first localization chapters:

- Japan — the Japanese source vocabulary and 1996 origin point
- United States — the English reinvention that became an international reference
- Germany — German compounds, wordplay, and creature clues
- Italy — retained English spellings and a small set of translated exceptions
- Spain — the European Spanish core-game lineage established by Red and Blue in 1999
- Latin America — a regional dub tradition and the first selectable Latin American Spanish core-game edition in Legends: Z-A
- France — a distinctive French naming system built around adaptation and wordplay
- South Korea — Hangul names, import-policy context, and documented earlier game variants
- Hong Kong — Cantonese readings, established regional names, and Chinese-name unification
- Taiwan — Mandarin, Traditional Chinese, and a separate Taiwan media history
- Mainland China — Simplified Chinese, official entry, and pre-2016 unofficial translation context
- Vietnam — Japanese-rooted earlier names and the English-name standard announced in 2026
- Thailand — a 2001 television debut, Japanese-rooted Thai transcriptions, and an official regional Pokédex
- Russia — an English-derived dub, Cyrillic presentation, and retained international species names
- Türkiye — the 2000 television arrival, its interruption and return, and English-derived naming practice
- Hindi in India — the 2003 broadcast debut, official digital archive, and the 2023–2025 name-policy change
- Tamil in India — regional dubbing, a dedicated official channel, and the shared English-based name standard
- Telugu in India — regional dubbing, a dedicated official channel, and the shared English-based name standard

The broader India overview and Brazil remain visible as research-stage chapters so the shape of the growing atlas is public. Anime-first chapters intentionally do not fabricate 1,025 translated names: where a locale retains Japanese or English species forms, the exhibition documents that naming practice and adds individual records only when a reliable source supports them.

## Search names across the world

The homepage has a dedicated multilingual Pokémon search. A visitor can enter a name in English, Japanese, French, German, Italian, Spanish, Korean, Chinese, or an indexed Vietnam-market form and see the matching species aligned across every completed locale.

Inside each locale, the complete Pokédex can be searched by local name, English name, readings or romanizations where relevant, and National Pokédex number. Expanding a row reveals:

- the current official locale record
- documented historical spellings or names where evidence is available
- script and romanization distinctions
- an indexed name etymology with a link to its source note
- the earliest defensible year for that locale’s current name, or `N/A` where the archive cannot yet support a species-level date

Name origins are derived from Bulbapedia’s species articles and presented as research annotations, not as original linguistic claims by this project.

## The Unofficial archive

[`/locales/unofficial`](https://pokelingua.vercel.app/locales/unofficial) is a separate contextual index for fan translations, bootlegs, and ROM hacks that helped Pokémon cross language gaps outside official localization. Stories such as Pokémon Vietnamese Crystal and unofficial Chinese-language game editions link back to the relevant locale chapters without being mixed into the official name tables.

The admission rule is deliberately narrow: an unofficial edition belongs when it materially explains a localization gap and has a traceable evidence trail—not simply because it is unusual or popular.

## Editorial method

Pokélingua separates language from locale. “Traditional Chinese,” for example, identifies a writing system; it does not collapse Hong Kong Cantonese and Taiwan Mandarin into one historical experience. The same principle applies to European and Latin American Spanish, and to Brazilian and European Portuguese.

Dates identify what happened in a particular medium: a game release, television broadcast, corporate milestone, terminology change, official upload, or preserved public reaction. Primary and official sources are preferred; secondary indexes are used transparently where they consolidate records that would otherwise remain scattered.

The first-name year is deliberately conservative. Generation launch years are used when a localized core game or coordinated naming standard supplies the first defensible date; `N/A` signals missing species-level evidence, not that the name was absent. The exhibition also places documented game box art and anime imagery beside the events they illustrate, preserving an exhibit-label relationship between object and claim.

## Run locally

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Build and deploy

```bash
npm run build
```

The project uses Next.js and is deployed through Vercel. Pushing future updates to the connected GitHub repository can trigger a fresh deployment while the public exhibition remains online.

## Project status

Pokélingua is an independent, evolving research exhibition. The interface and full current-name indexes are operational; historical coverage will continue to deepen as dated, medium-specific evidence is verified.

Pokémon and related names are trademarks of Nintendo, Creatures, GAME FREAK, and The Pokémon Company. This project is not affiliated with or endorsed by them.

"use client";

import { useMemo, useState } from "react";
import chinesePokemon from "../data/chinesePokemon.json";
import englishUsPokemon from "../data/englishUsPokemon.json";
import frenchPokemon from "../data/frenchPokemon.json";
import germanPokemon from "../data/germanPokemon.json";
import italianPokemon from "../data/italianPokemon.json";
import koreanPokemon from "../data/koreanPokemon.json";
import vietnamesePokemon from "../data/vietnamesePokemon.json";
import { spanishPokemon } from "../data/spanishPokemon";
import { dateMethodNote, nameYear } from "../data/nameDates";
import { nameOriginFor, type OriginField } from "./NameEtymology";

const frenchById = new Map(frenchPokemon.map((entry) => [entry.id, entry]));
const germanById = new Map(germanPokemon.map((entry) => [entry.id, entry]));
const italianById = new Map(italianPokemon.map((entry) => [entry.id, entry]));
const koreanById = new Map(koreanPokemon.map((entry) => [entry.id, entry]));
const chineseById = new Map(chinesePokemon.map((entry) => [entry.id, entry]));
const vietnameseById = new Map(vietnamesePokemon.map((entry) => [entry.id, entry]));
const spanishById = new Map(spanishPokemon.map((entry) => [entry.id, entry]));

const records = englishUsPokemon.map((english) => ({
  english,
  french: frenchById.get(english.id)!,
  german: germanById.get(english.id)!,
  italian: italianById.get(english.id)!,
  korean: koreanById.get(english.id)!,
  chinese: chineseById.get(english.id)!,
  vietnamese: vietnameseById.get(english.id)!,
  spanish: spanishById.get(english.id)!,
}));

function searchText(record: (typeof records)[number]) {
  return [record.english.id, record.english.english, record.english.kana, record.english.hepburn, record.english.trademark,
    record.french.french, record.french.legacy ?? "", record.german.german, record.italian.italian,
    record.korean.hangul, record.korean.revised, record.korean.mccune, record.korean.officialRomanization,
    record.korean.historical?.name ?? "", record.chinese.traditional, record.chinese.simplified, record.chinese.pinyin,
    record.chinese.cantonese, ...record.chinese.historical.flatMap((item) => [item.name, item.reading]),
    record.vietnamese.current, record.vietnamese.historical, record.spanish.spanish].join(" ").toLocaleLowerCase();
}

function GlobalNameCard({ href, label, name, reading, id, field, locale, fallbackField }: { href: string; label: string; name: string; reading?: string; id: number; field: OriginField; locale: Parameters<typeof nameYear>[1]; fallbackField?: OriginField }) {
  return <div className="global-name-card">
    <a href={href}><span>{label}</span><b>{name}</b>{reading && <small>{reading}</small>}</a>
    <details><summary>Origin · {nameYear(id, locale)}</summary><p>{nameOriginFor(id, field, fallbackField)}</p></details>
  </div>;
}

export function GlobalPokemonSearch() {
  const [query, setQuery] = useState("");
  const normalized = query.trim().toLocaleLowerCase();
  const matches = useMemo(() => normalized.length < 2 ? [] : records.filter((record) => searchText(record).includes(normalized)).slice(0, 12), [normalized]);

  return <section className="global-search" id="pokemon-search">
    <div className="section-kicker">02 / Search across languages</div>
    <div className="global-search-head"><div><span>One species · every indexed locale</span><h2>What is this Pokémon<br /><em>called around the world?</em></h2></div><p>Search any English, Japanese, French, German, Italian, Spanish, Korean, Chinese, or Vietnam-market name. Pokélingua joins the matching species across every completed archive.</p></div>
    <label className="pokemon-search-box"><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try Charmander, Glumanda, Salamèche, 파이리, 小火龍, or Hitokage…" aria-label="Search Pokémon names across all languages" /><kbd>{normalized.length >= 2 ? `${matches.length}${matches.length === 12 ? "+" : ""} matches` : "1,025 species"}</kbd></label>
    {!normalized && <div className="search-suggestion-row"><span>Try a multilingual trail</span>{["Pikachu", "Bisasam", "Salamèche", "파이리", "比卡超", "Hitokage"].map((name) => <button onClick={() => setQuery(name)} key={name}>{name}</button>)}</div>}
    {normalized.length === 1 && <p className="global-search-prompt">Type one more character to begin searching the full multilingual index.</p>}
    {normalized.length >= 2 && !matches.length && <p className="global-search-prompt">No indexed species name matches “{query}”. Try another spelling, reading, script, or Pokédex number.</p>}
    {!!matches.length && <div className="global-results">
      {matches.map((record) => <article className="global-result" key={record.english.id}>
        <header><img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${record.english.id}.png`} alt="" /><div><span>#{String(record.english.id).padStart(4, "0")}</span><h3>{record.english.english}</h3><p lang="ja">{record.english.kana} · {record.english.hepburn}</p></div></header>
        <div className="global-name-grid">
          <GlobalNameCard href="/locales/japan#name-library" label="Japan · 日本語" name={record.english.kana} reading={record.english.hepburn} id={record.english.id} field="japanese" locale="japan" />
          <GlobalNameCard href="/locales/united-states#name-library" label="United States · English" name={record.english.english} id={record.english.id} field="english" locale="united-states" />
          <GlobalNameCard href="/locales/germany#name-library" label="Germany · Deutsch" name={record.german.german} id={record.english.id} field="german" locale="germany" />
          <GlobalNameCard href="/locales/italy#name-library" label="Italy · Italiano" name={record.italian.italian} id={record.english.id} field="italian" locale="italy" />
          <GlobalNameCard href="/locales/france#name-library" label="France · Français" name={record.french.french} id={record.english.id} field="french" locale="france" />
          <GlobalNameCard href="/locales/spain#name-library" label="Spain · Español" name={record.spanish.spanish} id={record.english.id} field="english" locale="spain" />
          <GlobalNameCard href="/locales/latin-america#name-library" label="Latin America · Español" name={record.spanish.spanish} id={record.english.id} field="english" locale="latin-america" />
          <GlobalNameCard href="/locales/south-korea#name-library" label="South Korea · 한국어" name={record.korean.hangul} reading={record.korean.revised} id={record.english.id} field="korean" locale="south-korea" />
          <GlobalNameCard href="/locales/hong-kong#name-library" label="Hong Kong · Cantonese" name={record.chinese.traditional} reading={record.chinese.cantonese} id={record.english.id} field="chineseCantonese" locale="hong-kong" />
          <GlobalNameCard href="/locales/taiwan#name-library" label="Taiwan · Mandarin" name={record.chinese.traditional} reading={record.chinese.pinyin} id={record.english.id} field="chineseMandarin" locale="taiwan" />
          <GlobalNameCard href="/locales/mainland-china#name-library" label="Mainland China · Mandarin" name={record.chinese.simplified} reading={record.chinese.pinyin} id={record.english.id} field="chineseMandarin" locale="mainland-china" />
          <GlobalNameCard href="/locales/vietnam#name-library" label="Vietnam · current / earlier" name={record.vietnamese.current} reading={record.vietnamese.changed ? `Earlier: ${record.vietnamese.historical}` : "Same across indexed eras"} id={record.english.id} field="english" locale="vietnam" />
        </div>
      </article>)}
    </div>}
    <p className="global-search-note">Results reflect the completed twelve-locale name-library edition. Locale links open the full archive, where historical spellings and name origins remain attached to each record. {dateMethodNote}</p>
  </section>;
}

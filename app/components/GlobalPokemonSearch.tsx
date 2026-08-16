"use client";

import { useMemo, useState } from "react";
import chinesePokemon from "../data/chinesePokemon.json";
import englishUsPokemon from "../data/englishUsPokemon.json";
import frenchPokemon from "../data/frenchPokemon.json";
import germanPokemon from "../data/germanPokemon.json";
import italianPokemon from "../data/italianPokemon.json";
import koreanPokemon from "../data/koreanPokemon.json";
import vietnamesePokemon from "../data/vietnamesePokemon.json";

const frenchById = new Map(frenchPokemon.map((entry) => [entry.id, entry]));
const germanById = new Map(germanPokemon.map((entry) => [entry.id, entry]));
const italianById = new Map(italianPokemon.map((entry) => [entry.id, entry]));
const koreanById = new Map(koreanPokemon.map((entry) => [entry.id, entry]));
const chineseById = new Map(chinesePokemon.map((entry) => [entry.id, entry]));
const vietnameseById = new Map(vietnamesePokemon.map((entry) => [entry.id, entry]));

const records = englishUsPokemon.map((english) => ({
  english,
  french: frenchById.get(english.id)!,
  german: germanById.get(english.id)!,
  italian: italianById.get(english.id)!,
  korean: koreanById.get(english.id)!,
  chinese: chineseById.get(english.id)!,
  vietnamese: vietnameseById.get(english.id)!,
}));

function searchText(record: (typeof records)[number]) {
  return [record.english.id, record.english.english, record.english.kana, record.english.hepburn, record.english.trademark,
    record.french.french, record.french.legacy ?? "", record.german.german, record.italian.italian,
    record.korean.hangul, record.korean.revised, record.korean.mccune, record.korean.officialRomanization,
    record.korean.historical?.name ?? "", record.chinese.traditional, record.chinese.simplified, record.chinese.pinyin,
    record.chinese.cantonese, ...record.chinese.historical.flatMap((item) => [item.name, item.reading]),
    record.vietnamese.current, record.vietnamese.historical].join(" ").toLocaleLowerCase();
}

export function GlobalPokemonSearch() {
  const [query, setQuery] = useState("");
  const normalized = query.trim().toLocaleLowerCase();
  const matches = useMemo(() => normalized.length < 2 ? [] : records.filter((record) => searchText(record).includes(normalized)).slice(0, 12), [normalized]);

  return <section className="global-search" id="pokemon-search">
    <div className="section-kicker">02 / Search across languages</div>
    <div className="global-search-head"><div><span>One species · every indexed locale</span><h2>What is this Pokémon<br /><em>called around the world?</em></h2></div><p>Search any English, Japanese, French, German, Italian, Korean, Chinese, or Vietnam-market name. Pokélingua joins the matching species across every completed archive.</p></div>
    <label className="pokemon-search-box"><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try Charmander, Glumanda, Salamèche, 파이리, 小火龍, or Hitokage…" aria-label="Search Pokémon names across all languages" /><kbd>{normalized.length >= 2 ? `${matches.length}${matches.length === 12 ? "+" : ""} matches` : "1,025 species"}</kbd></label>
    {!normalized && <div className="search-suggestion-row"><span>Try a multilingual trail</span>{["Pikachu", "Bisasam", "Salamèche", "파이리", "比卡超", "Hitokage"].map((name) => <button onClick={() => setQuery(name)} key={name}>{name}</button>)}</div>}
    {normalized.length === 1 && <p className="global-search-prompt">Type one more character to begin searching the full multilingual index.</p>}
    {normalized.length >= 2 && !matches.length && <p className="global-search-prompt">No indexed species name matches “{query}”. Try another spelling, reading, script, or Pokédex number.</p>}
    {!!matches.length && <div className="global-results">
      {matches.map((record) => <article className="global-result" key={record.english.id}>
        <header><img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${record.english.id}.png`} alt="" /><div><span>#{String(record.english.id).padStart(4, "0")}</span><h3>{record.english.english}</h3><p lang="ja">{record.english.kana} · {record.english.hepburn}</p></div></header>
        <div className="global-name-grid">
          <a href="/locales/japan#name-library"><span>Japan · 日本語</span><b lang="ja">{record.english.kana}</b><small>{record.english.hepburn}</small></a>
          <a href="/locales/united-states#name-library"><span>United States · English</span><b>{record.english.english}</b></a>
          <a href="/locales/germany#name-library"><span>Germany · Deutsch</span><b lang="de">{record.german.german}</b></a>
          <a href="/locales/italy#name-library"><span>Italy · Italiano</span><b lang="it">{record.italian.italian}</b></a>
          <a href="/locales/france#name-library"><span>France · Français</span><b lang="fr">{record.french.french}</b></a>
          <a href="/locales/south-korea#name-library"><span>South Korea · 한국어</span><b lang="ko">{record.korean.hangul}</b><small>{record.korean.revised}</small></a>
          <a href="/locales/hong-kong#name-library"><span>Hong Kong · Cantonese</span><b lang="zh-Hant">{record.chinese.traditional}</b><small>{record.chinese.cantonese}</small></a>
          <a href="/locales/taiwan#name-library"><span>Taiwan · Mandarin</span><b lang="zh-Hant">{record.chinese.traditional}</b><small>{record.chinese.pinyin}</small></a>
          <a href="/locales/mainland-china#name-library"><span>Mainland China · Mandarin</span><b lang="zh-Hans">{record.chinese.simplified}</b><small>{record.chinese.pinyin}</small></a>
          <a href="/locales/vietnam#name-library"><span>Vietnam · current / earlier</span><b>{record.vietnamese.current}</b><small>{record.vietnamese.changed ? `Earlier: ${record.vietnamese.historical}` : "Same across indexed eras"}</small></a>
        </div>
      </article>)}
    </div>}
    <p className="global-search-note">Results reflect the completed ten-locale edition. Locale links open the full archive, where historical spellings and name origins remain attached to each record.</p>
  </section>;
}

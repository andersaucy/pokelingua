"use client";

import { useState } from "react";

type LocaleMarker = {
  id: string;
  slug: string;
  flag: string;
  place: string;
  local: string;
  languages: string;
  x: number; // percentage from left
  y: number; // percentage from top
  coreYear: number | null;
  animeYear: number | null;
};

const localeMarkers: LocaleMarker[] = [
  { id: "jp", slug: "japan", flag: "JP", place: "Japan", local: "日本", languages: "Japanese", x: 85, y: 35, coreYear: 1996, animeYear: 1997 },
  { id: "us", slug: "united-states", flag: "US", place: "United States", local: "United States", languages: "English (US)", x: 15, y: 35, coreYear: 1998, animeYear: 1998 },
  { id: "de", slug: "germany", flag: "DE", place: "Germany", local: "Deutschland", languages: "German", x: 50, y: 30, coreYear: 1999, animeYear: 1999 },
  { id: "it", slug: "italy", flag: "IT", place: "Italy", local: "Italia", languages: "Italian", x: 51, y: 36, coreYear: 1999, animeYear: 2000 },
  { id: "es", slug: "spain", flag: "ES", place: "Spain", local: "España", languages: "Spanish (Spain)", x: 46, y: 37, coreYear: 1999, animeYear: 1999 },
  { id: "fr", slug: "france", flag: "FR", place: "France", local: "France", languages: "French", x: 48, y: 33, coreYear: 1999, animeYear: 1999 },
  { id: "kr", slug: "south-korea", flag: "KR", place: "South Korea", local: "대한민국", languages: "Korean", x: 82, y: 36, coreYear: 2002, animeYear: 1999 },
  { id: "hk", slug: "hong-kong", flag: "HK", place: "Hong Kong", local: "香港", languages: "Cantonese · Traditional Chinese", x: 78, y: 42, coreYear: 2016, animeYear: 1998 },
  { id: "tw", slug: "taiwan", flag: "TW", place: "Taiwan", local: "台灣", languages: "Mandarin · Traditional Chinese", x: 80, y: 44, coreYear: 2016, animeYear: 1998 },
  { id: "cn", slug: "mainland-china", flag: "CN", place: "Mainland China", local: "中国大陆", languages: "Mandarin · Simplified Chinese", x: 75, y: 38, coreYear: 2016, animeYear: 1998 },
  { id: "la", slug: "latin-america", flag: "LAT", place: "Latin America", local: "América Latina", languages: "Spanish (Latin America)", x: 25, y: 55, coreYear: 2025, animeYear: 1999 },
  { id: "br", slug: "brazil", flag: "BR", place: "Brazil", local: "Brasil", languages: "Brazilian Portuguese", x: 32, y: 58, coreYear: 2027, animeYear: 1999 },
  { id: "ph", slug: "philippines", flag: "PH", place: "Philippines", local: "Pilipinas", languages: "Filipino · Philippine English", x: 80, y: 48, coreYear: null, animeYear: 1999 },
  { id: "pt", slug: "portugal", flag: "PT", place: "Portugal", local: "Portugal", languages: "European Portuguese", x: 45, y: 37, coreYear: null, animeYear: 1999 },
  { id: "tr", slug: "turkey", flag: "TR", place: "Türkiye", local: "Türkiye", languages: "Turkish", x: 56, y: 37, coreYear: null, animeYear: 2000 },
  { id: "il", slug: "israel", flag: "IL", place: "Israel", local: "ישראל", languages: "Hebrew", x: 55, y: 40, coreYear: null, animeYear: 2000 },
  { id: "ar", slug: "arab-world", flag: "AR", place: "Arab world", local: "العالم العربي", languages: "Arabic", x: 58, y: 43, coreYear: null, animeYear: 2000 },
  { id: "my", slug: "malaysia", flag: "MY", place: "Malaysia", local: "Malaysia", languages: "Malay · English", x: 74, y: 50, coreYear: null, animeYear: 2000 },
  { id: "ru", slug: "russia", flag: "RU", place: "Russia", local: "Россия", languages: "Russian", x: 65, y: 25, coreYear: null, animeYear: 2000 },
  { id: "id", slug: "indonesia", flag: "ID", place: "Indonesia", local: "Indonesia", languages: "Indonesian · Bahasa Indonesia", x: 77, y: 54, coreYear: null, animeYear: 2001 },
  { id: "th", slug: "thailand", flag: "TH", place: "Thailand", local: "ประเทศไทย", languages: "Thai", x: 74, y: 46, coreYear: null, animeYear: 2001 },
  { id: "vn", slug: "vietnam", flag: "VN", place: "Vietnam", local: "Việt Nam", languages: "Vietnamese", x: 76, y: 45, coreYear: null, animeYear: 2002 },
  { id: "hi", slug: "hindi-india", flag: "HI", place: "Hindi in India", local: "हिन्दी", languages: "Hindi", x: 69, y: 44, coreYear: null, animeYear: 2003 },
  { id: "ta", slug: "tamil-india", flag: "TA", place: "Tamil in India", local: "தமிழ்", languages: "Tamil", x: 69, y: 48, coreYear: null, animeYear: 2004 },
  { id: "te", slug: "telugu-india", flag: "TE", place: "Telugu in India", local: "తెలుగు", languages: "Telugu", x: 70, y: 46, coreYear: null, animeYear: 2004 },
  { id: "in", slug: "india", flag: "IN", place: "India overview", local: "भारत", languages: "Hindi · Tamil · Telugu · Bengali +", x: 69, y: 45, coreYear: null, animeYear: 2003 },
];

export default function MapPage() {
  const [hoveredLocale, setHoveredLocale] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<"all" | "games" | "anime">("all");

  const filteredMarkers = localeMarkers.filter((locale) => {
    if (locale.id === "alt") return false; // Skip unofficial collection
    if (selectedFilter === "games") return locale.coreYear !== null;
    if (selectedFilter === "anime") return locale.animeYear !== null;
    return true;
  });

  const hovered = hoveredLocale ? localeMarkers.find((l) => l.id === hoveredLocale) : null;

  return (
    <main className="map-page">
      <nav className="nav" aria-label="Primary navigation">
        <a className="brand" href="/" aria-label="Pokélingua home">
          <span className="brand-mark" aria-hidden="true"><i /></span>
          <span>Pokélingua</span>
        </a>
        <div className="nav-links">
          <a href="/about">About the Exhibit</a>
          <a href="/#locales">Locales</a>
          <a href="/name-routes">Name routes</a>
          <a href="/history">History</a>
          <a href="/map" aria-current="page">World Map</a>
        </div>
        <a className="nav-cta" href="/#locales">Explore the atlas <span>↗</span></a>
      </nav>

      <div className="map-container">
        <header className="map-header">
          <div className="section-kicker">Interactive world map</div>
          <h1>Select a locale<br />from the map.</h1>
          <p>Click any region to explore its Pokémon localization history—from names and scripts to games, anime, and the cultural context that shaped each edition.</p>
          
          <div className="map-filters">
            <label>
              <input 
                type="radio" 
                name="filter" 
                value="all" 
                checked={selectedFilter === "all"}
                onChange={(e) => setSelectedFilter("all")}
              />
              <span>All locales</span>
            </label>
            <label>
              <input 
                type="radio" 
                name="filter" 
                value="games" 
                checked={selectedFilter === "games"}
                onChange={(e) => setSelectedFilter("games")}
              />
              <span>Core game locales</span>
            </label>
            <label>
              <input 
                type="radio" 
                name="filter" 
                value="anime" 
                checked={selectedFilter === "anime"}
                onChange={(e) => setSelectedFilter("anime")}
              />
              <span>Anime locales</span>
            </label>
          </div>
        </header>

        <div className="world-map" role="img" aria-label="Interactive world map of Pokémon locales">
          <svg viewBox="0 0 1000 600" xmlns="http://www.w3.org/2000/svg">
            {/* Simplified world map background */}
            <defs>
              <radialGradient id="mapGradient" cx="50%" cy="50%">
                <stop offset="0%" stopColor="rgba(255, 195, 77, 0.03)" />
                <stop offset="100%" stopColor="rgba(255, 195, 77, 0)" />
              </radialGradient>
            </defs>
            
            {/* Grid lines */}
            <g className="map-grid" opacity="0.15">
              {[...Array(11)].map((_, i) => (
                <line key={`h${i}`} x1="0" y1={i * 60} x2="1000" y2={i * 60} stroke="#ffc34d" strokeWidth="0.5" />
              ))}
              {[...Array(17)].map((_, i) => (
                <line key={`v${i}`} x1={i * 62.5} y1="0" x2={i * 62.5} y2="600" stroke="#ffc34d" strokeWidth="0.5" />
              ))}
            </g>

            {/* Continents (simplified shapes) */}
            <g className="continents" fill="rgba(255, 195, 77, 0.08)" stroke="#ffc34d" strokeWidth="1">
              {/* North America */}
              <path d="M 50 150 Q 100 120, 150 140 L 180 200 L 200 250 Q 190 280, 160 300 L 120 280 Q 80 250, 70 200 Z" />
              
              {/* South America */}
              <path d="M 200 350 L 250 340 Q 280 360, 290 400 L 310 480 Q 300 520, 270 540 L 240 520 Q 220 480, 210 440 Z" />
              
              {/* Europe */}
              <path d="M 450 180 L 500 170 Q 520 180, 530 200 L 540 240 Q 530 260, 510 270 L 470 260 Q 455 240, 450 220 Z" />
              
              {/* Africa */}
              <path d="M 480 280 Q 520 290, 540 320 L 560 380 Q 570 440, 550 480 L 520 500 Q 490 490, 470 460 L 460 400 Q 465 340, 480 300 Z" />
              
              {/* Asia */}
              <path d="M 580 160 Q 650 140, 720 160 L 780 180 Q 820 200, 840 240 L 860 300 Q 850 340, 820 360 L 760 380 Q 720 390, 680 380 L 640 350 Q 600 320, 580 280 Z" />
              
              {/* Oceania */}
              <path d="M 800 420 Q 840 410, 870 430 L 890 460 Q 885 490, 860 500 L 820 490 Q 800 470, 795 450 Z" />
            </g>

            {/* Locale markers */}
            {filteredMarkers.map((locale) => {
              const isHovered = hoveredLocale === locale.id;
              const hasCoreGame = locale.coreYear !== null;
              
              return (
                <a
                  key={locale.id}
                  href={`/locales/${locale.slug}`}
                  className="locale-marker-link"
                  onMouseEnter={() => setHoveredLocale(locale.id)}
                  onMouseLeave={() => setHoveredLocale(null)}
                >
                  <g className={`locale-marker ${isHovered ? "hovered" : ""}`} transform={`translate(${locale.x * 10}, ${locale.y * 6})`}>
                    {/* Glow effect for hovered */}
                    {isHovered && (
                      <circle r="20" fill="url(#mapGradient)" opacity="0.6">
                        <animate attributeName="r" values="20;25;20" dur="2s" repeatCount="indefinite" />
                      </circle>
                    )}
                    
                    {/* Marker circle */}
                    <circle 
                      r={isHovered ? "8" : "6"} 
                      fill={hasCoreGame ? "#ff6b35" : "#ffc34d"}
                      stroke={isHovered ? "#fff" : "rgba(255, 195, 77, 0.5)"}
                      strokeWidth={isHovered ? "2" : "1"}
                      style={{ transition: "all 0.3s ease" }}
                    />
                    
                    {/* Flag emoji */}
                    <text 
                      textAnchor="middle" 
                      y="4" 
                      fontSize={isHovered ? "12" : "10"}
                      style={{ pointerEvents: "none", userSelect: "none" }}
                    >
                      {locale.flag}
                    </text>
                    
                    {/* Connecting line to label */}
                    {isHovered && (
                      <line x1="0" y1="10" x2="0" y2="25" stroke="#ffc34d" strokeWidth="1" strokeDasharray="2,2" />
                    )}
                  </g>
                </a>
              );
            })}
          </svg>

          {/* Hover info panel */}
          {hovered && (
            <div className="map-info-panel">
              <div className="map-info-flag">{hovered.flag}</div>
              <div className="map-info-content">
                <h3>{hovered.place}</h3>
                <div className="map-info-local">{hovered.local}</div>
                <div className="map-info-languages">{hovered.languages}</div>
                <div className="map-info-timeline">
                  {hovered.coreYear && <span className="map-info-badge game">Game {hovered.coreYear}</span>}
                  {hovered.animeYear && <span className="map-info-badge anime">Anime {hovered.animeYear}</span>}
                </div>
                <div className="map-info-cta">Click to explore →</div>
              </div>
            </div>
          )}
        </div>

        <div className="map-legend">
          <div className="legend-item">
            <div className="legend-marker game-marker"></div>
            <span>Core game locale</span>
          </div>
          <div className="legend-item">
            <div className="legend-marker anime-marker"></div>
            <span>Anime-first locale</span>
          </div>
          <p className="legend-note">
            Each marker represents a distinct localization story. Core game locales have selectable in-game languages; 
            anime-first locales built their Pokémon traditions through television, trading cards, mobile apps, and community.
          </p>
        </div>
      </div>

      <footer>
        <a className="brand footer-brand" href="/">
          <span className="brand-mark" aria-hidden="true"><i /></span>
          <span>Pokélingua</span>
        </a>
        <p>A living atlas of Pokémon localization.</p>
        <a href="https://github.com/andersaucy/pokelingua" target="_blank" rel="noreferrer">Open research, built in public ↗</a>
      </footer>
    </main>
  );
}

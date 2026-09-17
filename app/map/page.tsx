"use client";

import { useState } from "react";

type LocaleMarker = {
  id: string;
  slug: string;
  flag: string;
  place: string;
  local: string;
  languages: string;
  x: number; // x coordinate on map
  y: number; // y coordinate on map
  coreYear: number | null;
  animeYear: number | null;
};

const localeMarkers: LocaleMarker[] = [
  { id: "jp", slug: "japan", flag: "JP", place: "Japan", local: "日本", languages: "Japanese", x: 850, y: 190, coreYear: 1996, animeYear: 1997 },
  { id: "us", slug: "united-states", flag: "US", place: "United States", local: "United States", languages: "English (US)", x: 135, y: 170, coreYear: 1998, animeYear: 1998 },
  { id: "de", slug: "germany", flag: "DE", place: "Germany", local: "Deutschland", languages: "German", x: 495, y: 150, coreYear: 1999, animeYear: 1999 },
  { id: "it", slug: "italy", flag: "IT", place: "Italy", local: "Italia", languages: "Italian", x: 505, y: 170, coreYear: 1999, animeYear: 2000 },
  { id: "es", slug: "spain", flag: "ES", place: "Spain", local: "España", languages: "Spanish (Spain)", x: 465, y: 175, coreYear: 1999, animeYear: 1999 },
  { id: "fr", slug: "france", flag: "FR", place: "France", local: "France", languages: "French", x: 475, y: 155, coreYear: 1999, animeYear: 1999 },
  { id: "kr", slug: "south-korea", flag: "KR", place: "South Korea", local: "대한민국", languages: "Korean", x: 820, y: 175, coreYear: 2002, animeYear: 1999 },
  { id: "hk", slug: "hong-kong", flag: "HK", place: "Hong Kong", local: "香港", languages: "Cantonese · Traditional Chinese", x: 720, y: 210, coreYear: 2016, animeYear: 1998 },
  { id: "tw", slug: "taiwan", flag: "TW", place: "Taiwan", local: "台灣", languages: "Mandarin · Traditional Chinese", x: 755, y: 215, coreYear: 2016, animeYear: 1998 },
  { id: "cn", slug: "mainland-china", flag: "CN", place: "Mainland China", local: "中国大陆", languages: "Mandarin · Simplified Chinese", x: 680, y: 180, coreYear: 2016, animeYear: 1998 },
  { id: "la", slug: "latin-america", flag: "LAT", place: "Latin America", local: "América Latina", languages: "Spanish (Latin America)", x: 180, y: 330, coreYear: 2025, animeYear: 1999 },
  { id: "br", slug: "brazil", flag: "BR", place: "Brazil", local: "Brasil", languages: "Brazilian Portuguese", x: 240, y: 365, coreYear: 2027, animeYear: 1999 },
  { id: "ph", slug: "philippines", flag: "PH", place: "Philippines", local: "Pilipinas", languages: "Filipino · Philippine English", x: 770, y: 245, coreYear: null, animeYear: 1999 },
  { id: "pt", slug: "portugal", flag: "PT", place: "Portugal", local: "Portugal", languages: "European Portuguese", x: 450, y: 175, coreYear: null, animeYear: 1999 },
  { id: "tr", slug: "turkey", flag: "TR", place: "Türkiye", local: "Türkiye", languages: "Turkish", x: 540, y: 175, coreYear: null, animeYear: 2000 },
  { id: "il", slug: "israel", flag: "IL", place: "Israel", local: "ישראל", languages: "Hebrew", x: 545, y: 200, coreYear: null, animeYear: 2000 },
  { id: "ar", slug: "arab-world", flag: "AR", place: "Arab world", local: "العالم العربي", languages: "Arabic", x: 510, y: 230, coreYear: null, animeYear: 2000 },
  { id: "my", slug: "malaysia", flag: "MY", place: "Malaysia", local: "Malaysia", languages: "Malay · English", x: 710, y: 250, coreYear: null, animeYear: 2000 },
  { id: "ru", slug: "russia", flag: "RU", place: "Russia", local: "Россия", languages: "Russian", x: 630, y: 120, coreYear: null, animeYear: 2000 },
  { id: "id", slug: "indonesia", flag: "ID", place: "Indonesia", local: "Indonesia", languages: "Indonesian · Bahasa Indonesia", x: 730, y: 270, coreYear: null, animeYear: 2001 },
  { id: "th", slug: "thailand", flag: "TH", place: "Thailand", local: "ประเทศไทย", languages: "Thai", x: 700, y: 235, coreYear: null, animeYear: 2001 },
  { id: "vn", slug: "vietnam", flag: "VN", place: "Vietnam", local: "Việt Nam", languages: "Vietnamese", x: 715, y: 230, coreYear: null, animeYear: 2002 },
  { id: "hi", slug: "hindi-india", flag: "HI", place: "Hindi in India", local: "हिन्दी", languages: "Hindi", x: 630, y: 220, coreYear: null, animeYear: 2003 },
  { id: "ta", slug: "tamil-india", flag: "TA", place: "Tamil in India", local: "தமிழ்", languages: "Tamil", x: 630, y: 245, coreYear: null, animeYear: 2004 },
  { id: "te", slug: "telugu-india", flag: "TE", place: "Telugu in India", local: "తెలుగు", languages: "Telugu", x: 640, y: 235, coreYear: null, animeYear: 2004 },
  { id: "in", slug: "india", flag: "IN", place: "India overview", local: "भारत", languages: "Hindi · Tamil · Telugu · Bengali +", x: 635, y: 230, coreYear: null, animeYear: 2003 },
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
          <svg viewBox="0 0 1000 500" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
            <defs>
              <radialGradient id="mapGradient" cx="50%" cy="50%">
                <stop offset="0%" stopColor="rgba(255, 195, 77, 0.03)" />
                <stop offset="100%" stopColor="rgba(255, 195, 77, 0)" />
              </radialGradient>
            </defs>
            
            {/* Ocean background */}
            <rect width="1000" height="500" fill="#e8f4f8" />
            
            {/* World map continents - realistic shapes */}
            <g className="continents" fill="#d4e5d4" stroke="#18211c" strokeWidth="1.5" strokeLinejoin="round">
              {/* North America */}
              <path d="M 80,90 L 90,85 L 100,80 L 115,75 L 130,80 L 140,85 L 150,90 L 155,100 L 160,115 L 165,130 L 168,145 L 170,160 L 175,175 L 180,185 L 185,195 L 188,205 L 190,215 L 185,225 L 180,235 L 175,245 L 165,250 L 155,255 L 145,258 L 135,260 L 125,258 L 115,255 L 108,250 L 102,245 L 98,235 L 95,225 L 92,215 L 90,205 L 88,195 L 85,185 L 82,175 L 80,165 L 78,155 L 76,145 L 75,135 L 74,125 L 75,115 L 77,105 Z" />
              
              {/* South America */}
              <path d="M 200,300 L 210,295 L 220,292 L 230,290 L 240,292 L 248,298 L 255,308 L 260,320 L 265,335 L 268,350 L 270,365 L 272,380 L 273,395 L 272,410 L 270,425 L 265,438 L 258,448 L 248,455 L 238,460 L 228,462 L 218,460 L 210,455 L 205,448 L 202,438 L 200,425 L 198,410 L 197,395 L 196,380 L 195,365 L 195,350 L 196,335 L 198,320 Z" />
              
              {/* Europe */}
              <path d="M 460,120 L 475,115 L 490,112 L 505,115 L 515,120 L 522,128 L 528,138 L 532,148 L 535,158 L 536,168 L 535,178 L 532,188 L 528,195 L 522,200 L 515,203 L 505,205 L 495,203 L 485,200 L 475,195 L 468,188 L 462,178 L 458,168 L 456,158 L 456,148 L 458,138 Z" />
              
              {/* Africa */}
              <path d="M 475,210 L 490,208 L 505,210 L 518,215 L 528,222 L 536,232 L 542,245 L 546,260 L 548,275 L 550,290 L 551,305 L 551,320 L 550,335 L 548,350 L 545,363 L 540,375 L 533,385 L 523,393 L 510,398 L 495,400 L 480,398 L 468,393 L 458,385 L 450,375 L 444,363 L 440,350 L 437,335 L 435,320 L 435,305 L 436,290 L 438,275 L 442,260 L 448,245 L 456,232 L 465,222 Z" />
              
              {/* Asia */}
              <path d="M 545,85 L 565,80 L 585,78 L 605,80 L 625,85 L 645,92 L 665,100 L 682,110 L 698,122 L 712,135 L 725,150 L 735,165 L 743,180 L 748,195 L 750,210 L 750,225 L 748,238 L 743,250 L 735,260 L 725,268 L 712,275 L 698,280 L 682,283 L 665,285 L 648,283 L 632,280 L 618,275 L 605,268 L 593,260 L 583,250 L 575,238 L 568,225 L 563,210 L 560,195 L 558,180 L 557,165 L 558,150 L 560,135 L 563,122 L 568,110 L 575,100 Z" />
              
              {/* Australia */}
              <path d="M 780,340 L 800,338 L 820,340 L 838,345 L 853,352 L 865,362 L 873,373 L 878,385 L 880,397 L 878,409 L 873,420 L 865,429 L 853,436 L 838,441 L 820,443 L 800,441 L 782,436 L 768,429 L 758,420 L 751,409 L 748,397 L 751,385 L 758,373 L 768,362 Z" />
              
              {/* Japan (small islands) */}
              <path d="M 850,180 L 858,178 L 865,180 L 870,185 L 873,192 L 870,199 L 865,204 L 858,206 L 850,204 L 845,199 L 842,192 L 845,185 Z" />
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
                  <g className={`locale-marker ${isHovered ? "hovered" : ""}`} transform={`translate(${locale.x}, ${locale.y})`}>
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

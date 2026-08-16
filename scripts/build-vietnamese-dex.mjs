import fs from "node:fs";
import path from "node:path";

const sourcePath = process.argv[2];
const outputPath = process.argv[3] ?? "app/data/vietnamesePokemon.json";

if (!sourcePath) {
  throw new Error("Usage: node scripts/build-vietnamese-dex.mjs <bulbapedia-html> [output-json]");
}

const html = fs.readFileSync(sourcePath, "utf8");

function decode(value) {
  return value
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#0*39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([\da-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)));
}

function text(value) {
  return decode(value.replace(/<sup[\s\S]*?<\/sup>/gi, "").replace(/<[^>]+>/g, ""))
    .replace(/\s+/g, " ")
    .trim();
}

const entries = [];
for (const rowMatch of html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)) {
  const cells = [...rowMatch[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map((match) => match[1]);
  if (cells.length !== 4) continue;

  const idLabel = text(cells[0]);
  if (!/^#\d{4}$/.test(idLabel)) continue;

  const id = Number(idLabel.slice(1));
  const english = text(cells[2]);
  const historical = text(cells[3]);
  entries.push({ id, english, current: english, historical, changed: english !== historical });
}

const unique = [...new Map(entries.map((entry) => [entry.id, entry])).values()].sort((a, b) => a.id - b.id);
if (unique.length !== 1025) {
  throw new Error(`Expected 1025 Vietnamese name records, found ${unique.length}`);
}

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(unique, null, 2)}\n`);
console.log(`Wrote ${unique.length} Vietnamese Pokémon records (${unique.filter((entry) => entry.changed).length} policy changes) to ${outputPath}`);

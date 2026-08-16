import fs from "node:fs";
import path from "node:path";

const sourcePath = process.argv[2];
const outputPath = process.argv[3] ?? "app/data/chinesePokemon.json";

if (!sourcePath) {
  throw new Error("Usage: node scripts/build-chinese-dex.mjs <bulbapedia-html> [output-json]");
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
  return decode(
    value
      .replace(/<sup[\s\S]*?<\/sup>/gi, "")
      .replace(/<br\s*\/?\s*>/gi, "\n")
      .replace(/<[^>]+>/g, ""),
  )
    .replace(/[ \t]+/g, " ")
    .replace(/\s*\n\s*/g, "\n")
    .trim();
}

function historicalRecords(cell) {
  if (text(cell) === "-") return [];

  return cell
    .replace(/<sup[\s\S]*?<\/sup>/gi, "")
    .split(/<br\s*\/?\s*>/gi)
    .map((record) => {
      const name = text(record.match(/^([\s\S]*?)(?:<i>|\()/i)?.[1] ?? record);
      const reading = text(record.match(/<i>([\s\S]*?)<\/i>/i)?.[1] ?? "");
      const regions = text(record.match(/\((HK|TW|CN|TW\/CN|HK\/TW|HK\/CN)\)/i)?.[1] ?? "");
      return { name, reading, regions };
    })
    .filter((record) => record.name && record.name !== "-");
}

const entries = [];
for (const rowMatch of html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)) {
  const cells = [...rowMatch[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map((match) => match[1]);
  if (cells.length !== 8) continue;

  const idLabel = text(cells[0]);
  if (!/^#\d{4}$/.test(idLabel)) continue;

  entries.push({
    id: Number(idLabel.slice(1)),
    english: text(cells[2]),
    traditional: text(cells[3]),
    simplified: text(cells[4]),
    pinyin: text(cells[5]),
    cantonese: text(cells[6]),
    historical: historicalRecords(cells[7]),
  });
}

const unique = [...new Map(entries.map((entry) => [entry.id, entry])).values()].sort((a, b) => a.id - b.id);
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(unique, null, 2)}\n`);
console.log(`Wrote ${unique.length} Pokémon records to ${outputPath}`);

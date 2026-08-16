import fs from "node:fs";
import path from "node:path";

const namesPath = process.argv[2] ?? "app/data/englishUsPokemon.json";
const outputPath = process.argv[3] ?? "app/data/nameEtymologies.json";
const names = JSON.parse(fs.readFileSync(namesPath, "utf8"));
const endpoint = "https://bulbapedia.bulbagarden.net/w/api.php";

function comparable(value) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9♀♂]/gi, "").toLowerCase();
}

function decode(value) {
  return value
    .replace(/&nbsp;|&#160;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#0*39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#8209;/g, "‑")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([\da-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)));
}

function templateReplacement(inner) {
  const parts = inner.split("|").map((part) => part.trim());
  const name = parts.shift()?.toLowerCase() ?? "";
  const positional = parts.filter((part) => !/^[\w-]+\s*=/.test(part));
  if (name === "tt" || name === "ruby" || name === "color") return positional[0] ?? "";
  if (name === "lang") return positional.at(-1) ?? "";
  if (name === "wp") return (positional.at(-1) ?? "").replace(/^wiktionary:/i, "");
  if (name.startsWith("wiktionary:")) return name.split(":").at(-1) ?? "";
  return positional.at(-1) ?? "";
}

function cleanWikitext(value) {
  let text = value
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<ref\b[^>]*>[\s\S]*?<\/ref>/gi, "")
    .replace(/<ref\b[^>]*\/>/gi, "")
    .replace(/<br\s*\/?\s*>/gi, "; ");

  for (let i = 0; i < 12 && /\{\{[^{}]*\}\}/.test(text); i += 1) {
    text = text.replace(/\{\{([^{}]*)\}\}/g, (_, inner) => templateReplacement(inner));
  }

  return decode(text)
    .replace(/\[\[[^\]|]+\|([^\]]+)\]\]/g, "$1")
    .replace(/\[\[([^\]]+)\]\]/g, "$1")
    .replace(/\[https?:\/\/[^\s\]]+\s+([^\]]+)\]/g, "$1")
    .replace(/\[https?:\/\/[^\]]+\]/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/'{2,5}/g, "")
    .replace(/\{\{|\}\}/g, "")
    .replace(/\s*;\s*/g, "; ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractTemplate(source, templateName) {
  const start = source.indexOf(`{{${templateName}`);
  if (start < 0) return "";
  let depth = 0;
  for (let index = start; index < source.length - 1; index += 1) {
    const pair = source.slice(index, index + 2);
    if (pair === "{{") { depth += 1; index += 1; }
    else if (pair === "}}") {
      depth -= 1;
      if (depth === 0) return source.slice(start, index + 2);
      index += 1;
    }
  }
  return "";
}

function templateFields(template) {
  const fields = {};
  let depth = 0;
  let chunk = "";
  const chunks = [];
  for (let index = 0; index < template.length; index += 1) {
    const pair = template.slice(index, index + 2);
    if (pair === "{{") { depth += 1; chunk += pair; index += 1; continue; }
    if (pair === "}}") { depth -= 1; chunk += pair; index += 1; continue; }
    if (template[index] === "|" && depth === 1) { chunks.push(chunk); chunk = ""; continue; }
    chunk += template[index];
  }
  chunks.push(chunk);
  for (const part of chunks.slice(1)) {
    const equals = part.indexOf("=");
    if (equals < 1) continue;
    fields[part.slice(0, equals).trim()] = part.slice(equals + 1).trim();
  }
  return fields;
}

function etymologyFrom(source) {
  const section = source.match(/={3,4}Name origin={3,4}\s*([\s\S]*?)(?=\n={2,4}[^=\n]+={2,4})/)?.[1] ?? "";
  const paragraphs = section.split(/\n\s*\n/).map(cleanWikitext).filter(Boolean);
  const fields = templateFields(extractTemplate(source, "Other languages"));
  const meaning = (key) => cleanWikitext(fields[`${key}meaning`] ?? "");
  return {
    english: paragraphs[0] ?? "",
    japanese: meaning("ja") || paragraphs[1] || "",
    french: meaning("fr"),
    german: meaning("de"),
    italian: meaning("it"),
    korean: meaning("ko"),
    chineseMandarin: meaning("zh_cmn"),
    chineseCantonese: meaning("zh_yue"),
    vietnamese: meaning("vi"),
  };
}

const idByName = new Map(names.map((entry) => [comparable(entry.english), entry.id]));
const nameById = new Map(names.map((entry) => [entry.id, entry.english]));
const records = new Map();
const batchSize = 40;

for (let offset = 0; offset < names.length; offset += batchSize) {
  const batch = names.slice(offset, offset + batchSize);
  const body = new URLSearchParams({
    action: "query",
    prop: "revisions",
    rvprop: "content",
    rvslots: "main",
    redirects: "1",
    format: "json",
    formatversion: "2",
    titles: batch.map((entry) => `${entry.english} (Pokémon)`).join("|"),
  });
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded", "user-agent": "Pokelingua research archive/0.1 (https://github.com/andersaucy/pokelingua)" },
    body,
  });
  if (!response.ok) throw new Error(`Bulbapedia API returned ${response.status}`);
  const payload = await response.json();
  for (const page of payload.query?.pages ?? []) {
    const english = page.title?.replace(/ \(Pokémon\)$/, "") ?? "";
    const id = idByName.get(comparable(english));
    const source = page.revisions?.[0]?.slots?.main?.content;
    if (!id || !source) continue;
    records.set(id, { id, name: nameById.get(id), ...etymologyFrom(source) });
  }
  process.stdout.write(`Fetched ${Math.min(offset + batchSize, names.length)}/${names.length}\r`);
  await new Promise((resolve) => setTimeout(resolve, 180));
}

const output = names.map((entry) => records.get(entry.id) ?? { id: entry.id, name: entry.english, english: "", japanese: "", french: "", german: "", italian: "", korean: "", chineseMandarin: "", chineseCantonese: "", vietnamese: "" });
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
console.log(`\nWrote ${output.length} etymology records (${records.size} pages matched) to ${outputPath}`);

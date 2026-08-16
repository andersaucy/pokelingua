import fs from "node:fs";
import path from "node:path";

const sourcePath = process.argv[2] ?? "app/data/frenchPokemon.json";
const outputPath = process.argv[3] ?? "app/data/italianPokemon.json";

const italianExceptions = new Map([
  [772, "Tipo Zero"],
  [984, "Grandizanne"],
  [985, "Codaurlante"],
  [986, "Fungofurioso"],
  [987, "Crinealato"],
  [988, "Alirasenti"],
  [989, "Peldisabbia"],
  [990, "Solcoferreo"],
  [991, "Saccoferreo"],
  [992, "Manoferrea"],
  [993, "Colloferreo"],
  [994, "Falenaferrea"],
  [995, "Spineferree"],
  [1005, "Lunaruggente"],
  [1006, "Eroeferreo"],
  [1009, "Acquecrespe"],
  [1010, "Fogliaferrea"],
  [1020, "Vampeaguzze"],
  [1021, "Furiatonante"],
  [1022, "Massoferreo"],
  [1023, "Capoferreo"],
]);

const source = JSON.parse(fs.readFileSync(sourcePath, "utf8"));
const entries = source.map(({ id, english }) => {
  const italian = italianExceptions.get(id) ?? english;
  return { id, english, italian, localized: italian !== english };
});

if (entries.length !== 1025) throw new Error(`Expected 1,025 records, received ${entries.length}`);
if (entries.filter((entry) => entry.localized).length !== 21) throw new Error("Expected 21 distinct Italian names");

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(entries, null, 2)}\n`);
console.log(`Wrote ${entries.length} Italian records (${italianExceptions.size} distinct Italian names) to ${outputPath}`);

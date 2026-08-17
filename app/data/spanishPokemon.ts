import englishPokemon from "./englishUsPokemon.json";

const translatedNames: Record<number, string> = {
  772: "Código Cero",
  984: "Colmilargo",
  985: "Colagrito",
  986: "Furioseta",
  987: "Melenaleteo",
  988: "Reptalada",
  989: "Pelarena",
  990: "Ferrodada",
  991: "Ferrosaco",
  992: "Ferropalmas",
  993: "Ferrocuello",
  994: "Ferropolilla",
  995: "Ferropúas",
  1005: "Bramaluna",
  1006: "Ferropaladín",
  1009: "Ondulagua",
  1010: "Ferroverdor",
  1020: "Flamariete",
  1021: "Electrofuria",
  1022: "Ferromole",
  1023: "Ferrotesta",
};

export const spanishPokemon = englishPokemon.map((entry) => ({
  id: entry.id,
  english: entry.english,
  spanish: translatedNames[entry.id] ?? entry.english,
  localized: Boolean(translatedNames[entry.id]),
}));

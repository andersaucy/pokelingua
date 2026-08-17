export type RegionalScriptName = {
  name: string;
  reading: string;
  medium: string;
  source: string;
};

const arabicSource = "https://bulbapedia.bulbagarden.net/wiki/User:Raltseye/List_of_Arabic_Pok%C3%A9mon_names";
const hebrewSource = "https://bulbapedia.bulbagarden.net/wiki/User:Raltseye/List_of_Hebrew_Pok%C3%A9mon_names";

export const arabicScriptNames: Record<number, RegionalScriptName> = {
  1: { name: "بولباسور", reading: "Pulpassur", medium: "Arabic-language animation", source: arabicSource },
  4: { name: "شارماندر", reading: "Sharmandr", medium: "Arabic-language animation", source: arabicSource },
  25: { name: "بيكاتشو", reading: "Bīkātshū", medium: "Arabic-language animation", source: arabicSource },
  35: { name: "كليفر", reading: "Kaliafri", medium: "Arabic-language animation", source: arabicSource },
  72: { name: "تينتاكول", reading: "Tintakul", medium: "Arabic-language animation", source: arabicSource },
  73: { name: "تينتاكرول", reading: "Tintakrul", medium: "Arabic-language animation", source: arabicSource },
  272: { name: "لوديكولو", reading: "Ludikulu", medium: "Arabic-language animation", source: arabicSource },
  385: { name: "جیراچی", reading: "Jirajy", medium: "Arabic-language animation", source: arabicSource },
};

export const hebrewScriptNames: Record<number, RegionalScriptName> = {
  1: { name: "בולבזאור", reading: "Bolbasaur", medium: "Hebrew-language animation", source: hebrewSource },
  4: { name: "צ'רמנדר", reading: "Charmander", medium: "Hebrew-language animation", source: hebrewSource },
  6: { name: "צ'אריזארד", reading: "Charizard", medium: "Hebrew-language animation", source: hebrewSource },
  7: { name: "סקווירטל", reading: "Squirtle", medium: "Hebrew-language animation", source: hebrewSource },
  9: { name: "בלסטויז", reading: "Blastoise", medium: "Hebrew-language animation", source: hebrewSource },
  25: { name: "פיקאציו", reading: "Pikachu", medium: "Hebrew-language animation", source: hebrewSource },
  35: { name: "קלפרי", reading: "Clefery", medium: "Hebrew-language animation", source: hebrewSource },
  39: { name: "ג'יגליפאף", reading: "Jigglypuff", medium: "Hebrew-language animation", source: hebrewSource },
  44: { name: "גלום", reading: "Glum", medium: "Hebrew-language animation", source: hebrewSource },
  46: { name: "פרס", reading: "Paras", medium: "Hebrew-language animation", source: hebrewSource },
  52: { name: "מייאו", reading: "Meow", medium: "Hebrew-language animation", source: hebrewSource },
  54: { name: "פסיידק", reading: "Psyduck", medium: "Hebrew-language animation", source: hebrewSource },
  81: { name: "מגנמייט", reading: "Magnemite", medium: "Hebrew-language animation", source: hebrewSource },
  95: { name: "אוניקס", reading: "Onix", medium: "Hebrew-language animation", source: hebrewSource },
  97: { name: "היפנו", reading: "Hypno", medium: "Hebrew-language animation", source: hebrewSource },
  103: { name: "אקזקיוטור", reading: "Exeggutor", medium: "Hebrew-language animation", source: hebrewSource },
  111: { name: "ראיהורן", reading: "Rhyhorn", medium: "Hebrew-language animation", source: hebrewSource },
  115: { name: "קנגסקאן", reading: "Kangaskhan", medium: "Hebrew-language animation", source: hebrewSource },
  122: { name: "מר מיים", reading: "Mar Mime", medium: "Hebrew-language animation", source: hebrewSource },
  131: { name: "לפרס", reading: "Lapras", medium: "Hebrew-language animation", source: hebrewSource },
  132: { name: "דיטו", reading: "Ditto", medium: "Hebrew-language animation", source: hebrewSource },
  133: { name: "איווי", reading: "Eevee", medium: "Hebrew-language animation", source: hebrewSource },
  143: { name: "סנורלקס", reading: "Snorlax", medium: "Hebrew-language animation", source: hebrewSource },
  149: { name: "דרגונייט", reading: "Dragonite", medium: "Hebrew-language animation", source: hebrewSource },
  151: { name: "מיו", reading: "Mew", medium: "Hebrew-language animation", source: hebrewSource },
  152: { name: "צ'יקוריטה", reading: "Chikorita", medium: "Hebrew-language animation", source: hebrewSource },
  155: { name: "סינדקוויל", reading: "Cyndaquil", medium: "Hebrew-language animation", source: hebrewSource },
  167: { name: "ספינראק", reading: "Spinarak", medium: "Hebrew-language animation", source: hebrewSource },
  175: { name: "טוגפי", reading: "Togepi", medium: "Hebrew-language animation", source: hebrewSource },
  201: { name: "אנון", reading: "Unown", medium: "Hebrew-language animation", source: hebrewSource },
  242: { name: "בליסי", reading: "Blissey", medium: "Hebrew-language animation", source: hebrewSource },
  272: { name: "לודיקולו", reading: "Ludicolo", medium: "Hebrew-language animation", source: hebrewSource },
  393: { name: "פיפלאפ", reading: "Piplup", medium: "Hebrew-language animation", source: hebrewSource },
  477: { name: "דאסקנואר", reading: "Dusknoir", medium: "Hebrew-language animation", source: hebrewSource },
  656: { name: "פרוקי", reading: "Froakie", medium: "Hebrew-language animation", source: hebrewSource },
  661: { name: "פלטילינג", reading: "Fletchling", medium: "Hebrew-language animation", source: hebrewSource },
  676: { name: "פרפרו", reading: "Furfrou", medium: "Hebrew-language animation", source: hebrewSource },
  682: { name: "ספריטזי", reading: "Spritzee", medium: "Hebrew-language animation", source: hebrewSource },
  702: { name: "דדנה", reading: "Dedenne", medium: "Hebrew-language animation", source: hebrewSource },
  810: { name: "סובל", reading: "Sobble", medium: "Hebrew-language animation", source: hebrewSource },
  813: { name: "גרוקי", reading: "Grookey", medium: "Hebrew-language animation", source: hebrewSource },
  816: { name: "סקרובאני", reading: "Scorbunny", medium: "Hebrew-language animation", source: hebrewSource },
};

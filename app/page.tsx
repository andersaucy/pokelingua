import HomeEn from "./content/home.en";
import HomeEs from "./content/home.es";
import { getLang } from "./i18n-server";

export default async function Home() {
  return (await getLang()) === "es" ? <HomeEs /> : <HomeEn />;
}

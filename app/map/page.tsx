import MapEn from "../content/map.en";
import MapEs from "../content/map.es";
import { getLang } from "../i18n-server";

export default async function MapPage() {
  return (await getLang()) === "es" ? <MapEs /> : <MapEn />;
}

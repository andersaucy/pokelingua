import HistoryEn from "../content/history.en";
import HistoryEs from "../content/history.es";
import { getLang } from "../i18n-server";

export default async function HistoryPage() {
  return (await getLang()) === "es" ? <HistoryEs /> : <HistoryEn />;
}

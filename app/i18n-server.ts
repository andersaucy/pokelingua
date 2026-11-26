import { cookies } from "next/headers";
import { LANG_COOKIE, toLang, type Lang } from "./i18n";

export async function getLang(): Promise<Lang> {
  return toLang((await cookies()).get(LANG_COOKIE)?.value);
}

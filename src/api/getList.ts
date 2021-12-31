import fetch from "node-fetch";
import { load } from "cheerio";

import { cookieAgent } from "../util/cookies";

export interface GetListParams {
  id?: string;
  list?: string;
}

export interface ListItem {
  name: string;
  url: string;
}

export async function getList(params: GetListParams): Promise<ListItem[]> {
  const url = new URL("https://www.mangaupdates.com/mylist.html");

  Object.entries(params)
    .filter((entry): entry is [string, string] => !!entry[1])
    .forEach(([name, value]) => url.searchParams.append(name, value));

  const req = await fetch(url.toString(), { agent: cookieAgent });
  const html = await req.text();

  const $ = load(html);
  return $('a[title="Series Info"]')
    .toArray()
    .map((node) => $(node))
    .map((el) => ({
      name: el.text(),
      url: el.attr("href") || "",
    }));
}

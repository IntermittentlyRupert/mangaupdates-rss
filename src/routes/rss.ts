import type { Request, Response } from "express";
import { Builder } from "xml2js";

import { getList } from "../api/getList";
import { getRssFeed } from "../api/getRssFeed";
import { getMangaIdFromUrl } from "../util/getMangaIdFromUrl";

interface Params {
  id?: string;
  list?: string;
}

const builder = new Builder();

export async function rss(
  req: Request<any, string, any, Params, any>,
  res: Response,
): Promise<void> {
  const [list, feed] = await Promise.all([getList(req.query), getRssFeed()]);
  console.log(
    "Loaded data:",
    `list=${list.length}`,
    `feed=${feed?.rss?.channel?.item?.length || null}`,
  );

  const idsInList = new Set(
    list
      .map(({ url }) => getMangaIdFromUrl(url))
      .filter((id): id is string => !!id),
  );
  feed.rss.channel.item = feed.rss.channel.item.filter((item) => {
    const id = getMangaIdFromUrl(item.link);
    return id && idsInList.has(id);
  });
  console.log(`Found ${feed.rss.channel.item.length} matching updates.`);

  res
    .status(200)
    .header({ "Content-Type": "application/xml" })
    .send(builder.buildObject(feed));
}

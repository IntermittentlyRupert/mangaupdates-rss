import fetch from "node-fetch";
import { Parser } from "xml2js";

import { cookieAgent } from "../util/cookies";

export interface Item {
  title: string;
  /** Contains HTML. */
  description: string;
  link: string;
}

export interface Channel {
  title: string;
  description: string;
  link: string;
  item: Item[];
}

export interface RssFeed {
  rss: {
    $?: {
      "version"?: string;
      "xmlns:content"?: string;
    };
    channel: Channel;
  };
}

const parser = new Parser({ explicitArray: false });

export async function getRssFeed(): Promise<RssFeed> {
  const req = await fetch("https://www.mangaupdates.com/rss.php", {
    agent: cookieAgent,
  });
  const feed = await req.text();
  return parser.parseStringPromise(feed);
}

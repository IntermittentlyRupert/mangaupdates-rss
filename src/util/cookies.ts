import type { Agent } from "http";
import { CookieJar } from "tough-cookie";
import { HttpCookieAgent, HttpsCookieAgent } from "http-cookie-agent";

const jar = new CookieJar();

const httpAgent = new HttpCookieAgent({ jar });
const httpsAgent = new HttpsCookieAgent({ jar });

export function cookieAgent(url: URL): Agent {
  return url.protocol === "https:" ? httpsAgent : httpAgent;
}

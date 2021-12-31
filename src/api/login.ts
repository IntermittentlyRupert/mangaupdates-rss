import fetch from "node-fetch";

import { cookieAgent } from "../util/cookies";

export async function login(username: string, password: string) {
  const res = await fetch("https://www.mangaupdates.com/login.html", {
    method: "post",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      act: "login",
      username,
      password,
    }).toString(),
    agent: cookieAgent,
  });
  const html = await res.text();
  if (!res.ok || !html.includes(`Welcome back, ${username}`)) {
    console.error(html);
    throw new Error("failed to login");
  }
}

import type { Request, Response, NextFunction } from "express";

import { API_KEY } from "../../config";

export function auth(req: Request, res: Response, next: NextFunction): void {
  if (!API_KEY) {
    next();
    return;
  }

  if (!req.query.apikey) {
    console.error("No API key provided.");
    res.sendStatus(401);
  } else if (req.query.apikey !== API_KEY) {
    console.error("Incorrect API key.");
    res.sendStatus(403);
  } else {
    next();
  }
}

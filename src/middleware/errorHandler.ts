import type { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (err) {
    console.error("Unhandled error in route:", err);
    res.sendStatus(500);
    return;
  }

  if (!res.headersSent) {
    console.error("Failed to generate a response.");
    res.sendStatus(500);
    return;
  }
}

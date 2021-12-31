import type { RequestHandler, Request, Response } from "express";

type SimplifiedHandler = (req: Request, res: Response) => void | Promise<void>;

export function handlerWrapper(handler: SimplifiedHandler): RequestHandler {
  return async (req, res, next) => {
    try {
      await handler(req, res);

      if (!res.headersSent) {
        throw new Error("handler failed to generate a response");
      }
    } catch (e) {
      next(e);
    }
  };
}

import { createServer } from "http";
import express, { Router } from "express";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";

import { handlerWrapper } from "./util/handlerWrapper";

import { auth } from "./middleware/auth";
import { notFound } from "./middleware/notFound";
import { errorHandler } from "./middleware/errorHandler";

import { rss } from "./routes/rss";

export const router = Router()
  .use(auth)
  .get("/rss", handlerWrapper(rss))
  .use(notFound)
  .use(errorHandler);

const app = express()
  .use(morgan("tiny", { immediate: true }))
  .use(morgan("tiny", { immediate: false }))
  .use(cors())
  .use(compression())
  .use(router);

const server = createServer(app);

export function start(): Promise<void> {
  return new Promise((resolve) => {
    server.listen(3000, () => resolve());
  });
}

export function stop(): Promise<void> {
  return new Promise((resolve, reject) => {
    server.close((e) => (e ? reject(e) : resolve()));
  });
}

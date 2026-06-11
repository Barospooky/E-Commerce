import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env";
import { errorHandler } from "./middlewares/errorHandler";
import { apiRouter } from "./routes";

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(cors({ origin: env.CLIENT_URL, credentials: true }));
  app.use(express.json({ limit: "1mb" }));
  app.use(cookieParser());
  app.use(morgan(env.NODE_ENV === "production" ? "combined" : "dev"));
  app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 100 }));

  app.get("/health", (_req, res) => {
    res.json({ status: "ok", service: "amplepro-organic-commerce-api" });
  });

  app.use("/api", apiRouter);
  app.use(errorHandler);

  return app;
}

import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof ZodError) {
    res.status(422).json({ message: "Validation failed", issues: error.flatten() });
    return;
  }

  const status = typeof error.status === "number" ? error.status : 500;
  res.status(status).json({ message: error.message ?? "Internal server error" });
};

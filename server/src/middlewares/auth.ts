import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

export type Role = "CUSTOMER" | "ADMIN";

interface JwtPayload {
  sub: string;
  role: Role;
}

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

export function authenticate(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ message: "Missing access token" });
    return;
  }

  try {
    req.user = jwt.verify(token, env.JWT_ACCESS_SECRET) as JwtPayload;
    next();
  } catch {
    res.status(401).json({ message: "Invalid or expired access token" });
  }
}

export function authorize(roles: Role[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({ message: "Insufficient permissions" });
      return;
    }

    next();
  };
}

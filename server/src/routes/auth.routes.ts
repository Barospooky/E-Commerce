import { Router } from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { env } from "../config/env";
import { authenticate, type AuthenticatedRequest } from "../middlewares/auth";

export const authRouter = Router();

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

authRouter.post("/register", (req, res) => {
  const body = loginSchema.extend({ name: z.string().min(2) }).parse(req.body);
  res.status(201).json({ message: "Registration endpoint scaffolded", user: { email: body.email, name: body.name } });
});

authRouter.post("/login", (req, res) => {
  const body = loginSchema.parse(req.body);
  const role = body.email.includes("admin") ? "ADMIN" : "CUSTOMER";
  const accessToken = jwt.sign({ sub: body.email, role }, env.JWT_ACCESS_SECRET, { expiresIn: "15m" });

  res.json({ accessToken, user: { email: body.email, role } });
});

authRouter.get("/me", authenticate, (req: AuthenticatedRequest, res) => {
  res.json({ user: req.user });
});

authRouter.post("/logout", (_req, res) => {
  res.clearCookie("refreshToken");
  res.json({ message: "Logged out" });
});

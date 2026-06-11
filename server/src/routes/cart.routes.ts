import { Router } from "express";
import { z } from "zod";
import { authenticate } from "../middlewares/auth";

export const cartRouter = Router();

const cartItemSchema = z.object({
  variantId: z.number().int().positive(),
  quantity: z.number().int().positive()
});

cartRouter.use(authenticate);

cartRouter.get("/", (_req, res) => {
  res.json({ data: [], message: "Cart persistence is ready for Prisma implementation" });
});

cartRouter.post("/", (req, res) => {
  const item = cartItemSchema.parse(req.body);
  res.status(201).json({ data: item, message: "Item accepted for cart" });
});

cartRouter.put("/:itemId", (req, res) => {
  const item = cartItemSchema.pick({ quantity: true }).parse(req.body);
  res.json({ data: { id: Number(req.params.itemId), ...item } });
});

cartRouter.delete("/:itemId", (req, res) => {
  res.json({ message: `Cart item ${req.params.itemId} removed` });
});

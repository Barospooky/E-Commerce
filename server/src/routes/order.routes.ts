import { Router } from "express";
import { authenticate } from "../middlewares/auth";

export const orderRouter = Router();

orderRouter.use(authenticate);

orderRouter.post("/", (_req, res) => {
  res.status(201).json({ data: { id: "ORD-DEMO-1001", status: "PENDING" }, message: "Order creation scaffolded" });
});

orderRouter.get("/", (_req, res) => {
  res.json({ data: [] });
});

orderRouter.get("/:id", (req, res) => {
  res.json({ data: { id: req.params.id, status: "PENDING", items: [] } });
});

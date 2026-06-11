import { Router } from "express";
import { catalog } from "../data/mockCatalog";
import { authenticate, authorize } from "../middlewares/auth";

export const adminRouter = Router();

adminRouter.use(authenticate, authorize(["ADMIN"]));

adminRouter.get("/products", (_req, res) => {
  res.json({ data: catalog });
});

adminRouter.post("/products", (req, res) => {
  res.status(201).json({ data: req.body, message: "Product create scaffolded" });
});

adminRouter.put("/products/:id", (req, res) => {
  res.json({ data: { id: Number(req.params.id), ...req.body }, message: "Product update scaffolded" });
});

adminRouter.delete("/products/:id", (req, res) => {
  res.json({ message: `Product ${req.params.id} soft-deleted` });
});

adminRouter.get("/orders", (_req, res) => {
  res.json({ data: [], meta: { count: 0 } });
});

adminRouter.put("/orders/:id/status", (req, res) => {
  res.json({ data: { id: req.params.id, status: req.body.status } });
});

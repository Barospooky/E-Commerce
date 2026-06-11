import { Router } from "express";
import { z } from "zod";
import { homepageContent } from "../data/homepageContent";
import { createProduct, listProducts, removeProduct, updateProduct } from "../data/catalogStore";
import { authenticate, authorize } from "../middlewares/auth";

export const adminRouter = Router();

adminRouter.use(authenticate, authorize(["ADMIN"]));

adminRouter.get("/products", (_req, res) => {
  res.json({ data: listProducts() });
});

const productInputSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2).optional(),
  category: z.enum(["vegetables", "fruits", "grains", "pantry"]),
  price: z.number().positive(),
  mrp: z.number().positive(),
  unit: z.string().min(1),
  rating: z.number().min(0).max(5).default(4.5),
  stock: z.number().int().nonnegative(),
  badge: z.string().min(1),
  image: z.string().url(),
  color: z.string().min(1).default("#0e8a66"),
  description: z.string().min(3),
  tags: z.array(z.string().min(1)).default([]),
  isActive: z.boolean().default(true)
});

adminRouter.post("/products", (req, res) => {
  const body = productInputSchema.parse(req.body);
  const product = createProduct(body);
  res.status(201).json({ data: product, message: "Product created" });
});

adminRouter.put("/products/:id", (req, res) => {
  const body = productInputSchema.partial().parse(req.body);
  const product = updateProduct(Number(req.params.id), body);

  if (!product) {
    res.status(404).json({ message: "Product not found" });
    return;
  }

  res.json({ data: product, message: "Product updated" });
});

adminRouter.delete("/products/:id", (req, res) => {
  const removed = removeProduct(Number(req.params.id));

  if (!removed) {
    res.status(404).json({ message: "Product not found" });
    return;
  }

  res.json({ data: null, message: `Product ${req.params.id} removed` });
});

adminRouter.get("/orders", (_req, res) => {
  res.json({ data: [], meta: { count: 0 } });
});

adminRouter.put("/orders/:id/status", (req, res) => {
  res.json({ data: { id: req.params.id, status: req.body.status } });
});

adminRouter.get("/homepage", (_req, res) => {
  res.json({ data: homepageContent });
});

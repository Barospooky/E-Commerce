import { Router } from "express";
import { getProductBySlug, listCategories, listProducts } from "../data/catalogStore";

export const productRouter = Router();

productRouter.get("/", (req, res) => {
  const category = req.query.category?.toString();
  const q = req.query.q?.toString().toLowerCase();

  const products = listProducts().filter((product) => {
    if (!product.isActive) {
      return false;
    }

    const matchesCategory = !category || product.category === category;
    const matchesQuery =
      !q || `${product.name} ${product.description} ${product.tags.join(" ")}`.toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });

  res.json({ data: products, meta: { count: products.length } });
});

productRouter.get("/search", (req, res) => {
  const q = req.query.q?.toString().toLowerCase() ?? "";
  res.json({
    data: listProducts().filter((product) => product.isActive && product.name.toLowerCase().includes(q))
  });
});

productRouter.get("/categories", (_req, res) => {
  res.json({ data: listCategories() });
});

productRouter.get("/:slug", (req, res) => {
  const product = getProductBySlug(req.params.slug);

  if (!product || !product.isActive) {
    res.status(404).json({ message: "Product not found" });
    return;
  }

  res.json({ data: product });
});

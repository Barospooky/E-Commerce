import { Router } from "express";
import { catalog } from "../data/mockCatalog";

export const productRouter = Router();

productRouter.get("/", (req, res) => {
  const category = req.query.category?.toString();
  const q = req.query.q?.toString().toLowerCase();

  const products = catalog.filter((product) => {
    const matchesCategory = !category || product.category === category;
    const matchesQuery = !q || product.name.toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });

  res.json({ data: products, meta: { count: products.length } });
});

productRouter.get("/search", (req, res) => {
  const q = req.query.q?.toString().toLowerCase() ?? "";
  res.json({ data: catalog.filter((product) => product.name.toLowerCase().includes(q)) });
});

productRouter.get("/:slug", (req, res) => {
  const product = catalog.find((item) => item.slug === req.params.slug);

  if (!product) {
    res.status(404).json({ message: "Product not found" });
    return;
  }

  res.json({ data: product });
});

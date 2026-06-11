import { Router } from "express";
import { z } from "zod";
import { homepageContent } from "../data/homepageContent";
import { createProduct, getProductById, listProducts, removeProduct, updateProduct } from "../data/catalogStore";
import {
  createAdminCategory,
  createAdminCoupon,
  listAdminCategories,
  listAdminCoupons,
  listAdminCustomers,
  listAdminInventory,
  listAdminOrders,
  removeAdminCategory,
  removeAdminCoupon,
  updateAdminCategory,
  updateAdminCoupon,
  updateAdminCustomerStatus,
  updateAdminOrderStatus,
  updateInventoryStock
} from "../data/adminDataStore";
import { authenticate, authorize } from "../middlewares/auth";

export const adminRouter = Router();

adminRouter.use(authenticate, authorize(["ADMIN"]));

adminRouter.get("/products", (_req, res) => {
  res.json({ data: listProducts() });
});

adminRouter.get("/products/:id", (req, res) => {
  const product = getProductById(Number(req.params.id));

  if (!product) {
    res.status(404).json({ message: "Product not found" });
    return;
  }

  res.json({ data: product });
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

const orderStatusSchema = z.object({
  status: z.enum(["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"])
});

const customerStatusSchema = z.object({
  status: z.enum(["Active", "Inactive"])
});

const categorySchema = z.object({
  category: z.string().min(2),
  description: z.string().min(2),
  status: z.enum(["Active", "Inactive"])
});

const couponSchema = z.object({
  code: z.string().min(2).optional(),
  discount: z.string().min(2),
  minOrder: z.number().nonnegative(),
  usageCurrent: z.number().nonnegative(),
  usageLimit: z.number().positive(),
  validUntil: z.string().min(2),
  status: z.enum(["Active", "Inactive"])
});

const inventorySchema = z.object({
  stock: z.number().int().nonnegative()
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
  const orders = listAdminOrders();
  res.json({ data: orders, meta: { count: orders.length } });
});

adminRouter.put("/orders/:id/status", (req, res) => {
  const { status } = orderStatusSchema.parse(req.body);
  const updated = updateAdminOrderStatus(req.params.id, status);

  if (!updated) {
    res.status(404).json({ message: "Order not found" });
    return;
  }

  res.json({ data: updated, message: "Order status updated" });
});

adminRouter.get("/orders/:id", (req, res) => {
  const order = listAdminOrders().find((entry) => entry.id === req.params.id);
  if (!order) {
    res.status(404).json({ message: "Order not found" });
    return;
  }

  res.json({ data: order });
});

adminRouter.get("/customers", (_req, res) => {
  const customers = listAdminCustomers();
  res.json({ data: customers, meta: { count: customers.length } });
});

adminRouter.put("/customers/:email/status", (req, res) => {
  const { status } = customerStatusSchema.parse(req.body);
  const updated = updateAdminCustomerStatus(decodeURIComponent(req.params.email), status);

  if (!updated) {
    res.status(404).json({ message: "Customer not found" });
    return;
  }

  res.json({ data: updated, message: "Customer status updated" });
});

adminRouter.get("/categories", (_req, res) => {
  const categories = listAdminCategories();
  res.json({ data: categories, meta: { count: categories.length } });
});

adminRouter.post("/categories", (req, res) => {
  const body = categorySchema.parse(req.body);
  const category = createAdminCategory(body);
  res.status(201).json({ data: category, message: "Category created" });
});

adminRouter.put("/categories/:id", (req, res) => {
  const body = categorySchema.partial().parse(req.body);
  const updated = updateAdminCategory(Number(req.params.id), body);

  if (!updated) {
    res.status(404).json({ message: "Category not found" });
    return;
  }

  res.json({ data: updated, message: "Category updated" });
});

adminRouter.delete("/categories/:id", (req, res) => {
  const removed = removeAdminCategory(Number(req.params.id));

  if (!removed) {
    res.status(404).json({ message: "Category not found" });
    return;
  }

  res.json({ data: null, message: "Category removed" });
});

adminRouter.get("/coupons", (_req, res) => {
  const coupons = listAdminCoupons();
  res.json({ data: coupons, meta: { count: coupons.length } });
});

adminRouter.post("/coupons", (req, res) => {
  const body = couponSchema.parse(req.body);
  const coupon = createAdminCoupon(body);
  res.status(201).json({ data: coupon, message: "Coupon created" });
});

adminRouter.put("/coupons/:code", (req, res) => {
  const body = couponSchema.partial().parse(req.body);
  const updated = updateAdminCoupon(req.params.code.toUpperCase(), body);

  if (!updated) {
    res.status(404).json({ message: "Coupon not found" });
    return;
  }

  res.json({ data: updated, message: "Coupon updated" });
});

adminRouter.delete("/coupons/:code", (req, res) => {
  const removed = removeAdminCoupon(req.params.code.toUpperCase());

  if (!removed) {
    res.status(404).json({ message: "Coupon not found" });
    return;
  }

  res.json({ data: null, message: "Coupon removed" });
});

adminRouter.get("/inventory", (_req, res) => {
  const inventory = listAdminInventory();
  res.json({ data: inventory, meta: { count: inventory.length } });
});

adminRouter.put("/inventory/:id/stock", (req, res) => {
  const { stock } = inventorySchema.parse(req.body);
  const updated = updateInventoryStock(Number(req.params.id), stock);

  if (!updated) {
    res.status(404).json({ message: "Inventory item not found" });
    return;
  }

  res.json({ data: updated, message: "Inventory updated" });
});

adminRouter.get("/homepage", (_req, res) => {
  res.json({ data: homepageContent });
});

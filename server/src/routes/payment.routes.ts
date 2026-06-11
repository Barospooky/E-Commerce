import { Router } from "express";
import { authenticate } from "../middlewares/auth";

export const paymentRouter = Router();

paymentRouter.post("/initiate", authenticate, (_req, res) => {
  res.json({ data: { gateway: "razorpay", gatewayOrderId: "order_demo_123", amount: 0 } });
});

paymentRouter.post("/verify", authenticate, (_req, res) => {
  res.json({ success: true, message: "Payment verification scaffolded" });
});

paymentRouter.post("/webhook", (_req, res) => {
  res.json({ received: true });
});

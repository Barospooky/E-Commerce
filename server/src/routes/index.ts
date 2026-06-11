import { Router } from "express";
import { adminRouter } from "./admin.routes";
import { authRouter } from "./auth.routes";
import { cartRouter } from "./cart.routes";
import { orderRouter } from "./order.routes";
import { paymentRouter } from "./payment.routes";
import { productRouter } from "./product.routes";

export const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/products", productRouter);
apiRouter.use("/cart", cartRouter);
apiRouter.use("/orders", orderRouter);
apiRouter.use("/payments", paymentRouter);
apiRouter.use("/admin", adminRouter);

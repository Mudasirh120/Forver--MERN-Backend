import express from "express";
import {
  placeOrder,
  placeOrderStripe,
  allOrders,
  updateStatus,
  userOrders,
} from "../Controllers/Order.controller.js";
import { adminAuth } from "../Middleware/adminAuth.js";
import { authUser } from "../Middleware/auth.js";
const orderRouter = express.Router();
orderRouter.post("/", adminAuth, allOrders);
orderRouter.post("/update-status", adminAuth, updateStatus);
orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/place-stripe", authUser, placeOrderStripe);
orderRouter.post("/user-orders", authUser, userOrders);
export default orderRouter;

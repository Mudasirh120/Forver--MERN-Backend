import express from "express";
import {
  addToCart,
  getUserCart,
  updateCart,
} from "../Controllers/Cart.controller.js";
import { authUser } from "../Middleware/auth.js";
const cartRouter = express.Router();
cartRouter.post("/", authUser, getUserCart);
cartRouter.post("/add", authUser, addToCart);
cartRouter.post("/update", authUser, updateCart);
export default cartRouter;

import { Router } from "express";
import {
  showProduct,
  listProducts,
  editProduct,
  deleteProduct,
  addProduct,
} from "../Controllers/Product.controller.js";
import { upload } from "../Middleware/multer.js";
import { adminAuth } from "../Middleware/adminAuth.js";
const productsRouter = Router();
productsRouter.post("/delete", adminAuth, deleteProduct);
productsRouter.get("/single/:id", showProduct);
productsRouter.post(
  "/edit/:id",
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  editProduct
);
productsRouter.get("/", listProducts);
productsRouter.post(
  "/add",
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);
export default productsRouter;

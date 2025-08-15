import cors from "cors";
// import { configDotenv } from "dotenv";
import "dotenv/config";
import connectDB from "./Config/db.config.js";
import express from "express";
import connectCloudinary from "./Config/cloudinary.config.js";
import productsRouter from "./Routes/Products.routes.js";
import userRouter from "./Routes/Users.route.js";
import cookieParser from "cookie-parser";
import cartRouter from "./Routes/Carts.routes.js";
import orderRouter from "./Routes/Orders.routes.js";
const app = express();
const PORT = process.env.PORT || 5001;
// configDotenv();
connectDB();
connectCloudinary();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL, process.env.ADMIN_URL],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use("/api/user", userRouter);
app.use("/api/product", productsRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
export default app;
// app.listen(PORT, () => {
//   console.log(`Server Started at http://localhost:5001`);
// });

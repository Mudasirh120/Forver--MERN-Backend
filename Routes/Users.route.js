import express from "express";
import {
  adminLogin,
  registerUser,
  loginUser,
  checkAuth,
  logOut,
} from "../Controllers/User.controller.js";
import { adminAuth } from "../Middleware/adminAuth.js";
const userRouter = express.Router();
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", adminLogin);
userRouter.post("/check-auth", checkAuth);
userRouter.post("/check-admin", adminAuth, (req, res) => {
  res.status(200).json({ success: true, message: "Authorized" });
});
userRouter.post("/logout", logOut);
export default userRouter;

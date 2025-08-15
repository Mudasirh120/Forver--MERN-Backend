import { verifyToken } from "../Utils/jwt.js";
export const adminAuth = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    if (!token)
      return res.status(400).json({ success: false, message: "No Token" });
    const token_decode = verifyToken(token);
    if (token_decode != process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.json({ success: false, message: "Not Authorized" });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

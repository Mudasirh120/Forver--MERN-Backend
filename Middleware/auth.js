import { User } from "../Models/User.model.js";
import { verifyToken } from "../Utils/jwt.js";
export const authUser = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) return res.json({ success: false, message: "Not Authorized" });
    const id = verifyToken(token);
    const userExists = await User.findById(id);
    if (userExists) {
      req.userId = id;
      return next();
    } else {
      return res.json({ success: false, message: "Fake token" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

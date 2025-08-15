import { User } from "../Models/User.model.js";
import validator from "validator";
import {
  clearCookie,
  createToken,
  setCookies,
  verifyToken,
} from "../Utils/jwt.js";
import { CompareHashing, hashPassword } from "../Utils/bcrypt.js";
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const foundedUser = await User.findOne({ email });
    if (foundedUser)
      return res
        .status(400)
        .json({ success: false, message: "User already Exist!" });
    if (!validator.isEmail(email))
      return res
        .status(400)
        .json({ success: false, message: "Please enter a valid email" });
    if (password.length < 8)
      return res
        .status(400)
        .json({ success: false, message: "Please enter a strong password" });
    const hashedPassword = await hashPassword(password);
    const newUser = new User({ name, password: hashedPassword, email });
    const user = await newUser.save();
    const token = createToken(user._id);
    setCookies(res, token);
    return res.status(201).json({
      success: true,
      message: "User created successfully!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message:
        error.message || "Internal Server Error, Unable to create a new User.",
    });
  }
};
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const foundedUser = await User.findOne({ email });
    if (!foundedUser)
      res.status(200).json({ success: false, message: "User doesn't exist" });
    const isMatch = await CompareHashing(password, foundedUser.password);
    if (isMatch) {
      const token = createToken(foundedUser._id);
      setCookies(res, token);
      return res
        .status(200)
        .json({ success: true, message: "Successful Login" });
    } else
      res.status(400).json({ success: false, message: "Wrong Credentials" });
  } catch (error) {
    return req.status(500).json({
      success: false,
      message: error.message || "Internal Server Error.",
    });
  }
};

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = createToken(
        process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD
      );
      setCookies(res, token);
      return res
        .status(200)
        .json({ success: true, message: "Admin Verified Successfully" });
    } else
      return res
        .status(400)
        .json({ success: false, message: "Wrong Credentials" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const checkAuth = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) return res.json({ success: false, message: "Not Authorized" });
    const id = verifyToken(token);
    const userExists = await User.findById(id);
    if (userExists) {
      return res.status(200).json({ success: true, message: "Authorized" });
    } else {
      return res.json({ success: false, message: "Fake token" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
export const logOut = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token)
    return res.status(400).json({ success: false, message: "Log in first" });
  clearCookie(res);
  return res
    .status(200)
    .json({ success: true, message: "Logged Out Successfully" });
};

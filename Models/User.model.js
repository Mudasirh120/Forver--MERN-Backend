import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    cartData: { type: Object, default: {} },
  },
  { timestamps: true, minimize: false }
);
// minimize so mongoose doesn't discard empty object.
export const User = mongoose.model("User", userSchema);

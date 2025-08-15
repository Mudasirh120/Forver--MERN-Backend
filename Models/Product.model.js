import mongoose, { Types } from "mongoose";
const productSchema = new mongoose.Schema(
  {
    Productid: String,
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: [{ type: String }],
    category: String,
    subCategory: String,
    sizes: [{ type: String }],
    bestseller: Boolean,
  },
  { timestamps: true }
);
export const Product = mongoose.model("Product", productSchema);

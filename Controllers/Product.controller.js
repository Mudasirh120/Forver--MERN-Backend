import { Product } from "../Models/Product.model.js";
import { cloudinaryUpload } from "../Utils/cloudinary.js";
export const showProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product)
      return res
        .status(400)
        .json({ success: false, message: "Product doesn't exist" });
    return res
      .status(200)
      .json({ success: true, message: "Product founded", product });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
export const listProducts = async (req, res) => {
  try {
    const allProducts = await Product.find();
    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: allProducts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Unable to fetch Products",
    });
  }
};
export const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestSeller,
    } = req.body;
    const files = req.files || {};
    const image1 = files.image1?.[0];
    const image2 = files.image2?.[0];
    const image3 = files.image3?.[0];
    const image4 = files.image4?.[0];
    const images = [image1, image2, image3, image4].filter(
      (item) => item != undefined
    );
    let imageUrl = await Promise.all(
      images.map((img) => cloudinaryUpload(img.path, "products"))
    );
    const newProduct = new Product({
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestSeller: bestSeller === "true" ? true : false,
      image: imageUrl,
    });
    const prod = await newProduct.save();
    return res.status(200).json({
      success: true,
      message: "Product added successfully",
      data: prod,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
export const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestSeller,
      existingImages,
    } = req.body;
    const existingImagesArray = JSON.parse(existingImages || "[]");
    const files = req.files || {};
    const image1 = files.image1?.[0];
    const image2 = files.image2?.[0];
    const image3 = files.image3?.[0];
    const image4 = files.image4?.[0];
    const images = [image1, image2, image3, image4];
    let imageUrl = ["", "", "", ""];
    console.log("existingImages", existingImagesArray);
    console.log("images", images);
    if (images.length === 0 && existingImages.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No images provided for update" });
    }
    imageUrl = await Promise.all(
      images.map(async (img, index) => {
        if (img) return await cloudinaryUpload(img.path, "products");
        return existingImagesArray[index] || null;
      })
    );
    const findProduct = await Product.findById(id);
    if (!findProduct) {
      return res
        .status(400)
        .json({ success: false, message: "Product not found" });
    }
    findProduct.name = name;
    findProduct.description = description;
    findProduct.price = price;
    findProduct.category = category;
    findProduct.subCategory = subCategory;
    findProduct.sizes = JSON.parse(sizes);
    findProduct.bestseller = bestSeller === "true" ? true : false;
    findProduct.image = imageUrl;
    const prod = await findProduct.save();
    return res.status(200).json({
      success: true,
      message: "Product edited successfully",
      data: prod,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
export const deleteProduct = async (req, res) => {
  try {
    const foundedProduct = await Product.findByIdAndDelete(req.body.id);
    if (!foundedProduct)
      return res
        .status(400)
        .json({ success: false, message: "Product doesn't exist" });
    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: foundedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Unable to delete Product",
    });
  }
};

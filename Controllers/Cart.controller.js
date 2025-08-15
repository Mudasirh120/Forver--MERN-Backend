import { User } from "../Models/User.model.js";
export async function addToCart(req, res) {
  const { itemId, size } = req.body;
  const { userId } = req;
  try {
    const userData = await User.findById(userId);
    let cartData = userData.cartData;
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    await User.findByIdAndUpdate(userId, { cartData });
    res.status(200).json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
}
export async function updateCart(req, res) {
  const { itemId, size, quantity } = req.body;
  const { userId } = req;
  try {
    const userData = await User.findById(userId);
    let cartData = userData.cartData;
    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }
    cartData[itemId][size] = quantity;
    await User.findByIdAndUpdate(userId, { cartData });
    res.status(200).json({ success: true, message: "Cart updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
}
export async function getUserCart(req, res) {
  const { userId } = req;
  try {
    const userData = await User.findById(userId);
    let cartData = userData.cartData;
    res.status(200).json({ success: true, message: "Cart fetched", cartData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
}

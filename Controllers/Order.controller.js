import { Order } from "../Models/Order.model.js";
import { User } from "../Models/User.model.js";
//COD
export const placeOrder = async (req, res) => {
  try {
    const { userId } = req;
    const { items, amount, address } = req.body;
    const orderData = {
      userId,
      items,
      price: amount,
      address,
      paymentMethod: "cod",
      payment: false,
      status: "Order Placed",
    };
    const newOrder = new Order(orderData);
    await newOrder.save();
    await User.findByIdAndUpdate(userId, { cartData: {} });
    res.json({ success: true, message: "Order Placed Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//Stripe
export const placeOrderStripe = async (req, res) => {};
export const allOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    console.log(orders);
    res.json({ success: true, message: "Orders fetched", orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
export const userOrders = async (req, res) => {
  try {
    const { userId } = req;
    const orders = await Order.find({ userId });
    console.log(orders);
    res.json({ success: true, message: "Orders fetched", orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
export const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    const res = await Order.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, messssage: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, messssage: error.message });
  }
};

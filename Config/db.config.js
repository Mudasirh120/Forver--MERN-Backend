import mongoose from "mongoose";
const connectDB = async () => {
  try {
    const res = await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB connected Successfully => ", res.connection.host);
  } catch (error) {
    console.log("Error Connecting MongoDb =>", error);
    process.exit(1);
  }
};
export default connectDB;

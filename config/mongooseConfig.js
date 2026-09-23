import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const url = process.env.DB_URL;

export const connectUsingMongoose = async () => {
  try {
    await mongoose.connect(url);
    console.log("MongoDB using Mongoose is connected!");
  } catch (err) {
    console.log("Error---connectUsingMongoose----", err);
  }
};

import { ObjectId } from "mongodb";
import mongoose from "mongoose";

export const cartItemSchema = new mongoose.Schema({
  productID: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  quatity: Number,
});

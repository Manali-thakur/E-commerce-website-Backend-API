import mongoose from "mongoose";

export const productSchema = new mongoose.Schema({
  description: String,
  category: {
    type: String,
    enum: ["beauty", "electronics", "toys", "cloths", "bags"],
  },
  price: Number,
  stock: Number,
  returnPolicy: String,
  shipingInformation: String,
  availabilityStatus: String,
});

import mongoose from "mongoose";
const { schema } = mongoose;

export const productSchema = new schema({
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

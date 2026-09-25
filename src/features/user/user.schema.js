import mongoose from "mongoose";
const { schema } = mongoose;

export const userSchema = new schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  type: { type: String, enum: ["Customer", "String"] },
});

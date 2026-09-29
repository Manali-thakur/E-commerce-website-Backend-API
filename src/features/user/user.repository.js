import { userSchema } from "./user.schema.js";
import mongoose from "mongoose";

const UserModel = mongoose.model("users", userSchema);

export default class UserRepositry {
  async signUp(newUser) {
    try {
      const newUser = new UserModel(newUser);
      await newUser.save();
      return newUser;
    } catch (err) {
      throw new ApplicationError("Failed to sign up user", 500, err.message);
    }
  }

  async signIn(email, password) {
    try {
      console.log("User has logged-In");
      return await UserModel.findOne({ email, password });
    } catch (err) {
      throw new ApplicationError("Failed to sign in user", 500, err.message);
    }
  }

  async findByEmail(email) {
    try {
      return await UserModel.findOne({ email });
    } catch (err) {
      throw new ApplicationError("Failed to sign in user", 500, err.message);
    }
  }
}

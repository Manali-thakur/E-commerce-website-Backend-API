import mongoose from "mongoose";
import { ApplicationError } from "../../error-handler/applicationError.js";
import { userSchema } from "./user.schema.js";

const UserModel = mongoose.model("users", userSchema);

export default class UserRepositry {
  async signUp(newUser) {
    try {
      const user = new UserModel(newUser);
      await user.save();
      return user;
    } catch (err) {
      // throw new ApplicationError("Failed to sign up user", 500, err.message);
      console.log(err.name, "|", err.message);
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
      return await UserModel.findOne({ email }).select("+password"); //tell mongoose to include the password field in the result
    } catch (err) {
      throw new ApplicationError("Failed to sign in user", 500, err.message);
    }
  }

  async resetPassword(userID, newPassword) {
    try {
      const user = await UserModel.findById(userID);
      if (!user) {
        throw new ApplicationError("User not found", 404);
      }
      user.password = newPassword;
      await user.save();
      return user;
    } catch (err) {
      throw new ApplicationError("Failed to reset password", 500, err.message);
    }
  }
}

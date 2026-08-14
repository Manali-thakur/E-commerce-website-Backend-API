import { UserModel } from "../model/user.model.js";
import jwt from "jsonwebtoken";

export class UserController {
  async signUp(req, res) {
    const { name, email, password, type } = req.body;
    const result = await UserModel.signUp(name, email, password, type);
    console.log(result);

    res
      .status(201)
      .json({ status: "Success", msg: "User created Successfully" });
  }

  async signIn(req, res) {
    const { email, password } = req.body;
    console.log(req.body);
    const result = await UserModel.signIn(email, password);
    console.log(result);
    if (result) {
      // 1. token creation
      const token = jwt.sign(
        { userID: result.id, email: result.email },
        "ZdePxPHU9L63rddFpJfdfJdM",
        { expiresIn: "1h" },
      );
      return res
        .status(200)
        .json({ status: "success", msg: "login successful", Token: token }); //returning token
    } else {
      res
        .status(400)
        .json({ status: "UnAuthorized", msg: "No such User Available" });
    }
  }
}

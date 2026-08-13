import { UserModel } from "../model/user.model.js";
import jwt from "jsonwebtoken";

export class UserController {
  async signUp(req, res) {
    const { name, email, password, type } = req.body;
    const result = await UserModel.signUp(name, email, password, type);
    console.log(result);
    res.status(201).send(result);
  }

  async signIn(req, res) {
    const { email, password } = req.body;
    console.log(req.body);
    const result = await UserModel.signIn(email, password);
    console.log(result);
    if (result) {
      // 1. create the token
      const token = jwt.sign(
        { userID: result.id, email: result.email },
        "T|7t]V+1nJ3G5m=d",
        { expiresIn: "1h" },
      );

      // sending the token
      return res.status(200).send(token);
    } else {
      res.status(400).send("There is an Error!!");
    }
  }
}

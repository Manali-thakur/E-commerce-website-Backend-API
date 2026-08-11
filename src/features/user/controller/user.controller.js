import { UserModel } from "../model/user.model.js";

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
      res.status(200).send(result);
    } else {
      res.status(400).send("There is an Error!!");
    }
  }
}

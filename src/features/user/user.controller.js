import { UserModel } from "./user.model.js";
import jwt from "jsonwebtoken";
import UserRepository from "./user.repository.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

export class UserController {
  // creating constructore function for creation of the instance of the repository class
  constructor() {
    this.userRepository = new UserRepository();
  }

  async signUp(req, res) {
    try {
      const { name, email, password, type } = req.body;

      const user = new UserModel(null, name, email, password, type);

      await this.userRepository.signUp(user); // calling the signUp method of the repository class to save the user in the database

      console.log(
        ` UserController: signUp called with user: ${JSON.stringify(user)}`,
      );

      res.status(201).json({
        status: "Success",
        msg: "User created Successfully",
        user: user,
      });
    } catch (err) {
      throw new ApplicationError("Failed to create user", 500, err.message);
      // console.error(err);
      // res.status(500).json({
      //   status: "Error",
      //   msg: "Failed to create user",
      //   error: err.message,
      // });
    }
  }

  async signIn(req, res, next) {
    try {
      const result = await this.userRepository.signIn(
        req.body.email,
        req.body.password,
      );
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
          .json({ status: "UnAuthorized", msg: "Incorrect Credentials" });
      }
    } catch (err) {
      throw new ApplicationError("Failed to sign in user", 500, err.message);
      console.error(err);
    }
  }
}

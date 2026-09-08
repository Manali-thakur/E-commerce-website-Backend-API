import { UserModel } from "./user.model.js";
import jwt from "jsonwebtoken";
import UserRepository from "./user.repository.js";
import { ApplicationError } from "../../error-handler/applicationError.js";
import bcrypt from "bcrypt";

export class UserController {
  // creating constructore function for creation of the instance of the repository class
  constructor() {
    this.userRepository = new UserRepository();
  }

  async signUp(req, res) {
    try {
      const { name, email, password, type } = req.body;

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = new UserModel(null, name, email, hashedPassword, type);

      await this.userRepository.signUp(user); // calling the signUp method of the repository class to save the user in the database

      console.log(
        ` UserController: signUp called with user: ${JSON.stringify(user)}`,
      );

      res.status(201).json({
        status: "Success",
        msg: "User created Successfully",
        ID: user.id,
        name: user.name,
        email: user.email,
        type: user.type,
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
      // 1. Find the user by email
      const user = await this.userRepository.findByEmail(req.body.email);
      if (!user) {
        return res
          .status(400)
          .json({ status: "UnAuthoorized", msg: "No such Email Found" });
      } else {
        //2. If the user is found, compare passwords with hashed password
        const isPasswordValid = await bcrypt.compare(
          req.body.password,
          user.password,
        );

        // 3. If the password is valid, create a JWT token and return it to the client
        if (isPasswordValid) {
          // 1. token creation
          const token = jwt.sign(
            { userID: user.id, email: user.email },
            "ZdePxPHU9L63rddFpJfdfJdM",
            { expiresIn: "1h" },
          );
          return res.status(200).json({
            status: "success",
            msg: "login successful",
            Token: token,
          }); //returning token
        } else {
          // 4. If the password is invalid, return an error response
          res
            .status(400)
            .json({ status: "UnAuthorized", msg: "Incorrect Credentials" });
        }
      }
    } catch (err) {
      // 5. If there is an error during the process, return an error response
      throw new ApplicationError("Failed to sign in user", 500, err.message);
      console.error(err);
    }
  }
}

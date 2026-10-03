import express from "express";
import jwtAuth from "../../middleware/jwt.middleware.js";
import { UserController } from "./user.controller.js";
import { validate } from "../../middleware/validation.middleware.js";
import { signUpRules } from "./user.validation.js";

const UserRoutes = express.Router();

const userController = new UserController();

// all the paths
UserRoutes.post("/register", signUpRules, validate, (req, res) =>
  userController.signUp(req, res),
);

UserRoutes.post("/login", (req, res) => userController.signIn(req, res));

UserRoutes.post("/reset-password", jwtAuth, (req, res, next) =>
  userController.resetPassword(req, res, next),
);

export default UserRoutes;

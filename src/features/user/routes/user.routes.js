import express from "express";
import { UserController } from "../controller/user.controller.js";

const UserRoutes = express.Router();

const userController = new UserController();

// all the paths
UserRoutes.post("/signup", userController.signUp);

UserRoutes.post("/signin", userController.signIn);

export default UserRoutes;

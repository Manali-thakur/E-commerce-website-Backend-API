import express from "express";
import { UserController } from "../controller/user.controller.js";

const UserRoutes = express.Router();

const userController = new UserController();

// all the paths
UserRoutes.post("/register", userController.signUp);

UserRoutes.post("/login", userController.signIn);

export default UserRoutes;

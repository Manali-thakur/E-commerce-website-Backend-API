import express from "express";
import { UserController } from "./user.controller.js";

const UserRoutes = express.Router();

const userController = new UserController();

// all the paths
UserRoutes.post("/register", (req, res) => userController.signUp(req, res));

UserRoutes.post("/login", (req, res) => userController.signIn(req, res));

export default UserRoutes;

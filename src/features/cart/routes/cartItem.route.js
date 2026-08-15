import express from "express";
import CartItemController from "../controller/cartItem.controller.js";

const CartRouter = express.Router();

const cartItemController = new CartItemController();

CartRouter.post("/", cartItemController.add);

export default CartRouter;

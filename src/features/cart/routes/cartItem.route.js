import express from "express";
import CartItemController from "../controller/cartItem.controller.js";

const CartRouter = express.Router();

const cartItemController = new CartItemController();

CartRouter.post("/", cartItemController.add);
CartRouter.get('/', cartItemController.get);

export default CartRouter;

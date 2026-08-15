import express from "express";
import CartItemController from "../controller/cartItem.controller.js";

const CartRouter = express.Router();

const cartItemController = new CartItemController();

CartRouter.post("/", cartItemController.add);
CartRouter.get('/', cartItemController.get);
CartRouter.delete("/:id", cartItemController.deleteCart);

export default CartRouter;

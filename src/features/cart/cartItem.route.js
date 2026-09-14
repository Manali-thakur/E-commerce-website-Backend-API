import express from "express";
import CartItemController from "./cartItem.controller.js";

const CartRouter = express.Router();

const cartItemController = new CartItemController();

CartRouter.post("/", (req, res) => {
  cartItemController.add(req, res);
});

CartRouter.get("/", (req, res) => {
  cartItemController.get(req, res);
});

CartRouter.delete("/", (req, res) => {
  cartItemController.deleteCart(req, res);
});

export default CartRouter;

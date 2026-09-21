import express from "express";
import OrderController from "./order.controller.js";

const orderRouter = express.Router();
const ordercontroller = new OrderController();

orderRouter.post("/", (req, res, next) => {
  ordercontroller.placeOrder(req, res, next);
});

export default orderRouter;

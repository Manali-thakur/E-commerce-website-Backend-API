import OrderRepository from "./order.repository.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

export default class OrderController {
  constructor() {
    this.orderRepository = new OrderRepository();
  }

  async placeOrder(req, res, next) {
    try {
      const userId = req.userId;
      const total = await this.orderRepository.placeOrder(userId);
      res.status(200).json({ msg: " Cart item total", total });
    } catch (err) {
      console.error("Error during placing the order..", err);
      res.status(500).send("Some Error occured when we try to place order..");
      //   throw new ApplicationError("Unable to place order", 500);
    }
  }
}

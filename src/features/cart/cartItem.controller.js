import cartItemModel from "./cartItems.model.js";
import { ObjectId } from "mongodb";
import CartRepository from "./cartItem.repository.js";

export default class CartItemController {
  constructor() {
    this.cartItemsRepository = new CartRepository();
  }

  async add(req, res) {
    // getting userID from the token
    try {
      const { productId, quantity } = req.body;

      const userId = req.userId;

      const result = await this.cartItemsRepository.add(
        productId,
        userId,
        quantity,
      );

      if (!result) {
        return res.status(404).json({
          status: "Failed",
          msg: result,
        });
      } else {
        res.status(201).json({
          status: "Successful",
          msg: "Cart Item is Updated",
        });
      }
    } catch (err) {
      console.error(err);
      return res
        .status(200)
        .send("Something Went wrong during the ADD cart products");
    }
  }

  async get(req, res) {
    try {
      const userId = req.userId;

      if (!userId || !ObjectId.isValid(userId)) {
        return res.status(401).json({ status: "Failed", msg: "Unauthorized" });
      }

      const inCart = await this.cartItemsRepository.get(userId);

      if (!inCart || inCart.length === 0) {
        return res.status(404).json({
          status: "You don't have any cart!!",
          result: inCart,
        });
      } else {
        return res.status(200).json({
          status: "Successful",
          result: inCart,
        });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        status: "Failed",
        msg: "Something went wrong during the get cart products",
      });
    }
  }

  async deleteCart(req, res) {
    try {
      const { cartId } = req.body;
      // console.log(req.body);

      const userId = req.userId;

      if (!cartId) {
        res.send("CartId is important");
      }

      const result = await this.cartItemsRepository.delete(cartId, userId);

      if (result) {
        return res.status(200).json({
          status: "Successful",
          msg: "Cart Item is removed",
        });
      } else {
        return res
          .status(404)
          .json({ status: "Failed", msg: "No such Cart Available" });
      }
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .send("Something Went wrong during the DELETION of the cart product");
    }
  }
}

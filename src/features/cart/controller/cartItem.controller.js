import cartItemModel from "../model/cartItems.model.js";

export default class CartItemController {
  async add(req, res) {
    // getting userID from the token
    console.log(req.query);
    const { productId, quantity } = req.query;

    const userId = req.userId;

    // checking if the product exists
    const productexist = cartItemModel.availableProduct(productId);
    if (!productexist) {
      return res
        .status(404)
        .json({ msg: "No such Product Available" }, productId);
    }

    const result = await cartItemModel.addCartItem(productId, userId, quantity);

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
  }

  async get(req, res) {
    const userId = req.userId;
    console.log("UserID = ", userId);
    const inCart = await cartItemModel.get(userId);

    if (!inCart) {
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
  }
  //   update quantity of existing cart item
  // delete cart through cart id
}

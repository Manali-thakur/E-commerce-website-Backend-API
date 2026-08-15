import cartItemModel from "../model/cartItems.model.js";

export default class CartItemController {
    
  add(req, res) {
    // getting userID from the token
    console.log(req.query);
    const { productId, quantity } = req.query;

    const userId = req.userId;

    const result = cartItemModel.addCartItem(productId, userId, quantity);

    if (!result) {
      res.status(404).json({
        status: "Failed",
        msg: result,
      });
    } else {
      res.status(201).json({
        status: "Successful",
        msg: "Cart Item is Updated",
        result: result,
      });
    }
  }
}

// productId, userID, quantity
import ProductModel from "../product/product.model.js";

export default class cartItemModel {
  constructor(productID, userID, quantity, id) {
    this.productID = productID;
    this.userID = userID;
    this.quantity = quantity;
    this._id = id;
  }

  // static availableProduct(productId) {
  //   return ProductModel.getAll().filter((p) => p.id == productId);
  // }

  // static get(userId) {
  //   return cartItem.filter((u) => u.userId == userId);
  // }
  //  }
}

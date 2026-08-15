// productId, userID, quantity
import ProductModel from "../../product/model/product.model.js";

export default class cartItemModel {
  constructor(productId, userId, quantity, cartId) {
    this.productId = productId;
    this.userId = userId;
    this.quantity = quantity;
    this.cartId = cartId;
  }

  static availableProduct(productId) {
    return ProductModel.getAll().filter((p) => p.id == productId);
  }

  static addCartItem(productId, userId, quantity) {
    if (!productId || !userId || !quantity) {
      return false;
    }

    const createItem = new cartItemModel(productId, userId, quantity);

    createItem.cartId = cartItem.length + 1;
    console.log(createItem);
    cartItem.push(createItem);

    return cartItem;
  }

  static get(userId) {
    return cartItem.filter((u) => u.userId == userId);
  }
}

var cartItem = [
  new cartItemModel(1, 1, 1, 1),
  new cartItemModel(2, 1, 3, 2),
  new cartItemModel(12, 2, 5, 2),
]; //productId= 1, userId = 2, quantity =1, cartId = 1

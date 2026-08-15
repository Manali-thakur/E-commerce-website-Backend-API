// productId, userID, quantity

export default class cartItemModel {
  constructor(productId, userId, quantity, cartId) {
    this.productId = productId;
    this.userId = userId;
    this.quantity = quantity;
    this.cartId = cartId;
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
}

var cartItem = [new cartItemModel(1, 2, 1, 1)]; //productId= 1, userId = 2, quantity =1, cartId = 1

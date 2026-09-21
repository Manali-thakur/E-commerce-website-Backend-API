import { ObjectId } from "mongodb";
import { getDB } from "../../../config/mongodb.js";

export default class OrderRepository {
  constructor() {
    this.collection = "orders";
  }

  async placeOrder(userId) {
    // 1, get cartitems and calculate total amount
    await this.getTotalAmount(userId);
    // 2. create an order record

    // 3. reduce the stock
    // 4. clear the cart items.
  }

  async getTotalAmount(userId) {
    const db = await getDB();

    const items = await db
      .collection("cartItems")
      .aggregate([
        // 1.get all cart items for the user
        {
          $match: { userID: new ObjectId(userId) },
        },
        // 2.Get the products from product collection
        {
          $lookup: {
            from: "products",
            localField: "productID",
            foreignField: "_id",
            as: "productInfo",
          },
        },
        // 3. Unwind the productinfo retrieve all cart items
        {
          $unwind: "$productInfo",
        },
        // 4.calculate totalAmount for each cartitems
        {
          $addFields: {
            totalAmount: {
              $multiply: ["$productInfo.price", "$quantity"],
            },
          },
        },
      ])
      .toArray();

    //5.total amount of all the cart items acc-accumulator
    const finalTotalAmount = items.reduce(
      (acc, item) => acc + item.totalAmount,
      0,
    );

    console.log("Total amount of the cart = ", finalTotalAmount);
    return finalTotalAmount;
  }
}

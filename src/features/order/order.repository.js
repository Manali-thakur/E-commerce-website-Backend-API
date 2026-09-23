import { ObjectId } from "mongodb";
import { getDB } from "../../../config/mongodb.js";
import OrderModel from "./order.model.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

export default class OrderRepository {
  constructor() {
    this.collection = "orders";
  }

  async placeOrder(userId) {
    try {
      const db = await getDB();

      // 1, get cartitems and calculate total amount
      const items = await this.getTotalAmount(userId);

      //total amount of all the cart items acc-accumulator
      const finalTotalAmount = items.reduce(
        (acc, item) => acc + item.totalAmount,
        0,
      );
      console.log("Total amount of the cart = ", finalTotalAmount);
      // 2. create an order record

      const newOrder = new OrderModel(
        new ObjectId(userId),
        finalTotalAmount,
        new Date(),
      );
      await db.collection(this.collection).insertOne(newOrder);

      // 3. reduce the stock
      for (let item of items) {
        await db.collection("products").updateOne(
          {
            _id: item.productID,
          },
          {
            $inc: { stock: -item.quantity },
          },
        );
      }
      throw new Error("something");

      // 4. clear the cart items.
      await db.collection("cartItems").deleteMany({
        userID: new ObjectId(userId),
      });

      return;
    } catch (err) {
      // console.log(
      //   "error during place order repository--------------------",
      //   err,
      // );
      throw new ApplicationError("Something went wrong with the database", 500);
    }
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

    return items;
  }
}

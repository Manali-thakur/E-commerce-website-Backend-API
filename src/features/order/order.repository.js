import { ObjectId } from "mongodb";
import { getClient, getDB } from "../../../config/mongodb.js";
import OrderModel from "./order.model.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

export default class OrderRepository {
  constructor() {
    this.collection = "orders";
  }

  async placeOrder(userId) {
    const db = await getDB();
    const client = await getClient();
    const session = client.startSession();

    try {
      await session.startTransaction();

      // 1, get cartitems and calculate total amount
      const items = await this.getTotalAmount(userId, session);

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
      await db.collection(this.collection).insertOne(newOrder, { session });

      // 3. reduce the stock
      for (let item of items) {
        await db.collection("products").updateOne(
          {
            _id: item.productID,
          },
          {
            $inc: { stock: -item.quantity },
          },
          { session },
        );
      }
      // throw new Error("something");

      // 4. clear the cart items.
      await db.collection("cartItems").deleteMany(
        {
          userID: new ObjectId(userId),
        },
        { session },
      );

      // imp to add of nothing will be saved or done
      await session.commitTransaction();

      return;
    } catch (err) {
      await session.abortTransaction();

      console.log(
        "error during place order repository-------------------------------",
        err,
        "------------------------------------",
      );
      throw new ApplicationError("Something went wrong with the database", 500);
    } finally {
      await session.endSession();
    }
  }

  async getTotalAmount(userId, session) {
    const db = await getDB();

    const items = await db
      .collection("cartItems")
      .aggregate(
        [
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
        ],
        { session },
      )
      .toArray();

    return items;
  }
}

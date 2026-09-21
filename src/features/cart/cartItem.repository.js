import { ObjectId, ReturnDocument } from "mongodb";
import { getDB } from "../../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

class CartRepository {
  constructor() {
    this.collection = "cartItems";
    // this.productsCollection = "products";
  }

  async add(productId, userId, quantity) {
    try {
      const db = await getDB();
      const collection = db.collection(this.collection);
      // here it is initailized
      const id = await this.getNextCounter(db);
      //For already input cart- updating the Cart quantity-
      // find the document
      // either insert or update
      // insertion

      return await collection.updateOne(
        {
          //filter exp
          productID: new ObjectId(productId),
          userID: new ObjectId(userId),
        },
        {
          $setOnInsert: { _id: id },
          $inc: {
            quantity: quantity,
          },
        },
        { upsert: true },
      );
    } catch (err) {
      console.log("Error during Adding new Cart---", err);
      throw new ApplicationError("Unable to product into the CART--", 500);
    }
  }

  async get(userId) {
    try {
      const db = await getDB();
      const collection = db.collection(this.collection);

      const CartUser = await collection
        .find({ userId: new ObjectId(userId) })
        .toArray();

      return CartUser;
    } catch (err) {
      console.log("Error during getting cart according to the user---", err);
      throw new ApplicationError(
        "Error during getting cart according to the user",
        500,
      );
    }
  }

  async delete(cartId, userId) {
    try {
      const db = await getDB();
      const collection = db.collection(this.collection);

      const result = await collection.deleteOne({
        _id: new ObjectId(cartId),
        userID: new ObjectId(userId),
      });

      console.log("DELETE RESULT:", result);
      console.log("deletedCount:", result.deletedCount);

      return result.deletedCount > 0;

      // console.log("Trying to delete:", { cartId, userId });
      // const doc = await collection.findOne({ _id: new ObjectId(cartId) });
      // console.log("Document found by _id alone:", doc);

      // return result;
    } catch (err) {
      console.log("ERROR-- during deletion of the CART---", err);
      throw new ApplicationError("Something went wrong");
    }
  }

  // update the counter and return it back
  async getNextCounter(db) {
    const resultDocument = await db.collection("counters").findOneAndUpdate(
      {
        // finding the counter
        _id: "cartItemId",
      },
      {
        // incrementing the value
        $inc: { value: 1 },
      },
      {
        // return the updated document
        returnDocument: "after",
      },
    );
    console.log("counter = ", resultDocument);
    return resultDocument.value;
    // first is mongodb db value, second value is actual attribute
  }
}

export default CartRepository;

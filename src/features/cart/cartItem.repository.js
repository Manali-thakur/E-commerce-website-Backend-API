import { ObjectId } from "mongodb";
import { getDB } from "../../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

class CartRepository {
  constructor() {
    this.collection = "cart";
    // this.productsCollection = "products";
  }

  async add(productId, userId, quantity) {
    try {
      const db = await getDB();
      const collection = db.collection(this.collection);

      return await collection.insertOne({
        productId: new ObjectId(productId),
        userId: new ObjectId(userId),
        quantity,
      });
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
        userId: new ObjectId(userId),
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
}

export default CartRepository;

import { getDB } from "../../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";
import { ObjectId } from "mongodb";

class ProductRepository {
  constructor() {
    // collection name
    this.collection = "products";
  }

  async add(newProduct) {
    try {
      //1. get database
      const db = await getDB();

      // 2. Get the Collection
      const collection = db.collection(this.collection);

      // 3. Insert the document
      await collection.insertOne(newProduct);

      // return the newly created product
      return newProduct;
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Unable to add the NEW Product", 500);
    }
  }

  async getAll() {
    try {
      // 1. get databaase
      const db = await getDB();

      // 2. Get the Collection
      const collection = db.collection(this.collection);

      // 3. Get all Products
      const products = await collection.find().toArray();

      // 4.Return all products
      return products;
    } catch (err) {
      console.log(`ERROR ----- ${err}`);
      throw new ApplicationError("Unabale to get All Products", 500);
    }
  }

  async get(id) {
    try {
      // 1. Get the DB
      const db = await getDB();

      // 2. Get the collection
      const collection = db.collection(this.collection);

      // 3. Get one product
      const product = await collection.findOne({ _id: id });

      // 4. Returning the Product
      return product;
    } catch (err) {
      console.log(`ERROR ----- ${err}`);
      throw new ApplicationError("Unabale to get a Product", 500);
    }
  }

  async filter(minPrice, maxPrice, category) {
    try {
      //  1. Get the DB
      const db = await getDB();

      //2. get the collection
      const collection = db.collection(this.collection);

      // 3. Creating the Filter  Object
      const filterExpression = {};
      if (minPrice) {
        filterExpression.price = { $gte: parseFloat(minPrice) };
      }
      if (maxPrice) {
        filterExpression.price = {
          ...filterExpression.price,
          $lte: parseFloat(maxPrice),
        };
      }
      if (category) {
        filterExpression.category = category;
      }
      return await collection.find(filterExpression).toArray();
    } catch (err) {
      console.log(`ERROR ----- ${err}`);
      throw new ApplicationError("Unable to filter the products", 500);
    }
  }

  async rate(userID, productID, rating) {
    try {
      const db = await getDB();
      const collection = db.collection(this.collection);

      // 1.Remove existing entry
      await collection.updateOne(
        {
          _id: new ObjectId(productID),
        },
        {
          //removing existing entry
          $pull: { ratings: { userID: userID } },
        },
      );
      //2.Add new Entry
      await collection.updateOne(
        {
          _id: new ObjectId(productID),
        },
        {
          // pushing the document
          $push: { ratings: { userID: userID, rating: rating } },
        },
      );
    } catch (err) {
      console.log(`ERROR ----- ${err}`);
      throw new ApplicationError("Unable to Rate the product", 500);
    }
  }
}

export default ProductRepository;

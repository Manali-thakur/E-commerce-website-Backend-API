import { getDB } from "../../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

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

  async get(title) {
    try {
      // 1. Get the DB
      const db = await getDB();

      // 2. Get the collection
      const collection = db.collection(this.collection);

      // 3. Get one product
      const product = await collection.findOne({ title: title });

      // 4. Returning the Product
      return product;
    } catch (err) {
      console.log(`ERROR ----- ${err}`);
      throw new ApplicationError("Unabale to get a Product", 500);
    }
  }
}

export default ProductRepository;

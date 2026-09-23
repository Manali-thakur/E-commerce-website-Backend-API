import { MongoClient } from "mongodb";

let client;
// const url = process.env.DB_URL;
// Replace with your MongoDB connection string
export const connectToMongoDB = async () => {
  await MongoClient.connect(process.env.DB_URL)
    .then((clientInstance) => {
      client = clientInstance;
      console.log("Connected to MongoDB");
      createCounter(client.db());
      createIndexes(client.db());
    })
    .catch((err) => {
      console.error(err);
    });
};

// To perform operation first need to call this function to get the db instance and then perform operation on it
export const getDB = () => {
  // use for added db name but since we have mention it in the earlier url, we can just return the client.db() without specifying the db name
  return client.db();
};

const createCounter = async (db) => {
  const existingCounter = await db
    .collection("counters")
    .findOne({ _id: "cartItemId" });
  if (!existingCounter) {
    await db.collection("counters").insertOne({ _id: "cartItemId", value: 0 });
  }
};

const createIndexes = async (db) => {
  try {
    //singleton field index
    await db.collection("products").createIndex({ price: 1 });
    // compount index if the Index
    await db.collection("products").createIndex({ name: 1, category: -1 });
    // Text indexes
    await db.collection("products").createIndex({
      description: "text",
    });
    console.log("Indexes are created");
  } catch (err) {
    throw new Error("Unable to create the Indexes in the mongod file!!--", err);
  }
};

export const getClient = () => {
  return client;
}

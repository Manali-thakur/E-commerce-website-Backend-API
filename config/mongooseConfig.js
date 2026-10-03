import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const url = process.env.DB_URL;

export const connectUsingMongoose = async () => {
  try {
    await mongoose.connect(url);
    console.log("MongoDB using Mongoose is connected!");
  } catch (err) {
    console.log("Error---connectUsingMongoose----", err);
    process.exit(1);
  }
};

export const getDB = () => mongoose.connection.db;

export const getClient= () => mongoose.connection.getClient();

// Call this once, AFTER mongoose.connect() has finished
export const initDB = async () => {
  const db = getDB();
  await createCounter(db);
  await createIndexes(db);
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
    await db.collection("products").createIndex({ price: 1 });
    await db.collection("products").createIndex({ name: 1, category: -1 });
    await db.collection("products").createIndex({ description: "text" });
    console.log("Indexes are created");
  } catch (err) {
    throw new Error("Unable to create the indexes", { cause: err });
  }
};

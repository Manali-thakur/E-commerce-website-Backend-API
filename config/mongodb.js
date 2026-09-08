import { MongoClient } from "mongodb";

let client;
// const url = process.env.DB_URL;
// Replace with your MongoDB connection string
export const connectToMongoDB = async () => {
  await MongoClient.connect(process.env.DB_URL)
    .then((clientInstance) => {
      client = clientInstance;
      console.log("Connected to MongoDB");
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

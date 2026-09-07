import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017/bookdb";
const connectToMongoDB = () => {
  MongoClient.connect(url)
    .then((client) => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error(err);
    });
};

export default connectToMongoDB;

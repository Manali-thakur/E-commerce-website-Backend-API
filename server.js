import server from "./index.js";
import connectToMongoDB from "./config/mongodb.js";

server.listen(3200, () => {
  console.log("Server is listening on port 3200");
  // verify the connection to MongoDB when the server starts
  connectToMongoDB();
});

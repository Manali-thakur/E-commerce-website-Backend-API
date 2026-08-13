import express from "express";
import bodyParser from "body-parser";
import basicAuthorizer from "./src/middleware/basicAuth.middleware.js";
import router from "./src/features/product/routes/product.routes.js";
import UserRoutes from "./src/features/user/routes/user.routes.js";

const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true })); // for form-urlencoded bodies

const ProductRoutes = router;
const userRoutes = UserRoutes;

// default Request handler
server.get("/", (req, res) => {
  res.send("Welcome to our E-commerce Website");
});

server.use("/api/product", basicAuthorizer, ProductRoutes);

server.use("/api/user", userRoutes);

export default server;

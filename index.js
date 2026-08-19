import express from "express";
import bodyParser from "body-parser";
import swagger from "swagger-ui-express";
// import basicAuthorizer from "./src/middleware/basicAuth.middleware.js";
import jwtAuth from "./src/middleware/jwt.middleware.js";
import router from "./src/features/product/routes/product.routes.js";
import UserRoutes from "./src/features/user/routes/user.routes.js";
import CartRouter from "./src/features/cart/routes/cartItem.route.js";

import apiDocs from "./swagger.json" with { type: "json" };

// server creation
const server = express();

// CORS policy configuration using the middleware
server.use((req, res, next) => {
  res.header(
    "Access-control-Allow-Origin",
    "link of the frontend- https://localhost:5500",
  );
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods", "*");

  // return ok for preflight request
  if (req.method == "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true })); // for form-urlencoded bodies

const ProductRoutes = router;
const userRoutes = UserRoutes;
const cartRoutes = CartRouter;

// Swagger for user api
server.use("/api-docs", swagger.serve, swagger.setup(apiDocs));

// API's
server.use("/api/product", jwtAuth, ProductRoutes);

server.use("/api/cart", jwtAuth, cartRoutes);

server.use("/api/user", userRoutes);

// default Request handler
server.get("/", (req, res) => {
  res.send("Welcome to our E-commerce Website");
});

// -middleware to handle 404 request( Request that does not exist)
server.use((req, res) => {
  res
    .status(404)
    .send(
      "API not found. Please check our documentation for more information at localhost:3200/api-docs",
    );
});

export default server;

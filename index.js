import express from "express";
import bodyParser from "body-parser";
import router from "./src/features/product/routes/product.routes.js";

const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true })); // for form-urlencoded bodies

const ProductRoutes = router;

// default Request handler
server.get("/", (req, res) => {
  res.send("Welcome to our E-commerce Website");
});

server.use("/api/product/", ProductRoutes);

export default server;

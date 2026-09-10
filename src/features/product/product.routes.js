import express from "express";
import ProductController from "./product.conttroller.js";
import { upload } from "../../middleware/product.middleware.js";

const router = express.Router();
const productController = new ProductController();

// paths to controller methods

// passing refernce of the controller method to the route
router.post("/rate", productController.rateProduct);

// here we are calling that method directly from the controller class without creating an instance of the class
router.get("/", (req, res) => {
  productController.getAllProducts(req, res);
});

router.post("/", (req, res) => {
  productController.addProduct(req, res);
});

router.get("/filter", (req,res) => {
  productController.filterProducts(req,res);
});

router.get("/:title", (req, res) => {
  productController.getOneProduct(req, res);
});

export default router;

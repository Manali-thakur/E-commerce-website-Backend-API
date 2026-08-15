import express from "express";
import ProductController from "../controller/product.conttroller.js";
import { upload } from "../../../middleware/product.middleware.js";

const router = express.Router();
const productController = new ProductController();

// paths to controller methods

router.post("/rate", productController.rateProduct);

router.get("/", productController.getAllProducts);

router.post("/", productController.addProduct);

router.get("/filter", productController.filterProducts);

router.get("/:id", productController.getOneProduct);

export default router;

import ProductModel from "./product.model.js";
// import {ApplicationError} from "../../error-handler/applicationError.js";
import ProductRepository from "./product.repository.js";

export default class ProductController {
  // add, all, rate, getone, filter

  // controller for the repository
  constructor() {
    this.productRepository = new ProductRepository();
  }

  async getAllProducts(req, res) {
    const allproducts = await this.productRepository.getAll();
    res.send(allproducts);
  }

  async addProduct(req, res) {
    // code
    const {
      title,
      description,
      category,
      price,
      rating,
      stock,
      image,
      returnPolicy,
      shippingInformation,
      availabilityStatus,
    } = req.body;
    console.log(`req.body: ${JSON.stringify(req.body)}`);

    const newProduct = {
      title,
      description,
      category,
      price,
      rating,
      stock,
      image,
      returnPolicy,
      shippingInformation,
      availabilityStatus,
    };

    const create = await this.productRepository.add(newProduct);

    res.json(create);
  }

  async getOneProduct(req, res) {
    // code
    const id = req.params.id;
    const product = await this.productRepository.get(id);
    if (!product) {
      res.status(404).send("Product not Found..!!");
    } else {
      return res.status(200).send(product);
    }
  }

  async rateProduct(req, res, next) {
    // http://localhost:3200/api/product/rate?userId=2&productId=1&rating=4
    // code
    try {
      console.log("Rate Product req.query:", req.query);
      const userId = req.userId;
      console.log("userID from Rate controller", userId);
      const { productId, rating } = req.body;
      console.log("rate product", req.query);

      if (!productId || !rating) {
        return res.status(400).json({
          success: false,
          msg: "productId and rating are required",
        });
      }

      await this.productRepository.rate(userId, productId, rating);
      return res
        .status(200)
        .json({ success: true, msg: "Product is rated successfully" });

    } catch (err) {
      // calling the application error middleware
      next(err);
      console.log("passing error to middleware");
      console.log(`Error in rateProduct controller: ${err}`);
    }
  }

  async filterProducts(req, res) {
    // http://localhost:3200/api/product/filter?minPrice=10&maxPrice=30&category=beauty
    // code

    try {
      const minPrice = req.query.minPrice;
      const maxPrice = req.query.maxPrice;
      const category = req.query.category;

      const result = await this.productRepository.filter(
        minPrice,
        maxPrice,
        category,
      );

      console.log(`filtered products: ${JSON.stringify(result)}`);

      res.status(200).send(result);
    } catch (err) {
      console.log(err);
      res.status(500).send("Unable to filter products");
    }
  }
}

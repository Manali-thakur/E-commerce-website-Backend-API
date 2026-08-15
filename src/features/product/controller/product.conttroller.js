import ProductModel from "../model/product.model.js";

export default class ProductController {
  // add, all, rate, getone, filter

  async getAllProducts(req, res) {
    const allproducts = await ProductModel.getAll();
    res.send(allproducts);
  }

  addProduct(req, res) {
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
    console.log(req.body);

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

    const create = ProductModel.add(newProduct);

    res.json(create);
  }

  getOneProduct(req, res) {
    // code
    const id = req.params.id;
    const product = ProductModel.getOne(id);
    if (!product) {
      res.status(404).send("Product not Found..!!");
    } else {
      return res.status(200).send(product);
    }
  }

  rateProduct(req, res) {
    // code
    console.log(req.query);
    const { userId, productId, rating } = req.query;

    if (!userId || !productId || !rating) {
      return res.status(400).json({
        success: false,
        msg: "userId, productId and rating are required",
      });
    }

    const result = ProductModel.rateProductModel(productId, userId, rating);

    if (typeof result === "string") {
      // model returned an error message
      return res.status(400).json({ success: false, msg: result });
    }

    return res.status(200).json({ success: true, msg: result });
  }

  async filterProducts(req, res) {
    // http://localhost:3200/api/product/filter?minPrice=10&maxPrice=30&category=beauty
    // code
    const minPrice = req.query.minPrice;
    console.log(minPrice);
    const maxPrice = req.query.maxPrice;
    const category = req.query.category;

    const result = await ProductModel.filter(minPrice, maxPrice, category);
    console.log(result);

    res.status(200).send(result);
  }
}

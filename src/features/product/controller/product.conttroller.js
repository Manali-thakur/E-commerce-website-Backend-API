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
  }

  filterProducts(req, res) {
    // code
    
  }
}

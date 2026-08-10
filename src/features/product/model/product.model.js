// product.model.js
import { products } from "../assests/products.js";

export default class ProductModel {
  constructor(
    id,
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
  ) {
    this.id = id;
    this.description = description;
    this.category = category;
    this.price = price;
    this.rating = rating;
    this.stock = stock;
    this.image = image;
    this.returnPolicy = returnPolicy;
    this.shippingInformation = shippingInformation;
    this.availabilityStatus = availabilityStatus;
  }

  static getAll() {
    return products;
  }

  static add(product) {
    product.id = products.length + 1;
    products.push(product);
    return product;
  }

  static getOne(id) {
    const product = products.find((i) => i.id == id);
    return product;
  }

  static filter(minPrice, maxPrice, category) {
    const min = minPrice ? Number(minPrice) : null;
    const max = maxPrice ? Number(maxPrice) : null;

    const result = products.filter((product) => {
      const matchesMin = !min || product.price >= min;
      const matchesMax = !max || product.price <= max;
      const matchesCategory =
        !category || product.category.toLowerCase() === category.toLowerCase();

      return matchesMin && matchesMax && matchesCategory;
    });

    return result;
  }
}

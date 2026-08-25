// product.model.js
import { products } from "../assests/products.js";
import { UserModel } from "../../user/model/user.model.js";

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
  static rateProductModel(userID, productID, rating) {
    // 1. validate user
    const user = UserModel.getAllUsers().find((u) => u.id == userID);
    if (!user) {
      throw new Error("User not found..!!");
    }

    // 2. validate product
    const product = products.find((p) => p.id == productID);
    if (!product) {
      throw new Error("Product not Found");
    }

    // 3. validate rating range
    if (rating > 5 || rating < 0) {
      throw new Error("Rating should be in between 0 to 5");
    }

    // 4. ensure ratings array exists
    if (!product.ratings) {
      product.ratings = [];
    }

    // 5. update if user already rated, else push new
    const existingRatingIndex = product.ratings.findIndex(
      (r) => r.userID == userID,
    );

    if (existingRatingIndex >= 0) {
      product.ratings[existingRatingIndex] = { userID: userID, rating: rating };
    } else {
      product.ratings.push({ userID: userID, rating: rating });
    }

    return product;
  }
}

import { users } from "./assests/users.js";
import { getDB } from "../../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

export class UserModel {
  constructor(id, name, email, password, type) {
    this._id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.type = type;
  }

  static async signUp(name, email, password, type) {
    try {
      // 1, Get the Database instance
      const db = getDB();

      // 2. Get the collection
      const collection = db.collection("users");

      const newUser = new UserModel(null, name, email, password, type);
      // 3. Insert the new user into the database
      await collection.insertOne(newUser);

      // 4. Return the newly created user
      return newUser;
    } catch (err) {
      throw new ApplicationError("Failed to sign up user", 500, err.message);
    }
  }

  static signIn(email, password) {
    const login = users.find((user) => {
      return (
        user.email.trim().toLowerCase() == email &&
        user.password.trim() == password
      );
    });
    return login;
  }

  static getAllUsers() {
    return users;
  }
}

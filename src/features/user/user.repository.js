import { getDB } from "../../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

class UserRepository {
  // calling this function fron the controller to sign up a new user
  async signUp(newUser) {
    try {
      // 1, Get the Database instance
      const db = getDB();

      // 2. Get the collection
      const collection = db.collection("users");

      // 3. Insert the new user into the database
      await collection.insertOne(newUser);

      // 4. Return the newly created user
      return newUser;
    } catch (err) {
      throw new ApplicationError("Failed to sign up user", 500, err.message);
    }
  }

  async signIn(email, password) {
    try {
      // 1, Get the Database instance
      const db = getDB();

      // 2. Get the collection
      const collection = db.collection("users");

      //   3.Finding the user using the email and password
      const user = await collection.findOne({ email, password });

      // 4. Return the newly Signed-In user
      return user;
    } catch (err) {
      throw new ApplicationError("Failed to sign in user", 500, err.message);
    }
  }
}

export default UserRepository;

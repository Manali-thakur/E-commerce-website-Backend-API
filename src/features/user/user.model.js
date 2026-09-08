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

  // removed signUp and signIn methods from the UserModel class as they are now handled by the UserRepository class


  static getAllUsers() {
    return users;
  }
}

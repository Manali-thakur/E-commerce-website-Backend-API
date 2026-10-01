// import { getDB } from "../../../config/mongodb.js";
// import { ApplicationError } from "../../error-handler/applicationError.js";

export class UserModel {
  constructor(id, name, email, password, type) {
    this._id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.type = type;
  }
}

import { users } from "../assests/users.js";

export class UserModel {
  constructor(id, name, email, passsword, type) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.passsword = passsword;
    this.type = type;
  }

  static signUp(name, email, password, type) {
    const Id = users.length + 1;
    const newUser = new UserModel(Id, name, email, password, type);
    users.push(newUser);
    return newUser;
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

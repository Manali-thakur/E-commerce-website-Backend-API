import { body } from "express-validator";

export const signUpRules = [
  body("name")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 charachters"),

  body("email")
    .trim()
    .toLowerCase()
    .isEmail()
    .withMessage("Please enter a valid email address."),

  body("password")
    .trim()
    .isLength({ min: 8, max: 72 })
    .withMessage("Password must be 8 to 72 characters")
    .bail() // stop here if length fails, so one message per field
    .matches(/[^A-Za-z0-9]/)
    .withMessage("Password must contain a special character"),

  body("type")
    .isIn(["Customer", "Seller"])
    .withMessage("Type must be Customer or Seller"),
];

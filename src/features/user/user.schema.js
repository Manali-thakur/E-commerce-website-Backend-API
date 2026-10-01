import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\../, "Please enter valid email address"],
  },
  password: {
    type: String,
    required: true,
    select: false, //not returned by find() queries
    // validate: {  //because we have added validate on top middleware
    //   validator: function (value) {
    //     return /^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/.test(value);
    //   },
    //   message:
    //     "Password should be between 8-12 charachters and have a special character.",
    // },
  },
  type: { type: String, enum: ["Customer", "Seller"] },
});

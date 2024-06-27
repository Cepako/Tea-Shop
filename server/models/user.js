const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartItemSchema = require("./cartItem");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  cart: [cartItemSchema],
});

module.exports = mongoose.model("User", userSchema);

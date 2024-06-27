const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const cartItemSchema = require("./cartItem");

const orderSchema = new Schema({
  orderedProducts: {
    type: [cartItemSchema],
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
    default: "Pending",
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  shippingAddress: {
    type: String,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Order", orderSchema);

const express = require("express");
const cartController = require("../controllers/cart");

const router = express.Router();

router.post("/add-to-cart", cartController.addToCart);

module.exports = router;

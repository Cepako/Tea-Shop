const User = require("../models/user");
const Product = require("../models/product");

exports.addToCart = async (req, res, next) => {
  try {
    const { userId, productId, quantity } = req.body;

    const user = await User.findById(userId);
    const product = await Product.findById(productId);

    if (!user || !product) {
      return res.status(404).json({ message: "User or product not found" });
    }

    const cartItem = user.cart.find(
      (item) => item.product.toString() === productId,
    );

    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      user.cart.push({ product: productId, quantity });
    }

    await user.save();

    res.status(200).json({ message: "Product added to cart", cart: user.cart });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

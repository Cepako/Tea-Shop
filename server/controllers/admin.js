const Product = require('../models/product');

const { validationResult } = require('express-validator');

exports.getProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.status(200).json({
        message: 'Fetched products successfully.',
        products: products,
      });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

exports.postProduct = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }

  const { type, group, name, price, size, color, images, description, info } =
    req.body;

  const product = new Product({
    type,
    group,
    name,
    price,
    size,
    color,
    images,
    description,
    info,
  });
  product
    .save()
    .then((result) => {
      res.status(201).json({ message: 'Product created!', product: product });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.prodId;
  Product.findById(prodId)
    .then((prod) => {
      if (!prod) {
        const error = new Error('Could not find product.');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: 'Product fetched.', product: prod });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

exports.updateProduct = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }

  const prodId = req.params.prodId;
  const { type, group, name, price, size, color, images, description, info } =
    req.body;
  Product.findById(prodId)
    .then((prod) => {
      if (!prod) {
        const error = new Error('Could not find product.');
        error.statusCode = 404;
        throw error;
      }
      prod.type = type;
      prod.group = group;
      prod.name = name;
      prod.price = price;
      prod.size = size;
      prod.color = color;
      prod.images = images;
      prod.description = description;
      prod.info = info;

      return prod.save();
    })
    .then((result) => {
      res.status(200).json({ message: 'Product updated.', product: result });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

exports.deleteProduct = (req, res, next) => {
  const prodId = req.params.prodId;
  Product.findByIdAndDelete(prodId)
    .then((result) => {
      res.status(200).json({ message: 'Deleted product.' });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  group: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  images: {
    main: {
      type: String,
      required: true,
    },
    hover: {
      type: String,
    },
  },
  size: {
    type: String,
  },
  color: {
    type: [String],
  },
  description: {
    type: String,
    required: true,
  },
  info: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Product', productSchema);

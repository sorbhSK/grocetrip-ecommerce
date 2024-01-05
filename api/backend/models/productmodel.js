const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50
    },
    category: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50
    },
    bestSelling: {
      type: Boolean,
      required: true,
    },
    exclusiveOffer: {
      type: Boolean,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    brands: {
      type: Array,
      required: true,
    }
  })
const Product = mongoose.model('product', productSchema);
module.exports.Product = Product;
  
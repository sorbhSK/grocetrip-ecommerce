const mongoose = require("mongoose");

const brandSchema = mongoose.Schema({
    name: {
      type: String,
      minlength: 3,
      maxlength: 50
    },
    image: {
      type: String,
      required: true,
    }
  })
const Brand = mongoose.model('brand', brandSchema);
module.exports.Brand = Brand;


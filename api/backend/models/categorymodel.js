const mongoose = require("mongoose");
const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  image: {
    type: String,
    required: true,
  },
});
const Category = mongoose.model("category", categorySchema);
module.exports.Category = Category;

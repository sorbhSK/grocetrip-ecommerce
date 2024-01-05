const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtPrivateKey = process.env.UserjwtPrivateKey
const userSchema = mongoose.Schema({
  phone: {
    type: String,
    required: true,
    minlength: 10,
  },
  acceptStatus: {
    type: Boolean,
    required: true,
  },
  name: {
    type: String,
    minlength: 50,
  },
  email: {
    type: String,
    minlength: 50,
  },
  address: {
    type: String,
    minlength: 255,
  },
  image: {
    type: String,
    minlength: 50,
  },
  favourites: {
    type: Array,
    required: true,
  }
});
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, jwtPrivateKey);
  return token;
}
const User = mongoose.model("user", userSchema);
module.exports.User = User;

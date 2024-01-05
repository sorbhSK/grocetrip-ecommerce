const mongoose = require("mongoose");
const jwt = require('jsonwebtoken')
const jwtPrivateKey = process.env.AdminjwtPrivateKey
const adminSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 255
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
});
adminSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, jwtPrivateKey)
  return token
}
const Admin = mongoose.model("admin", adminSchema);
module.exports.Admin = Admin;
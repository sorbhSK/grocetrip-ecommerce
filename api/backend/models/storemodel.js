const mongoose = require("mongoose");
const storeSchema = mongoose.Schema({
    name: {
      type: String,
      minlength: 3,
      maxlength: 50
    },
    address: {
      type: String,
      minlength: 3,
      maxlength: 50
    },
    city: {
      type: String,
      minlength: 2,
      maxlength: 50
    },
    state: {
      type: String,
      minlength: 3,
      maxlength: 50
    },
    country: {
      type: String,
      minlength: 3,
      maxlength: 50
    },
    zipcode: {
      type: String,
      minlength: 3,
      maxlength: 50
    },
  })
const Store = mongoose.model('store', storeSchema);
module.exports.Store = Store;
  
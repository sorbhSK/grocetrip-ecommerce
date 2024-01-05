const mongoose = require("mongoose");
const cartSchema = mongoose.Schema({
  productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'product', 
  },
  userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user', 
  },  
  brandId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'brand', 
  },
  price: {
      type: Number,
      min: 0, 
  },
  quantity: {
      type: Number,
      min: 1, 
  },
});
const Cart = mongoose.model('cart', cartSchema);
module.exports.Cart = Cart;
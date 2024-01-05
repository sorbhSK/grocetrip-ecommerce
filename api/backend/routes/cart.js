const express = require("express");
const router = express.Router();
const multer = require("multer");
const { Cart } = require("../models/cartmodel");

const storage = multer.diskStorage({
  destination: function (res, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (res, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

router.post('/cart', async (req, res) => {
    const FoundProduct = await Cart.find({ productId: req.body.productId })
    if (FoundProduct.length) return res.json({ message: "Product Already Added" })
    const cart = new Cart({
      productId: req.body.productId,
      userId: req.body.userId,
      brandId: req.body.brandId,
      price: req.body.price,
      quantity: req.body.quantity,
    })
    const createdCart = await cart.save();
    res.send(createdCart);
  })
  
  
  router.get('/getcart', async (req, res) => {
    // console.log('userDuringCart=', req.session.user)
    const cart = await Cart.find()
      .populate('productId')
      .populate('brandId');
    res.status(200).json({ status: cart.length ? true : false, message: cart.length ? 'Data Found' : 'Data Not Found', data: cart });
  })
  
  router.delete('/removecart/:id', async (req, res) => {
    const dataToDelete = await Cart.findByIdAndDelete(req.params.id);
    if (!dataToDelete) return res.send('Invalid , Not Found...');
    res.send(dataToDelete);
  })

  router.put('/editcart/:id', async (req, res) => {
    const updatedQuantity = await Cart.findByIdAndUpdate(req.params.id, {
      quantity: req.body.quantity
    }, { new: true });
    if (!updatedQuantity) return res.status(404).send('Invalid ,Data Not Found...');
    res.send(updatedQuantity);
  })
  
  
  module.exports = router
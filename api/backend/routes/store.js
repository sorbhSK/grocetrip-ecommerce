const express = require("express");
const router = express.Router();
const multer = require("multer");
const { Store } = require("../models/storemodel");

const storage = multer.diskStorage({
  destination: function (res, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (res, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

router.post('/store', async (req, res) => {
    const store = new Store({
      name: req.body.name,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      zipcode: req.body.zipcode,
    })
    const createdStore = await store.save();
    res.send(createdStore);
  })
  
  router.get('/getstores', async (req, res) => {
    const allStores = await Store.find();
    res.status(200).json({ status: allStores.length ? true : false, message: allStores.length ? 'Data Found' : 'Data Not Found', data: allStores });
  })
  
  router.delete('/removestore/:id', async (req, res) => {
    const dataToDelete = await Store.findByIdAndDelete(req.params.id);
    if (!dataToDelete) return res.send('Invalid , Not Found...');
    res.send(dataToDelete);
  })
  
  router.get('/storeinfo/:id', async (req, res) => {
    const data = await Store.findById(req.params.id);
    if (!data) return res.send('Invalid , Not Found...');
    res.status(200).json({ status: data ? true : false, message: data ? 'Data Found' : 'Data Not Found', data: data });
  })
  
  router.put('/editstore/:id', async (req, res) => {
    let query = {}
    req.body.name ? query.name = req.body.name : query
    req.body.address ? query.address = req.body.address : query
    req.body.city ? query.city = req.body.city : query
    req.body.state ? query.state = req.body.state : query
    req.body.country ? query.country = req.body.country : query
    req.body.zipcode ? query.zipcode = req.body.zipcode : query
  
    const updatedData = await Store.findByIdAndUpdate(req.params.id, {
      $set: query
    }, { new: true });
    if (!updatedData) return res.status(404).send('Invalid ,Data Not Found...');
    res.send(updatedData);
  })
  
  module.exports = router
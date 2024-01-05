const express = require("express");
const router = express.Router();
const multer = require("multer");
const { Product } = require("../models/productmodel");

const storage = multer.diskStorage({
  destination: function (res, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (res, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

router.post("/product", upload.single("image"), async (req, res) => {
  const product = new Product({
    title: req.body.title,
    category: req.body.category,
    bestSelling: req.body.bestSelling,
    exclusiveOffer: req.body.exclusiveOffer,
    image: req.file.filename,
    brands: req.body.brands,
  });
  const createdProduct = await product.save();
  res.send(createdProduct);
});

router.get("/getproducts", async (req, res) => {
  const exclusiveOffer = req.query.exclusiveOffer === "true";
  const bestSelling = req.query.bestSelling === "true";
  let favourites = req.query.favourites || [];

  let query = {};

  if (exclusiveOffer || bestSelling) {
    query.$or = [];
    if (exclusiveOffer) {
      query.$or.push({ exclusiveOffer: true });
    }
    if (bestSelling) {
      query.$or.push({ bestSelling: true });
    }
  }

  if (favourites.length > 0) {
    query._id = { $in: favourites };
  } else if ("favourites" in req.query && favourites.length === 0) {
    return res.status(200).json({
      status: true,
      message: "Data Not Found",
      data: [],
    });
  }

  // console.log('query=', query)

  try {
    const filteredProducts = await Product.find(query);

    res.status(200).json({
      status: true,
      message: filteredProducts.length ? "Data Found" : "Data Not Found",
      data: filteredProducts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
});

router.delete("/removeproduct/:id", async (req, res) => {
  const dataToDelete = await Product.findByIdAndDelete(req.params.id);
  if (!dataToDelete) return res.send("Invalid , Not Found...");
  res.send(dataToDelete);
});

router.get("/productinfo/:id", async (req, res) => {
  const data = await Product.findById(req.params.id);
  if (!data) return res.send("Invalid , Not Found...");
  res
    .status(200)
    .json({
      status: data ? true : false,
      message: data ? "Data Found" : "Data Not Found",
      data: data,
    });
});

router.put("/editproduct/:id", upload.single("image"), async (req, res) => {
  let query = {};
  req.body.title ? (query.title = req.body.title) : query;
  req.body.category ? (query.category = req.body.category) : query;
  req.body.bestSelling ? (query.bestSelling = req.body.bestSelling) : query;
  req.body.exclusiveOffer
    ? (query.exclusiveOffer = req.body.exclusiveOffer)
    : query;
  req.body.brands ? (query.brands = req.body.brands) : query;
  req.file ? (query.image = req.file.filename) : query;

  const updatedData = await Product.findByIdAndUpdate(
    req.params.id,
    {
      $set: query,
    },
    { new: true }
  );
  if (!updatedData) return res.status(404).send("Invalid ,Data Not Found...");
  res.send(updatedData);
});

module.exports = router;

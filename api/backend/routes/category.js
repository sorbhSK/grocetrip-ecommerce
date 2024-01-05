const express = require("express");
const router = express.Router();
const multer = require("multer");
const { Category } = require("../models/categorymodel");

const storage = multer.diskStorage({
  destination: function (res, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (res, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

router.post("/category", upload.single("image"), async (req, res) => {
  const category = new Category({
    name: req.body.name,
    image: req.file.filename,
  });
  const createdCategory = await category.save();
  res.send(createdCategory);
});

router.get("/getcategories", async (req, res) => {
  const allCategories = await Category.find();
  res
    .status(200)
    .json({
      status: allCategories.length ? true : false,
      message: allCategories.length ? "Data Found" : "Data Not Found",
      data: allCategories,
    });
});

router.delete("/removecategory/:id", async (req, res) => {
  const dataToDelete = await Category.findByIdAndDelete(req.params.id);
  if (!dataToDelete) return res.send("Invalid , Not Found...");
  res.send(dataToDelete);
});

router.get("/categoryinfo/:id", async (req, res) => {
  const data = await Category.findById(req.params.id);
  if (!data) return res.send("Invalid , Not Found...");
  res
    .status(200)
    .json({
      status: data ? true : false,
      message: data ? "Data Found" : "Data Not Found",
      data: data,
    });
});

router.put("/editcategory/:id", upload.single("image"), async (req, res) => {

  let query = {};
  req.body.name ? (query.name = req.body.name) : query;
  req.file ? (query.image = req.file.filename) : query;
  const updatedData = await Category.findByIdAndUpdate(
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

const express = require("express");
const router = express.Router();
const multer = require("multer");
const { Brand } = require("../models/brandmodel");

const storage = multer.diskStorage({
  destination: function (res, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (res, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

router.post("/brand", upload.single("image"), async (req, res) => {
  const brand = new Brand({
    name: req.body.name,
    image: req.file.filename,
  });
  const createdBrand = await brand.save();
  res.send(createdBrand);
});

router.get("/getbrands", async (req, res) => {
  const allBrands = await Brand.find();
  res
    .status(200)
    .json({
      status: allBrands.length ? true : false,
      message: allBrands.length ? "Data Found" : "Data Not Found",
      data: allBrands,
    });
});

router.delete("/removebrand/:id", async (req, res) => {
  const dataToDelete = await Brand.findByIdAndDelete(req.params.id);
  if (!dataToDelete) return res.send("Invalid , Not Found...");
  res.send(dataToDelete);
});

router.get("/brandinfo/:id", async (req, res) => {
  const data = await Brand.findById(req.params.id);
  if (!data) return res.send("Invalid , Not Found...");
  res
    .status(200)
    .json({
      status: data ? true : false,
      message: data ? "Data Found" : "Data Not Found",
      data: data,
    });
});

router.put("/editbrand/:id", upload.single("image"), async (req, res) => {
  let updatedData = await Brand.findOne({ _id: req.params.id });
  if (!updatedData) return res.status(404).send("Invalid ,Data Not Found...");

  if (req.body.name) {
    updatedData.name = req.body.name;
  }
  if (req.file) {
    updatedData.image = req.file.filename;
  }
  await updatedData.save();
  res.send(updatedData);
});

module.exports = router;

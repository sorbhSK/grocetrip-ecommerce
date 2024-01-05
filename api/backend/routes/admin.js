const express = require("express");
const { Admin } = require("../models/adminmodel");
const router = express.Router();
const bcrypt = require('bcrypt');

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin) {
    return res.status(401).json({ status: false, message: "Invalid Credentials" });
  }
  const validPassword = await bcrypt.compare(password, admin.password)
  if (validPassword) {
    const token = admin.generateAuthToken();
    res
      .status(200)
      .header('x-auth-token', token)
      .json({ status: true, message: "Login Successfully", data: admin });
  } else {
    return res
      .status(401)
      .json({ status: false, message: "Invalid Credentials" });
  }
});

router.post("/createadmin", async (req, res) => {
  const admin = new Admin({
    email: req.body.email,
    password: req.body.password,
  });
  const salt = await bcrypt.genSalt(10);
  admin.password = await bcrypt.hash(admin.password, salt);
  const createdAdmin = await admin.save();
  res.send(createdAdmin);
});

router.get("/getalladmin", async (req, res) => {
  const admindata = await Admin.find();
  res.send(admindata);
});

router.get("/getadmin/:id", async (req, res) => {
  const admindata = await Admin.findById(req.params.id);
  if (!admindata)
    return res.json({ status: false, message: "Not Found", data: admindata });
  res.send(admindata);
});

module.exports = router;

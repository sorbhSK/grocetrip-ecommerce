const express = require("express");
const router = express.Router();
const { User } = require("../models/usermodel");
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (reqs, file, cb) {
    return cb(null, './uploads');
  },
  filename: function (res, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`)
  }
})
const upload = multer({ storage: storage });

router.post('/createuser', async (req, res) => {
  //.......Sending Existing User ........
  const userFounded = await User.findOne({ phone: req.body.phone });
  if (userFounded) {
    const token = userFounded.generateAuthToken()
    return res.header('x-auth-token', token).json({ status: true, message: 'User Found', data: userFounded });
  }

  //.......creating new User ........
  let userCreated = new User({
    phone: req.body.phone,
    acceptStatus: req.body.acceptStatus,
  })
  await userCreated.save();
  const token = userCreated.generateAuthToken()
  res.header('x-auth-token', token).json({ status: true, message: 'User Created', data: userCreated });
})

router.get("/getuser/:id", async (req, res) => {
  const userdata = await User.findById(req.params.id);
  if (!userdata) return res.json({ status: false, message: 'Not Found', data: userdata });
  res.json({ status: true, message: 'User Found', data: userdata });
});

router.get("/getalluser", async (req, res) => {
  const userdata = await User.find();
  res.json({ status: true, message: 'Users Found', data: userdata });
});

router.put("/addfavourite/:id", async (req, res) => {
  const userdata = await User.findByIdAndUpdate(req.params.id, {
    favourites: req.body.favourites
  }, { new: true });
  if (!userdata) return res.status(404).send('Invalid ,Data Not Found...');
  res.json({ status: true, message: 'Successful', data: userdata });
});

router.put('/adduserdetails/:id', upload.single('image'), async (req, res) => {
  let query = {}
  req.body.name ? query.name = req.body.name : query;
  req.body.email ? query.email = req.body.email : query;
  req.body.address ? query.address = req.body.address : query;
  req.file ? query.image = req.file.filename : query;
  const updatedUserdetails = await User.findByIdAndUpdate(req.params.id, {
    $set: query
  }, { new: true });
  if (!updatedUserdetails) return res.status(404).send("Invalid ,Data Not Found...");
  res.send(updatedUserdetails);

})

module.exports = router;


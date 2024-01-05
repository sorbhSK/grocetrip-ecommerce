const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const brand = require('./routes/brand')
const category = require('./routes/category')
const product = require('./routes/product')
const cart = require('./routes/cart')
const store = require('./routes/store')
const user = require('./routes/user')
const admin = require('./routes/admin')

mongoose
  .connect("mongodb+srv://sorbhsk84sws:sorbhsk84sws@cluster0.kb7d1mn.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {
    console.log("Connected to Mongodb");
  })
  .catch((err) => console.log("Could not connected to mongodb", err.message));
const PORT = 5000;
app.use('/images', express.static('uploads'));

app.use(cors())
app.use(express.json());
app.use('/', brand)
app.use('/', category)
app.use('/', product)
app.use('/', cart)
app.use('/', store)
app.use('/', user)
app.use('/', admin)

app.listen(PORT, () => {
  console.log("Listening on port ", PORT);
});

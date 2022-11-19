const express = require("express");
const app = express();
const cors = require("cors");
const port = 8000;
const mongoose = require("mongoose");
const db = mongoose.connection;
mongoose.connect("mongodb://localhost/newsLetterUsers");
const User = require("./UserSchema");

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.post("/userData", async (req, response) => {
  let newsLetterUser = new User({
    firstName: req.body.user.firstName,
    secondName: req.body.user.secondName,
    email: req.body.user.email,
  });
  try {
    newsLetterUser = await newsLetterUser.save();
  } catch (e) {
    console.log(e);
  }
});

app.get("/data", (req, res) => {
  db.collection("users")
    .find()
    .toArray()
    .then((result) => {
      res.send(result);
    });
});

app.delete("/data/:id", (req, res) => {});

app.listen(port);
console.log("http://localhost:" + port);

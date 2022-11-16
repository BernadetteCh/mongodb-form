const express = require("express");
const app = express();
const cors = require("cors");
const port = 8000;
const mongoose = require("mongoose");
const db = mongoose.connection;
mongoose.connect("mongodb://localhost/newsLetterUsers");
const user = require("./UserSchema");

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.post("/userData", async (req, response) => {
  const newUser = {
    firstName: req.body.user.firstName,
    secondName: req.body.user.secondName,
    email: req.body.user.email,
  };
  db.collection("users").insertOne(newUser, function (err, res) {
    if (err) throw err;
  });
});

app.listen(port);
console.log("http://localhost:" + port);

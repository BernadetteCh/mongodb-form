const express = require("express");
const app = express();
//CORS ist ein von Browsern implementiertes Sicherheitsprotokoll, das uns den Zugriff auf Ressourcen anderer Herkunft ermöglicht.
const cors = require("cors");
const port = 8000;
const mongoose = require("mongoose");
const db = mongoose.connection;
mongoose.connect("mongodb://localhost/newsLetterUsers");
const User = require("./UserSchema");

//It parses incoming JSON requests and puts the parsed data in req.body. + urlencoded sind helpful express middleware parser functions
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

app.delete("/data/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
});

app.listen(port);
console.log("http://localhost:" + port);

const express = require("express");
const app = express();
//import libary for process.env.mongourl npm install dotenv
require("dotenv").config();
//CORS ist ein von Browsern implementiertes Sicherheitsprotokoll, das uns den Zugriff auf Ressourcen anderer Herkunft ermöglicht.
const cors = require("cors");
const port = 8000;
const mongoose = require("mongoose");
const db = mongoose.connection;
//we need libary stuff from node js to read the env file// we read the variable

const User = require("./UserSchema");

const main = () => {
  //here we could check
  //anything than 0 means that there is an error
  if (!process.env.MONGOURL) {
    console.error("Error no MONGURL");
    process.exit(1);
  } else {
    console.log(process.env.MONGOURL);
    mongoose.connect(process.env.MONGOURL);
  }
};
main();

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
    await newsLetterUser.save();
  } catch (e) {
    console.log(e);
  }
});

app.get("/data", async (req, res) => {
  db.collection("users")
    .find()
    .toArray()
    .then((result) => {
      res.send(result);
    });
});

app.post("/data/:userid", async (req, res) => {
  // const update = {
  //   firstName: req.body.firstName,
  //   secondName: req.body.secondName,
  //   email: req.body.email,
  // };
  // await User.updateOne({ _id: req.params.userid }, req.body, (err, res) => {
  //   console.log(res);
  // }); //ALIREZA FRAGEN !!
  await User.updateOne(
    { _id: req.params.userid },
    {
      $set: {
        firstName: req.body.firstName,
        secondName: req.body.secondName,
        email: req.body.email,
      },
    }
  ).lean();
});
app.delete("/data/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
});

app.get("/data/:id", async (req, res) => {
  await User.findById(req.params.id).then((result) => {
    res.send(result);
  });
});

app.listen(port);
console.log("http://localhost:" + port);

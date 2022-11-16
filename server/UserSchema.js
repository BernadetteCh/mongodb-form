const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  secondName: String,
  email: String,
});

module.exports = mongoose.model("users", userSchema);

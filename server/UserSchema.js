const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  secondName: String,
  email: String,
});

//creates model for that schema, this will be the collection
module.exports = mongoose.model("users", userSchema);

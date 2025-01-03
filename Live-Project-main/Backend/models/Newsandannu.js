const mongoose = require("mongoose"); // CJS

const NewsandannuSchema = mongoose.Schema({
  heading: String,
  description: String,
  time: String,
  image: String,
});

module.exports = mongoose.model("Newsandannu", NewsandannuSchema);

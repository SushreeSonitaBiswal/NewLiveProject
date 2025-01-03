const mongoose = require("mongoose"); // CJS

const UserlistSchema = mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  type: String,
});

module.exports = mongoose.model("Userlist", UserlistSchema);

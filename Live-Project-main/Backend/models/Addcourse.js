const mongoose = require("mongoose"); // CJS

// schema

const AddcourseSchema = mongoose.Schema({
  courseName: String,
});

// model
// const Addcourse = mongoose.model("Addcourse", AddcourseSchema);

module.exports = mongoose.model("Addcourse", AddcourseSchema);

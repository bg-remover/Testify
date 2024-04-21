const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  id: Number,
  img: String,
  course_name: String,
  course_disc: String,
  course_price: String,
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;

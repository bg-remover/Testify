const mongoose = require("mongoose");

const courseDetailSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  overview: String,
  objectives: [String],
  prerequisites: [String],
  syllabus: [String],
  instructor: {
    name: String,
    bio: String,
    image: String,
  },
  reviews: [
    {
      username: String,
      rating: Number,
      comment: String,
    },
  ],
});

const CourseDetail = mongoose.model("CourseDetail", courseDetailSchema);

module.exports = CourseDetail;

const mongoose = require('mongoose')
const courseSchema = new mongoose.Schema({
    coursename:String,

})

const Course = mongoose.model("Course",courseSchema)

model.export=Course;
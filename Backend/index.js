const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// const bcrypt = require("bcrypt");
// const CourseModel = require("./models/courese");
const PORT = 3030;
const app = express();
app.use(express.json());
app.use(cors());


//connect to mongo 
mongoose
  .connect("mongodb://127.0.0.1:27017/testify")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((e) => {
    console.error("MongoDB connection error:", e);
  });

  //create course schema
  const courseSchema = new mongoose.Schema({
    img:{type: String },
    course_name: { type: String, required: true },
    course_disc: { type: String, required: true },
    course_price: { type: Number, required: true }
 })

//create coures model
const Course = mongoose.model("Course",courseSchema)

//course
app.post("/add-course", async(req,res)=>{
    try{
        const{img,course_name,course_disc, course_price} = req.body;
        const course = new Course({img,course_name,course_disc, course_price});
        const addcourse = await course.save();
        res.status(201).send(addcourse);
    } catch (e){
        res.status(400).send(e.message);
    }
}) 

//update a course
app.put('/updatecourse/:id', async (req, res) => {
  try{
      const id = req.params.id;
      const course = await Course.findByIdAndUpdate({_id:id},req.body , {new:true} );
      res.send(course);
  }catch(e){
      res.send(e);
  }   
});

// delete course
app.delete("/deletecourse/:id", async(req,res)=>{
  try{
     const id = req.params.id;
     const course = await Course.findByIdAndDelete({_id:id});
     res.send(course);
  }catch(e){
      res.send(e);
  }
})


// show courser 
app.get('/readallcourses', async (req, res) => {
  try {
      const courses = await Course.find({});
      res.send(courses);
  } catch (error) {
      console.error('Error fetching courses:', error);
      res.status(500).send('An error occurred while fetching courses');
  }
});
 



//start server
  app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
  })
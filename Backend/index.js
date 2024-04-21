const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const { Schema, model } = require("mongoose");
const CourseDetail = require("./models/courseDetail");
const Course = require("./models/course");
// const bcrypt = require("bcrypt");

const PORT = 3030;
const app = express();
app.use(cors());
app.use(express.json());

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
  img: { type: String },
  course_name: { type: String, required: true },
  course_disc: { type: String, required: true },
  course_price: { type: Number, required: true },
});

const cartSchema = new mongoose.Schema({
  courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
  quantity: { type: Number, default: 1 },
});

//create cart module
const Cart = mongoose.model("Cart", cartSchema);

//course
app.post("/add-course", async (req, res) => {
  try {
    const { img, course_name, course_disc, course_price } = req.body;
    const course = new Course({ img, course_name, course_disc, course_price });
    const addcourse = await course.save();
    res.status(201).send(addcourse);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

//update a course
app.put("/updatecourse/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const course = await Course.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.send(course);
  } catch (e) {
    res.send(e);
  }
});

// delete course
app.delete("/deletecourse/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const course = await Course.findByIdAndDelete({ _id: id });
    res.send(course);
  } catch (e) {
    res.send(e);
  }
});

// show courser
app.get("/readallcourses", async (req, res) => {
  try {
    const courses = await Course.find({});
    res.send(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).send("An error occurred while fetching courses");
  }
});

// Define route for fetching course details
app.get("/course-detail/:id", async (req, res) => {
  try {
    const courseId = req.params.id;
    // Find the course detail by courseId
    const courseDetail = await CourseDetail.findOne({ courseId });
    if (!courseDetail) {
      return res.status(404).send("Course detail not found");
    }
    res.send(courseDetail);
  } catch (e) {
    res.status(500).send(e.message);
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//add to cart
app.post("/cart/:courseId", async (req, res) => {
  const { courseId } = req.params;
  try {
    const existingCartItem = await Cart.findOne({ courseId });
    if (existingCartItem) {
      // Course already exists in the cart
      return res.status(400).send({ message: "Course already in cart" });
    }

    const cartItem = new Cart({ courseId });
    const addedItem = await cartItem.save();
    res.status(201).send(addedItem);
  } catch (e) {
    res.status(500).send(e);
  }
});

// show cart item
app.get("/showcartitem", async (req, res) => {
  try {
    const cartItems = await Cart.find({}).populate("courseId");
    res.status(200).send(cartItems);
  } catch (error) {
    res.status(500).send(error);
  }
});

// remove from cart
app.delete("/removefromcart/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Cart.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

// Serve static files from the 'assets' directory
app.use("/assets", express.static(path.join(__dirname, "assets")));

//start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

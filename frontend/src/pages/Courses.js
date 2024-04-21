import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import CourseCard from "../components/CourseCard";
import SearchBar from "../components/SearchBar";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    fetchAllCourses();
  }, []);

  const fetchAllCourses = async () => {
    try {
      const res = await axios.get("http://localhost:3030/readallcourses");
      setCourses(res.data);
      setFilteredCourses(res.data); // Initially, set filtered courses to all courses
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  // add to cart
  const addtocart = async (courseId) => {
    try {
      const res = await axios.post(`http://localhost:3030/cart/${courseId}`);
      if (res.status === 201) {
        alert("Course added to cart");
      }
    } catch (e) {
      console.error("An error occurred:", e);
    }
  };
  // Base URL for assets
  const baseUrl = "http://localhost:3030";

  return (
    <div>
      <SearchBar courses={courses} setFilteredCourses={setFilteredCourses} />
      <div className="flex flex-wrap justify-center mt-8">
        {filteredCourses.map((item) => (
          <div
            key={item.id}
            className="max-w-sm w-full sm:max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl mx-2 my-4 cursor-pointer"
          >
            <Link to={`/course/${item._id}`}>
              {/* Wrap CourseCard with Link component */}
              <CourseCard
                img={`${baseUrl}/${item.img}`} // Concatenate base URL with image path
                courseName={item.course_name}
                courseDisc={item.course_disc}
                author={{
                  name: "Jonathan Reinink",
                  avatar: `${baseUrl}/assets/CourseImg/jonathan.jpg`,
                }}
                date="Aug 18"
                addToCart={() => addtocart(item._id)}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Import useParams to access route parameters

const CourseDetail = () => {
  const [courseDetail, setCourseDetail] = useState(null);
  const { id } = useParams(); // Access the route parameter using useParams
  const courseId = id; // Use the id from useParams

  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3030/course-detail/${courseId}`
        );
        setCourseDetail(response.data);
      } catch (error) {
        console.error("Error fetching course detail:", error);
      }
    };

    fetchCourseDetail();
  }, [courseId]); // Include courseId in the dependency array

  if (!courseDetail) {
    return <div>Loading...</div>;
  }

  return <div>{/* Render course details */}</div>;
};

export default CourseDetail;

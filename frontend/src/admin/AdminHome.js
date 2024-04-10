import React,{useEffect,useState} from 'react'
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const AdminHome = () => {
    
    const [courses, setCourses] = useState([]);
    const [inputCourse, setInputCourse] = useState({ });
    
    const handlechange = (event) => {
        setInputCourse({
            ...inputCourse,
            [event.target.name]: event.target.value,
        });
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3030/add-course", inputCourse);
            console.log(res);
            fetchAllCourses();
            setInputCourse(res.data);
        } catch (error) {
            console.error("Error adding course:", error);
        }
    }
    
    const fetchAllCourses = async () => {
        try {
            const res = await axios.get("http://localhost:3030/readallcourses");
            setCourses(res.data);
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    };
    
    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:3030/deletecourse/${id}`);
            if (res.status === 200) {
                fetchAllCourses();
            }
        } catch (error) {
            console.error("Error deleting course:", error);
        }
    };
    
    useEffect(() => {
        fetchAllCourses();
    }, []);
    
    

    
  return (
    <div className="w-2/3 mx-auto mt-5">

       <form onSubmit={(e) => handleSubmit(e)} >
        <h1>Add Courses</h1>
        <div className="">
          <label className=" text-sm text-gray-500 ">image link</label>
          <input
            type="text"
            name="img"
            className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-2 border-gray-300"
            placeholder="Enter image link"
            required
            value={inputCourse.img}
            onChange={handlechange}
          />
          </div>
          <div className="">
          <label className=" text-sm text-gray-500 ">Course Name</label>
          <input
            type="text"
            name="course_name"
            className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-2 border-gray-300"
            placeholder="Enter course name"
            required
            value={inputCourse.name}
            onChange={handlechange}
          />
        </div>
        <div className="">
          <label className=" text-sm text-gray-500 ">Course Disc</label>
          <input
            type="text"
            name="course_disc"
            className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-2 border-gray-300"
            placeholder="Enter course disc "
            required
            value={inputCourse.disc}
            onChange={handlechange} 
          />
        </div>
        <div className="">
          <label className=" text-sm text-gray-500 ">Course Price</label>
          <input
            type="number"
            name="course_price"
            className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-2 border-gray-300"
            placeholder="Enter price "
            required
            value={inputCourse.price}
            onChange={handlechange}
          />
        </div>
        

        <div className="flex justify-center my-4">
          <button type="submit" className="px-4 py-2 bg-yellow-400 rounded-sm">
            Add Course
          </button>
        </div>
      </form>

      <div className="relative overflow-x-auto shadow-md">
        <table className="w-full text-lg text-center text-gray-500 ">
          <thead className="text-[17px] text-gray-700 uppercase bg-gray-500">
            <tr>
              <th scope="col" className="px-6 py-3">
                SN.
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Disc.
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {
                courses.map((item,i)=> (
                <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {i+1}
                </th>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item?.course_name}
                </th>
                <td className="px-6 py-4"> {item?.course_disc}</td>
                <td className="px-6 py-4"> {item?.course_price}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-x-4 justify-center">
                    
                    <NavLink
                      to={`admin/updatecourse/${item._id}`}
                      className="font-medium text-yellow-400 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </NavLink>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="font-medium text-red-500  hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            
          </tbody>
        </table>
      </div>
    </div>
    
  )
}

export default AdminHome

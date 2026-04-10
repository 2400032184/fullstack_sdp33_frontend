import React, { useState, useEffect } from "react";
import axios from "axios";
import API_ENDPOINTS from "../config/apiConfig";

const UpdateCourses = () => {
  const [courses, setCourses] = useState([]);

  // 🔹 Fetch courses from backend
  useEffect(() => {
    const cachedCourses = localStorage.getItem("courses");
    if (cachedCourses) {
      setCourses(JSON.parse(cachedCourses));
    }
    fetchCourses();
  }, []);

  const fetchCourses = () => {
    axios
      .get(API_ENDPOINTS.GET_COURSES)
      .then((res) => {
        setCourses(res.data);
        localStorage.setItem("courses", JSON.stringify(res.data)); // save to localStorage
      })
      .catch((err) => console.error("Error fetching courses:", err));
  };

  // 🔹 Add a new course
  const handleAddCourse = async () => {
    const title = prompt("Course Title:");
    if (!title) return;

    const instructor = prompt("Instructor Name:");
    if (!instructor) return;

    const duration = prompt("Course Duration:");
    if (!duration) return;

    const newCourse = { title, instructor, duration };

    try {
      const res = await axios.post(API_ENDPOINTS.CREATE_COURSE, newCourse);
      const updatedCourses = [...courses, res.data];
      setCourses(updatedCourses);
      localStorage.setItem("courses", JSON.stringify(updatedCourses)); // update localStorage
    } catch (err) {
      console.error("Error adding course:", err);
    }
  };

  // 🔹 Delete a course
  const handleDeleteCourse = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      await axios.delete(API_ENDPOINTS.DELETE_COURSE(id));
      const updatedCourses = courses.filter((c) => c.id !== id);
      setCourses(updatedCourses);
      localStorage.setItem("courses", JSON.stringify(updatedCourses)); // update localStorage
    } catch (err) {
      console.error("Error deleting course:", err);
    }
  };

  // 🔹 Edit a course
  const handleEditCourse = async (id) => {
    const courseToEdit = courses.find((c) => c.id === id);
    if (!courseToEdit) return;

    const title = prompt("Course Title:", courseToEdit.title);
    if (!title) return;

    const instructor = prompt("Instructor Name:", courseToEdit.instructor);
    if (!instructor) return;

    const duration = prompt("Course Duration:", courseToEdit.duration);
    if (!duration) return;

    const updatedCourse = { title, instructor, duration };

    try {
      await axios.put(API_ENDPOINTS.UPDATE_COURSE(id), updatedCourse);
      const updatedCourses = courses.map((c) =>
        c.id === id ? { ...c, ...updatedCourse } : c
      );
      setCourses(updatedCourses);
      localStorage.setItem("courses", JSON.stringify(updatedCourses)); // update localStorage
    } catch (err) {
      console.error("Error updating course:", err);
    }
  };

  return (
    <div className="update-courses-container">
      <h1>Admin: Update Courses</h1>
      <button className="add-btn" onClick={handleAddCourse}>
        ➕ Add Course
      </button>

      <div className="courses-grid">
        {courses.map((course) => (
          <div key={course.id} className="course-card">
            <h2>{course.title}</h2>
            <p>
              <strong>Instructor:</strong> {course.instructor}
            </p>
            <p>
              <strong>Duration:</strong> {course.duration}
            </p>

            <div className="card-buttons">
              <button className="edit-btn" onClick={() => handleEditCourse(course.id)}>
                ✏️ Edit
              </button>
              <button className="delete-btn" onClick={() => handleDeleteCourse(course.id)}>
                🗑 Delete
              </button>
            </div>
          </div>
        ))}
      </div>
  
      <style>{`
        .update-courses-container {
          padding: 40px 20px;
          min-height: 100vh;
          font-family: 'Roboto', sans-serif;
          background: linear-gradient(90deg, #d9f1f7, #b6e0f0, #8fd3e8, #c3eaf7);
          text-align: center;
        }

        h1 {
          color: #123c5a;
          font-size: 2.5rem;
          margin-bottom: 25px;
        }

        .add-btn {
          padding: 10px 20px;
          margin-bottom: 25px;
          border: none;
          border-radius: 12px;
          background: #1f6f8b;
          color: #fff;
          font-weight: 600;
          cursor: pointer;
        }

        .add-btn:hover {
          background: #123c5a;
        }

        .courses-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .course-card {
          background: #ffffff;
          padding: 20px;
          border-radius: 20px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          text-align: left;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .course-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }

        .course-card h2 {
          font-size: 1.5rem;
          color: #123c5a;
          margin-bottom: 10px;
        }

        .course-card p {
          font-size: 1rem;
          color: #4a6572;
          margin: 6px 0;
        }

        .card-buttons {
          display: flex;
          gap: 10px;
          margin-top: 12px;
        }

        .edit-btn, .delete-btn {
          padding: 8px 14px;
          border-radius: 10px;
          border: none;
          color: #fff;
          font-weight: 600;
          cursor: pointer;
        }

        .edit-btn {
          background-color: #1f6f8b; /* blue */
        }

        .edit-btn:hover {
          background-color: #123c5a;
        }

        .delete-btn {
          background-color: #008080; /* teal */
        }

        .delete-btn:hover {
          background-color: #006666;
        }
      `}</style>
    </div>
  );
};

export default UpdateCourses;
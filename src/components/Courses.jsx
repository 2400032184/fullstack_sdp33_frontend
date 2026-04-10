import React, { useEffect, useState } from "react";
import axios from "axios";
import API_ENDPOINTS from "../config/apiConfig";

const Courses = ({ onGiveFeedback }) => {
  const [submittedCourses, setSubmittedCourses] = useState({});
  const [coursesData, setCoursesData] = useState([]);

  useEffect(() => {
    axios.get(API_ENDPOINTS.GET_COURSES)
      .then((res) => setCoursesData(res.data))
      .catch((err) => console.error("Error fetching courses:", err));
  }, []);

  // ✅ FIXED: user-specific feedback check
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser?.id) return;

    const storedFeedbacks = JSON.parse(localStorage.getItem("userFeedbacks")) || [];
    const feedbackMap = {};
    const now = new Date();

    storedFeedbacks.forEach((item) => {
      // 🔥 ONLY check feedback of current user
      if (item.userId === loggedInUser.id) {
        const feedbackDate = new Date(item.date);
        const diffDays = (now - feedbackDate) / (1000 * 60 * 60 * 24);

        if (diffDays < 7) {
          feedbackMap[item.courseId] = true;
        }
      }
    });

    setSubmittedCourses(feedbackMap);
  }, []);

  const handleFeedbackGiven = (courseId) => {
    setSubmittedCourses((prev) => ({ ...prev, [courseId]: true }));
  };

  const hasSubmitted = (courseId) => !!submittedCourses[courseId];

  return (
    <div className="courses-container">
      <h1>Our Courses</h1>

      <div className="courses-grid">
        {coursesData.map((course) => {
          const submitted = hasSubmitted(course.id);

          return (
            <div key={course.id} className="course-card">
              <h2>{course.title}</h2>
              <p><strong>Instructor:</strong> {course.instructor}</p>
              <p><strong>Duration:</strong> {course.duration}</p>

              {!submitted ? (
                <button
                  className="feedback-btn"
                  onClick={() => onGiveFeedback(course, handleFeedbackGiven)}
                >
                  Give Feedback
                </button>
              ) : (
                <>
                  <button className="feedback-given-btn" disabled>
                    Feedback Given ✅
                  </button>
                  <p className="lock-msg">
                    Next feedback can be submitted after few days
                  </p>
                </>
              )}
            </div>
          );
        })}
      </div>
      <style>{`
        .courses-container {
          padding: 30px 20px;
          text-align: center;
          min-height: 100vh;
          font-family: 'Roboto', sans-serif;
          background: linear-gradient(90deg, #d9f1f7, #b6e0f0, #8fd3e8, #c3eaf7);
        }

        h1 {
          color: #123c5a;
          margin-bottom: 30px;
          font-size: 2.5rem;
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

        .feedback-btn {
          margin-top: 15px;
          padding: 10px 18px;
          border-radius: 10px;
          background-color: #1f6f8b;
          border: none;
          color: #ffffff;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s ease;
        }

        .feedback-btn:hover {
          background-color: #123c5a;
        }

        .feedback-given-btn {
          margin-top: 15px;
          padding: 10px 18px;
          border-radius: 10px;
          background-color: #4CAF50;
          border: none;
          color: white;
          font-weight: 600;
          cursor: not-allowed;
        }

        .lock-msg {
          margin-top: 8px;
          font-size: 0.9rem;
          color: #cc0000;
        }
      `}</style>
    </div>
  );
};

export default Courses;
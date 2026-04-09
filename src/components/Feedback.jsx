import React, { useState, useEffect } from "react";

const Feedback = ({ course, onFeedbackSubmitted, notifyHistory }) => {
  const defaultStarCategories = [
    "Course Content Quality",
    "Faculty Teaching Effectiveness",
    "Practical / Lab Sessions",
    "Class Engagement",
    "Overall Satisfaction",
  ];

  const defaultOptions = [
    { key: "CourseStructure", label: "Course Structure was", choices: ["Very Well Organized","Organized","Average","Poorly Structured"] },
    { key: "SyllabusCoverage", label: "Syllabus Coverage", choices: ["Completed Fully","Mostly Covered","Partially Covered","Insufficient"] },
    { key: "FacultySupport", label: "Faculty Support Outside Class", choices: ["Very Supportive","Supportive","Sometimes Available","Not Available"] },
    { key: "Infrastructure", label: "Classroom & Infrastructure", choices: ["Excellent","Good","Average","Needs Improvement"] },
    { key: "AssignmentQuality", label: "Assignments & Assessments", choices: ["Very Relevant","Relevant","Moderate","Not Useful"] },
  ];

  const [starCategories, setStarCategories] = useState(defaultStarCategories);
  const [options, setOptions] = useState(defaultOptions);
  const [ratings, setRatings] = useState({});
  const [improvement, setImprovement] = useState("");
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);

  useEffect(() => {
    const savedForm = JSON.parse(localStorage.getItem("adminFeedbackForm"));
    setStarCategories(savedForm?.starCategories || defaultStarCategories);
    setOptions(savedForm?.options || defaultOptions);

    checkIfSubmitted();
  }, []);

  const handleRating = (category, value) => {
    setRatings({ ...ratings, [category]: value });
  };

  // ✅ FIXED: check per user
  const checkIfSubmitted = () => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser?.id) return;

    const storedFeedbacks = JSON.parse(localStorage.getItem("userFeedbacks")) || [];

    const courseFeedback = storedFeedbacks.find(
      (f) => f.courseId === course.id && f.userId === loggedInUser.id
    );

    if (courseFeedback) {
      const now = new Date();
      const feedbackDate = new Date(courseFeedback.date);
      const diffDays = (now - feedbackDate) / (1000 * 60 * 60 * 24);
      if (diffDays < 7) setAlreadySubmitted(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const userId = loggedInUser?.id;
    const username = loggedInUser?.username; // ✅ ADD THIS

    if (!userId) return alert("User not logged in!");

    const feedback = {
      userId,
      username, // ✅ ADD THIS
      course: course?.title || "N/A",
      courseId: course?.id,
      instructor: course?.instructor || "N/A",
      starRatings: JSON.stringify(ratings),
      options: JSON.stringify(
        Object.fromEntries(options.map((o) => [o.key, e.target[o.key]?.value]))
      ),
      improvement,
    };

    try {
      const res = await fetch("http://localhost:8080/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(feedback),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Network error");

      alert("⭐ Feedback submitted successfully!");
      setAlreadySubmitted(true);

      if (onFeedbackSubmitted) onFeedbackSubmitted(course.id);

      // ✅ FIXED: store per user
      const storedFeedbacks = JSON.parse(localStorage.getItem("userFeedbacks")) || [];

      storedFeedbacks.push({
        userId, // ✅ ADD THIS
        courseId: course.id,
        course: course.title,
        date: new Date(),
        instructor: course.instructor,
        starRatings: ratings,
        options: Object.fromEntries(options.map((o) => [o.key, e.target[o.key]?.value])),
        improvement,
      });

      localStorage.setItem("userFeedbacks", JSON.stringify(storedFeedbacks));

      if (notifyHistory) notifyHistory();

      setRatings({});
      setImprovement("");
      e.target.reset();
    } catch (err) {
      console.error(err);
      alert("❌ Error submitting feedback. Please try again.\n" + err.message);
    }
  };

  // ✅ Already submitted page with blue CSS and centered
  if (alreadySubmitted) {
    return (
      <div
        className="feedback-container"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
          textAlign: "center",
        }}
      >
        <h1 className="feedback-title">Feedback Already Submitted ✅</h1>
        <p style={{ fontSize: "1.3rem", color: "#123c5a", marginTop: "20px" }}>
          You have already submitted feedback for <strong>{course.title}</strong>.
        </p>
      </div>
    );
  }

  return (
    <div className="feedback-container">
      <h1 className="feedback-title">Student Course Feedback Form</h1>

      {course && (
        <div className="course-info">
          <strong>Course:</strong> {course.title} <br />
          <strong>Instructor:</strong> {course.instructor}
        </div>
      )}

      <form className="feedback-form" onSubmit={handleSubmit}>
        <h2>⭐ Rate the Following:</h2>
        {starCategories.map((category) => (
          <div key={category} className="star-rating-block">
            <p>{category}</p>
            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${ratings[category] >= star ? "active" : ""}`}
                  onClick={() => handleRating(category, star)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
        ))}

        <h2>Course & Faculty Evaluation</h2>
        {options.map(({ key, label, choices }) => (
          <label key={key}>
            {label}
            <select name={key} required>
              <option value="">Select</option>
              {choices.map((c, i) => (
                <option key={i} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
        ))}

        <label>
          What improvements would you suggest?
          <textarea
            name="improvement"
            value={improvement}
            onChange={(e) => setImprovement(e.target.value)}
            required
          />
        </label>

        <button type="submit" className="submit-btn">
          Submit Feedback
        </button>
      </form>
      <style>{`
        .feedback-container {
          max-width: 900px;
          margin: 50px auto;
          padding: 40px;
          border-radius: 20px;
          box-shadow: 0 8px 25px rgba(0,0,0,0.08);
          font-family: 'Roboto', sans-serif;
          background: linear-gradient(90deg, #d9f1f7,#b6e0f0,#8fd3e8,#c3eaf7);
          color: #123c5a;
        }

        .feedback-title {
          text-align: center;
          font-size: 2rem;
          margin-bottom: 12px;
        }

        .course-info {
          text-align: center;
          margin-bottom: 25px;
          font-size: 1.1rem;
          color: #1f6f8b;
        }

        .feedback-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        label { display: flex; flex-direction: column; font-weight: 500; }

        input, select, textarea {
          margin-top: 8px;
          padding: 12px;
          border-radius: 12px;
          border: 1px solid #1f6f8b;
          outline: none;
          font-size: 1rem;
          background-color: #fff;
        }

        textarea { min-height: 100px; resize: vertical; }

        .star-rating-block { margin-bottom: 15px; }

        .stars { display: flex; gap: 8px; font-size: 1.8rem; cursor: pointer; }

        .star {
          color: #ccc;
          transition: 0.2s;
        }

        .star.active {
          color: #ffb400;
          transform: scale(1.1);
        }

        .submit-btn {
          padding: 14px 22px;
          border-radius: 12px;
          border: none;
          background: linear-gradient(135deg, #1f6f8b,#123c5a);
          color: #fff;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s ease;
        }

        .submit-btn:hover {
          transform: translateY(-2px);
          background: linear-gradient(135deg, #123c5a,#0f2e44);
        }
      `}</style>
    </div>
  );
};

export default Feedback;
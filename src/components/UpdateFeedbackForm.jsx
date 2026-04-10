import React, { useState, useEffect } from "react";
import API_ENDPOINTS from "../config/apiConfig";

const UpdateFeedbackForm = ({ course }) => {
  const defaultStarCategories = [
    "Course Content Quality",
    "Faculty Teaching Effectiveness",
    "Practical / Lab Sessions",
    "Class Engagement",
    "Overall Satisfaction",
  ];

  const defaultOptions = [
    {
      key: "CourseStructure",
      label: "Course Structure was",
      choices: ["Very Well Organized","Organized","Average","Poorly Structured"],
    },
    {
      key: "SyllabusCoverage",
      label: "Syllabus Coverage",
      choices: ["Completed Fully","Mostly Covered","Partially Covered","Insufficient"],
    },
    {
      key: "FacultySupport",
      label: "Faculty Support Outside Class",
      choices: ["Very Supportive","Supportive","Sometimes Available","Not Available"],
    },
    {
      key: "Infrastructure",
      label: "Classroom & Infrastructure",
      choices: ["Excellent","Good","Average","Needs Improvement"],
    },
    {
      key: "AssignmentQuality",
      label: "Assignments & Assessments",
      choices: ["Very Relevant","Relevant","Moderate","Not Useful"],
    },
  ];

  const [starCategories, setStarCategories] = useState(defaultStarCategories);
  const [options, setOptions] = useState(defaultOptions);

  // ✅ LOAD FROM BACKEND FIRST
  useEffect(() => {
    fetch(API_ENDPOINTS.GET_FEEDBACK_FORM)
      .then(res => res.json())
      .then(data => {
        if (data) {
          setStarCategories(JSON.parse(data.starCategories));
          setOptions(JSON.parse(data.options));
        }
      })
      .catch(() => {
        // fallback to localStorage
        const savedForm = JSON.parse(localStorage.getItem("adminFeedbackForm"));
        if (savedForm) {
          setStarCategories(savedForm.starCategories || defaultStarCategories);
          setOptions(savedForm.options || defaultOptions);
        }
      });
  }, []);

  const handleAddStarCategory = () => {
    const newCat = prompt("Enter new rating category:");
    if (newCat && !starCategories.includes(newCat))
      setStarCategories([...starCategories, newCat]);
  };

  const handleRemoveStarCategory = (cat) => {
    if (window.confirm("Remove this category?"))
      setStarCategories(starCategories.filter(c => c !== cat));
  };

  const handleAddOption = () => {
    const key = prompt("Unique key (no spaces):");
    if (!key || options.find(o => o.key === key)) return alert("Invalid key!");

    const label = prompt("Question label:");
    const choices = prompt("Comma separated choices:")
      ?.split(",")
      .map(c => c.trim());

    if (!label || !choices?.length) return;

    setOptions([...options, { key, label, choices }]);
  };

  const handleRemoveOption = (key) => {
    if (window.confirm("Remove this question?"))
      setOptions(options.filter(o => o.key !== key));
  };

  const handleSaveForm = async () => {
    const formData = {
      starCategories: JSON.stringify(starCategories),
      options: JSON.stringify(options),
    };

    try {
      // ✅ SAVE TO BACKEND
      await fetch(API_ENDPOINTS.CREATE_FEEDBACK_FORM, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // ✅ ALSO SAVE TO LOCAL (for existing working flow)
      localStorage.setItem(
        "adminFeedbackForm",
        JSON.stringify({ starCategories, options })
      );

      window.dispatchEvent(new Event("feedbackFormUpdated"));

      alert("✅ Form saved! Users will see changes immediately.");
    } catch (err) {
      console.error(err);
      alert("❌ Error saving form.");
    }
  };

  return (
    <div className="feedback-container">
      <h1 className="feedback-title">Update Feedback Form</h1>

      {course && (
        <div className="course-info">
          <strong>Course:</strong> {course.title} <br />
          <strong>Instructor:</strong> {course.instructor}
        </div>
      )}

      <div className="feedback-form">
        <div className="admin-controls">
          <button onClick={handleAddStarCategory}>➕ Add Rating Category</button>
          <button onClick={handleAddOption}>➕ Add Question</button>
        </div>

        <h2>⭐ Star Rating Categories</h2>
        {starCategories.map(cat => (
          <div key={cat} className="question-block">
            <span>{cat}</span>
            <button className="remove-btn" onClick={() => handleRemoveStarCategory(cat)}>Remove</button>
          </div>
        ))}

        <h2>📋 Option Questions</h2>
        {options.map(o => (
          <div key={o.key} className="question-block">
            <div className="question-label">{o.label}</div>
            <ul>
              {o.choices.map((c, i) => <li key={i}>{c}</li>)}
            </ul>
            <button className="remove-btn" onClick={() => handleRemoveOption(o.key)}>Remove</button>
          </div>
        ))}

        <button className="save-btn" onClick={handleSaveForm}>
          💾 Save Changes
        </button>
      </div>

      <style>{`
        .feedback-container {
          max-width: 900px; /* made it wider */
          margin: 50px auto;
          padding: 50px; /* more padding for spacious look */
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          font-family: 'Roboto', sans-serif;
          background: linear-gradient(90deg, #d9f1f7,#b6e0f0,#8fd3e8,#c3eaf7);
          color: #123c5a;
        }

        .feedback-title {
          text-align:center; 
          font-size:2.2rem; 
          margin-bottom:20px; 
        }

        .course-info { 
          text-align:center; 
          margin-bottom:30px; 
          font-size:1.2rem; 
          color:#1f6f8b; 
        }

        .feedback-form {
          display:flex; 
          flex-direction:column; 
          gap:25px;
        }

        .admin-controls {
          display:flex;
          gap:15px;
          margin-bottom:25px;
        }

        .admin-controls button {
          padding:10px 16px;
          border:none;
          border-radius:10px;
          background:#1f6f8b;
          color:#fff;
          cursor:pointer;
        }

        .question-block {
          background:#e1f0f6;
          border-radius:12px;
          padding:20px; /* bigger padding */
          display:flex;
          flex-direction:column;
          gap:12px;
        }

        .question-label { font-weight:500; font-size:1.05rem; }

        .remove-btn {
          align-self:flex-start;
          padding:6px 12px;
          border-radius:6px;
          border:none;
          background:#008080; /* teal */
          color:#fff;
          cursor:pointer;
        }

        ul {
          margin-top:8px;
          padding-left:25px;
        }

        .save-btn {
          margin-top:25px;
          padding:14px 24px;
          border-radius:14px;
          border:none;
          background:#1f6f8b;
          color:#fff;
          font-weight:900;
          cursor:pointer;
          align-self:flex-start;
        }

        .save-btn:hover { transform: translateY(-2px); background:#123c5a; }
      `}</style>
    </div>
  );
};

export default UpdateFeedbackForm;
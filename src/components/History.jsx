import React, { useEffect, useState } from "react";
import axios from "axios";

const History = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  const loadFeedbacks = async () => {
    try {
      const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
      const userId = loggedInUser?.id;

      // ✅ Safety check
      if (!userId) {
        setFeedbacks([]);
        return;
      }

      const res = await axios.get(
        `http://localhost:8080/api/feedback/user/${userId}`
      );

      const data = res.data;

      const formatted = data.map((f) => ({
        ...f,
        starRatings: f.starRatings ? JSON.parse(f.starRatings) : {},
        options: f.options ? JSON.parse(f.options) : {},
      }));

      setFeedbacks(formatted.slice().reverse());
    } catch (err) {
      console.error("Error loading feedbacks:", err);
      setFeedbacks([]);
    }
  };

  useEffect(() => {
    loadFeedbacks();
  }, []);

  const handleClearHistory = async () => {
    if (
      window.confirm(
        "Are you sure you want to clear all submitted feedback history?"
      )
    ) {
      try {
        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        const userId = loggedInUser?.id;

        if (!userId) return;

        await axios.delete(
          `http://localhost:8080/api/feedback/user/${userId}`
        );

        setFeedbacks([]);
      } catch (err) {
        console.error("Error clearing feedbacks:", err);
      }
    }
  };

  return (
    <div className="history-container">
      <h1>Submitted Feedback History</h1>

      {feedbacks.length > 0 ? (
        <>
          <div style={{ marginBottom: "20px" }}>
            <button className="clear-btn" onClick={handleClearHistory}>
              🗑️ Clear Feedback History
            </button>
          </div>

          <div className="feedback-grid">
            {feedbacks.map((item, idx) => (
              <div key={idx} className="feedback-card">
                <h2 className="course-title">{item.course}</h2>
                <p><strong>Instructor:</strong> {item.instructor}</p>

                {item.starRatings && (
                  <div className="ratings-section">
                    <strong>Star Ratings:</strong>
                    <ul>
                      {Object.entries(item.starRatings).map(([key, value]) => (
                        <li key={key}>
                          {key}: {"★".repeat(value)} ({value}/5)
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {item.options && (
                  <div className="ratings-section">
                    <strong>Course Evaluation:</strong>
                    <ul>
                      {Object.entries(item.options).map(([key, value]) => (
                        <li key={key}>
                          {key}: {value}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {item.improvement && (
                  <p className="comments">
                    <strong>Improvements Suggested:</strong> {item.improvement}
                  </p>
                )}

                {item.submittedAt && (
                  <p>
                    <strong>Submitted On:</strong>{" "}
                    {new Date(item.submittedAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="no-feedback">No feedback submitted yet.</p>
      )}
      <style>{`
        .history-container {
          padding: 30px 20px;
          text-align: center;
          min-height: 100vh;
          background: linear-gradient(90deg, #d9f1f7, #b6e0f0, #8fd3e8, #c3eaf7);
          font-family: 'Roboto', sans-serif;
        }

        h1 {
          font-size: 2.5rem;
          color: #123c5a;
          margin-bottom: 30px;
        }

        .feedback-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 20px;
          max-width: 1200px;
          margin: 0 auto 30px;
        }

        .feedback-card {
          background: #ffffff;
          padding: 25px 20px;
          border-radius: 20px;
          box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.1);
          text-align: left;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .feedback-card:hover {
          transform: translateY(-5px);
          box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.15);
        }

        .course-title {
          font-size: 1.6rem;
          font-weight: 700;
          color: #1f6f8b;
          margin-bottom: 10px;
        }

        .ratings-section ul {
          padding-left: 18px;
          margin: 8px 0;
        }

        .ratings-section li {
          font-size: 0.95rem;
          color: #4a6572;
        }

        .comments {
          margin-top: 8px;
          font-style: italic;
          color: #4a6572;
        }

        .no-feedback {
          font-size: 1.3rem;
          color: #123c5a;
        }

        .clear-btn {
          padding: 10px 16px;
          background-color: #1f6f8b;
          color: #ffffff;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .clear-btn:hover {
          background-color: #123c5a;
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
};

export default History;
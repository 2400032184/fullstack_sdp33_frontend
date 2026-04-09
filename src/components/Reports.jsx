import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts";
import "./Reports.css";

const Reports = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [ratingSummary, setRatingSummary] = useState([]);
  const [questionStats, setQuestionStats] = useState([]);

  const COLORS = ["#6CCECB", "#FF9AA2", "#FFD6A5", "#B5EAD7", "#CBAACB", "#FFDAC1"];

  useEffect(() => {
    const storedFeedbacks =
      JSON.parse(localStorage.getItem("userFeedbacks")) || [];

    setFeedbacks([...storedFeedbacks].reverse());

    const summary = {};

    // ✅ Convert numeric ratings to categories
    storedFeedbacks.forEach((fb) => {
      Object.entries(fb.starRatings || {}).forEach(([question, rating]) => {
        if (!summary[question]) {
          summary[question] = {
            Excellent: 0,
            Good: 0,
            Average: 0,
            Poor: 0,
          };
        }

        let category = "";

        if (rating >= 5) category = "Excellent";
        else if (rating === 4) category = "Good";
        else if (rating === 3) category = "Average";
        else category = "Poor";

        summary[question][category] += 1;
      });
    });

    const chartData = Object.entries(summary).map(([question, counts]) => ({
      category: question,
      ...counts,
    }));

    setRatingSummary(chartData);

    // ✅ Majority calculation per question
    const stats = Object.entries(summary).map(([question, counts]) => {
      const total = Object.values(counts).reduce((a, b) => a + b, 0);

      const majority = Object.entries(counts).reduce((a, b) =>
        b[1] > a[1] ? b : a
      )[0];

      const starMap = { Excellent: 5, Good: 4, Average: 3, Poor: 2 };

      return {
        question,
        total,
        majority,
        stars: starMap[majority] || 0,
      };
    });

    setQuestionStats(stats);
  }, []);

  const scatterData = ratingSummary.map((item, i) => ({
    x: i + 1,
    y: item.Excellent + item.Good + item.Average + item.Poor,
    z: item.Excellent,
  }));

  return (
    <>
      <div className="reports-page">
        <h1>User Feedback Reports</h1>
        <p>Total Feedbacks: {feedbacks.length}</p>

        {feedbacks.length > 0 ? (
          <>
            <div className="charts-container">

              {/* BAR CHART */}
              <div className="chart-card">
                <h2>Feedback Ratings - Question Wise</h2>
                <BarChart width={500} height={300} data={ratingSummary}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Excellent" fill={COLORS[0]} />
                  <Bar dataKey="Good" fill={COLORS[1]} />
                  <Bar dataKey="Average" fill={COLORS[2]} />
                  <Bar dataKey="Poor" fill={COLORS[3]} />
                </BarChart>
              </div>

              {/* PIE CHART */}
              <div className="chart-card">
                <h2>Overall Rating Distribution</h2>
                <PieChart width={400} height={300}>
                  <Pie
                    data={[
                      {
                        name: "Excellent",
                        value: ratingSummary.reduce(
                          (sum, q) => sum + q.Excellent,
                          0
                        ),
                      },
                      {
                        name: "Good",
                        value: ratingSummary.reduce(
                          (sum, q) => sum + q.Good,
                          0
                        ),
                      },
                      {
                        name: "Average",
                        value: ratingSummary.reduce(
                          (sum, q) => sum + q.Average,
                          0
                        ),
                      },
                      {
                        name: "Poor",
                        value: ratingSummary.reduce(
                          (sum, q) => sum + q.Poor,
                          0
                        ),
                      },
                    ]}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {["Excellent", "Good", "Average", "Poor"].map(
                      (entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                      )
                    )}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </div>

              {/* LINE CHART */}
              <div className="chart-card">
                <h2>Rating Trends Per Question</h2>
                <LineChart width={500} height={300} data={ratingSummary}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Excellent" stroke={COLORS[0]} />
                  <Line type="monotone" dataKey="Good" stroke={COLORS[1]} />
                  <Line type="monotone" dataKey="Average" stroke={COLORS[2]} />
                  <Line type="monotone" dataKey="Poor" stroke={COLORS[3]} />
                </LineChart>
              </div>

              {/* SCATTER */}
              <div className="chart-card">
                <h2>Total Responses per Question</h2>
                <ScatterChart width={500} height={300}>
                  <CartesianGrid />
                  <XAxis type="number" dataKey="x" name="Question Index" />
                  <YAxis type="number" dataKey="y" name="Total Responses" />
                  <ZAxis dataKey="z" range={[60, 400]} />
                  <Tooltip />
                  <Scatter data={scatterData} fill={COLORS[4]} />
                </ScatterChart>
              </div>
            </div>

            {/* SUMMARY SECTION */}
            <div className="summary-section">
              <h2>Overall Question Analysis</h2>
              {questionStats.map((q, index) => (
                <div key={index} className="summary-card">
                  <div className="summary-left">
                    <strong>{q.question}</strong>
                    <p>Total Responses: {q.total}</p>
                    <p>Majority Rating: {q.majority}</p>
                  </div>
                  <div className="summary-right">
                    <p className="stars">
                      {"★".repeat(q.stars)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* STUDENT SUGGESTIONS */}
            <div className="suggestions-section">
              <h2>Student Suggestions</h2>
              {feedbacks.map((fb, idx) => (
                <div key={idx} className="suggestion-card">
                  <p><strong>{fb.fullName}</strong></p>

                  {fb.improvement && (
                    <p><strong>Improvement:</strong> {fb.improvement}</p>
                  )}
                </div>
              ))}
            </div>
          </>
        ) : (
          <p>No feedbacks to display.</p>
        )}
      </div>
    </>
  );
};

export default Reports;
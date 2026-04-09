import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoutImage from "../styles/tq.jpg";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Get current user from localStorage
    const user = JSON.parse(localStorage.getItem("loggedInUser"));

    if (user && user.id) {
      // 🔹 Update logout timestamp
      fetch(`http://localhost:8080/api/users/logout?id=${user.id}`, {
        method: "POST",
      }).catch(err => console.error(err));
    }

    // Remove localStorage
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("currentAdmin");

    // Redirect to Home
    navigate("/");
  }, []);

  return (
    <div className="logout-container">
      <div className="logout-card">
        <img src={LogoutImage} alt="Logged Out Successfully" className="logout-image" />
        <h1 className="logout-title">Logged Out Successfully!</h1>
        <p className="logout-message">
          We truly appreciate your valuable time spent with us. Hope to see you again soon!
        </p>
        <Link to="/" className="logout-link">← Back to Home</Link>
      </div>
    

      <style>{`
        .logout-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 90vh;
          background: linear-gradient(90deg, #d9f1f7, #b6e0f0, #8fd3e8, #c3eaf7);
          font-family: 'Roboto', sans-serif;
        }
        .logout-card {
          background: #ffffff;
          padding: 45px 40px;
          border-radius: 24px;
          box-shadow: 0 15px 35px rgba(0,0,0,0.1);
          text-align: center;
          max-width: 650px;
          width: 90%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .logout-image {
          width: 450px;
          margin-bottom: 25px;
          border-radius: 15px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
          border: 3px solid #1f6f8b;
        }
        .logout-title {
          font-size: 2.2rem;
          color: #123c5a;
          margin-bottom: 15px;
          font-weight: 700;
        }
        .logout-message {
          font-size: 1.1rem;
          color: #4a6572;
          margin-bottom: 30px;
          line-height: 1.6;
        }
        .logout-link {
          display: inline-block;
          padding: 14px 28px;
          background: linear-gradient(135deg, #1f6f8b, #123c5a);
          color: #ffffff;
          font-weight: 600;
          border-radius: 14px;
          text-decoration: none;
          transition: transform 0.2s ease, background 0.3s ease;
        }
        .logout-link:hover {
          transform: translateY(-3px);
          background: linear-gradient(135deg, #123c5a, #0f2e44);
        }
        @media (max-width: 768px) {
          .logout-card { padding: 30px 20px; }
          .logout-title { font-size: 1.7rem; }
          .logout-message { font-size: 1rem; }
          .logout-image { width: 110px; }
        }
      `}</style>
    </div>
  );
};

export default Logout;
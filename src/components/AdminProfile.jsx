import React, { useState, useEffect } from "react";
import AdminProfileContainer from "./AdminProfileContainer";

const AdminProfile = () => {
  const [admin, setAdmin] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const currentAdmin = JSON.parse(localStorage.getItem("currentAdmin"));
    setAdmin(currentAdmin);
  }, []);

  if (!admin) {
    return (
      <div style={{ textAlign: "center", padding: 40 }}>
        <h2>No admin logged in.</h2>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <h1>Admin Profile</h1>

      <button onClick={() => setShowPopup(true)} className="view-btn">
        View Full Details
      </button>

      {showPopup && (
        <AdminProfileContainer admin={admin} onClose={() => setShowPopup(false)} />
      )}

      <div className="profile-card">
        <img
          src={admin.profilePic || "https://via.placeholder.com/150?text=Admin+Pic"}
          alt="Profile"
          className="profile-pic"
        />

        <h2>{admin.username}</h2>

        <p><b>Email:</b> {admin.email}</p>
        <p><b>Phone:</b> {admin.phone}</p>
        <p><b>Department:</b> {admin.department}</p>
      </div>

      <style>{`
        .profile-container {
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

        .profile-card {
          background: #ffffff;
          padding: 25px 20px;
          border-radius: 20px;
          box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.1);
          max-width: 600px;
          margin: 20px auto 0;
          text-align: left;
        }

        .profile-pic {
          display: block;
          margin: 0 auto 15px;
          border-radius: 50%;
          width: 150px;
          height: 150px;
          object-fit: cover;
          border: 4px solid #1f6f8b;
        }

        h2 {
          text-align: center;
          font-size: 1.8rem;
          color: #1f6f8b;
          margin-bottom: 20px;
        }

        p {
          font-size: 1rem;
          color: #4a6572;
          margin: 5px 0;
        }

        .view-btn {
          margin-bottom: 20px;
          padding: 12px 20px;
          background: linear-gradient(135deg, #1f6f8b, #123c5a);
          border: none;
          border-radius: 12px;
          color: #ffffff;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .view-btn:hover {
          transform: translateY(-2px);
          background: linear-gradient(135deg, #123c5a, #0f2e44);
        }

        @media (max-width: 768px) {
          .profile-card {
            padding: 20px;
          }

          h1 {
            font-size: 1.8rem;
          }

          h2 {
            font-size: 1.5rem;
          }

          .profile-pic {
            width: 120px;
            height: 120px;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminProfile;
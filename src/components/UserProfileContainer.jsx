import React from "react";

const UserProfileContainer = ({ user, onClose }) => {
  if (!user) return null; // in case no user is logged in

  return (
    <div className="profile-container-overlay">
      <div className="profile-container-card">
        <button className="close-btn" onClick={onClose}>×</button>

        <img
          src={user.profilePic || "https://via.placeholder.com/120"}
          alt="Profile"
          style={{
            borderRadius: "50%",
            width: "180px",
            height: "180px",
            objectFit: "cover",
            marginBottom: "20px",
          }}
        />

        <h2>{user.username}</h2>
        <p><b>Name:</b> {user.name}</p>
        <p><b>Register Number:</b> {user.registerNumber}</p>
        <p><b>Email:</b> {user.email}</p>
        <p><b>Age:</b> {user.age}</p>
        <p><b>Gender:</b> {user.gender}</p>
        <p><b>Phone:</b> {user.phone}</p>
        <p><b>Address:</b> {user.address}</p>
        <p><b>Blood Type:</b> {user.bloodType}</p>
        <p><b>Marital Status:</b> {user.maritalStatus}</p>
        <p><b>Institution:</b> {user.institution}</p>
        <p><b>Academic Year:</b> {user.academicYear}</p>
        <p><b>Department:</b> {user.department}</p>

        <div>
          <b>Languages Spoken ({user.languages.length}):</b>
          <ul>
            {user.languages.map((lang, index) => (
              <li key={index}>{lang}</li>
            ))}
          </ul>
        </div>

        <p><b>Occupation:</b> {user.occupation}</p>
      </div>

      <style>{`
  .profile-container-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(18, 60, 90, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }

  .profile-container-card {
    background: linear-gradient(135deg, #d9f1f7, #b6e0f0, #8fd3e8, #c3eaf7);
    padding: 30px;
    border-radius: 20px;
    max-width: 500px;
    width: 90%;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
    text-align: left;
    position: relative;
    color: #123c5a;
  }

  .close-btn {
    position: absolute;
    top: 10px;
    right: 15px;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    font-weight: bold;
    color: #1f6f8b;
  }

  .close-btn:hover {
    color: #123c5a;
  }

  h2 {
    font-size: 1.6rem;
    margin-bottom: 15px;
    color: #123c5a;
  }

  p {
    margin: 5px 0;
    font-size: 1rem;
    line-height: 1.4;
    color: #1f6f8b;
  }

  ul {
    padding-left: 20px;
    margin: 5px 0;
    color: #1f6f8b;
  }

  li {
    margin-bottom: 3px;
  }
`}</style>
    </div>
  );
};

export default UserProfileContainer;
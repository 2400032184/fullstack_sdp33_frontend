import React, { useState } from "react";
import Navbar from "./Navbar";
import Courses from "./Courses";
import Feedback from "./Feedback";
import History from "./History";
import UserProfile from "./UserProfile";
import UpdateUserProfile from "./UpdateUserProfile";
import Logout from "./Logout";

// Icons
import LogoutIcon from "@mui/icons-material/Logout";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HistoryIcon from "@mui/icons-material/History";
import FeedIcon from "@mui/icons-material/Feed";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";

import "./Dashboard.css";

const Dashboard = () => {
  const [activeItem, setActiveItem] = useState("Courses");
  const [feedbackCourse, setFeedbackCourse] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // ✅ Proper Menu Structure (No string mismatch issues)
  const menuItems = [
    { label: "Courses", icon: <LocationOnIcon style={{ marginRight: "8px" }} /> },
    { label: "My Submissions", icon: <HistoryIcon style={{ marginRight: "8px" }} /> },
    { label: "Provide Feedback", icon: <FeedIcon style={{ marginRight: "8px" }} /> },
    { label: "User Profile", icon: <PersonIcon style={{ marginRight: "8px" }} /> },
    { label: "Update Profile", icon: <EditIcon style={{ marginRight: "8px" }} /> },
    { label: "Logout", icon: <LogoutIcon style={{ marginRight: "8px" }} /> },
  ];

  // Handle Give Feedback from Courses
  const handleGiveFeedback = (course) => {
    setFeedbackCourse(course);
    setActiveItem("Provide Feedback");
  };

  return (
    <>
      <Navbar toggleSidebar={toggleSidebar} />

      <div className="dashboard-container">
        <aside className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
          <h2 className="sidebar-title">Dashboard</h2>

          <ul className="sidebar-menu">
            {menuItems.map((item) => (
              <li
                key={item.label}
                className={`sidebar-item ${
                  activeItem === item.label ? "active" : ""
                }`}
                onClick={() => setActiveItem(item.label)}
              >
                {item.icon}
                {item.label}
              </li>
            ))}
          </ul>
        </aside>

        <main
          className={`dashboard-layout ${
            isSidebarOpen ? "" : "full-width"
          }`}
        >
          {activeItem === "Courses" && (
            <Courses onGiveFeedback={handleGiveFeedback} />
          )}

          {activeItem === "Provide Feedback" && (
            <Feedback course={feedbackCourse} />
          )}

          {activeItem === "My Submissions" && <History />}

          {activeItem === "User Profile" && <UserProfile />}

          {activeItem === "Update Profile" && <UpdateUserProfile />}

          {activeItem === "Logout" && <Logout />}
        </main>
      </div>
    </>
  );
};

export default Dashboard;
import React, { useState } from "react";
import { FaFileAlt, FaUsers, FaSignOutAlt } from "react-icons/fa";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import DescriptionIcon from "@mui/icons-material/Description";
import SchoolIcon from "@mui/icons-material/School"; // icon for courses

import "./AdminDashboard.css";

import Navbar from "./Navbar";
import Users from "./Users";
import Logout from "./Logout";
import ViewFeedback from "./ViewFeedback";
import Reports from "./Reports";
import AdminProfile from "./AdminProfile";
import UpdateAdminProfile from "./UpdateAdminProfile";
import UpdateFeedbackForm from "./UpdateFeedbackForm";
import UpdateCourses from "./UpdateCourses"; // ✅ NEW IMPORT

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("Feedbacks");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderContent = () => {
    switch (activeSection) {
      case "Feedbacks":
        return <ViewFeedback />;

      case "Reports":
        return <Reports />;

      case "Number of Users":
        return <Users />;

      case "Admin Profile":
        return <AdminProfile />;

      case "Update Profile":
        return <UpdateAdminProfile />;

      case "Edit FeedbackForm":
        return <UpdateFeedbackForm />;

      case "Update Courses": // ✅ NEW CASE
        return <UpdateCourses />;

      case "Logout":
        return <Logout />;

      default:
        return <div>Select a section from the sidebar.</div>;
    }
  };

  return (
    <>
      <Navbar toggleSidebar={toggleSidebar} />

      <div className="dashboard-container">
        <aside className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
          <h2 className="sidebar-title">Admin Dashboard</h2>

          <ul className="sidebar-menu">
            <li
              className={`sidebar-item ${activeSection === "Feedbacks" ? "active" : ""}`}
              onClick={() => setActiveSection("Feedbacks")}
            >
              <FaFileAlt style={{ marginRight: "8px" }} />
              View Feedbacks
            </li>

            <li
              className={`sidebar-item ${activeSection === "Reports" ? "active" : ""}`}
              onClick={() => setActiveSection("Reports")}
            >
              <FaFileAlt style={{ marginRight: "8px" }} />
              Reports
            </li>

            <li
              className={`sidebar-item ${activeSection === "Number of Users" ? "active" : ""}`}
              onClick={() => setActiveSection("Number of Users")}
            >
              <FaUsers style={{ marginRight: "8px" }} />
              Number of Users
            </li>

            <li
              className={`sidebar-item ${activeSection === "Update Courses" ? "active" : ""}`} // ✅ NEW ITEM
              onClick={() => setActiveSection("Update Courses")}
            >
              <SchoolIcon style={{ marginRight: "8px", verticalAlign: "middle" }} />
              Update Courses
            </li>

            <li
              className={`sidebar-item ${activeSection === "Edit FeedbackForm" ? "active" : ""}`}
              onClick={() => setActiveSection("Edit FeedbackForm")}
            >
              <DescriptionIcon style={{ marginRight: "8px", verticalAlign: "middle" }} />
              Edit FeedbackForm
            </li>

            <li
              className={`sidebar-item ${activeSection === "Admin Profile" ? "active" : ""}`}
              onClick={() => setActiveSection("Admin Profile")}
            >
              <PersonIcon style={{ marginRight: "8px", verticalAlign: "middle" }} />
              Admin Profile
            </li>

            <li
              className={`sidebar-item ${activeSection === "Update Profile" ? "active" : ""}`}
              onClick={() => setActiveSection("Update Profile")}
            >
              <EditIcon style={{ marginRight: "8px", verticalAlign: "middle" }} />
              Update Profile
            </li>

            <li
              className={`sidebar-item ${activeSection === "Logout" ? "active" : ""}`}
              onClick={() => setActiveSection("Logout")}
            >
              <FaSignOutAlt style={{ marginRight: "8px" }} />
              Logout
            </li>
          </ul>
        </aside>

        <main className={`dashboard-layout ${isSidebarOpen ? "" : "full-width"}`}>
          <div className="dashboard-grid">{renderContent()}</div>
        </main>
      </div>
    </>
  );
};

export default AdminDashboard;
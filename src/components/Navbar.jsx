import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserProfileContainer from "./UserProfileContainer";
import AdminProfileContainer from "./AdminProfileContainer";
import LogoImage from "../styles/feed.jpg"; // your logo image

const Navbar = ({ toggleSidebar }) => {
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [showAdminProfile, setShowAdminProfile] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentAdmin, setCurrentAdmin] = useState(null);

  // Load accounts from localStorage
  const loadAccounts = () => {
    setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
    setCurrentAdmin(JSON.parse(localStorage.getItem("currentAdmin")));
  };

  useEffect(() => {
    loadAccounts();

    // Listen to changes in localStorage (logout from other tabs)
    const handleStorageChange = () => loadAccounts();
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <img
            src={LogoImage}
            alt="Logo"
            className="logo"
            onClick={toggleSidebar}
          />
          <h2>Student Feedback and Evaluation Portal</h2>
        </div>

        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/ContactUs">Contact Us</Link></li>
          {!currentUser && !currentAdmin && <li><Link to="/SignUp">Sign Up</Link></li>}

          {/* User Profile */}
          {currentUser && (
            <li>
              <img
                src={currentUser.profilePic || "https://via.placeholder.com/40"}
                alt="User Profile"
                className="nav-profile-pic"
                onClick={() => setShowUserProfile(true)}
              />
            </li>
          )}

          {/* Admin Profile */}
          {currentAdmin && (
            <li>
              <img
                src={currentAdmin.profilePic || "https://via.placeholder.com/40"}
                alt="Admin Profile"
                className="nav-profile-pic"
                onClick={() => setShowAdminProfile(true)}
              />
            </li>
          )}

          {/* Logout */}
          {(currentUser || currentAdmin) && (
            <li>
              <Link
                to="/Logout"
                onClick={() => {
                  setShowUserProfile(false);
                  setShowAdminProfile(false);
                }}
              >
                Logout
              </Link>
            </li>
          )}
        </ul>
      </nav>

      {/* Profile Popups */}
      {showUserProfile && currentUser && (
        <UserProfileContainer
          user={currentUser}
          onClose={() => setShowUserProfile(false)}
        />
      )}

      {showAdminProfile && currentAdmin && (
        <AdminProfileContainer
          admin={currentAdmin}
          onClose={() => setShowAdminProfile(false)}
        />
      )}
    </>
  );
};

export default Navbar;
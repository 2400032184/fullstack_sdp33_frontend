import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import SignUp from "./components/SignUp";
import AdminSignUp from "./components/AdminSignup";
import Login from "./components/Login";
import ContactUs from "./components/ContactUs";
import Dashboard from "./components/Dashboard";
import Feedback from "./components/Feedback";
import UserProfile from "./components/UserProfile";
import UpdateUserProfile from "./components/UpdateUserProfile";
import Thank from "./components/Thank";
import Logout from "./components/Logout";
import Courses from "./components/Courses";
import History from "./components/History";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import Users from "./components/Users";
import Reports from "./components/Reports";
import AdminProfile from "./components/AdminProfile";
import UpdateAdminProfile from "./components/UpdateAdminProfile";
import UpdateFeedbackForm from "./components/UpdateFeedbackForm";
import UpdateCourses from "./components/UpdateCourses";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/AdminSignUp" element={<AdminSignUp />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Feedback" element={<Feedback />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/updateuserprofile" element={<UpdateUserProfile />} />
        <Route path="/Thank" element={<Thank />} />
        <Route path="/Logout" element={<Logout />} />
        <Route path="/Courses" element={<Courses />} />
        <Route path="/History" element={<History />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/Users" element={<Users />} />
        <Route path="/Reports" element={<Reports />} />  
        <Route path="/AdminProfile" element={<AdminProfile />} />   
        <Route path="/UpdateAdminProfile" element={<UpdateAdminProfile />} />
        <Route path="/update-feedback/:index" element={<UpdateFeedbackForm />} />  
        <Route path="/update-courses" element={<UpdateCourses />} />
      </Routes>
    </Router>
  );
}

export default App;
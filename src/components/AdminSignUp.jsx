import React, { useState } from "react";
import Navbar from "./Navbar";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import API_ENDPOINTS from "../config/apiConfig";

const AdminSignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!formData.terms) {
      alert("Please agree to the terms and conditions!");
      return;
    }

    try {
      const res = await fetch(API_ENDPOINTS.SIGNUP, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: "ADMIN", // Important! Tell backend this is an admin
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Signup failed!");
      } else {
        alert("Admin registered successfully!");
        setFormData({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          terms: false,
        });
      }
    } catch (err) {
      alert("Cannot connect to backend. Make sure it is running on port 8080.");
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="signup-page">
        <div className="signup-container">
          <h1>Create Your Account</h1>
          <p>Sign up to get started!</p>
          <form className="signup-form" onSubmit={handleSubmit}>
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
            />

            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label>Password</label>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span
                className="toggle-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <label>Confirm Password</label>
            <div className="password-container">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <span
                className="toggle-icon"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="terms">
              <input
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
                required
              />
              <label htmlFor="terms">I agree to the terms and conditions</label>
            </div>

            <button type="submit">Sign Up</button>
          </form>

          <p className="signin-link">
            Already have an account? <a href="/AdminLogin">Admin Login</a>
          </p>
        </div>
      </div>
      <style>{`
        body, html {
          margin: 0;
          padding: 0;
          font-family: Arial, sans-serif;
          height: 100%;
        }

        .signup-page {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 90vh;
          background: linear-gradient(90deg, #d9f1f7, #b6e0f0, #8fd3e8, #c3eaf7);
          padding: 0 20px;
          box-sizing: border-box;
        }

        .signup-container {
          background: #ffffff;
          padding: 40px 30px;
          border-radius: 15px;
          max-width: 600px;
          width: 100%;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
          text-align: center;
          color: #000000;
        }

        .signup-container h1 {
          margin-bottom: 10px;
          font-size: 2rem;
        }

        .signup-container p {
          margin-bottom: 20px;
          font-size: 1rem;
        }

        .signup-form {
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        .signup-form label {
          margin-bottom: 5px;
          font-size: 0.9rem;
        }

        .signup-form input[type="text"],
        .signup-form input[type="email"],
        .signup-form input[type="password"],
        .password-container input {
          padding: 12px;
          margin-bottom: 15px;
          border-radius: 8px;
          border: 1px solid #ccc;
          font-size: 1rem;
          color: #000;
          width: 100%;
          box-sizing: border-box;
        }

        .password-container {
          position: relative;
          display: flex;
          align-items: center;
        }

        .toggle-icon {
          position: absolute;
          right: 12px;
          cursor: pointer;
          color: #555;
          font-size: 1.1rem;
        }

        .toggle-icon:hover {
          color: #000;
        }

        .signup-form input[type="checkbox"] {
          margin-right: 10px;
        }

        .terms {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          font-size: 0.9rem;
          color: #000;
        }

        .signup-form button {
          padding: 12px;
          border-radius: 8px;
          border: none;
          background: #123c5a;
          color: #fff;
          font-weight: bold;
          cursor: pointer;
          font-size: 1rem;
          transition: 0.3s ease;
        }

        .signup-form button:hover {
          background: #1f6f8b;
        }

        .signin-link {
          margin-top: 15px;
          font-size: 0.9rem;
        }

        .signin-link a {
          color: #123c5a;
          text-decoration: underline;
        }

        @media (max-width: 500px) {
          .signup-container {
            padding: 30px 20px;
          }
        }
      `}</style>
    </>
  );
};

export default AdminSignUp;
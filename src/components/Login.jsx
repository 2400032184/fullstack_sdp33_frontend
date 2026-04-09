import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");

  const generateCaptcha = () => {
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    setCaptcha(random);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (captchaInput !== captcha) {
      alert("Incorrect CAPTCHA! Please try again.");
      generateCaptcha();
      setCaptchaInput("");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Invalid username or password");
      } else {
        // ✅ Update login timestamp
        await fetch(`http://localhost:8080/api/users/login?username=${username}`, {
          method: "POST",
        });

        // ✅ Store the logged-in user object
        const loggedInUser = data.data;
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
        window.dispatchEvent(new Event("storage"));

        alert(`Welcome, ${loggedInUser.username}!`);
        navigate("/dashboard");
      }
    } catch (err) {
      alert("Cannot connect to backend. Make sure backend is running on port 8080.");
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-page">
        <div className="login-container">
          <h1>Welcome Back</h1>
          <p>Log in to continue!</p>

          <form className="login-form" onSubmit={handleSubmit}>
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <label>Password</label>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="toggle-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <label>Enter CAPTCHA</label>
            <div
              style={{
                marginBottom: "10px",
                padding: "10px",
                background: "#f3f3f3",
                borderRadius: "8px",
                textAlign: "center",
                fontSize: "1.2rem",
                letterSpacing: "3px",
                fontWeight: "bold",
                userSelect: "none",
              }}
            >
              {captcha}
            </div>

            <input
              type="text"
              placeholder="Enter CAPTCHA shown above"
              value={captchaInput}
              onChange={(e) => setCaptchaInput(e.target.value.toUpperCase())}
              required
              style={{ marginBottom: "15px" }}
            />

            <button
              type="button"
              onClick={generateCaptcha}
              style={{ marginBottom: "15px" }}
            >
              Refresh CAPTCHA
            </button>
            <button type="submit">Login</button>
          </form>

          <p className="signup-link">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
          <p className="signup-link">
            Are you the admin? <Link to="/adminlogin">Admin Login</Link>
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

        .login-page {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 90vh;
          background: linear-gradient(90deg, #d9f1f7, #b6e0f0, #8fd3e8, #c3eaf7);
          padding: 0 20px;
          box-sizing: border-box;
        }

        .login-container {
          background: #ffffff;
          padding: 30px 25px;
          border-radius: 15px;
          max-width: 600px;
          width: 100%;
          max-height: 100%;
          overflow: hidden;
          box-shadow: 0 0 20px rgba(0,0,0,0.2);
          text-align: center;
          color: #000;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .login-container h1 {
          margin-bottom: 10px;
          font-size: 2rem;
        }

        .login-container p {
          margin-bottom: 20px;
          font-size: 1rem;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        .login-form label {
          margin-bottom: 5px;
          font-size: 0.9rem;
        }

        .login-form input[type="text"],
        .login-form input[type="password"],
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

        .login-form button {
          padding: 12px;
          border-radius: 8px;
          border: none;
          background: #123c5a;
          color: #fff;
          font-weight: bold;
          cursor: "pointer",
          font-size: 1rem;
          transition: 0.3s ease;
        }

        .login-form button:hover {
          background: #1f6f8b;
        }

        .signup-link {
          margin-top: 15px;
          font-size: 0.9rem;
        }

        .signup-link a {
          color: #123c5a;
          text-decoration: underline;
        }

        @media (max-width: 480px) {
          .login-container {
            padding: 25px 15px;
          }
        }
      `}</style>
    </>
  );
};

export default Login;
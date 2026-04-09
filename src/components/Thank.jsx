import React from "react";
import { Link } from "react-router-dom";
import ThankImage from "../styles/tq.jpg"; // Import local image

const Thank = () => {
  return (
    <div className="thank-container">
      <div className="thank-card">
        {/* Image */}
        <img
          src={ThankImage}
          alt="Thank You"
          className="thank-image"
        />

        {/* Message */}
        <h1 className="thank-title">Thank You!</h1>
        <p className="thank-message">
          We truly appreciate your valuable feedback. Our team will carefully
          look into it to improve the Smart City experience for everyone.
        </p>

        {/* Back to Dashboard Link */}
        <Link to="/dashboard" className="thank-link">
          ← Back to Dashboard
        </Link>
      </div>

      {/* Inline CSS */}
      <style>{`
  .thank-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(145deg, #fdf1f0, #f0f8ff); /* soft pastel gradient */
    font-family: 'Roboto', sans-serif;
  }

  .thank-card {
    background: #ffffff;
    padding: 45px 35px;
    border-radius: 25px;
    box-shadow: 0 12px 30px rgba(0,0,0,0.08);
    text-align: center;
    max-width: 520px;
    width: 95%;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .thank-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 35px rgba(0,0,0,0.12);
  }

  .thank-image {
    width: 130px;
    margin-bottom: 25px;
    border-radius: 15px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  }

  .thank-title {
    font-size: 2.2rem;
    color: #8fd3e8; /* replaced pastel purple with soft blue from your gradient */
    margin-bottom: 18px;
  }

  .thank-message {
    font-size: 1.15rem;
    color: #555;
    margin-bottom: 35px;
    line-height: 1.7;
  }

  .thank-link {
    display: inline-block;
    padding: 14px 26px;
    background: linear-gradient(135deg, #b6e0f0, #8fd3e8); /* replaced violet gradient with blue gradient */
    color: #ffffff;
    font-weight: 600;
    border-radius: 14px;
    text-decoration: none;
    transition: all 0.3s ease;
  }

  .thank-link:hover {
    background: linear-gradient(135deg, #8fd3e8, #d9f1f7); /* hover gradient in blue shades */
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    .thank-card {
      padding: 35px 25px;
    }

    .thank-title {
      font-size: 1.8rem;
    }

    .thank-message {
      font-size: 1rem;
    }
  }
`}</style>
    </div>
  );
};

export default Thank;

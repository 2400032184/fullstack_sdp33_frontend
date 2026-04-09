import React from "react";
import Navbar from "./Navbar";
import AboutImage from "../styles/linkd.png";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="about-page">
        <div className="about-content-container">
          <div className="about-image-container">
            <img src={AboutImage} alt="The Student Feedback and Evaluation Portal" className="about-image" />
          </div>
          <div className="about-text">
            <h1>About Us</h1>
            <p>
              The Student Feedback and Evaluation Portal is a web-based application designed to collect, manage, and analyze student feedback on courses, instructors, and institutional services.

Our platform provides a structured and secure way for students to share their opinions and experiences. The collected feedback is automatically analyzed to generate meaningful insights that help institutions improve teaching quality, course structure, and overall academic performance.

We aim to create a transparent and efficient feedback system that bridges the gap between students and administration. By transforming feedback into actionable data, our system supports continuous improvement.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .about-page {
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(90deg, #d9f1f7, #b6e0f0, #8fd3e8, #c3eaf7);
          min-height: 90vh;
          padding: 20px;
        }

        .about-content-container {
          display: flex;
          max-width: 1200px;
          width: 100%;
          height: 100%;
          background-color: #ffffff;
          border-radius: 15px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          align-items: center;
        }

        .about-image-container {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px; /* space around the image */
          height: 100%;
        }

        .about-image {
          max-width: 100%;
          max-height: 80%;
          object-fit: cover;
          border-radius: 12px;
        }

        .about-text {
          flex: 1;
          padding: 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          color: #333;
        }

        .about-text h1 {
          font-size: 2.5rem;
          margin-bottom: 20px;
        }

        .about-text p {
          font-size: 1.1rem;
          line-height: 1.6;
        }

        @media (max-width: 900px) {
          .about-content-container {
            flex-direction: column;
            height: auto;
          }

          .about-image-container {
            height: 250px;
            padding: 10px; /* smaller padding for mobile */
          }

          .about-text {
            padding: 20px;
          }
        }
      `}</style>
    </>
  );
};

export default About;

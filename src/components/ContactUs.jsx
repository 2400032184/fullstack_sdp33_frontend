import React, { useState } from "react";
import Navbar from "./Navbar";
import ContactImage from "../styles/contact.jpeg";

const ContactUs = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Show popup
    setShowPopup(true);

    // Hide popup after 3 seconds
    setTimeout(() => setShowPopup(false), 3000);

    // Reset the form fields
    e.target.reset();
  };

  return (
    <>
      <Navbar />
      <div className="contact-page">
        <div className="contact-wrapper">
          <h1 className="contact-heading">Contact Us</h1>
          <div className="contact-container">
            <div className="contact-image-container">
              <img
                src={ContactImage}
                alt="Contact Us"
                className="contact-image"
              />
            </div>
            <form className="contact-form" onSubmit={handleSubmit}>
              <input type="text" placeholder="Name" required />
              <input type="email" placeholder="Email" required />
              <textarea placeholder="Message" required></textarea>
              <button type="submit">Send Message</button>
            </form>
          </div>
        </div>
      </div>

      {/* Centered Popup Notification */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-notification">
            <p>Message sent successfully!</p>
          </div>
        </div>
      )}

      <style>{`
        .contact-page {
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(90deg, #d9f1f7, #b6e0f0, #8fd3e8, #c3eaf7);
          min-height: 90vh;
          width: 100%;
          text-align: center;
        }

        .contact-wrapper {
          width: 90%;
          max-width: 1000px;
        }

        .contact-heading {
          font-size: 2.5rem;
          margin-bottom: 30px;
          color: #333;
        }

        .contact-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 30px;
          padding: 25px;
          border-radius: 15px;
          box-shadow: 0 0 15px 2px rgba(0,0,0,0.8);
          background-color: #fff;
          width: 100%;
          flex-wrap: wrap;
        }

        .contact-image-container {
          flex: 1;
          min-width: 250px;
        }

        .contact-image {
          width: 100%;
          height: auto;
          max-height: 350px;
          border-radius: 12px;
          object-fit: cover;
        }

        .contact-form {
          flex: 1;
          min-width: 250px;
          display: flex;
          flex-direction: column;
          gap: 15px;
          text-align: left;
        }

        .contact-form input, .contact-form textarea {
          padding: 12px;
          border-radius: 6px;
          border: 1px solid #ccc;
          font-size: 1rem;
        }

        .contact-form textarea {
          min-height: 150px;
        }

        .contact-form button {
          padding: 12px;
          border-radius: 6px;
          border: none;
          background: #123c5a;
          color: white;
          font-weight: bold;
          cursor: pointer;
          font-size: 1rem;
          transition: 0.3s ease;
        }

        .contact-form button:hover {
          background: #1f6f8b;
        }

        /* Centered Popup Styles */
        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(0,0,0,0.2);
          z-index: 9999;
        }

        .popup-notification {
          background: #1f6f8b;
          color: white;
          padding: 25px 40px;
          border-radius: 12px;
          font-size: 1.2rem;
          font-weight: bold;
          box-shadow: 0 8px 20px rgba(0,0,0,0.2);
          text-align: center;
          animation: popupFade 0.3s ease-in-out;
        }

        @keyframes popupFade {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        @media (max-width: 768px) {
          .contact-container {
            flex-direction: column;
          }

          .contact-form {
            text-align: center;
          }

          .contact-image {
            max-height: 250px;
          }

          .popup-notification {
            padding: 20px 25px;
            font-size: 1rem;
          }
        }
      `}</style>
    </>
  );
};

export default ContactUs;
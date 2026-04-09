import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "./Home.css";
import "./Navbar.css";

const Home = () => {
  const fullText = "Student Feedback and Evaluation Portal";
  const [typedText, setTypedText] = useState("");
  const [typingComplete, setTypingComplete] = useState(false); // track completion

  // Typing effect (slow, stops after full text)
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, index + 1));
      index++;
      if (index === fullText.length) {
        clearInterval(interval); // Stop typing
        setTypingComplete(true); // mark completion
      }
    }, 250); // 250ms per letter

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Intersection Observer for fade-up animations
  useEffect(() => {
    const elements = document.querySelectorAll(".fade-up");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.2 }
    );
    elements.forEach((el) => observer.observe(el));
  }, []);

  return (
    <>
      <Navbar />
      <div className="home-container">
        {/* Hero Section */}
        <section className="hero fade-up">
          <div className="hero-content">
            <h1 className={`typing ${typingComplete ? "typing-complete" : ""}`}>
              {typedText}
            </h1>
            <p>
              A platform for collecting and analyzing student feedback to improve educational quality.
              Your voice matters — share feedback to build better learning
            </p>
            <a href="/login" className="btn-primary">
              Get Started
            </a>
          </div>
        </section>

        <footer>
          <p>
            &copy; {new Date().getFullYear()} Student Feedback and Evaluation Portal. All Rights
            Reserved.
          </p>
        </footer>
      </div>
    </>
  );
};

export default Home;

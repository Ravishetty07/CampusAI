import React from "react";
import "./landing.css";

const images = [
  "/images/n2.jpg",
  "/images/2.webp",
  "/images/n7.jpg",
  "/images/n1.jpg",
  "/images/5.jpg",
];

export default function LandingPage() {
  return (
    <div className="landing">
      <section className="hero">
        <div className="overlay">
          <h1>Welcome to CampusAI</h1>
          <p>An AI-driven Student Management portal</p>
          <a href="/login" className="get-started-btn">Get Started</a>        </div>
      </section>

      <section className="image-gallery">
        <h2>Gallery Preview</h2>
        <div className="gallery-grid">
          {images.map((src, index) => (
            <div className="gallery-item" key={index}>
              <img src={src} alt={`Campus ${index + 1}`} />
            </div>
          ))}
        </div>
      </section>

      <section className="creators">
        <h2>Meet the Creators</h2>
        <p>CampusAI is proudly developed by:</p>
        <h3>KV Ratan & Suraj S Pai</h3>
      </section>

      <footer>
        <p>&copy; 2025 CampusAI | All rights reserved.</p>
      </footer>
    </div>
  );
}

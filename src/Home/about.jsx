import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./About.css";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="about-container">
        
        <div className="container-fluid">
          <nav className="navbar">
            <Link className="navbar-brand" to="/">Cryptop</Link>
            <ul className="nav-links">
              <li><Link to="/home">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              
              <li><Link to="/wallet">Wallet <img src="./wallet.png" alt="Wallet" /></Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/">Logout</Link></li>
            </ul>
          </nav>
        </div>
     

      <div className="about-header">
        <h1>About Cryptop</h1>
        <p>Your Gateway to the Future of Digital Finance</p>
      </div>

      <div className="about-content">
        <div className="about-section">
          <h2>Who We Are</h2>
          <p>
            Cryptop is a next-generation cryptocurrency platform dedicated to providing secure, fast, and efficient digital asset trading solutions. Our mission is to bridge the gap between traditional finance and blockchain technology.
          </p>
        </div>

        <div className="about-section">
          <h2>Why Choose Cryptop?</h2>
          <ul>
            <li>🔐 **Secure Transactions:** Advanced encryption ensures your assets are always protected.</li>
            <li>⚡ **Fast Trading:** Experience lightning-fast transactions with minimal fees.</li>
            <li>🌎 **Global Access:** Trade anytime, anywhere, across multiple currencies.</li>
            <li>📈 **Real-time Market Insights:** Stay updated with live price tracking and analysis.</li>
          </ul>
        </div>

        <div className="about-section">
          <h2>Our Mission</h2>
          <p>
            We aim to empower individuals and businesses by making cryptocurrency accessible, secure, and profitable. Our team is dedicated to innovation, ensuring you get the best trading experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;

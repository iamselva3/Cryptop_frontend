import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./contact.css";
import { Link } from "react-router-dom";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [result, setResult] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult("Sending...");

    const formDataToSend = new FormData();
    formDataToSend.append("access_key", "c6bb1600-b4e5-4863-8e25-50a07a1b4ca4");
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("message", formData.message);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();

      if (data.success) {
        setResult("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" }); // Reset form
      } else {
        setResult("Error: " + data.message);
      }
    } catch (error) {
      console.error("Submission Error:", error);
      setResult("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="contact-container">
      <header className="header_section">
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
      </header>

      <div className="container py-5">
        <div className="row">
          {/* Contact Info Section */}
          <div className="col-md-6 text-white">
            <h2>GET IN TOUCH</h2>
            <p>Stay connected with us for the latest crypto trends, secure transactions, and investment insights. Whether you have a query about trading, security, or blockchain technology, we are here to assist you.</p>
            <p><i className="fas fa-map-marker-alt"></i> Crypto HQ, 12 Blockchain Street, Silicon Valley, CA 94027</p>
            <p><i className="fas fa-phone"></i> +1 (800) 456-7890</p>
            <p><i className="fas fa-envelope"></i> support@cryptop.com</p>
          </div>

          {/* Contact Form Section */}
          <div className="col-md-6">
            <div className="card p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input type="text" className="form-control" name="name" placeholder="Your name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <input type="email" className="form-control" name="email" placeholder="Email address" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <textarea className="form-control" name="message" rows="4" placeholder="Your message here..." value={formData.message} onChange={handleChange} required></textarea>
                </div>
                <button type="submit" className="btn btn-warning w-100">Submit Message</button>
              </form>
              <p className="result-message">{result}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

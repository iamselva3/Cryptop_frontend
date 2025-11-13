import React, { useState } from "react";
import "./Adduser.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Adduser = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    address: "",
  });

  const navigate = useNavigate();

  // **Handle text input changes**
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const submitForm = async (e) => {
    e.preventDefault();
    
    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/api/user`, user, {
            headers: { "Content-Type": "application/json" }
        });
        navigate("/");
        console.log("User added successfully");
    } catch (error) {
        console.error("Axios Error:", error);
    }
  };

  return (
    <div id="main1"className="d-flex justify-content-center align-items-center vh-100">
    <div className="addUser1">
      <Link to="/" type="button" className="btn btn-primary">
        Back
      </Link>
      <h3>Sign Up</h3>
      <form className="addUserForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label>Name:</label>
          <input type="text" name="name" autoComplete="off" onChange={inputHandler} placeholder="Enter your name" />
        </div>
        <div className="inputGroup">
          <label>Email:</label>
          <input type="text" name="email" autoComplete="off" onChange={inputHandler} placeholder="Enter your email" />
        </div>
        <div className="inputGroup">
          <label>Password:</label>
          <input type="password" name="address" autoComplete="off" onChange={inputHandler} placeholder="Enter your New password" />
        </div>
        <div className="inputGroup">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default Adduser;

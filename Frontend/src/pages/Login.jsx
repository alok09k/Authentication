import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils"; // Ensure this import if using React Router
import { useState } from "react";
import {
  FaGooglePlusG,
  FaFacebook,
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  let [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target; // Destructure name and value from the event
    setFormData({
      ...formData, // Keep the existing form data
      [name]: value, // Update only the changed field
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const { email, password } = formData;
    if (!email || !password) {
      return handleError("All field are required");
    }

    try {
      const url = "https://authentication-1ew9.onrender.com/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      const { success, message, jwtToken, name, error } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("logedInUser", name);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="main">
      <div className="container">
        <form className="form-container" onSubmit={submitHandler}>
          <h2>Sign In</h2>
          <div className="social-icons">
            <a href="/#">
              <FaGooglePlusG />
            </a>
            <a href="/#">
              <FaFacebook />
            </a>
            <a href="/#">
              <FaGithub />
            </a>
            <a href="/#">
              <FaLinkedinIn />
            </a>
          </div>
          <p className="use">use your email and password</p>
          <div>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={changeHandler}
              value={formData.email}
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={changeHandler}
              value={formData.password}
            />
          </div>
          <div>
            <button type="submit">Sign In</button>
          </div>
        </form>

        <div className="toggle">
          <div className="toggle-container">
            <h1>Hello, Friend!</h1>
            <p>
              Register with your personal details to use all of site features
            </p>
            <Link to="/"><button>SIGN UP</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

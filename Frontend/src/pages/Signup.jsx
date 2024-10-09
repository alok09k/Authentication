import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { handleError, handleSuccess } from "../utils";
import './Signup.css'
import {
  FaGooglePlusG,
  FaFacebook,
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa";


function Signup() {
  
    const navigate = useNavigate();
  let [formData, setFormData] = useState({
    name: "",
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
    const { name, email, password } = formData;
    if (!name || !email || !password) {
      
      return handleError('All field are required')
    }
  
    try {
      const url = "https://authentication-1ew9.onrender.com/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      const{success,message,error} = result;
      if(success)
      {
        handleSuccess(message);
        setTimeout(() => {
            navigate('/login')
        }, 1000);
      }
      else if(error)
      {
        const details = error?.details[0].message;
        handleError(details)
      }
      else if(!success)
        {
          handleError(message)
        }
    } 
    catch (error) {
      handleError(error);
    }
  };
  
  
  return (
    <div className="main">
    <div className="container">
    <div className="toggle-2">
        <div className="toggle-container">
          <h1>Welcome Back!</h1>
          <p>
            Enter your personal details to use all of site features
          </p>
          <Link to="/login"><button>SIGN UP</button></Link>
        </div>
      </div>

      <form className="form-container-2" onSubmit={submitHandler}>
        <h2>Create Account</h2>
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
        <p className="use">use your email for registration</p>
        <div>
          <input
            type="text"
            placeholder="Name"
            name="name"
            onChange={changeHandler}
            value={formData.name}
          />
        </div>
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
    </div>
  </div>
  );
}

export default Signup;

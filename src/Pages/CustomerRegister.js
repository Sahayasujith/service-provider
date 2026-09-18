
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CustomerRegister.css";

function CustomerRegister() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

    setError("");
  };


  const handleRegister = (e) => {

    e.preventDefault();

    const {
      name,
      mobile,
      email,
      password,
      confirmPassword
    } = formData;


    // Empty field validation

    if (
      !name ||
      !mobile ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      setError("Please fill in all fields.");
      return;
    }


    // Mobile validation

    if (!/^[0-9]{10}$/.test(mobile)) {

      setError("Please enter a valid 10-digit mobile number.");

      return;
    }


    // Password validation

    if (password.length < 6) {

      setError(
        "Password must contain at least 6 characters."
      );

      return;
    }


    // Confirm password

    if (password !== confirmPassword) {

      setError("Passwords do not match.");

      return;
    }


    // Save customer

    const customerData = {
      name,
      mobile,
      email,
      password
    };


    localStorage.setItem(
      "customerUser",
      JSON.stringify(customerData)
    );


    // Success

    alert("Customer account created successfully!");


    // Go to login

    navigate("/customer-login");

  };


  return (

    <div className="customer-register-page">


      {/* =====================================
          LEFT SECTION
      ===================================== */}

      <div className="register-image-section">

        <div className="register-image-overlay"></div>

        <div className="register-image-content">

          <span>
            JOIN US
          </span>

          <h1>
            Create your
            <br />
            customer account.
          </h1>

          <p>
            Create an account and easily connect
            with trusted service providers.
          </p>

        </div>

      </div>


      {/* =====================================
          RIGHT SECTION
      ===================================== */}

      <div className="register-form-section">


        {/* BACK BUTTON */}

        <button
          className="register-back-button"
          onClick={() => navigate("/customer-login")}
        >
          ← Back to Login
        </button>


        <div className="register-container">


          {/* ICON */}

          <div className="register-icon">
            👤
          </div>


          {/* TITLE */}

          <h2>
            Create Account
          </h2>

          <p className="register-subtitle">
            Register as a customer to get started
          </p>


          {/* FORM */}

          <form onSubmit={handleRegister}>


            {/* NAME */}

            <div className="register-input-group">

              <label>
                Full Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
              />

            </div>


            {/* MOBILE */}

            <div className="register-input-group">

              <label>
                Mobile Number
              </label>

              <input
                type="tel"
                name="mobile"
                maxLength="10"
                placeholder="Enter 10-digit mobile number"
                value={formData.mobile}
                onChange={handleChange}
              />

            </div>


            {/* EMAIL */}

            <div className="register-input-group">

              <label>
                Email Address
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />

            </div>


            {/* PASSWORD */}

            <div className="register-input-group">

              <label>
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
              />

            </div>


            {/* CONFIRM PASSWORD */}

            <div className="register-input-group">

              <label>
                Confirm Password
              </label>

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />

            </div>


            {/* ERROR */}

            {error && (

              <div className="register-error">
                {error}
              </div>

            )}


            {/* REGISTER BUTTON */}

            <button
              type="submit"
              className="register-submit"
            >
              Create Account →
            </button>


          </form>


          {/* LOGIN */}

          <div className="already-account">

            <span>
              Already have an account?
            </span>

            <button
              onClick={() =>
                navigate("/customer-login")
              }
            >
              Login
            </button>

          </div>


          {/* SECURITY */}

          <div className="register-security">
            🔒 Your information is secure
          </div>

        </div>

      </div>

    </div>

  );
}

export default CustomerRegister;


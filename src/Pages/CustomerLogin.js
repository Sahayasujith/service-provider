import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./CustomerLogin.css";


function CustomerLogin() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    mobile: "",
    password: "",
  });

  const [error, setError] = useState("");


  // ========================================
  // INPUT CHANGE
  // ========================================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setError("");
  };


  // ========================================
  // LOGIN
  // ========================================

  const handleLogin = (e) => {

    e.preventDefault();

    const {
      mobile,
      password,
    } = formData;


    // Empty check
    if (!mobile || !password) {

      setError(
        "Please enter mobile number and password."
      );

      return;
    }


    // Mobile validation
    if (!/^[0-9]{10}$/.test(mobile)) {

      setError(
        "Please enter a valid 10-digit mobile number."
      );

      return;
    }


    // ========================================
    // GET REGISTERED USER
    // ========================================

    const storedUser =
      localStorage.getItem("customerUser");


    if (!storedUser) {

      setError(
        "Account not found. Please create an account first."
      );

      return;
    }


    const customerUser =
      JSON.parse(storedUser);


    // ========================================
    // CHECK LOGIN DETAILS
    // ========================================

    if (
      customerUser.mobile !== mobile ||
      customerUser.password !== password
    ) {

      setError(
        "Invalid mobile number or password."
      );

      return;
    }


    // ========================================
    // LOGIN SUCCESS
    // ========================================

    localStorage.setItem(
      "customerLoggedIn",
      "true"
    );


    localStorage.setItem(
      "loggedInCustomer",
      JSON.stringify(customerUser)
    );


    navigate("/customer-home");
  };


  return (

    <div className="customer-login-page">


      {/* ========================================
          LEFT IMAGE
      ======================================== */}

      <div className="login-image-section">

        <div className="login-image-overlay"></div>

        <div className="login-image-content">

          <span>
            WELCOME BACK
          </span>

          <h1>
            Find the right
            <br />
            service for you.
          </h1>

          <p>
            Connect with trusted service providers
            quickly and easily.
          </p>

        </div>

      </div>


      {/* ========================================
          RIGHT FORM
      ======================================== */}

      <div className="login-form-section">

        <button
          className="back-button"
          onClick={() => navigate("/")}
        >
          ← Back
        </button>


        <div className="login-container">

          <div className="login-icon">
            👤
          </div>

          <h2>
            Customer Login
          </h2>

          <p className="login-subtitle">
            Login to continue to your account
          </p>


          <form onSubmit={handleLogin}>

            {/* MOBILE */}

            <div className="input-group">

              <label>
                Mobile Number
              </label>

              <input
                type="tel"
                name="mobile"
                maxLength="10"
                placeholder="Enter your mobile number"
                value={formData.mobile}
                onChange={handleChange}
              />

            </div>


            {/* PASSWORD */}

            <div className="input-group">

              <label>
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />

            </div>


            {/* FORGOT */}

            <div className="forgot-password">

              <button
                type="button"
                onClick={() =>
                  alert(
                    "Forgot password feature coming soon!"
                  )
                }
              >
                Forgot Password?
              </button>

            </div>


            {/* ERROR */}

            {error && (

              <div className="login-error">
                {error}
              </div>

            )}


            {/* LOGIN */}

            <button
              type="submit"
              className="login-submit"
            >
              Login →
            </button>

          </form>


          {/* REGISTER */}

          <div className="register-section">

            <span>
              Don't have an account?
            </span>

            <button
              onClick={() =>
                navigate("/customer-register")
              }
            >
              Create Account
            </button>

          </div>


          <div className="secure-login">
            🔒 Your information is secure
          </div>

        </div>

      </div>

    </div>
  );
}


export default CustomerLogin;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./ServiceProviderLogin.css";

function ServiceProviderLogin() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    mobile: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setError("");
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const {
      mobile,
      password,
    } = formData;

    if (!mobile || !password) {
      setError(
        "Please enter mobile number and password."
      );
      return;
    }

    if (!/^[0-9]{10}$/.test(mobile)) {
      setError(
        "Please enter a valid 10-digit mobile number."
      );
      return;
    }

    const storedProvider =
      localStorage.getItem("serviceProviderUser");

    if (!storedProvider) {
      setError(
        "Account not found. Please create a provider account first."
      );
      return;
    }

    const serviceProvider =
      JSON.parse(storedProvider);

    if (
      serviceProvider.mobile !== mobile ||
      serviceProvider.password !== password
    ) {
      setError(
        "Invalid mobile number or password."
      );
      return;
    }

    localStorage.setItem(
      "serviceProviderLoggedIn",
      "true"
    );

    localStorage.setItem(
      "loggedInServiceProvider",
      JSON.stringify(serviceProvider)
    );

    navigate("/service-provider-home");
  };

  return (
    <div className="service-login-page">

      {/* =====================================
          LEFT SIDE - LOGIN FORM
      ===================================== */}

      <div className="service-login-form-section">

        <button
          className="service-back-button"
          onClick={() => navigate("/")}
        >
          ← Back
        </button>

        <div className="service-login-container">

          <div className="service-login-icon">
            🛠️
          </div>

          <h2>
            Service Provider Login
          </h2>

          <p className="service-login-subtitle">
            Login to manage your services and bookings
          </p>

          <form onSubmit={handleLogin}>

            {/* MOBILE */}

            <div className="service-input-group">

              <label>
                Mobile Number
              </label>

              <input
                type="tel"
                name="mobile"
                maxLength="10"
                placeholder="Enter your mobile number"
                value={formData.mobile}
                onChange={(e) => {

                  const value =
                    e.target.value.replace(/\D/g, "");

                  setFormData({
                    ...formData,
                    mobile: value,
                  });

                  setError("");
                }}
              />

            </div>


            {/* PASSWORD */}

            <div className="service-input-group">

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


            {/* FORGOT PASSWORD */}

            <div className="service-forgot-password">

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
              <div className="service-login-error">
                {error}
              </div>
            )}


            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="service-login-submit"
            >
              Login →
            </button>

          </form>


          {/* REGISTER */}

          <div className="service-register-section">

            <span>
              Don't have a provider account?
            </span>

            <button
              onClick={() =>
                navigate("/service-provider-register")
              }
            >
              Create Account
            </button>

          </div>


          {/* SECURE */}

          <div className="service-secure-login">
            🔒 Your information is secure
          </div>

        </div>

      </div>


      {/* =====================================
          RIGHT SIDE - SERVICE PROVIDER IMAGE
      ===================================== */}

      <div className="service-login-image-section">

        <img
          src="/images/service-provider.png"
          alt="Service Provider"
          className="service-login-image"
        />

        <div className="service-login-image-overlay"></div>

        <div className="service-login-image-content">

          <div className="service-brand">
            🤝 Service Connect
          </div>

          <span className="service-badge">
            SERVICE PROVIDER
          </span>

          <h1>
            Grow your
            <br />
            service business.
          </h1>

          <p>
            Connect with customers, manage your
            services and grow your business easily.
          </p>

          <div className="service-image-benefits">

            <div className="service-benefit-item">
              <span>✓</span>
              <p>Reach more customers</p>
            </div>

            <div className="service-benefit-item">
              <span>✓</span>
              <p>Manage service requests</p>
            </div>

            <div className="service-benefit-item">
              <span>✓</span>
              <p>Grow your service business</p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ServiceProviderLogin;
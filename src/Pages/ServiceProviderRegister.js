import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ServiceProviderRegister.css";

function ServiceProviderRegister() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    mobile: "",
    email: "",
    service: "",
    location: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    const {
      name,
      businessName,
      mobile,
      email,
      service,
      location,
      password,
      confirmPassword,
    } = formData;

    // ==============================
    // VALIDATION
    // ==============================

    if (
      !name ||
      !businessName ||
      !mobile ||
      !email ||
      !service ||
      !location ||
      !password ||
      !confirmPassword
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (!/^[0-9]{10}$/.test(mobile)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // ==============================
    // CREATE PROVIDER ACCOUNT
    // ==============================

    const providerData = {
      name,
      businessName,
      mobile,
      email,
      service,
      location,
      password,
    };

    localStorage.setItem(
      "serviceProviderUser",
      JSON.stringify(providerData)
    );

    alert(
      "Service Provider account created successfully!"
    );

    navigate("/service-provider-login");
  };

  return (

    <div className="provider-register-page">

      {/* =====================================
          LEFT SIDE - REGISTER FORM
      ===================================== */}

      <div className="provider-register-right">

        <div className="provider-register-card">

          {/* HEADER */}

          <div className="register-header">

            <div className="register-icon">
              🛠️
            </div>

            <div>
              <h2>
                Create Provider Account
              </h2>

              <p>
                Register your service business
              </p>
            </div>

          </div>

          {/* ERROR */}

          {error && (
            <div className="register-error">
              ⚠️ {error}
            </div>
          )}

          {/* FORM */}

          <form onSubmit={handleSubmit}>

            {/* NAME */}

            <div className="form-row">

              <div className="form-group">

                <label>
                  Your Name
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                />

              </div>

              <div className="form-group">

                <label>
                  Business Name
                </label>

                <input
                  type="text"
                  name="businessName"
                  placeholder="Enter business name"
                  value={formData.businessName}
                  onChange={handleChange}
                />

              </div>

            </div>

            {/* MOBILE + EMAIL */}

            <div className="form-row">

              <div className="form-group">

                <label>
                  Mobile Number
                </label>

                <input
                  type="tel"
                  name="mobile"
                  placeholder="10-digit mobile number"
                  maxLength="10"
                  value={formData.mobile}
                  onChange={handleChange}
                />

              </div>

              <div className="form-group">

                <label>
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleChange}
                />

              </div>

            </div>

            {/* SERVICE */}

            <div className="form-group">

              <label>
                Service Category
              </label>

              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
              >

                <option value="">
                  Select your service
                </option>

                <option value="Home Repair">
                  Home Repair
                </option>

                <option value="Technology">
                  Technology
                </option>

                <option value="Vehicle">
                  Vehicle
                </option>

                <option value="Cleaning">
                  Cleaning
                </option>

                <option value="Beauty">
                  Beauty
                </option>

                <option value="Education">
                  Education
                </option>

                <option value="Delivery">
                  Delivery
                </option>

                <option value="Design">
                  Design
                </option>

                <option value="Other">
                  Other
                </option>

              </select>

            </div>

            {/* LOCATION */}

            <div className="form-group">

              <label>
                Service Location
              </label>

              <input
                type="text"
                name="location"
                placeholder="Example: Nagercoil, Kanyakumari"
                value={formData.location}
                onChange={handleChange}
              />

            </div>

            {/* PASSWORD */}

            <div className="form-row">

              <div className="form-group">

                <label>
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  placeholder="Create password"
                  value={formData.password}
                  onChange={handleChange}
                />

              </div>

              <div className="form-group">

                <label>
                  Confirm Password
                </label>

                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />

              </div>

            </div>

            {/* REGISTER BUTTON */}

            <button
              type="submit"
              className="provider-register-btn"
            >
              Create Provider Account →
            </button>

          </form>

          {/* LOGIN LINK */}

          <div className="already-account">

            Already have an account?

            <Link to="/service-provider-login">
              Login here
            </Link>

          </div>

          {/* BACK HOME */}

          <Link
            to="/"
            className="back-home"
          >
            ← Back to Home
          </Link>

        </div>

      </div>


      {/* =====================================
          RIGHT SIDE - SERVICE PROVIDER IMAGE
      ===================================== */}

      <div className="provider-register-left">

        <div className="provider-image-wrapper">

          <img
            src="/images/service-provider.png"
            alt="Service Provider"
            className="provider-register-image"
          />

          <div className="provider-image-overlay"></div>

          <div className="provider-image-content">

            <div className="provider-brand">
              🤝 Service Connect
            </div>

            <span className="provider-badge">
              SERVICE PROVIDER
            </span>

            <h1>
              Grow Your Business
              <br />
              With Service Connect
            </h1>

            <p>
              Join our platform, showcase your services,
              connect with customers and grow your business.
            </p>

            <div className="provider-benefits">

              <div className="benefit-item">
                <span>✓</span>
                <p>Reach more customers</p>
              </div>

              <div className="benefit-item">
                <span>✓</span>
                <p>Manage service requests</p>
              </div>

              <div className="benefit-item">
                <span>✓</span>
                <p>Build your business profile</p>
              </div>

              <div className="benefit-item">
                <span>✓</span>
                <p>Track your earnings</p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ServiceProviderRegister;
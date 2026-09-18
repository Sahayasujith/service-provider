import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

import "./App.css";

// Customer Pages
import CustomerLogin from "./Pages/CustomerLogin";
import CustomerRegister from "./Pages/CustomerRegister";
import CustomerHome from "./Pages/CustomerHome";

// Service Provider Pages
import ServiceProviderLogin from "./Pages/ServiceProviderLogin";
import ServiceProviderRegister from "./Pages/ServiceProviderRegister";
import ServiceProviderHome from "./Pages/ServiceProviderHome";


// ========================================
// SPLIT HOME PAGE
// ========================================

function SplitHome() {

  const [activeSide, setActiveSide] = useState(null);
  const navigate = useNavigate();


  // ========================================
  // MOUSE EVENTS
  // ========================================

  const handleMouseEnter = (side) => {
    setActiveSide(side);
  };

  const handleMouseLeave = () => {
    setActiveSide(null);
  };

  const handleSideClick = (side) => {
    setActiveSide(
      activeSide === side ? null : side
    );
  };


  // ========================================
  // CUSTOMER NAVIGATION
  // ========================================

  const handleCustomerLogin = (e) => {
    e.stopPropagation();
    navigate("/customer-login");
  };

  const handleCustomerRegister = (e) => {
    e.stopPropagation();
    navigate("/customer-register");
  };


  // ========================================
  // SERVICE PROVIDER NAVIGATION
  // ========================================

  const handleServiceLogin = (e) => {
    e.stopPropagation();
    navigate("/service-provider-login");
  };

  const handleServiceRegister = (e) => {
    e.stopPropagation();
    navigate("/service-provider-register");
  };


  // ========================================
  // UI
  // ========================================

  return (
    <div className="split-page">


      {/* ========================================
          CUSTOMER SIDE
      ======================================== */}

      <div
        className={`
          split-side
          customer-side
          ${activeSide === "customer" ? "active" : ""}
          ${activeSide === "service" ? "inactive" : ""}
        `}
        onMouseEnter={() =>
          handleMouseEnter("customer")
        }
        onMouseLeave={handleMouseLeave}
        onClick={() =>
          handleSideClick("customer")
        }
      >

        <div className="overlay"></div>


        {/* SIDE NUMBER */}

        <div className="side-title">
          <span>01</span>
          <h2>CUSTOMER</h2>
        </div>


        {/* CONTENT */}

        <div className="content-box">

          <div className="icon">
            👤
          </div>

          <h1>
            Customer
          </h1>

          <p>
            Find the right services and connect
            with trusted service providers easily.
          </p>


          {/* LOGIN */}

          <button
            onClick={handleCustomerLogin}
          >
            Login as Customer →
          </button>


          {/* REGISTER */}

          <span className="register-text">

            New customer?

            <b
              onClick={handleCustomerRegister}
            >
              Register
            </b>

          </span>

        </div>

      </div>



      {/* ========================================
          SERVICE PROVIDER SIDE
      ======================================== */}

      <div
        className={`
          split-side
          service-side
          ${activeSide === "service" ? "active" : ""}
          ${activeSide === "customer" ? "inactive" : ""}
        `}
        onMouseEnter={() =>
          handleMouseEnter("service")
        }
        onMouseLeave={handleMouseLeave}
        onClick={() =>
          handleSideClick("service")
        }
      >

        <div className="overlay"></div>


        {/* SIDE NUMBER */}

        <div className="side-title">
          <span>02</span>
          <h2>SERVICE</h2>
        </div>


        {/* CONTENT */}

        <div className="content-box">

          <div className="icon">
            🛠️
          </div>

          <h1>
            Service Provider
          </h1>

          <p>
            Offer your services, reach more customers
            and grow your business with us.
          </p>


          {/* LOGIN */}

          <button
            onClick={handleServiceLogin}
          >
            Login as Service Provider →
          </button>


          {/* REGISTER */}

          <span className="register-text">

            Want to provide a service?

            <b
              onClick={handleServiceRegister}
            >
              Register
            </b>

          </span>

        </div>

      </div>

    </div>
  );
}



// ========================================
// APP
// ========================================

function App() {

  return (

    <BrowserRouter>

      <Routes>


        {/* ========================================
            LANDING PAGE
        ======================================== */}

        <Route
          path="/"
          element={<SplitHome />}
        />


        {/* ========================================
            CUSTOMER ROUTES
        ======================================== */}

        <Route
          path="/customer-login"
          element={<CustomerLogin />}
        />

        <Route
          path="/customer-register"
          element={<CustomerRegister />}
        />

        <Route
          path="/customer-home"
          element={<CustomerHome />}
        />


        {/* ========================================
            SERVICE PROVIDER ROUTES
        ======================================== */}

        <Route
          path="/service-provider-login"
          element={<ServiceProviderLogin />}
        />

        <Route
          path="/service-provider-register"
          element={<ServiceProviderRegister />}
        />

        <Route
          path="/service-provider-home"
          element={<ServiceProviderHome />}
        />


      </Routes>

    </BrowserRouter>
  );
}


export default App;
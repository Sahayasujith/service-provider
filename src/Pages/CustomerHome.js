import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CustomerHome.css";


// ========================================
// LOCAL STORAGE REQUEST FUNCTIONS
// ========================================

const REQUEST_KEY = "serviceRequests";

const getServiceRequests = () => {
  try {
    const storedRequests =
      localStorage.getItem(REQUEST_KEY);

    return storedRequests
      ? JSON.parse(storedRequests)
      : [];
  } catch (error) {
    console.error(
      "Error reading service requests:",
      error
    );

    return [];
  }
};


const saveServiceRequests = (requests) => {
  localStorage.setItem(
    REQUEST_KEY,
    JSON.stringify(requests)
  );
};


// ========================================
// COMPONENT
// ========================================

function CustomerHome() {

  const navigate = useNavigate();


  // ========================================
  // CUSTOMER
  // ========================================

  const [customer, setCustomer] =
    useState(null);


  // ========================================
  // SEARCH
  // ========================================

  const [searchService, setSearchService] =
    useState("");

  const [searchLocation, setSearchLocation] =
    useState("");


  // ========================================
  // CATEGORY
  // ========================================

  const [activeCategory, setActiveCategory] =
    useState("All");


  // ========================================
  // REAL BOOKINGS
  // ========================================

  const [customerBookings, setCustomerBookings] =
    useState([]);


  // ========================================
  // CHECK LOGIN
  // ========================================

  useEffect(() => {

    const loggedIn =
      localStorage.getItem(
        "customerLoggedIn"
      );

    const storedCustomer =
      localStorage.getItem(
        "loggedInCustomer"
      );


    if (
      loggedIn !== "true" ||
      !storedCustomer
    ) {

      navigate("/customer-login");

      return;
    }


    const customerData =
      JSON.parse(storedCustomer);


    setCustomer(customerData);


    // Load customer's bookings
    loadCustomerBookings(
      customerData
    );

  }, [navigate]);


  // ========================================
  // LOAD CUSTOMER BOOKINGS
  // ========================================

  const loadCustomerBookings = (
    customerData
  ) => {

    const allRequests =
      getServiceRequests();


    const myBookings =
      allRequests.filter(
        (request) =>
          request.customerMobile ===
          customerData.mobile
      );


    setCustomerBookings(
      myBookings
    );
  };


  // ========================================
  // LOGOUT
  // ========================================

  const handleLogout = () => {

    localStorage.removeItem(
      "customerLoggedIn"
    );

    localStorage.removeItem(
      "loggedInCustomer"
    );

    navigate("/customer-login");
  };


  // ========================================
  // SEARCH
  // ========================================

  const handleSearch = (e) => {

    e.preventDefault();


    if (
      !searchService &&
      !searchLocation
    ) {

      alert(
        "Please enter a service or location."
      );

      return;
    }


    alert(
      `Searching for ${
        searchService || "services"
      } ${
        searchLocation
          ? `in ${searchLocation}`
          : ""
      }`
    );
  };


  // ========================================
  // SERVICE CATEGORIES
  // ========================================

  const categories = [

    {
      icon: "🔧",
      title: "Home Repair",
      count: "120+ Providers",
    },

    {
      icon: "💻",
      title: "Technology",
      count: "85+ Providers",
    },

    {
      icon: "🚗",
      title: "Vehicle",
      count: "65+ Providers",
    },

    {
      icon: "🧹",
      title: "Cleaning",
      count: "90+ Providers",
    },

    {
      icon: "💇",
      title: "Beauty",
      count: "70+ Providers",
    },

    {
      icon: "📚",
      title: "Education",
      count: "55+ Providers",
    },

    {
      icon: "📦",
      title: "Delivery",
      count: "45+ Providers",
    },

    {
      icon: "🎨",
      title: "Design",
      count: "40+ Providers",
    },

  ];


  // ========================================
  // SERVICE PROVIDERS
  // ========================================

  const providers = [

    {
      name: "Arun Kumar",
      service: "Home Electrical Services",
      category: "Home Repair",
      location: "Nagercoil",
      rating: "4.9",
      reviews: "128",
      price: "₹300",
      verified: true,
      available: true,
      icon: "⚡",
    },

    {
      name: "TechFix Solutions",
      service: "Computer & Laptop Repair",
      category: "Technology",
      location: "Marthandam",
      rating: "4.8",
      reviews: "94",
      price: "₹500",
      verified: true,
      available: true,
      icon: "💻",
    },

    {
      name: "Raja Auto Care",
      service: "Car & Bike Service",
      category: "Vehicle",
      location: "Nagercoil",
      rating: "4.7",
      reviews: "76",
      price: "₹400",
      verified: true,
      available: false,
      icon: "🚗",
    },

    {
      name: "CleanPro Services",
      service: "Home Cleaning",
      category: "Cleaning",
      location: "Kanyakumari",
      rating: "4.9",
      reviews: "112",
      price: "₹600",
      verified: true,
      available: true,
      icon: "🧹",
    },

    {
      name: "Bright Future Academy",
      service: "Home Tutor",
      category: "Education",
      location: "Nagercoil",
      rating: "4.8",
      reviews: "68",
      price: "₹400/hr",
      verified: true,
      available: true,
      icon: "📚",
    },

    {
      name: "Creative Studio",
      service: "Graphic Design",
      category: "Design",
      location: "Remote",
      rating: "4.9",
      reviews: "51",
      price: "₹800",
      verified: true,
      available: true,
      icon: "🎨",
    },

  ];


  // ========================================
  // FILTER PROVIDERS
  // ========================================

  const filteredProviders =
    activeCategory === "All"
      ? providers
      : providers.filter(
          (provider) =>
            provider.category ===
            activeCategory
        );


  // ========================================
  // BOOK SERVICE
  // ========================================

  const handleBookService = (
    provider
  ) => {

    if (!customer) {

      alert(
        "Please login as customer first."
      );

      navigate("/customer-login");

      return;
    }


    // Get existing requests
    const existingRequests =
      getServiceRequests();


    // Create new request
    const newRequest = {

      id:
        Date.now().toString(),

      customerName:
        customer.name,

      customerMobile:
        customer.mobile,

      customerEmail:
        customer.email || "",


      providerName:
        provider.name,

      providerMobile:
        (() => {
          try {
            const loggedProvider = JSON.parse(
              localStorage.getItem("loggedInServiceProvider") || "null"
            );

            return loggedProvider?.name === provider.name
              ? loggedProvider?.mobile || ""
              : "";
          } catch {
            return "";
          }
        })(),

      providerService:
        provider.service,

      providerCategory:
        provider.category,

      providerLocation:
        provider.location,


      price:
        provider.price,


      requestDate:
        new Date().toLocaleDateString(
          "en-IN",
          {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }
        ),


      requestTime:
        new Date().toLocaleTimeString(
          "en-IN",
          {
            hour: "2-digit",
            minute: "2-digit",
          }
        ),


      status:
        "Pending",

    };


    // Add new request
    const updatedRequests = [

      ...existingRequests,

      newRequest,

    ];


    // Save to localStorage
    saveServiceRequests(
      updatedRequests
    );


    // Update customer's booking list
    setCustomerBookings(
      updatedRequests.filter(
        (request) =>
          request.customerMobile ===
          customer.mobile
      )
    );


    // Success message
    alert(
      `Booking request sent to ${provider.name} successfully!`
    );


    // Scroll to My Bookings
    setTimeout(() => {

      document
        .getElementById("bookings")
        ?.scrollIntoView({
          behavior: "smooth",
        });

    }, 300);

  };


  // ========================================
  // VIEW BOOKING DETAILS
  // ========================================

  const handleViewDetails = (
    booking
  ) => {

    alert(
      `Service: ${booking.providerService}\n\n` +
      `Provider: ${booking.providerName}\n\n` +
      `Location: ${booking.providerLocation}\n\n` +
      `Status: ${booking.status}`
    );

  };


  // ========================================
  // WAIT FOR CUSTOMER
  // ========================================

  if (!customer) {
    return null;
  }


  // ========================================
  // UI
  // ========================================

  return (

    <div className="customer-home-page">


      {/* ==================================================
          NAVBAR
      ================================================== */}

      <header className="customer-navbar">

        <div
          className="customer-logo"
          onClick={() =>
            window.scrollTo(0, 0)
          }
        >

          <span>🤝</span>

          <h2>
            Service Connect
          </h2>

        </div>


        <nav className="customer-navigation">

          <a href="#home">
            Home
          </a>

          <a href="#services">
            Services
          </a>

          <a href="#providers">
            Providers
          </a>

          <a href="#bookings">
            My Bookings
          </a>

        </nav>


        <div className="customer-nav-right">

          <button
            className="notification-button"
            onClick={() =>
              alert(
                "No new notifications"
              )
            }
          >
            🔔
          </button>


          <div className="customer-profile">

            <div className="profile-icon">
              👤
            </div>

            <div>

              <strong>
                {customer.name}
              </strong>

              <small>
                Customer
              </small>

            </div>

          </div>


          <button
            className="logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </header>


      {/* ==================================================
          HERO
      ================================================== */}

      <section
        className="customer-hero"
        id="home"
      >

        <div className="hero-content">

          <span className="hero-tag">
            WELCOME BACK,{" "}
            {customer.name.toUpperCase()} 👋
          </span>


          <h1>
            Find the right
            <br />

            <span>
              service for you.
            </span>

          </h1>


          <p>
            Discover trusted professionals,
            compare services and book the
            right person for your needs.
          </p>


          {/* SEARCH */}

          <form
            className="hero-search"
            onSubmit={handleSearch}
          >

            <div className="search-input">

              <span>
                🔍
              </span>

              <input
                type="text"
                placeholder="What service do you need?"
                value={searchService}
                onChange={(e) =>
                  setSearchService(
                    e.target.value
                  )
                }
              />

            </div>


            <div className="search-input">

              <span>
                📍
              </span>

              <input
                type="text"
                placeholder="Enter your location"
                value={searchLocation}
                onChange={(e) =>
                  setSearchLocation(
                    e.target.value
                  )
                }
              />

            </div>


            <button type="submit">
              Find Service →
            </button>

          </form>


          {/* QUICK SEARCH */}

          <div className="quick-search">

            <span>
              Popular:
            </span>

            <button
              onClick={() =>
                setSearchService(
                  "Electrician"
                )
              }
            >
              Electrician
            </button>

            <button
              onClick={() =>
                setSearchService(
                  "Plumber"
                )
              }
            >
              Plumber
            </button>

            <button
              onClick={() =>
                setSearchService(
                  "Computer Repair"
                )
              }
            >
              Computer Repair
            </button>

            <button
              onClick={() =>
                setSearchService(
                  "Cleaning"
                )
              }
            >
              Cleaning
            </button>

          </div>

        </div>


        {/* HERO VISUAL */}

        <div className="hero-visual">

          <div className="hero-circle"></div>

          <div className="visual-main-card">

            <div className="visual-main-icon">
              🤝
            </div>

            <h3>
              Trusted Services
            </h3>

            <p>
              Connect with verified
              professionals near you.
            </p>

            <div className="visual-rating">
              ⭐ 4.9

              <span>
                Customer Rating
              </span>

            </div>

          </div>


          <div className="floating-card floating-one">

            <span>
              ✓
            </span>

            <div>

              <strong>
                Verified
              </strong>

              <small>
                Service Provider
              </small>

            </div>

          </div>


          <div className="floating-card floating-two">

            <span>
              ⭐
            </span>

            <div>

              <strong>
                4.9/5
              </strong>

              <small>
                Average Rating
              </small>

            </div>

          </div>

        </div>

      </section>


      {/* ==================================================
          STATS
      ================================================== */}

      <section className="stats-section">

        <div className="stat-item">

          <strong>
            1,500+
          </strong>

          <span>
            Service Providers
          </span>

        </div>


        <div className="stat-item">

          <strong>
            5,000+
          </strong>

          <span>
            Services Completed
          </span>

        </div>


        <div className="stat-item">

          <strong>
            4.8/5
          </strong>

          <span>
            Customer Rating
          </span>

        </div>


        <div className="stat-item">

          <strong>
            100%
          </strong>

          <span>
            Verified Providers
          </span>

        </div>

      </section>


      {/* ==================================================
          POPULAR SERVICES
      ================================================== */}

      <section
        className="services-section"
        id="services"
      >

        <div className="section-heading">

          <span>
            EXPLORE SERVICES
          </span>

          <h2>
            What do you need help with?
          </h2>

          <p>
            Choose a service category and
            find trusted professionals.
          </p>

        </div>


        <div className="category-grid">

          {categories.map(
            (category, index) => (

              <div
                className="category-card"
                key={index}
                onClick={() =>
                  setActiveCategory(
                    category.title
                  )
                }
              >

                <div className="category-icon">
                  {category.icon}
                </div>

                <h3>
                  {category.title}
                </h3>

                <span>
                  {category.count}
                </span>

                <button>
                  Explore →
                </button>

              </div>

            )
          )}

        </div>

      </section>


      {/* ==================================================
          PROVIDERS
      ================================================== */}

      <section
        className="providers-section"
        id="providers"
      >

        <div className="providers-header">

          <div>

            <span>
              TRUSTED PROFESSIONALS
            </span>

            <h2>
              Service Providers Near You
            </h2>

            <p>
              Find highly rated professionals
              ready to help.
            </p>

          </div>


          <button
            className="view-all-button"
            onClick={() =>
              setActiveCategory("All")
            }
          >
            View All →
          </button>

        </div>


        {/* FILTER */}

        <div className="category-filter">

          <button
            className={
              activeCategory === "All"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveCategory("All")
            }
          >
            All
          </button>


          {categories
            .slice(0, 6)
            .map(
              (category, index) => (

                <button
                  key={index}
                  className={
                    activeCategory ===
                    category.title
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setActiveCategory(
                      category.title
                    )
                  }
                >
                  {category.title}
                </button>

              )
            )}

        </div>


        <div className="provider-grid">

          {filteredProviders.map(
            (provider, index) => (

              <div
                className="provider-card"
                key={index}
              >

                <div className="provider-top">

                  <div className="provider-avatar">
                    {provider.icon}
                  </div>


                  <button
                    className="heart-button"
                    onClick={() =>
                      alert(
                        `${provider.name} saved to favourites`
                      )
                    }
                  >
                    ♡
                  </button>

                </div>


                <div className="provider-info">

                  <div className="provider-name">

                    <h3>
                      {provider.name}
                    </h3>

                    {provider.verified && (

                      <span className="verified">
                        ✓
                      </span>

                    )}

                  </div>


                  <p className="provider-service">
                    {provider.service}
                  </p>


                  <div className="provider-location">
                    📍 {provider.location}
                  </div>


                  <div className="provider-rating">

                    ⭐ {provider.rating}

                    <span>
                      ({provider.reviews} reviews)
                    </span>

                  </div>


                  <div className="provider-bottom">

                    <div>

                      <small>
                        Starting from
                      </small>

                      <strong>
                        {provider.price}
                      </strong>

                    </div>


                    <span
                      className={
                        provider.available
                          ? "available"
                          : "unavailable"
                      }
                    >
                      {provider.available
                        ? "● Available"
                        : "● Busy"}
                    </span>

                  </div>


                  <button
                    className="book-button"
                    disabled={
                      !provider.available
                    }
                    onClick={() =>
                      handleBookService(
                        provider
                      )
                    }
                  >
                    {provider.available
                      ? "Book Service →"
                      : "Currently Busy"}
                  </button>

                </div>

              </div>

            )
          )}

        </div>

      </section>


      {/* ==================================================
          MY BOOKINGS
      ================================================== */}

      <section
        className="bookings-section"
        id="bookings"
      >

        <div className="section-heading">

          <span>
            YOUR ACTIVITY
          </span>

          <h2>
            My Bookings
          </h2>

          <p>
            Track your service requests
            and booking status.
          </p>

        </div>


        <div className="booking-list">

          {customerBookings.length === 0 ? (

            <div className="booking-card">

              <div className="booking-icon">
                📅
              </div>

              <div className="booking-details">

                <h3>
                  No bookings yet
                </h3>

                <p>
                  Choose a service provider
                  and book a service to see
                  your requests here.
                </p>

              </div>

            </div>

          ) : (

            customerBookings.map(
              (booking) => (

                <div
                  className="booking-card"
                  key={booking.id}
                >

                  <div className="booking-icon">
                    🤝
                  </div>


                  <div className="booking-details">

                    <h3>
                      {booking.providerService}
                    </h3>

                    <p>
                      Provider:{" "}
                      <strong>
                        {booking.providerName}
                      </strong>
                    </p>

                    <p>
                      📍{" "}
                      {booking.providerLocation}
                    </p>

                    <div className="booking-time">

                      📅{" "}
                      {booking.requestDate}

                      <span>
                        🕐{" "}
                        {booking.requestTime}
                      </span>

                    </div>

                  </div>


                  <div className="booking-status">

                    <span
                      className={
                        booking.status ===
                        "Accepted"
                          ? "confirmed"
                          : booking.status ===
                            "Rejected"
                          ? "rejected"
                          : "pending"
                      }
                    >
                      {booking.status}
                    </span>


                    <button
                      onClick={() =>
                        handleViewDetails(
                          booking
                        )
                      }
                    >
                      View Details
                    </button>

                  </div>

                </div>

              )
            )

          )}

        </div>

      </section>


      {/* ==================================================
          QUICK ACTIONS
      ================================================== */}

      <section className="quick-actions-section">

        <div className="quick-action-card">

          <div className="quick-action-icon">
            📅
          </div>

          <div>

            <h3>
              Book a Service
            </h3>

            <p>
              Need help? Find and book
              a professional quickly.
            </p>

          </div>

          <button
            onClick={() =>
              document
                .getElementById("providers")
                ?.scrollIntoView({
                  behavior: "smooth",
                })
            }
          >
            Find Provider →
          </button>

        </div>


        <div className="quick-action-card">

          <div className="quick-action-icon">
            💬
          </div>

          <div>

            <h3>
              Need Help?
            </h3>

            <p>
              Contact our support team
              for assistance.
            </p>

          </div>

          <button
            onClick={() =>
              alert(
                "Customer support coming soon!"
              )
            }
          >
            Contact Support →
          </button>

        </div>

      </section>


      {/* ==================================================
          WHY CHOOSE US
      ================================================== */}

      <section className="why-section">

        <div className="why-content">

          <span>
            WHY SERVICE CONNECT
          </span>

          <h2>
            Everything you need,
            <br />
            in one place.
          </h2>

          <p>
            We make it simple to find reliable
            professionals for your everyday
            service needs.
          </p>

        </div>


        <div className="why-grid">

          <div className="why-card">

            <div>
              🛡️
            </div>

            <h3>
              Verified Providers
            </h3>

            <p>
              Connect with trusted and
              verified professionals.
            </p>

          </div>


          <div className="why-card">

            <div>
              ⭐
            </div>

            <h3>
              Real Reviews
            </h3>

            <p>
              Make better decisions using
              genuine customer ratings.
            </p>

          </div>


          <div className="why-card">

            <div>
              ⚡
            </div>

            <h3>
              Quick Booking
            </h3>

            <p>
              Find and book services without
              unnecessary waiting.
            </p>

          </div>


          <div className="why-card">

            <div>
              🔒
            </div>

            <h3>
              Secure Platform
            </h3>

            <p>
              Your account and personal
              information stay protected.
            </p>

          </div>

        </div>

      </section>


      {/* ==================================================
          REVIEWS
      ================================================== */}

      <section className="reviews-section">

        <div className="section-heading">

          <span>
            CUSTOMER STORIES
          </span>

          <h2>
            What our customers say
          </h2>

        </div>


        <div className="review-grid">

          <div className="review-card">

            <div className="review-stars">
              ⭐⭐⭐⭐⭐
            </div>

            <p>
              "Finding a reliable electrician
              was very easy. I could compare
              providers and book quickly."
            </p>

            <div className="review-user">

              <div>
                👩
              </div>

              <span>
                Priya S.
              </span>

            </div>

          </div>


          <div className="review-card">

            <div className="review-stars">
              ⭐⭐⭐⭐⭐
            </div>

            <p>
              "The platform is simple to use
              and the service provider arrived
              on time."
            </p>

            <div className="review-user">

              <div>
                👨
              </div>

              <span>
                Rahul K.
              </span>

            </div>

          </div>


          <div className="review-card">

            <div className="review-stars">
              ⭐⭐⭐⭐⭐
            </div>

            <p>
              "I found a good computer repair
              service near my location within
              minutes."
            </p>

            <div className="review-user">

              <div>
                👩
              </div>

              <span>
                Anitha R.
              </span>

            </div>

          </div>

        </div>

      </section>


      {/* ==================================================
          FOOTER
      ================================================== */}

      <footer className="customer-footer">

        <div className="footer-main">

          <div className="footer-brand">

            <h3>
              🤝 Service Connect
            </h3>

            <p>
              Connecting customers with
              trusted service providers.
            </p>

          </div>


          <div className="footer-column">

            <h4>
              Platform
            </h4>

            <a href="#home">
              Home
            </a>

            <a href="#services">
              Services
            </a>

            <a href="#providers">
              Providers
            </a>

            <a href="#bookings">
              My Bookings
            </a>

          </div>


          <div className="footer-column">

            <h4>
              Support
            </h4>

            <a href="#help">
              Help Center
            </a>

            <a href="#contact">
              Contact Us
            </a>

            <a href="#privacy">
              Privacy
            </a>

            <a href="#terms">
              Terms
            </a>

          </div>


          <div className="footer-column">

            <h4>
              Connect
            </h4>

            <a href="#facebook">
              Facebook
            </a>

            <a href="#instagram">
              Instagram
            </a>

            <a href="#linkedin">
              LinkedIn
            </a>

          </div>

        </div>


        <div className="footer-bottom">

          <span>
            © 2026 Service Connect.
            All rights reserved.
          </span>

          <span>
            Made with ❤️ for better services.
          </span>

        </div>

      </footer>

    </div>
  );
}


export default CustomerHome;
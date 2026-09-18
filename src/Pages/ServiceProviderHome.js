import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ServiceProviderHome.css";

const ServiceProviderHome = () => {
    const navigate = useNavigate();

    const [provider, setProvider] = useState(null);
    const [activeTab, setActiveTab] = useState("Overview");
    const [menuOpen, setMenuOpen] = useState(false);

    const [requests, setRequests] = useState([
        {
            id: 1,
            customer: "Rahul Kumar",
            service: "AC Repair",
            location: "Nagercoil",
            date: "Today",
            time: "10:30 AM",
            price: "₹800",
            status: "New",
            avatar: "👨",
        },
        {
            id: 2,
            customer: "Priya S",
            service: "Electrical Repair",
            location: "Marthandam",
            date: "Today",
            time: "02:00 PM",
            price: "₹600",
            status: "New",
            avatar: "👩",
        },
        {
            id: 3,
            customer: "Arun Joseph",
            service: "Home Wiring",
            location: "Nagercoil",
            date: "Tomorrow",
            time: "11:00 AM",
            price: "₹1,200",
            status: "New",
            avatar: "👨‍💼",
        },
    ]);

    const [jobs, setJobs] = useState([
        {
            id: 101,
            customer: "Suresh Kumar",
            service: "Fan Installation",
            location: "Kottar",
            date: "Today",
            time: "05:00 PM",
            price: "₹450",
            status: "Accepted",
        },
        {
            id: 102,
            customer: "Meena R",
            service: "Electrical Repair",
            location: "Nagercoil",
            date: "Tomorrow",
            time: "09:30 AM",
            price: "₹700",
            status: "Accepted",
        },
    ]);

    const [services] = useState([
        {
            name: "Electrical Repair",
            icon: "⚡",
            jobs: 28,
            rating: "4.9",
        },
        {
            name: "AC Service",
            icon: "❄️",
            jobs: 17,
            rating: "4.8",
        },
        {
            name: "Home Wiring",
            icon: "🔌",
            jobs: 12,
            rating: "4.9",
        },
    ]);

    const reviews = [
        {
            customer: "Vijay Kumar",
            rating: 5,
            text: "Excellent service. Very professional and arrived on time.",
        },
        {
            customer: "Anitha S",
            rating: 5,
            text: "Good work and reasonable price. Highly recommended.",
        },
        {
            customer: "Mohan Raj",
            rating: 4,
            text: "Quick response and quality service.",
        },
    ];

    useEffect(() => {
        const loggedIn = localStorage.getItem("serviceProviderLoggedIn");
        const storedProvider = localStorage.getItem(
            "loggedInServiceProvider"
        );

        if (!loggedIn || !storedProvider) {
            navigate("/service-provider-login");
            return;
        }

        setProvider(JSON.parse(storedProvider));
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("serviceProviderLoggedIn");
        localStorage.removeItem("loggedInServiceProvider");

        navigate("/service-provider-login");
    };

    const acceptRequest = (id) => {
        const selectedRequest = requests.find(
            (request) => request.id === id
        );

        if (!selectedRequest) return;

        const updatedJob = {
            ...selectedRequest,
            status: "Accepted",
        };

        setJobs((prev) => [...prev, updatedJob]);

        setRequests((prev) =>
            prev.filter((request) => request.id !== id)
        );

        alert("Service request accepted successfully!");
    };

    const rejectRequest = (id) => {
        setRequests((prev) =>
            prev.filter((request) => request.id !== id)
        );

        alert("Service request rejected.");
    };

    const completeJob = (id) => {
        setJobs((prev) =>
            prev.map((job) =>
                job.id === id
                    ? { ...job, status: "Completed" }
                    : job
            )
        );

        alert("Job marked as completed!");
    };

    const renderStars = (rating) => {
        return "⭐".repeat(rating);
    };

    if (!provider) {
        return (
            <div className="provider-loading">
                <div className="provider-loader"></div>
                <p>Loading dashboard...</p>
            </div>
        );
    }

    return (
        <div className="provider-dashboard">

            {/* NAVBAR */}

            <header className="provider-navbar">

                <div className="provider-nav-left">

                    <button
                        className="provider-mobile-menu"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        ☰
                    </button>

                    <div
                        className="provider-dashboard-logo"
                        onClick={() => setActiveTab("Overview")}
                    >
                        <div>🔧</div>

                        <span>
                            Service
                            <strong>Connect</strong>
                        </span>
                    </div>

                </div>

                <div className="provider-nav-right">

                    <button
                        className="provider-notification-btn"
                        onClick={() =>
                            alert(
                                `You have ${requests.length} new service requests.`
                            )
                        }
                    >
                        🔔
                        {requests.length > 0 && (
                            <span>{requests.length}</span>
                        )}
                    </button>

                    <div className="provider-user-mini">

                        <div className="provider-user-avatar">
                            {provider.name.charAt(0).toUpperCase()}
                        </div>

                        <div className="provider-user-info">
                            <strong>{provider.name}</strong>
                            <small>{provider.service}</small>
                        </div>

                    </div>

                </div>

            </header>

            {/* MAIN */}

            <div className="provider-dashboard-layout">

                {/* SIDEBAR */}

                <aside
                    className={`provider-sidebar ${
                        menuOpen ? "provider-sidebar-open" : ""
                    }`}
                >

                    <div className="provider-profile-card">

                        <div className="provider-big-avatar">
                            {provider.name.charAt(0).toUpperCase()}
                        </div>

                        <h3>{provider.name}</h3>

                        <p>{provider.businessName}</p>

                        <div className="provider-rating">
                            ⭐ 4.9
                            <span>Top Rated</span>
                        </div>

                    </div>

                    <nav className="provider-side-nav">

                        {[
                            "Overview",
                            "Service Requests",
                            "My Jobs",
                            "My Services",
                            "Reviews",
                            "Profile",
                        ].map((item) => (
                            <button
                                key={item}
                                className={
                                    activeTab === item
                                        ? "active"
                                        : ""
                                }
                                onClick={() => {
                                    setActiveTab(item);
                                    setMenuOpen(false);
                                }}
                            >
                                <span>
                                    {
                                        {
                                            Overview: "📊",
                                            "Service Requests": "📩",
                                            "My Jobs": "🛠️",
                                            "My Services": "🔧",
                                            Reviews: "⭐",
                                            Profile: "👤",
                                        }[item]
                                    }
                                </span>

                                {item}

                                {item === "Service Requests" &&
                                    requests.length > 0 && (
                                        <b>{requests.length}</b>
                                    )}
                            </button>
                        ))}

                    </nav>

                    <div className="provider-sidebar-bottom">

                        <button
                            onClick={() =>
                                alert(
                                    "Help & Support will be available soon."
                                )
                            }
                        >
                            💬 Help & Support
                        </button>

                        <button
                            className="provider-logout"
                            onClick={handleLogout}
                        >
                            🚪 Logout
                        </button>

                    </div>

                </aside>

                {/* CONTENT */}

                <main className="provider-main-content">

                    {/* OVERVIEW */}

                    {activeTab === "Overview" && (
                        <>

                            <section className="provider-welcome">

                                <div>
                                    <span className="provider-greeting">
                                        Good Morning 👋
                                    </span>

                                    <h1>
                                        Welcome, {provider.name}
                                    </h1>

                                    <p>
                                        Here's what's happening with your
                                        service business today.
                                    </p>
                                </div>

                                <button
                                    className="provider-add-service"
                                    onClick={() =>
                                        setActiveTab("My Services")
                                    }
                                >
                                    + Add Service
                                </button>

                            </section>

                            {/* STATS */}

                            <section className="provider-stats-grid">

                                <div className="provider-stat-card">
                                    <div className="provider-stat-icon purple">
                                        📩
                                    </div>

                                    <div>
                                        <span>New Requests</span>
                                        <strong>{requests.length}</strong>
                                        <small>Waiting for response</small>
                                    </div>
                                </div>

                                <div className="provider-stat-card">
                                    <div className="provider-stat-icon blue">
                                        🛠️
                                    </div>

                                    <div>
                                        <span>Active Jobs</span>
                                        <strong>
                                            {
                                                jobs.filter(
                                                    (j) =>
                                                        j.status ===
                                                        "Accepted"
                                                ).length
                                            }
                                        </strong>
                                        <small>Currently accepted</small>
                                    </div>
                                </div>

                                <div className="provider-stat-card">
                                    <div className="provider-stat-icon green">
                                        ✅
                                    </div>

                                    <div>
                                        <span>Completed</span>
                                        <strong>57</strong>
                                        <small>Jobs completed</small>
                                    </div>
                                </div>

                                <div className="provider-stat-card">
                                    <div className="provider-stat-icon orange">
                                        💰
                                    </div>

                                    <div>
                                        <span>Total Earnings</span>
                                        <strong>₹42,500</strong>
                                        <small>+12% this month</small>
                                    </div>
                                </div>

                            </section>

                            {/* REQUESTS */}

                            <section className="provider-section">

                                <div className="provider-section-header">

                                    <div>
                                        <span>WORK OPPORTUNITIES</span>
                                        <h2>New Service Requests</h2>
                                    </div>

                                    <button
                                        onClick={() =>
                                            setActiveTab(
                                                "Service Requests"
                                            )
                                        }
                                    >
                                        View All →
                                    </button>

                                </div>

                                {requests.length === 0 ? (
                                    <div className="provider-empty">
                                        🎉
                                        <h3>No new requests</h3>
                                        <p>
                                            You have responded to all
                                            available service requests.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="provider-request-grid">

                                        {requests
                                            .slice(0, 3)
                                            .map((request) => (
                                                <div
                                                    className="provider-request-card"
                                                    key={request.id}
                                                >

                                                    <div className="provider-request-top">

                                                        <div className="provider-customer-avatar">
                                                            {request.avatar}
                                                        </div>

                                                        <div>
                                                            <h3>
                                                                {
                                                                    request.customer
                                                                }
                                                            </h3>

                                                            <span>
                                                                {
                                                                    request.service
                                                                }
                                                            </span>
                                                        </div>

                                                        <b>
                                                            {request.price}
                                                        </b>

                                                    </div>

                                                    <div className="provider-request-details">

                                                        <span>
                                                            📍{" "}
                                                            {
                                                                request.location
                                                            }
                                                        </span>

                                                        <span>
                                                            📅{" "}
                                                            {request.date}
                                                        </span>

                                                        <span>
                                                            🕐{" "}
                                                            {request.time}
                                                        </span>

                                                    </div>

                                                    <div className="provider-request-actions">

                                                        <button
                                                            className="reject-btn"
                                                            onClick={() =>
                                                                rejectRequest(
                                                                    request.id
                                                                )
                                                            }
                                                        >
                                                            Reject
                                                        </button>

                                                        <button
                                                            className="accept-btn"
                                                            onClick={() =>
                                                                acceptRequest(
                                                                    request.id
                                                                )
                                                            }
                                                        >
                                                            Accept Job
                                                        </button>

                                                    </div>

                                                </div>
                                            ))}

                                    </div>
                                )}

                            </section>

                            {/* ACTIVE JOBS */}

                            <section className="provider-section">

                                <div className="provider-section-header">

                                    <div>
                                        <span>YOUR SCHEDULE</span>
                                        <h2>Upcoming Jobs</h2>
                                    </div>

                                    <button
                                        onClick={() =>
                                            setActiveTab("My Jobs")
                                        }
                                    >
                                        View All →
                                    </button>

                                </div>

                                <div className="provider-jobs-list">

                                    {jobs.map((job) => (
                                        <div
                                            className="provider-job-row"
                                            key={job.id}
                                        >

                                            <div className="provider-job-icon">
                                                🛠️
                                            </div>

                                            <div className="provider-job-info">

                                                <h3>{job.service}</h3>

                                                <p>
                                                    Customer:{" "}
                                                    {job.customer}
                                                </p>

                                            </div>

                                            <div className="provider-job-location">
                                                📍 {job.location}
                                            </div>

                                            <div className="provider-job-time">
                                                <strong>
                                                    {job.date}
                                                </strong>

                                                <span>
                                                    {job.time}
                                                </span>
                                            </div>

                                            <div className="provider-job-price">
                                                {job.price}
                                            </div>

                                            {job.status === "Accepted" && (
                                                <button
                                                    className="complete-job-btn"
                                                    onClick={() =>
                                                        completeJob(job.id)
                                                    }
                                                >
                                                    Complete
                                                </button>
                                            )}

                                            {job.status === "Completed" && (
                                                <span className="completed-badge">
                                                    ✓ Completed
                                                </span>
                                            )}

                                        </div>
                                    ))}

                                </div>

                            </section>

                            {/* BOTTOM GRID */}

                            <section className="provider-bottom-grid">

                                <div className="provider-mini-section">

                                    <div className="provider-section-header">
                                        <div>
                                            <span>YOUR SERVICES</span>
                                            <h2>Popular Services</h2>
                                        </div>

                                        <button
                                            onClick={() =>
                                                setActiveTab(
                                                    "My Services"
                                                )
                                            }
                                        >
                                            Manage →
                                        </button>
                                    </div>

                                    <div className="provider-services-mini">

                                        {services.map((service) => (
                                            <div
                                                className="provider-service-mini"
                                                key={service.name}
                                            >
                                                <div>
                                                    <span>
                                                        {service.icon}
                                                    </span>

                                                    <strong>
                                                        {service.name}
                                                    </strong>
                                                </div>

                                                <small>
                                                    {service.jobs} jobs
                                                    {" · "}
                                                    ⭐ {service.rating}
                                                </small>
                                            </div>
                                        ))}

                                    </div>

                                </div>

                                <div className="provider-earning-card">

                                    <span>THIS MONTH</span>

                                    <h2>₹18,750</h2>

                                    <p>
                                        Your earnings increased by
                                        <strong> 12.5%</strong>
                                    </p>

                                    <div className="provider-chart">

                                        {[35, 50, 42, 70, 58, 82, 68].map(
                                            (height, index) => (
                                                <div
                                                    key={index}
                                                    className="chart-bar"
                                                    style={{
                                                        height: `${height}%`,
                                                    }}
                                                ></div>
                                            )
                                        )}

                                    </div>

                                </div>

                            </section>

                        </>
                    )}

                    {/* SERVICE REQUESTS */}

                    {activeTab === "Service Requests" && (
                        <section className="provider-page-section">

                            <div className="provider-page-heading">
                                <span>WORK OPPORTUNITIES</span>
                                <h1>Service Requests</h1>
                                <p>
                                    Review and manage customer requests.
                                </p>
                            </div>

                            {requests.length === 0 ? (
                                <div className="provider-empty large">
                                    🎉
                                    <h2>No Pending Requests</h2>
                                    <p>
                                        New customer requests will appear
                                        here.
                                    </p>
                                </div>
                            ) : (
                                <div className="provider-full-request-grid">

                                    {requests.map((request) => (
                                        <div
                                            className="provider-request-card"
                                            key={request.id}
                                        >

                                            <div className="provider-request-top">
                                                <div className="provider-customer-avatar">
                                                    {request.avatar}
                                                </div>

                                                <div>
                                                    <h3>
                                                        {request.customer}
                                                    </h3>
                                                    <span>
                                                        {request.service}
                                                    </span>
                                                </div>

                                                <b>{request.price}</b>
                                            </div>

                                            <div className="provider-request-details">
                                                <span>
                                                    📍 {request.location}
                                                </span>
                                                <span>
                                                    📅 {request.date}
                                                </span>
                                                <span>
                                                    🕐 {request.time}
                                                </span>
                                            </div>

                                            <div className="provider-request-actions">
                                                <button
                                                    className="reject-btn"
                                                    onClick={() =>
                                                        rejectRequest(
                                                            request.id
                                                        )
                                                    }
                                                >
                                                    Reject
                                                </button>

                                                <button
                                                    className="accept-btn"
                                                    onClick={() =>
                                                        acceptRequest(
                                                            request.id
                                                        )
                                                    }
                                                >
                                                    Accept Job
                                                </button>
                                            </div>

                                        </div>
                                    ))}

                                </div>
                            )}

                        </section>
                    )}

                    {/* JOBS */}

                    {activeTab === "My Jobs" && (
                        <section className="provider-page-section">

                            <div className="provider-page-heading">
                                <span>JOB MANAGEMENT</span>
                                <h1>My Jobs</h1>
                                <p>
                                    Track all your accepted and completed
                                    service jobs.
                                </p>
                            </div>

                            <div className="provider-jobs-list full">

                                {jobs.map((job) => (
                                    <div
                                        className="provider-job-row"
                                        key={job.id}
                                    >

                                        <div className="provider-job-icon">
                                            🛠️
                                        </div>

                                        <div className="provider-job-info">
                                            <h3>{job.service}</h3>
                                            <p>
                                                Customer:{" "}
                                                {job.customer}
                                            </p>
                                        </div>

                                        <div className="provider-job-location">
                                            📍 {job.location}
                                        </div>

                                        <div className="provider-job-time">
                                            <strong>{job.date}</strong>
                                            <span>{job.time}</span>
                                        </div>

                                        <div className="provider-job-price">
                                            {job.price}
                                        </div>

                                        {job.status === "Accepted" ? (
                                            <button
                                                className="complete-job-btn"
                                                onClick={() =>
                                                    completeJob(job.id)
                                                }
                                            >
                                                Complete
                                            </button>
                                        ) : (
                                            <span className="completed-badge">
                                                ✓ Completed
                                            </span>
                                        )}

                                    </div>
                                ))}

                            </div>

                        </section>
                    )}

                    {/* SERVICES */}

                    {activeTab === "My Services" && (
                        <section className="provider-page-section">

                            <div className="provider-page-heading provider-heading-flex">

                                <div>
                                    <span>SERVICE MANAGEMENT</span>
                                    <h1>My Services</h1>
                                    <p>
                                        Manage the services you provide.
                                    </p>
                                </div>

                                <button
                                    className="provider-add-service"
                                    onClick={() =>
                                        alert(
                                            "Add Service feature will be available soon."
                                        )
                                    }
                                >
                                    + Add Service
                                </button>

                            </div>

                            <div className="provider-services-grid">

                                {services.map((service) => (
                                    <div
                                        className="provider-service-card"
                                        key={service.name}
                                    >

                                        <div className="provider-service-icon">
                                            {service.icon}
                                        </div>

                                        <h3>{service.name}</h3>

                                        <div className="provider-service-meta">
                                            <span>
                                                🛠️ {service.jobs} Jobs
                                            </span>

                                            <span>
                                                ⭐ {service.rating}
                                            </span>
                                        </div>

                                        <button
                                            onClick={() =>
                                                alert(
                                                    `Edit ${service.name}`
                                                )
                                            }
                                        >
                                            Edit Service
                                        </button>

                                    </div>
                                ))}

                            </div>

                        </section>
                    )}

                    {/* REVIEWS */}

                    {activeTab === "Reviews" && (
                        <section className="provider-page-section">

                            <div className="provider-page-heading">
                                <span>CUSTOMER FEEDBACK</span>
                                <h1>Reviews & Ratings</h1>
                                <p>
                                    See what your customers say about your
                                    service.
                                </p>
                            </div>

                            <div className="provider-review-summary">

                                <div className="provider-rating-number">
                                    <strong>4.9</strong>
                                    <div>⭐⭐⭐⭐⭐</div>
                                    <span>Based on 45 reviews</span>
                                </div>

                                <div className="provider-rating-bars">

                                    {[5, 4, 3, 2, 1].map((star) => (
                                        <div
                                            className="rating-bar-row"
                                            key={star}
                                        >
                                            <span>{star} ⭐</span>
                                            <div>
                                                <i
                                                    style={{
                                                        width:
                                                            star === 5
                                                                ? "88%"
                                                                : star === 4
                                                                ? "9%"
                                                                : "2%",
                                                    }}
                                                ></i>
                                            </div>
                                        </div>
                                    ))}

                                </div>

                            </div>

                            <div className="provider-reviews-grid">

                                {reviews.map((review, index) => (
                                    <div
                                        className="provider-review-card"
                                        key={index}
                                    >

                                        <div className="provider-review-header">

                                            <div className="provider-review-avatar">
                                                {review.customer
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </div>

                                            <div>
                                                <strong>
                                                    {review.customer}
                                                </strong>

                                                <span>
                                                    {renderStars(
                                                        review.rating
                                                    )}
                                                </span>
                                            </div>

                                        </div>

                                        <p>
                                            "{review.text}"
                                        </p>

                                    </div>
                                ))}

                            </div>

                        </section>
                    )}

                    {/* PROFILE */}

                    {activeTab === "Profile" && (
                        <section className="provider-page-section">

                            <div className="provider-page-heading">
                                <span>ACCOUNT SETTINGS</span>
                                <h1>My Profile</h1>
                                <p>
                                    View your service provider information.
                                </p>
                            </div>

                            <div className="provider-profile-page-card">

                                <div className="provider-profile-page-top">

                                    <div className="provider-profile-large-avatar">
                                        {provider.name
                                            .charAt(0)
                                            .toUpperCase()}
                                    </div>

                                    <div>
                                        <h2>{provider.name}</h2>
                                        <p>{provider.businessName}</p>

                                        <span className="provider-verified">
                                            ✓ Verified Provider
                                        </span>
                                    </div>

                                </div>

                                <div className="provider-profile-details">

                                    <div>
                                        <span>Mobile Number</span>
                                        <strong>
                                            📱 {provider.mobile}
                                        </strong>
                                    </div>

                                    <div>
                                        <span>Email</span>
                                        <strong>
                                            ✉️ {provider.email}
                                        </strong>
                                    </div>

                                    <div>
                                        <span>Main Service</span>
                                        <strong>
                                            🛠️ {provider.service}
                                        </strong>
                                    </div>

                                    <div>
                                        <span>Service Location</span>
                                        <strong>
                                            📍 {provider.location}
                                        </strong>
                                    </div>

                                </div>

                                <button
                                    className="provider-edit-profile"
                                    onClick={() =>
                                        alert(
                                            "Edit Profile feature will be available soon."
                                        )
                                    }
                                >
                                    ✏️ Edit Profile
                                </button>

                            </div>

                        </section>
                    )}

                </main>

            </div>

        </div>
    );
};

export default ServiceProviderHome;
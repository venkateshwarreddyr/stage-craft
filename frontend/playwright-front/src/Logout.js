import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineCheckCircle, HiOutlineArrowRight } from "react-icons/hi2";
import "./Logout.css";

export const Logout = () => (
  <div className="logout-page">
    <div className="logout-card glass animate-fade-in-up">
      <div className="logout-icon-wrapper">
        <HiOutlineCheckCircle />
      </div>
      <h2>You've been logged out</h2>
      <p>Your session has been securely terminated.</p>
      <div className="logout-actions">
        <Link to="/login" className="btn-primary">
          Sign In Again <HiOutlineArrowRight />
        </Link>
        <Link to="/" className="btn-secondary">
          Back to Home
        </Link>
      </div>
    </div>
  </div>
);

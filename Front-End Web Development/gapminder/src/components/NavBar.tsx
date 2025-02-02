import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link to="/" className="nav-link">
              Home 
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/line-chart">
              Line Chart
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/bubble-chart">
              Bubble Chart
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;

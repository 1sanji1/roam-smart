// src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import logo from "../images/RoamSmart Logo.png";
import "../css/navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="RoamSmart Logo" className="nav-logo" />
        <span className="brand-name">RoamSmart</span>
      </div>
      <ul className="nav-links">
        <li>
          <span className="user-name">Hi, {userName}</span>
        </li>
        <li>
          <Link to="/history">Saved Itineraries</Link>
        </li>
        <li>
          <Link
            to="/"
            onClick={() => {
              localStorage.removeItem("userName");
              localStorage.removeItem("token");
            }}
          >
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

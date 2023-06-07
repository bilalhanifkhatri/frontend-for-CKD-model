import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Header = () => {
  return (
    <nav className="navBar">
      <div className="leftNavDiv">CKD Prediction</div>
      <div className="rightNavBar">
        <Link to="/" className="navLink">
          Home
        </Link>
        <Link to="/about" className="navLink">
          About Us
        </Link>
        <Link to="/contact" className="navLink">
          Contact Us
        </Link>
      </div>
    </nav>
  );
};

export default Header;

import React from "react";
import "./style.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="left">
        &copy; 2023 Your Company. All rights reserved.
      </div>
      <div className="right">
        <div className="member">
          <span className="name">Bilal Khatri</span>
          <span className="intro">Short intro for Bilal Khatri</span>
        </div>
        <div className="member">
          <span className="name">Saad Khan</span>
          <span className="intro">Short intro for Saad Khan</span>
        </div>
        <div className="member">
          <span className="name">Ahzam Ahmed</span>
          <span className="intro">Short intro for Ahzam Ahmed</span>
        </div>
        <div className="social-icons">
          <a href="#" className="icon">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#" className="icon">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="icon">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

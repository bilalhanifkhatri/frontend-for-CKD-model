import React from "react";
import "./style.css";

const ContactUs = () => {
  return (
    <div className="contact-us">
      <h3>Contact Us</h3>
      <div className="team-member">
        <div className="member-info">
          <h4>Bilal Khatri</h4>
          <p>Front-end Developer</p>
          <p>Email: bilal@example.com</p>
          <p>Phone: 123-456-7890</p>
        </div>
        <div className="member-info">
          <h4>Saad Khan</h4>
          <p>Back-end Developer</p>
          <p>Email: saad@example.com</p>
          <p>Phone: 987-654-3210</p>
        </div>
        <div className="member-info">
          <h4>Ahzam Ahmed</h4>
          <p>UI/UX Designer</p>
          <p>Email: ahzam@example.com</p>
          <p>Phone: 456-789-1230</p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

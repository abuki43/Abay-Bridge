import React from "react";

import logo from "../../../assets/logo.svg";
import "./footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="logo-container">
        <img src={logo} />
      </div>
      <ul>
        <li>Contact us</li>
        <li>Home</li>
        <li>FAQ</li>
      </ul>
      <h5>Copyright © 2024 Abay - Bridge</h5>
    </div>
  );
};

export default Footer;

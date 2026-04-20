import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer-back-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
      Back to top
    </div>
    <div className="footer-mid">
      <div className="footer-col">
        <h3>Get to Know Us</h3>
        <Link to="/">About Amazon Clone</Link>
        <Link to="/">Careers</Link>
        <Link to="/">Press Releases</Link>
        <Link to="/">Investor Relations</Link>
      </div>
      <div className="footer-col">
        <h3>Make Money with Us</h3>
        <Link to="/">Sell on Amazon</Link>
        <Link to="/">Become an Affiliate</Link>
        <Link to="/">Advertise Your Products</Link>
        <Link to="/">Self-Publish</Link>
      </div>
      <div className="footer-col">
        <h3>Let Us Help You</h3>
        <Link to="/">Your Account</Link>
        <Link to="/orders">Your Orders</Link>
        <Link to="/">Shipping Rates</Link>
        <Link to="/">Returns</Link>
        <Link to="/">Help</Link>
      </div>
      <div className="footer-col">
        <h3>Connect with Us</h3>
        <Link to="/">Facebook</Link>
        <Link to="/">Twitter</Link>
        <Link to="/">Instagram</Link>
        <Link to="/">YouTube</Link>
      </div>
    </div>
    <div className="footer-bottom">
      <div className="footer-logo">amazon<span>clone</span></div>
      <p className="footer-copy">© 2024 Amazon Clone. All rights reserved. Built with ❤️ using React + Spring Boot</p>
    </div>
  </footer>
);

export default Footer;

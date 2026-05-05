import React from 'react';
import './Footer.css';

const Footer = ({ onNavigate }) => {
  return (
    <footer className="main-footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <h2 className="footer-logo">Bharat Rojjgar</h2>
          <p className="footer-desc">
            Empowering workers with opportunities while helping businesses find skilled labor without hassle.
          </p>
        </div>
        
        <div className="footer-links">
          <div className="link-group">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>Home</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('find-jobs'); }}>Find Jobs</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('about'); }}>About Us</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          <div className="link-group">
            <h3>Legal</h3>
            <ul>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container bottom-content">
          <p>&copy; ALL RIGHTS RESERVED BY BHARATROJJGAR</p>
          <p>
            &copy; DESIGNED BY{' '}
            <a href="https://diskwebitsolutions.com" target="_blank" rel="noopener noreferrer" className="designed-by">
              DISKWEB IT SOLUTIONS
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

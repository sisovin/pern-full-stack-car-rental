import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-links">
          <Link href="/about">
            <a>About</a>
          </Link>
          <Link href="/contact">
            <a>Contact</a>
          </Link>
          <Link href="/vehicles">
            <a>Vehicles</a>
          </Link>
        </div>
        <div className="footer-social">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
        <div className="footer-copy">
          <p>&copy; {new Date().getFullYear()} Car Rental. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

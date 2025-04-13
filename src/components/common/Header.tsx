import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header>
      <div className="logo">
        <Link href="/">
          <a>Car Rental</a>
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link href="/about">
              <a>About</a>
            </Link>
          </li>
          <li>
            <Link href="/contact">
              <a>Contact</a>
            </Link>
          </li>
          <li>
            <Link href="/vehicles">
              <a>Vehicles</a>
            </Link>
          </li>
          <li>
            <Link href="/login">
              <a>Login</a>
            </Link>
          </li>
          <li>
            <Link href="/register">
              <a>Register</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

import React from 'react';
import './Navbar.css';

function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
  };

  const token = localStorage.getItem('accessToken');

  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        {token && (
          <>
            <li className="nav-item">
              <a href="/" className="nav-link">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a href="/about" className="nav-link">
                About
              </a>
            </li>
            <li className="nav-item">
              <a href="/services" className="nav-link">
                Services
              </a>
            </li>
            <li className="nav-item">
              <a href="/contact" className="nav-link">
                Contact
              </a>
            </li>
          </>
        )}
        <li className="nav-item">
          {token ? (
            <a href="/logout" className="nav-link" onClick={handleLogout}>
              Logout
              
            </a>
          ) : (
            <a href="/login" className="nav-link">
              Login
            </a>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

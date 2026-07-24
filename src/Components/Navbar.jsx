import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm py-3">
      <div className="container">
        <Link className="navbar-brand fw-bold d-flex align-items-center gap-2" to="/">
          <i className="bi bi-shield-lock-fill text-danger fs-4"></i>
          <span>Meet.Dev 2FA Module</span>
        </Link>
        
        <div className="d-flex align-items-center gap-2 gap-sm-3">
          <Link 
            className={`nav-link text-white-50 px-2 ${location.pathname === '/' ? 'text-white fw-bold' : ''}`} 
            to="/"
          >
            Home
          </Link>
          <Link 
            className={`btn btn-sm ${location.pathname === '/login' ? 'btn-primary' : 'btn-outline-light'} px-3`} 
            to="/login"
          >
            Login
          </Link>
          <Link 
            className={`btn btn-sm ${location.pathname === '/register' ? 'btn-success' : 'btn-outline-success'} px-3`} 
            to="/register"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
//import NavBar from "./NavBar";
import './Layout.css';

function Layout() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    // Check if user is logged in on component mount
    useEffect(() => {
      const checkLoginStatus = () => {
        const token = window.localStorage.getItem("token");
        setIsLoggedIn(!!token);
      };

      checkLoginStatus();

      // Listen for storage changes
      window.addEventListener('storage', checkLoginStatus);

      return () => {
        window.removeEventListener('storage', checkLoginStatus);
      };
    }, []);

    const handleLogout = () => {
      window.localStorage.removeItem("token");
      setIsLoggedIn(false);
      setMobileMenuOpen(false);
      navigate("/");
  };

  return (
    <div className="app-layout">
      {/* Header/Navigation */}
      <header className="header">
        <div className="container">
          <div className="nav-wrapper">
            <div className="logo">
              <Link to="/">
                <img src="/BookBankFullLogo_Transparent_NoBuffer.png" alt="Book Bank Logo" className="logo-image" />
              </Link>
            </div>
            
            <button 
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="hamburger"></span>
              <span className="hamburger"></span>
              <span className="hamburger"></span>
            </button>

            <nav className={`nav ${mobileMenuOpen ? 'nav-open' : ''}`}>
              <ul className="nav-list">
                <li><Link to="/" className="nav-link">Home</Link></li>
                <li><Link to="/fundraisers" className="nav-link">Fundraisers</Link></li>
                <li><Link to="/aboutpage" className="nav-link">About</Link></li>
                <li><Link to="/contactpage" className="nav-link">Contact</Link></li>

                {/* Show different links based on login status */}
                {isLoggedIn ? (
                  <li><Link to="/account" className="nav-link">My Account</Link></li>
                ) : (
                  <li><Link to="/login" className="nav-link">Login</Link></li>
                )}
              </ul>

              {/* Show different buttons based on login status */}
              {isLoggedIn ? (
                <button onClick={handleLogout} className="btn btn-secondary">
                  Logout
                </button>
              ) : (
                <Link to="/start-fundraiser" className="btn btn-primary">Start a Fundraiser</Link>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content Area - where child routes render */}
      <main>
        <Outlet context={{ setIsLoggedIn }} />
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3 className="footer-title">BookBank</h3>
              <p>Empowering communities to make a difference</p>
            </div>
            <div className="footer-section">
              <h4 className="footer-heading">Quick Links</h4>
              <ul className="footer-links">
                <li><Link to="/fundraisers">Fundraisers</Link></li>
                <li><Link to="/aboutpage">About</Link></li>
                <li><Link to="/contactpage">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 BookBank. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
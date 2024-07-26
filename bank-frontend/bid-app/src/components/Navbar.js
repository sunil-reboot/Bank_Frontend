import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  const [btcQty, setBtcQty] = useState(null);
  const [mobile, setMobile] = useState(localStorage.getItem('mobile'));
  const [username, setUsername] = useState(localStorage.getItem('usersName')); // State for username
  let isUserOrAdmin = false;
  let isCashierOrAdmin = false;

  const roles = JSON.parse(localStorage.getItem('roles') || '[]');
  isUserOrAdmin = roles.includes('USER') || roles.includes('ADMIN');
  isCashierOrAdmin = roles.includes('CASHIER') || roles.includes('ADMIN');

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('authToken');
    localStorage.removeItem('roles');
    localStorage.removeItem('mobile');
    localStorage.removeItem('usersName');
    window.location = '/';
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    setMobile(localStorage.getItem('mobile'));
    setUsername(localStorage.getItem('usersName')); // Update username state
  }, [isAuthenticated]);

  return (
    <>
      <nav className="navbar navbar-expand-lg text-dark">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" onClick={toggleSidebar} aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <Link className="navbar-brand ms-2" to="/rules">Home</Link>
          <div className="btc-rate-container">
            {isAuthenticated && <span className="btc-rate"><i className="bi bi-currency-rupee"></i>{btcQty}</span>}
          </div>
          <div className={`collapse navbar-collapse justify-content-between`} id="navbarScroll">
            <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style={{ '--bs-scroll-height': '100px' }}>
              {isAuthenticated ? (
                <>
                  {isUserOrAdmin && (
                    <>
                      <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          Services
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                          <li><a className="dropdown-item" href="/view-transactions">Statement</a></li>
                          <li><a className="dropdown-item" href="#">Balance</a></li>
                          <li><a className="dropdown-item" href="#">Send Money</a></li>
                        </ul>
                      </li>
                      
                      {/* Investments */}
                      <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          Investments
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                          <li><a className="dropdown-item" href="/investments-plans">Investment Plans</a></li>
                          <li><a className="dropdown-item" href="#">Fixed Term Deposit</a></li>
                          <li><a className="dropdown-item" href="#">Mutual Funds</a></li>
                          <li><a className="dropdown-item" href="#">ETF</a></li>
                          <li><a className="dropdown-item" href="#">Invested Funds</a></li>
                        </ul>
                      </li>

                      {/* Loans */}
                      <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          Loans
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                          <li><a className="dropdown-item" href="/withdraw-btc">Home Loan</a></li>
                          <li><a className="dropdown-item" href="#">Personal Loan</a></li>
                          <li><a className="dropdown-item" href="#">Vehicle Loan</a></li>
                        </ul>
                      </li>

                      {/* Dashboards */}
                      <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          Dashboards
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                          <li><a className="dropdown-item" href="/withdraw-btc">Overall Dashboard</a></li>
                          <li><a className="dropdown-item" href="#">Expenses Dashboard</a></li>
                          <li><a className="dropdown-item" href="#">Investment Dashboard</a></li>
                        </ul>
                      </li>

                      {/* Nominate Users */}
                      <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          Nominate Users
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                          <li><a className="dropdown-item" href="/nominate-user">Nominate User</a></li>
                          <li><a className="dropdown-item" href="/nominated-users">Nominated Users</a></li>
                          <li><a className="dropdown-item" href="/nominees-suggestions">Suggestions By Users</a></li>
                        </ul>
                      </li>
                    </>
                  )}
                  <li className="nav-item">
                    <button className="nav-link btn" onClick={handleLogout}>Logout</button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/">SignUp</Link>
                  </li>
                </>
              )}
            </ul>
            {/* Display mobile number and username only in mobile view */}
            <div className="d-lg-none">
              {mobile && (
                <span className="mobile-number">
                  {mobile.replace(/^"(.*)"$/, '$1')} <br />
                  {username.replace(/^"(.*)"$/, '$1')}
                </span>
              )}
            </div>
          </div>
        </div>
      </nav>
      {/* Footer Message */}
      <footer className="footer-message">
        Investments are subject to your own risk appetite; read all scheme-related documents carefully.
      </footer>
    </>
  );
}



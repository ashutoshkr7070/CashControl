import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import '../styles/LandingPage.css';

const LandingPage = () => {
  const [loginUser, setLoginUser] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setLoginUser(true);
    }
  }, []);

  return (
    <div className="container-main">
      {loginUser ? (
        <Header />
      ) : (
        <nav className="navbar">
          <div className='brand-logo'>
            <img src="./money-box.png" className="navbar-logo" alt="CashControl" />
            <h5 className="navbar-logo">CashControl</h5>
          </div>
          <div className="button-group">
            <button className="button button-default" onClick={() => navigate('/login')}>Login</button>
            <button className="button button-primary" onClick={() => navigate('/register')}>Register</button>
          </div>
        </nav>
      )}

      <section className="hero-section">
        <div className="hero-text">
          <h1>Manage Your Money Efficiently</h1>
          <p>
            Cash-Control helps you take control of your finances with easy expense tracking and effective money management.
          </p>
          <button className="hero-button" onClick={() => navigate('/add-expense')}>Add Expense</button>
        </div>
      </section>

      <div className="benefits-section">
      <h2 className="creative-heading">Why Money Management Matters 💡</h2>
      <div className="scrollable-content-horizontal">
        <div className="benefit-card">
          <FaUserCircle size={40} />
          <p>"CashControl helped me save more and spend wisely!"</p>
        </div>
        <div className="benefit-card">
          <FaUserCircle size={40} />
          <p>"Best app for tracking expenses. Highly recommend!"</p>
        </div>
        <div className="benefit-card">
          <FaUserCircle size={40} />
          <p>"Simple and effective. My go-to finance app."</p>
        </div>
        <div className="benefit-card">
          <FaUserCircle size={40} />
          <p>"Managing money has never been this easy."</p>
        </div>
        <div className="benefit-card">
          <FaUserCircle size={40} />
          <p>"Great tool for budgeting and controlling expenses."</p>
        </div>
      </div>
    </div>


      <Footer />
    </div>
  );
};

export default LandingPage;

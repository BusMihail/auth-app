import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { scroller } from 'react-scroll';
import Signup from './Signup';
import Login from './Login';
import { auth, onAuthStateChanged, signOut } from './firebase';
import './index.css';

const App = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [scrollTo, setScrollTo] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setIsAuthenticated(true);
        setUserEmail(user.email);
      } else {
        setIsAuthenticated(false);
        setUserEmail('');
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (scrollTo) {
      scroller.scrollTo(scrollTo, {
        smooth: true,
        duration: 500,
      });
      setScrollTo('');
    }
  }, [scrollTo]);

  const handleShowSignup = () => {
    setShowSignup(true);
    setShowLogin(false);
    setScrollTo('signup-section');
  };

  const handleShowLogin = () => {
    setShowSignup(false);
    setShowLogin(true);
    setScrollTo('login-section');
  };

  const handleLogout = () => {
    signOut(auth).then(() => {
      setIsAuthenticated(false);
      setUserEmail('');
    }).catch(error => {
      console.error("Error signing out: ", error);
    });
  };

  const handleAuthSuccess = () => {
    setShowSignup(false);
    setShowLogin(false);
  };

  return (
    <Router>
      <div className="page-container">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">AuthApp</a>
            <div className="d-flex">
              {isAuthenticated ? (
                <>
                  <span className="navbar-text me-3 text-white">{userEmail}</span>
                  <button className="btn btn-secondary" onClick={handleLogout}>Logout</button>
                </>
              ) : (
                <>
                  <button className="btn btn-primary me-2" onClick={handleShowSignup}>Sign Up</button>
                  <button className="btn btn-secondary" onClick={handleShowLogin}>Login</button>
                </>
              )}
            </div>
          </div>
        </nav>
        <div className="hero">
          <div className="hero-content">
            <h1>Welcome to the Auth App</h1>
            <p className="fade-in">
              Hello! My name is Mihail Bușteagă, and this is a simple web app for the React internship. It's just a webpage, with Signup/Login/Logout functions using Firebase.
            </p>
          </div>
        </div>
        <div className="container">
          {showSignup && !isAuthenticated && (
            <div id="signup-section">
              <div className="form-container">
                <Signup onSuccess={handleAuthSuccess} />
              </div>
            </div>
          )}
          {showLogin && !isAuthenticated && (
            <div id="login-section">
              <div className="form-container">
                <Login onSuccess={handleAuthSuccess} />
              </div>
            </div>
          )}
        </div>
      </div>
    </Router>
  );
};

export default App;

import React, { useState } from 'react';
import './toggle.css';
import Login from '../Login/Login';
import Registration from '../Registration/Registration';

const LogRegComponent = () => {
    const [isSignup, setIsSignup] = useState(false);

  const toggleForms = () => {
    setIsSignup(!isSignup);
  };

  return (
    <div className={`container ${isSignup ? 'change' : ''}`}>
      <div className="forms-container">
        <div className="form-control signup-form ">
            <Registration/>
        </div>
        <div className="form-control signin-form">
            <Login/>
        </div>
      </div>
      <div className="intros-container">
        <div className="intro-control signin-intro">
          <div className="intro-control__inner">
             <img src="/public/srlogo.png" className='hidden md:flex md:h-72 md:w-72 mx-auto' />
            <h2>Welcome back!</h2>
            <p>
              Welcome back! We are so happy to have you here. It's great to see you again. We hope you had a safe and enjoyable time away.
            </p>
            <button id="signup-btn" onClick={toggleForms}>No account yet? Register Now.</button>
          </div>
        </div>
        <div className="intro-control signup-intro">
          <div className="intro-control__inner">
            <img src="/public/srlogo.png" className='hidden md:flex md:h-72 md:w-72 mx-auto' />
            <h2>Come join us!</h2>
            <p>
              We are so excited to have you here. If you haven't already, create an account to get access to exclusive offers, rewards, and discounts.
            </p>
            <button id="signin-btn" onClick={toggleForms}>Already have an account? Log in .</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogRegComponent;
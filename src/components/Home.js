import React from 'react';
import './Home.css'; 
import headerBg from '../assets/technician.png';
import { Link } from 'react-router-dom';

function App() {
  const handleRegisterClick = () => {
    window.location.href = '/registration'; 
  };

  return (
    <div className="container">
      <nav>
        <div className="nav__logo">ABC LABS</div>
        <ul className="nav__links">
          <li className="link"><a href="#">Home</a></li>
          <li className="link"><a href="#">About Us</a></li>
          <li className="link"><a href="#">Courses</a></li>
          <li className="link"><a href="#">Pages</a></li>
          <li className="link"><a href="#">Blog</a></li>
          <li className="link"><Link to="/register">Contact</Link></li> {/* Use Link component */}
        </ul>
        <button className="btn" onClick={handleRegisterClick}>Register Now</button>
      </nav>
      <header className="header">
        <div className="content">
          <h1><span>Get Quick</span><br />Medical Services</h1>
          <p>
            In today's fast-paced world, access to prompt and efficient medical
            services is of paramount importance. When faced with a medical
            emergency or seeking immediate medical attention, the ability to
            receive quick medical services can significantly impact the outcome
            of a situation.
          </p>
          <button className="btn">Get Services</button>
        </div>
        <div className="image">
          <span className="image__bg"></span>
          <img src={headerBg} alt="header image" />
          <div className="image__content image__content__1">
            <span><i className="ri-user-3-line"></i></span>
            <div className="details">
              <h4>1520+</h4>
              <p>Active Clients</p>
            </div>
          </div>
          <div className="image__content image__content__2">
            <ul>
              <li>
                <span><i className="ri-check-line"></i></span>
                Get 20% off on every 1st month
              </li>
              <li>
                <span><i className="ri-check-line"></i></span>
                Expert Doctors
              </li>
            </ul>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;

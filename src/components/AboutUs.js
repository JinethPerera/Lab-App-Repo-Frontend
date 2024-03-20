
import React, { useEffect } from 'react';
import '../styles/AboutUs.css'; 
import headerBg from '../assets/technician2.png'; 
import { Link } from 'react-router-dom';

function AboutUs() {
    const handleRegisterClick = () => {
        window.location.href = '/registration'; 
      };

      useEffect(() => {
   
        const smartsuppScript = document.createElement("script");
        smartsuppScript.type = "text/javascript";
        smartsuppScript.innerHTML = `
          var _smartsupp = _smartsupp || {};
          _smartsupp.key = 'b7263d274eeeba44b8a69f7a54df4924ea4f62bd';
          window.smartsupp||(function(d) {
            var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
            s=d.getElementsByTagName('script')[0];c=d.createElement('script');
            c.type='text/javascript';c.charset='utf-8';c.async=true;
            c.src='https://www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
          })(document);
        `;
        document.body.appendChild(smartsuppScript);
      }, []);
    
  return (
    <div className="container">
      <nav>
        <div className="nav__logo">ABC LABS</div>
        <ul className="nav__links">
          <li className="link"><Link to="/home">Home</Link></li>
          <li className="link"><Link to="/about">About Us</Link></li>
          
          <li className="link"><a href="#">Services</a></li>
          <li className="link"><a href="#">Blog</a></li>
          <li className="link"><Link to="/register">Contact</Link></li>
        </ul>
        <button className="btn" onClick={handleRegisterClick}>Register Now</button>
      </nav>
      <header className="header">
        <div className="content">
          <h1>About ABC LABS</h1>
          <p>
            ABC LABS is a leading provider of laboratory services dedicated to providing accurate and timely results. We offer a wide range of tests and screenings to meet the needs of our patients.
          </p>
          <p>
            Our team of experienced professionals is committed to delivering high-quality service with a focus on patient care and satisfaction. At ABC LABS, we strive to exceed expectations and provide the best possible experience for our clients.
          </p>
        </div>
        <div className="image">
          <span className="image__bg"></span>
          <img src={headerBg} alt="header image" />
        </div>
      </header>
      <div className="additional-info">
        <div className="card">
          <h2>Our Services</h2>
          <p>
            We offer a variety of laboratory services including blood tests, urine analysis, genetic testing, pathology services, and more. Our state-of-the-art facilities and experienced staff ensure accurate and reliable results for our clients.
          </p>
        </div>
        <div className="card">
          <h2>Our Team</h2>
          <p>
            Meet our dedicated team of professionals who are passionate about providing exceptional service and care to our patients. Our team consists of skilled technicians, knowledgeable physicians, and friendly administrative staff who work together to ensure the best possible experience for our clients.
          </p>
        </div>
        {/* Add more cards for additional information */}
        <div className="card">
          <h2>Our Mission</h2>
          <p>
            At ABC LABS, our mission is to improve the health and well-being of our community by providing high-quality laboratory services with compassion and integrity. We are committed to excellence in everything we do and strive to exceed the expectations of our patients and partners.
          </p>
        </div>
        <div className="card">
          <h2>Our Technology</h2>
          <p>
            We utilize cutting-edge technology and innovative methods to deliver fast, accurate, and reliable results to our clients. Our advanced equipment and software enable us to perform a wide range of tests efficiently while maintaining the highest standards of quality and safety.
          </p>
        </div>
        <div className="card">
          <h2>Our Values</h2>
          <p>
            Integrity, excellence, compassion, and innovation are at the core of everything we do at ABC LABS. We are dedicated to upholding these values in every interaction with our clients, employees, and partners, ensuring that we always deliver the highest level of service and care.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;

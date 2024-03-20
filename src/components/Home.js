import React, { useEffect } from 'react';
import '../styles/Home.css'; 
import headerBg from '../assets/technician.png';
import { Link } from 'react-router-dom';

function App() {
  const handleRegisterClick = () => {
    window.location.href = '/registration'; 
  };

  useEffect(() => {
    // Smartsupp Live Chat script
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
          <li className="link"><a href="#">Home</a></li>
          <li className="link"><Link to="/aboutus">About Us</Link></li>
         
          <li className="link"><a href="#">Services</a></li>
          <li className="link"><a href="#">Blog</a></li>
          <li className="link"><Link to="/register">Contact</Link></li> {/* Use Link component */}
        </ul>
        <button className="btn" onClick={handleRegisterClick}>Register Now</button>
      </nav>
      <header className="header">

        
        <div className="content">
          <h1><span>Get Quick</span><br />Medical Test Services</h1>
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

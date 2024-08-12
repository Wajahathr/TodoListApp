import React from 'react';
import './Navbar.css'; // Import your CSS file for styling
import img from './img.png';

const Navbar = () => {
  // Add scroll functionality to toggle the 'scrolled' class
  const handleScroll = () => {
    const nav = document.getElementById('nav');
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav id="nav">
      <img 
        src={img} // Use the imported image
        alt="Logo" 
      />
      <div className="navbar-buttons">
        <button className="navbar-button1">
          <span>Login</span>
        </button>
        <button className="navbar-button2">
          <span>Join Us</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

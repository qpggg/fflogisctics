import React from 'react';

const Navbar: React.FC = () => {
  return (
    <header className="header">
      <div className="container header-content">
        <div className="logo-container">
          <img
            src="/logo.png"
            alt="FF Логистика"
            width={52}
            height={52}
            className="logo"
          />
          <span className="company-name">FF Логистика</span>
        </div>
        <a 
          href="tel:89036301464"
          className="phone-link"
        >
          8-903-630-14-64
        </a>
      </div>
    </header>
  );
};

export default Navbar; 
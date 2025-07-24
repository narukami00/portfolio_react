import React, { useState } from "react";
import "./Header.css";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleNavClick = () => {
    setIsOpen(false);
  };

  return (
    <header className="header-section">
      <div className="header-container">
        <a href="#hero" className="header-logo">
          Rafsan Riasat
        </a>
        <button
          className="menu-button"
          aria-label="Open navigation"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="menu-button-line"></span>
          <span className="menu-button-line"></span>
          <span className="menu-button-line"></span>
        </button>
        <nav className={`nav-menu ${isOpen ? "open" : ""}`}>
          <ul className="nav-list">
            <li>
              <a
                href="#about"
                className="nav-item-link"
                onClick={handleNavClick}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#projects"
                className="nav-item-link"
                onClick={handleNavClick}
              >
                Projects
              </a>
            </li>
            <li>
              <a
                href="#skills"
                className="nav-item-link"
                onClick={handleNavClick}
              >
                Skills
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="nav-item-link"
                onClick={handleNavClick}
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

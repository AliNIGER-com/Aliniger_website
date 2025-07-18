import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import { FaBars, FaTimes, FaStore } from 'react-icons/fa';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="logo">
        <span>
          Ali<span className="niger">Niger</span>
        </span>
      </div>

      <div className="burger" onClick={toggleMenu}>
        {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </div>

      <ul className={`navLinks${menuOpen ? ' navActive' : ''}`}>
        <li>
          <NavLink
            to="/local"
            onClick={closeMenu}
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Produits Locaux
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/alibaba"
            onClick={closeMenu}
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Produits Alibaba
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

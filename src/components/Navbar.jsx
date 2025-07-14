import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.css';
import { FaBars, FaTimes, FaStore } from 'react-icons/fa';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <span>
          Ali<span className={styles.niger}>Niger</span>
        </span>
      </div>

      <div className={styles.burger} onClick={toggleMenu}>
        {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </div>

      <ul className={`${styles.navLinks} ${menuOpen ? styles.navActive : ''}`}>
        <li>
          <NavLink
            to="/local"
            onClick={closeMenu}
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            Produits Locaux
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/alibaba"
            onClick={closeMenu}
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            Produits Alibaba
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/boutique"
            onClick={closeMenu}
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            <FaStore style={{ marginRight: '6px' }} />
            Boutique
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  const location = useLocation();

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}> {/* Make logo clickable */}
        Travel<span className={styles.trucks}>Trucks</span>
      </Link>
      <nav className={styles.nav}>
        <Link 
          to="/" 
          className={location.pathname === '/' ? styles.active : styles.navLink}
        >
          Home
        </Link>
        <Link 
          to="/catalog" 
          className={location.pathname === '/catalog' ? styles.active : styles.navLink}
        >
          Catalog
        </Link>
      </nav>
    </header>
  );
};

export default Header;

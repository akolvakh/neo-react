import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  const location = useLocation();

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.content}>
      <Link to="/" className={styles.logo}>
        Travel<span className={styles.trucks}>Trucks</span>
      </Link>
      <nav className={styles.nav}>
        <Link
          to="/"
          className={location.pathname === "/" ? styles.active : styles.navLink}
        >
          Home
        </Link>
        <Link
          to="/catalog"
          className={
            location.pathname === "/catalog" ? styles.active : styles.navLink
          }
        >
          Catalog
        </Link>
      </nav>
      </div>
      </div>
    </header>
  );
};

export default Header;

import React from "react";
import { Link } from "react-router";
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <div className={styles.verticalNavbar}>
      <Link to="/" className={styles.navItem}>
        Accueil
      </Link>
      <Link to="/movies" className={styles.navItem}>
        Liste des films
      </Link>
      <Link to="/wishlist" className={styles.navItem}>
        Wishlist
      </Link>
    </div>
  );
};

export default Navbar;

import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import styles from './Navbar.module.css';

const Navbar = () => {
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    // Récupérer la wishlist depuis le localStorage
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
      setWishlistCount(JSON.parse(storedWishlist).length);
    }
  }, []);

  return (
    <div className={styles.verticalNavbar}>
      <Link to="/" className={styles.navItem}>
        Accueil
      </Link>
      <Link to="/movies" className={styles.navItem}>
        Liste des films
      </Link>
      <Link to="/wishlist" className={styles.navItem}>
        Wishlist ({wishlistCount})
      </Link>
    </div>
  );
};

export default Navbar;

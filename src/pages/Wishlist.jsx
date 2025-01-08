import React from "react";
import { useWishlist } from "../Providers/WishlistProvider";
import styles from "./Wishlist.module.css";
import { useNavigate } from "react-router";


const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const navigate = useNavigate();

  if (wishlist.length === 0) {
    return <p className={styles.emptyMessage}>Votre wishlist est vide.</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Ma Wishlist</h1>
      <div className={styles.grid}>
        {wishlist.map((movie) => (
          <div key={movie.id} className={styles.card}>
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              className={styles.image}
            />
            <h3 className={styles.movieTitle}>{movie.title}</h3>
            <p className={styles.rating}>Note : {movie.vote_average}/10</p>
            <button onClick={() => navigate(`/movie/${movie.id}`)}>
              Voir le détail
            </button>
            <button
              onClick={() => removeFromWishlist(movie.id)}
              className={styles.button}
            >
              Retirer
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import styles from './MovieDetail.module.css';
import { useWishlist } from "../Providers/WishlistProvider";
import { useNavigate } from "react-router";


const MovieDetail = () => {
    const navigate = useNavigate();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [actors, setActors] = useState([]);
  const [similars, setSimilars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMovieDetailsAndActors = async () => {
      try {
        const fetchMovieDetails = async () => {
          const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}/${id}?api_key=${import.meta.env.VITE_API_KEY}&language=fr-FR`
          );
          const data = await response.json();
          setMovieDetails(data);
        };

        const fetchMovieActors = async () => {
          const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}/${id}/credits?api_key=${import.meta.env.VITE_API_KEY}&language=fr-FR`
          );
          const data = await response.json();
          setActors(data.cast.slice(0, 10));
        };

        await Promise.all([fetchMovieDetails(), fetchMovieActors()]);
      } catch (error) {
        console.log("Erreur lors de la récupération des données :", error);
      }
    };

    const getSimilarMovies = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/${id}/similar?api_key=${import.meta.env.VITE_API_KEY}&language=fr-FR`
        );
        const data = await response.json();
        setSimilars(data.results.slice(0, 5));
      } catch (error) {
        console.log("Erreur lors de la récupération des films similaires :", error);
      }
    };

    const fetchAllData = async () => {
      setIsLoading(true);
      await Promise.all([fetchMovieDetailsAndActors(), getSimilarMovies()]);
      setIsLoading(false);
    };

    fetchAllData();
  }, [id]);

  const getRuntime = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return hours > 0 ? `${hours}h${minutes}min` : `${minutes}min`;
  };

  if (isLoading) return <p>Chargement...</p>;
  if (!movieDetails) return <p>Aucun film trouvé.</p>;

  return (
    <div className={styles.firstContainer}>
      <div className={styles.container}>
        <h1>{movieDetails.title}</h1>
        <p><strong>Date de sortie :</strong> {movieDetails.release_date}</p>
        <p><strong>Note moyenne :</strong> {movieDetails.vote_average.toFixed(2)}/10</p>
        <img
          src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
          alt={movieDetails.title}
        />
        <p><strong>Synopsis : </strong> {movieDetails.overview} </p>
        <p className={styles.genreList}>
          <strong>Genres :</strong> {movieDetails.genres.map((genre) => genre.name).join(", ")}
        </p>
        <p><strong>Durée :</strong> {getRuntime(movieDetails.runtime)}</p>
        <p className={styles.budget}><strong>Budget :</strong> ${movieDetails.budget?.toLocaleString()}</p>
        <p><strong>Acteurs principaux :</strong> {actors.map(actor => actor.name).join(", ")}</p>
        <br />
        <button onClick={() => addToWishlist(movieDetails)}>
          Ajouter à la wishlist
        </button>
      </div>
      <div>
        <p><strong>Films similaires : </strong></p>
        <ul>
          {similars.map((movie) => (
            <div key={movie.id}>
              <strong>{movie.title}</strong>
              <img
                className={styles.similarsImage}
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <p><strong>Note moyenne :</strong> {movie.vote_average.toFixed(2)}/10</p>
              <button onClick={() => navigate(`/movie/${movie.id}`)}>
          Voir le détail
        </button>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MovieDetail;

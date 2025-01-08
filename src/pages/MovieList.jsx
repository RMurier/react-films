import React, { useEffect, useState } from 'react';
import styles from './MovieList.module.css';
import { useNavigate } from "react-router";

const MovieList = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/popular?api_key=${import.meta.env.VITE_API_KEY}&language=fr-FR`
      );
      const data = await response.json();
      setMovies(data.results);
    };

    fetchMovies();
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Liste des films populaires</h1>
      <input
        type="text"
        placeholder="Rechercher un film..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className={styles.moviesGrid}>
        {filteredMovies.map((movie) => (
          <div key={movie.id} className={styles.movieCard}>
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
            <p>Note : {movie.vote_average.toFixed(2)}/10</p>
            <button onClick={() => navigate(`/movie/${movie.id}`)}>
              Voir le détail
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
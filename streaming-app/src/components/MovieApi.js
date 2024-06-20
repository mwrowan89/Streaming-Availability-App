import React, { useEffect, useState } from "react";
import { tmdbPopMovieInfo, tmdbPopTvInfo } from "../TmdbApi";
import "./MovieApi.css";

function MovieApi() {
  const [loading, setLoading] = useState(false);
  const [movieResults, setMovieResults] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const movies = await tmdbPopMovieInfo(page);
        setMovieResults(movies);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie data", error);
      }
    };

    fetchMovies();
  }, [page]);

  const nextPage = () => {
    setPage((page) => page + 1);
  };
  const prevPage = () => {
    if (page > 1) {
      setPage((page) => page - 1);
    }
  };

  return (
    <div>
      <div className="movie-result-container">
        {loading ? (
          <p>Loading...</p>
        ) : movieResults ? (
          movieResults.map((result, index) => (
            <div key={index} className="movie-result-item">
              <img
                onClick={(e) => {
                  console.table(result);
                }}
                src={
                  result.poster_path && result.Poster !== "N/A"
                    ? `https://image.tmdb.org/t/p/w500${result.poster_path}`
                    : "./NotFound.jpeg"
                }
                alt={`${result.Title} poster`}
              />
            </div>
          ))
        ) : (
          <p className="no-results">No search results.</p>
        )}
      </div>
      <div className="next-prev-buttons">
        <h3
          id="prev"
          onClick={(e) => {
            e.preventDefault();
            prevPage();
          }}
        >
          Prev Page
        </h3>
        <p>{page}</p>
        <h3
          id="next"
          onClick={(e) => {
            e.preventDefault();
            nextPage();
          }}
        >
          Next Page
        </h3>
      </div>
    </div>
  );
}

export default MovieApi;

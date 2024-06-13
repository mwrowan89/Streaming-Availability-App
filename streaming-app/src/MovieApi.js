import React, { useEffect, useState } from 'react'
import { tmdbMovieInfo, tmdbTvInfo } from './TmdbApi';

function MovieApi() {
    const [loading, setLoading] = useState(false);
    const [movieResults, setMovieResults] = useState(null);
    

    useEffect(() => {
        const fetchMovies = async () => {
          setLoading(true);
          try {
            const movies = await tmdbMovieInfo();
            setMovieResults(movies);
            setLoading(false);
          } catch (error) {
            console.error("Error fetching movie data", error);
          }
        };
    
        fetchMovies();
      }, []);
    
  return (
    <div>
        <div className="movie-result-container">
        {loading ? (
              <p>Loading...</p>
            ) : movieResults ? (
              movieResults.map((result, index) => (
                <div key={index} className="result-item">
                  
                  <img
                    src={
                      result.poster_path && result.Poster !== "N/A"
                        ? `https://image.tmdb.org/t/p/w500${result.poster_path}`
                        : "./NotFound.jpeg"
                    }
                    alt={`${result.Title} poster`}
                  />
                </div>
              )
            ))
            :(
              <p className="no-results">No search results.</p>
            )}
        </div>
    </div>
  )
}

export default MovieApi
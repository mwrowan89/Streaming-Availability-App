import React, { useEffect, useState } from 'react'
import axios from 'axios';
import tmdbMovieInfo from './TmdbApi';

function MovieApi() {
    const [loading, setLoading] = useState(false);
    const [movieResults, setMovieResults] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
          setLoading(true);
          try {
            const movies = await tmdbMovieInfo();
            setMovieResults(movies);
          } catch (error) {
            console.error("Error fetching movie data", error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchMovies();
      }, []);
    
    // const tmdbMovieInfo = async () => {
    //     const movieOptions = {
    //       method: "GET",
    //       url: "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_year=2024&sort_by=popularity.desc",
    //       headers: {
    //         accept: "application/json",
    //         Authorization:
    //           "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMTM3Y2NmZTcxMjY3NjYxMzMzNDVhZjZlOWJmY2Y5ZSIsInN1YiI6IjY2NWU0ZDk4N2U3NGNlNTcyMzIzMWM3ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Bws_3Y0C7Tah8B0W1oV4kn9soF-vrTTl803_ccppujI",
    //       },
    //     };
    //     try {
    //       setLoading(true);
    //       const [movieResponse] = await Promise.all([
    //         axios.request(movieOptions)
    //       ]);
    
    //       const movieResults = [
    //         ...movieResponse.data.results
    //       ];
    //       setMovieResults(movieResults);
    //       setLoading(false);
    //       console.log(movieResults);
    //     } catch (error) {
    //       console.error("Error fetching movie data from TMDB API", error);
    //       setLoading(false);
    //     }
    //   };
  return (
    <div>
        <div className="result-container">
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
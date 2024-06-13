import React from "react";
import { useEffect, useState } from "react";
import { tmdbMovieInfo, tmdbTvInfo } from "./TmdbApi";

function TvApi() {
  const [loading, setLoading] = useState(false);
  const [tvResults, setTvResults] = useState(null);

  useEffect(() => {
    const fetchTvShows = async () => {
      setLoading(true);
      try {
        const tvShows = await tmdbTvInfo();
        setTvResults(tvShows);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie data", error);
      }
    };

    fetchTvShows();
  }, []);

  return (
    <div>
      <div className="tv-result-container">
        {loading ? (
          <p>Loading...</p>
        ) : tvResults ? (
          tvResults.map((result, index) => (
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
          ))
        ) : (
          <p className="no-results">No search results.</p>
        )}
      </div>
    </div>
  );
}

export default TvApi;

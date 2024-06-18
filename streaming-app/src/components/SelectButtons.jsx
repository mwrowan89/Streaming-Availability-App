import React from "react";
import { useState, useCallback } from "react";
import MovieApi from "./MovieApi";
import TvApi from "./TvApi";

const SelectButtons = () => {
  const [showMovies, setShowMovies] = useState(false);
  const [showTvShows, setShowTvShows] = useState(false);

  const toggleMovies = useCallback(
    (e) => {
      e.preventDefault();
      if (!showMovies) {
        setShowTvShows(false);
      }
      setShowMovies((prev) => !prev);
    },
    [showMovies]
  );

  const toggleTvShows = useCallback(
    (e) => {
      e.preventDefault();
      if (!showTvShows) {
        setShowMovies(false);
      }
      setShowTvShows((prev) => !prev);
    },
    [showTvShows]
  );

  return (
    <div>
      <div className="movies-tv-tags">
        <h2
          className="movie-button"
          onClick={(e) => {
            toggleMovies(e);
          }}
        >
          Movies{" "}
        </h2>
        &nbsp;
        <h2
          className="tv-button"
          onClick={(e) => {
            toggleTvShows(e);
          }}
        >
          {" "}
          TV Shows
        </h2>
      </div>
      <div>
        {showMovies ? <MovieApi /> : " "}
        {showTvShows ? <TvApi /> : " "}
      </div>
    </div>
  );
};

export default SelectButtons;

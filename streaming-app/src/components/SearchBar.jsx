import React from "react";
import { useState } from "react";
import "./SearchBar.css";
import { tmdbMovieSearchResults } from "../TmdbApi";
import RatingCircle from "./RatingCircle";

const SearchBar = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  // eslint-disable-next-line
  const [page, setPage] = useState(1);

  const results = async (title, page) => {
    setLoading(true);
    const movies = await tmdbMovieSearchResults(title, page);
    setSearchResults(movies);
    console.table(searchResults);
    setLoading(false);
  };

  return (
    <div>
      <form
        className="form-container"
        onSubmit={(e) => {
          results(title, page);
          e.preventDefault();
        }}
      >
        <input
          className="form"
          type="text"
          placeholder=" Enter a Title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />

        <button className="button" type="submit">
          Search
        </button>
      </form>
      <div className="search-result-container">
        {loading ? (
          <p>Loading...</p>
        ) : searchResults ? (
          searchResults
            .filter((result) => result.original_language === "en")
            .map((result, index) => (
              <div key={index} className="search-result-item">
                <h3>{result.Title}</h3>
                <img
                  onClick={() => {
                    console.table(result);
                  }}
                  src={
                    result.poster_path && result.Poster !== "N/A"
                      ? `https://image.tmdb.org/t/p/w500${result.poster_path}`
                      : "./NotFound.jpeg"
                  }
                  alt={`${result.Title} poster`}
                />
                <div className="search-rating-circle">
                  <RatingCircle value={result.vote_average * 10} />
                </div>
              </div>
            ))
        ) : (
          <p className="no-results"></p>
        )}
      </div>
    </div>
  );
};

export default SearchBar;

import React from "react";
import SearchBar from "../components/SearchBar";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import RatingCircle from "../components/RatingCircle";
import { tmdbMovieSearchResults } from "../TmdbApi";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const SearchPage = () => {
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  // eslint-disable-next-line
  const [page, setPage] = useState(1);

  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    if (query) {
      results(query, page);
    }
  }, [query, page]);

  const results = async (title, page) => {
    setLoading(true);
    const movies = await tmdbMovieSearchResults(title, page);
    setSearchResults(movies);
    setLoading(false);
  };

  return (
    <div className="App">
      <Menu />
      <SearchBar />
      <div className="search-result-container">
        {loading ? (
          <p>Loading...</p>
        ) : searchResults ? (
          searchResults
            .filter((result) => result.original_language === "en")
            .map((result, index) => (
              <div key={index} className="search-result-item">
                <img
                  className="search-result-image"
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
      <Footer />
    </div>
  );
};

export default SearchPage;

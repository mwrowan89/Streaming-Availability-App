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
  const [searchResults, setSearchResults] = useState([]);
  let page = 1;

  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    if (query) {
      results(query, page);
    }
  }, [query, page]);

  const results = async (title) => {
    setLoading(true);
    let allResults = [];
    let page = 1;

    while (allResults.length < 50) {
      const movies = await tmdbMovieSearchResults(title, page);
      allResults = [...allResults, ...movies];
      if (movies.length === 0) {
        break;
      }
      page += 1;
    }

    console.table(searchResults);
    setSearchResults(allResults.slice(0, 50));
    setLoading(false);
  };

  return (
    <div className="App">
      <Menu />
      <div className="search-page-bar">
        <SearchBar />
      </div>
      <div className="search-result-container">
        {loading ? (
          <p>Loading...</p>
        ) : searchResults.length > 0 ? (
          searchResults
            .filter(
              (result) =>
                result.original_language === "en" && result.poster_path
            )
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
                {!result.poster_path && <h1>{result.original_title}</h1>}
                <div className="search-rating-circle">
                  <RatingCircle value={result.vote_average * 10} />
                </div>
              </div>
            ))
        ) : (
          <h1 className="no-results">Sorry no results found.</h1>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SearchPage;

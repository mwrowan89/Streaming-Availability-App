import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";
import { tmdbMovieSearchResults } from "../TmdbApi";
import RatingCircle from "./RatingCircle";

const SearchBar = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  // eslint-disable-next-line
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const results = async (title, page) => {
    setLoading(true);
    const movies = await tmdbMovieSearchResults(title, page);
    setSearchResults(movies);
    console.table(searchResults);
    setLoading(false);
  };

  const handleNavigation = (path, query) => {
    navigate(`${path}?query=${query}`);
  };

  return (
    <div>
      <form
        className="form-container"
        onSubmit={(e) => {
          e.preventDefault();
          results(title, page);
          handleNavigation("/search", title);
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
    </div>
  );
};

export default SearchBar;

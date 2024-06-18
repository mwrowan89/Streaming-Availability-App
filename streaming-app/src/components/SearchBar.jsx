import React from "react";
import { useState } from "react";
import axios from "axios";

const SearchBar = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [showMovies, setShowMovies] = useState(false);
  const [showTvShows, setShowTvShows] = useState(false);

  const getTitle = async () => {
    setShowMovies(false);
    setShowTvShows(false);
    try {
      setLoading(true);
      const result = await axios.get("http://www.omdbapi.com/", {
        params: {
          s: title,
          plot: "",
          apikey: "5aa370ab",
        },
      });
      const { data } = result;
      setSearchResults(data.Search || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data from OMDB API", error);
      setLoading(false);
    }
  };

  return (
    <div>
      <form
        className="form-container"
        onSubmit={(e) => {
          getTitle();
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
    </div>
  );
};

export default SearchBar;

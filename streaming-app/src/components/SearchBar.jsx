import React from "react";
import { useState } from "react";
import axios from "axios";
import "./SearchBar.css";

const SearchBar = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [expandedPoster, setExpandedPoster] = useState(null);
  const [titleInfo, setTitleInfo] = useState({});

  const toggleMoreInfo = (movieTitle) => {
    setExpandedPoster((prevPoster) =>
      prevPoster === movieTitle ? null : movieTitle
    );
  };

  const getTitle = async () => {
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
      <div className="search-result-container">
        {loading ? (
          <p>Loading...</p>
        ) : searchResults ? (
          searchResults.map((result, index) => (
            <div
              key={index}
              className="search-result-item"
              onMouseEnter={() => toggleMoreInfo(result.Title)}
              onMouseLeave={() => toggleMoreInfo(result.Title)}
            >
              <h3>{result.Title}</h3>
              <img
                src={
                  result.Poster && result.Poster !== "N/A"
                    ? result.Poster
                    : "./NotFound.jpeg"
                }
                alt={`${result.Title} poster`}
              />
              {expandedPoster === result.Title && titleInfo[result.Title] && (
                <div>
                  <p>Actors: {titleInfo[result.Title].Actors}</p>
                  <p>Genre: {titleInfo[result.Title].Genre}</p>
                  {titleInfo[result.Title].Rated &&
                    titleInfo[result.Title].Rated !== "N/A" && (
                      <p>Rated: {titleInfo[result.Title].Rated}</p>
                    )}
                </div>
              )}
              <p>Year: {result.Year}</p>
              <p>Type: {result.Type}</p>
            </div>
          ))
        ) : (
          <p className="no-results"> </p>
        )}
      </div>
    </div>
  );
};

export default SearchBar;

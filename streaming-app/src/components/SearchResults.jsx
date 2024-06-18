import React from "react";
import { useState } from "react";

export const SearchResults = () => {
  const [title, setTitle] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [titleInfo, setTitleInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [expandedPoster, setExpandedPoster] = useState(null);

  const toggleMoreInfo = (movieTitle) => {
    setExpandedPoster((prevPoster) =>
      prevPoster === movieTitle ? null : movieTitle
    );
  };

  return (
    <div>
      <div className="search-results">
        <h1>{title ? "Search Results for " + title : " "}</h1>

        <div className="result-container">
          {loading ? (
            <p>Loading...</p>
          ) : searchResults ? (
            searchResults.map((result, index) => (
              <div
                key={index}
                className="result-item"
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
    </div>
  );
};

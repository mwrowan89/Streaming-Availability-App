import { useState } from "react";
import "./App.css";
import axios from "axios";

export default function App() {
  const [title, setTitle] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [titleDetails, setTitleDetails] = useState(null);
  const [streamingInfo, setStreamingInfo] = useState(null);

  const getTitle = async () => {
    try {
      const result = await axios.get("http://www.omdbapi.com/", {
        params: {
          s: title,
          apikey: "5aa370ab",
        },
      });
      const { data } = result;
      setSearchResults(data.Search);
    } catch (error) {}
  };

  return (
    <div>
      <main className="App">
        <h1 className="Title">
          <span className="text-red">Streaming</span> Availabilty
        </h1>
        <h5>
          Find where to stream your favorite TV Shows and Movies from 150+
          Streaming platforms
        </h5>

        <form
          className="form-container"
          onSubmit={(e) => {
            getTitle();
            console.log(searchResults);
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <input
            className="form"
            type="text"
            placeholder=" Enter a Title"
            onChange={(e) => {
              setTitle(e.target.value);
              setSearchResults(null);
              setTitleDetails(null);
            }}
          />
          <button className="button" type="submit">
            Search
          </button>
        </form>
        <div className="search-results">
          <h1>Search Results for {title}</h1>
          <div className="result-container">
            {searchResults ? (
              searchResults.map((result, index) => (
                <div key={index} className="result-item">
                  <h3>{result.Title}</h3>
                  <img src={result.Poster} alt={`${result.Title} poster`} />
                  <p>Year: {result.Year}</p>
                  <p>Type: {result.Type}</p>
                </div>
              ))
            ) : (
              <p>No results found.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

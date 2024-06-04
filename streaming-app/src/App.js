import { useState } from "react";
import "./App.css";
import axios from "axios";

export default function App() {
  const [title, setTitle] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [titleInfo, setTitleInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState(false);

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
      console.log(result);
      const { data } = result;
      setSearchResults(data.Search || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data from OMDB API", error);
      setLoading(false);
    }
  };

  const getInfo = async (movieTitle) => {
    try {
      setLoading(true);
      const result = await axios.get("http://www.omdbapi.com/", {
        params: {
          t: movieTitle,
          plot: "",
          apikey: "5aa370ab",
        },
      });
      console.log(result)
      const { data } = result;
      setTitleInfo(data);
      setLoading(false);
      setPopup(true);
    } catch (error) {
      console.error("Error fetching data from OMDB API", error);
      setLoading(false);
    }
  };

  return (
    <div>
      <main className="App">
        <h1 className="Title">
          <span className="text-red">Stream</span> it
        </h1>
        <h5>
          Find where to stream your favorite TV Shows and Movies from 150+
          Streaming platforms
        </h5>

        <form
          className="form-container"
          onSubmit={(e) => {
            getTitle();
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
              getInfo();
              setSearchResults(null);
            }}
          />
          <button className="button" type="submit">
            Search
          </button>
        </form>
        <div className="search-results">
          <h1>Search Results for {title}</h1>
          <div className="result-container">
            {loading ? (
              <p>Loading...</p>
            ) : searchResults ? (
              searchResults.map((result, index) => (
                <div key={index} className="result-item">
                  <h3>{result.Title}</h3>
                  <div className="popup" onClick={(e) => {e.stopPropagation();getInfo(result.Title);}}>
                    <img
                      src={
                        result.Poster && result.Poster !== "N/A"
                          ? result.Poster
                          : "./NotFound.jpeg"
                      }
                      alt={`${result.Title} poster`}
                    />
                    {/* {popup && (
                      <span className="popuptext" id="myPopup">
                        Rating: {titleInfo.Actors}
                      </span>
                    )} */}
                  </div>
                  <p>Year: {result.Year}</p>
                  <p>Type: {result.Type}</p>
                  <p>Actors: {titleInfo.Actors}</p>
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

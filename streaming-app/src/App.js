import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

export default function App() {
  const [title, setTitle] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [titleInfo, setTitleInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  useEffect(() => {
    if (searchResults) {
      searchResults.forEach((result) => {
        getInfo(result.Title);
      });
    }
  }, [searchResults]);

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
      console.log(result);
      const { data } = result;
      setTitleInfo((prevInfo) => ({
        ...prevInfo,
        [movieTitle]: data,
      }));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data from OMDB API", error);
      setLoading(false);
    }
  };

  
  const toggleMoreInfo = () => {
    setShowMoreInfo((prevShowMoreInfo) => !prevShowMoreInfo);
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
          }}
        >
          <input
            className="form"
            type="text"
            placeholder=" Enter a Title"
            onChange={(e) => {
              setTitle(e.target.value);
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
                <div
                  key={index}
                  className="result-item"
                  
                >
                  <h3>{result.Title}</h3>
                  <img
                    src={
                      result.Poster && result.Poster !== "N/A"
                        ? result.Poster
                        : "./NotFound.jpeg"
                    }
                    alt={`${result.Title} poster`}
                    onClick={toggleMoreInfo}
                  />
                  <p>Year: {result.Year}</p>
                  <p>Type: {result.Type}</p>
                  {titleInfo[result.Title] && (
                    <>
                      <p>Actors: {titleInfo[result.Title].Actors}</p>
                      <p>IMDB Rating: {titleInfo[result.Title].imdbRating}</p>
                      {/* Display other info as needed */}
                    </>
                  )}

                  {showMoreInfo && titleInfo[result.Title] && (
                    <div>
                      <p>Awards: {titleInfo[result.Title].Awards}</p>
                    </div>
                  )}
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

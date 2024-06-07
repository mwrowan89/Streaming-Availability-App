import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Banner from "./Banner";

export default function App() {
  const [title, setTitle] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [titleInfo, setTitleInfo] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchResults) {
      searchResults.forEach((result) => {
        getInfo(result.Title);
      });
    }
  }, [searchResults]);

  useEffect(() => {
    if(!titleInfo) {
      getInfo()
      console.log(titleInfo)
    }
  })

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
          apikey: "5aa370ab",
        },
      });
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

  const [expandedPoster, setExpandedPoster] = useState(null);

  const toggleMoreInfo = (movieTitle) => {
    setExpandedPoster((prevPoster) => (prevPoster === movieTitle ? null : movieTitle));
  };

  return (
    <div className="main">

      <main className="App">
        <h1 className="Title">
          <span className="text-red">Stream</span> it
        </h1>
        <h5>
          Find where to stream your favorite TV Shows and Movies from 150+
          Streaming platforms
        </h5>
        <Banner/> <br></br>
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
                <div key={index} className="result-item">
                  <h3>{result.Title}</h3>
                  <img
                    src={
                      result.Poster && result.Poster !== "N/A"
                        ? result.Poster
                        : "./NotFound.jpeg"
                    }
                    alt={`${result.Title} poster`}
                    onMouseEnter={() => toggleMoreInfo(result.Title)}

                  />
                  {expandedPoster === result.Title && titleInfo[result.Title] && (
                    <div>
                      <p>Actors: {titleInfo[result.Title].Actors}</p>
                      <p>Genre: {titleInfo[result.Title].Genre}</p>
                      <p>Rated: {titleInfo[result.Title].Rated && titleInfo[result.Title].Rated !== "N/A"
                      ? titleInfo[result.Title].Rated : ""}</p>
                      {/* Display other info as needed */}
                    </div>
                  )}
                  <p>Year: {result.Year}</p>
                  {/* <p>IMBD Rating: {titleInfo[result.Title].imdbRating}</p> */}
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

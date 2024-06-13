import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Banner from "./Banner";
import MovieApi from "./MovieApi";
import TvApi from "./TvApi";

export default function App() {
  const [title, setTitle] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [movieResults, setMovieResults] = useState(null);
  const [titleInfo, setTitleInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [showMovies, setShowMovies] = useState(false);
  const [showTvShows, setShowTvShows] = useState(false);

  useEffect(() => {
    if (searchResults) {
      searchResults.forEach((result) => {
        getInfo(result.Title);
      });
    }
  }, [searchResults]);

  useEffect(() => {
    if (!titleInfo) {
      getInfo();
      console.log(titleInfo);
    }
  });

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
    setExpandedPoster((prevPoster) =>
      prevPoster === movieTitle ? null : movieTitle
    );
  };

  const toggleMovies = () => {
    setShowTvShows(false);
    setShowMovies(!showMovies);
  };
  const toggleTvShows = () => {
    setShowMovies(false);
    setShowTvShows(!showTvShows);
  };

  return (
    <div className="main">
      <main className="App">
        <h1 className="Title">
          <span className="text-red">Discover</span> Titles
        </h1>
        <h5 className="page-description">
          Find where to stream your favorite TV Shows and Movies from 150+
          Streaming platforms
        </h5>
        <Banner /> <br></br>
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
        <div className="movies-tv-tags">
          <h2 className="movie-button" onClick={toggleMovies}>
            Movies{" "}
          </h2>
          &nbsp;
          <h2 className="tv-button" onClick={toggleTvShows}>
            {" "}
            TV Shows
          </h2>
        </div>
        <div>
          {showMovies ? <MovieApi /> : " "}
          {showTvShows ? <TvApi /> : " "}
        </div>
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
                  {expandedPoster === result.Title &&
                    titleInfo[result.Title] && (
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
              <p className="no-results">No search results.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

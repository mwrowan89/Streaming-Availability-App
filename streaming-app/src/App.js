import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Banner from "./components/Banner";
import MovieApi from "./components/MovieApi";
import TvApi from "./components/TvApi";
import Menu from "./components/Menu";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";

export default function App() {
  const [title, setTitle] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
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
    }
  });

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
      <div className="menu-icon">
        <Menu />
      </div>
      <main className="App">
        <Header />
        <Banner /> <br></br>
        <SearchBar />
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
      </main>
    </div>
  );
}

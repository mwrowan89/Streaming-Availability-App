import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Banner from "./components/Banner";
import MovieApi from "./components/MovieApi";
import TvApi from "./components/TvApi";
import Menu from "./components/Menu";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import SelectButtons from "./components/SelectButtons";

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

  return (
    <div className="main">
      <div className="menu-icon">
        <Menu />
      </div>
      <main className="App">
        <Header />
        <Banner /> <br></br>
        <SearchBar />
        <SelectButtons />
      </main>
    </div>
  );
}

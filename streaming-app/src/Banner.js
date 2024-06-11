import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Banner.css";

function Banner() {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState(null);
  const [moreInfo, setMoreInfo] = useState(null);
  const [tvShows, setTvShows] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState(null);

  const tmdbMovieInfo = async () => {
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_year=2024&sort_by=popularity.desc",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMTM3Y2NmZTcxMjY3NjYxMzMzNDVhZjZlOWJmY2Y5ZSIsInN1YiI6IjY2NWU0ZDk4N2U3NGNlNTcyMzIzMWM3ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Bws_3Y0C7Tah8B0W1oV4kn9soF-vrTTl803_ccppujI",
      },
    };

    try {
      setLoading(true);
      const response = await axios.request(options);
      setMovies(response.data.results); // Assuming response.data.results contains the list of movies
      setLoading(false);
      console.log(response);
    } catch (error) {
      console.error("Error fetching data from TMDB API", error);
      setLoading(false);
    }
  };

  const tmbdTvInfo = async () => {
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMTM3Y2NmZTcxMjY3NjYxMzMzNDVhZjZlOWJmY2Y5ZSIsInN1YiI6IjY2NWU0ZDk4N2U3NGNlNTcyMzIzMWM3ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Bws_3Y0C7Tah8B0W1oV4kn9soF-vrTTl803_ccppujI",
      },
    };
    try {
      setLoading(true);
      const response = await axios.request(options);
      setTvShows(response.data.results); // Assuming response.data.results contains the list of movies
      setLoading(false);
      console.log(response);
    } catch (error) {
      console.error("Error fetching data from TMDB API", error);
      setLoading(false);
    }
  };

  const getMoreInfo = async (e, title) => {
    e.preventDefault();
    try {
      setLoading(true);
      const result = await axios.get("http://www.omdbapi.com/", {
        params: {
          t: title,
          apikey: "5aa370ab",
        },
      });
      const { data } = result;
      setMoreInfo((prevInfo) => ({
        ...prevInfo,
        [title]: data,
      }));
      setSelectedTitle(title);
      setLoading(false);
      console.log(data)
    } catch (error) {
      console.error("Error fetching data from OMDB API", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    tmdbMovieInfo();
    tmbdTvInfo();
  }, []);

  return (
    <div className="banner-results-conatiner">
      <h1>Popular Titles from 2024</h1>
      <div className="banner-results">
        {loading ? (
          <p>Loading...</p>
        ) : movies ? (
          [...movies, ...tvShows].map((result, index) => (
            <div key={index} className="banner-result-item">
              <img
                src={
                  result.poster_path
                    ? `https://image.tmdb.org/t/p/w500${result.poster_path}`
                    : "./NotFound.jpeg"
                }
                alt={`${result.title} poster`}
                onClick={(e) => {
                  e.preventDefault();
                  getMoreInfo(e, result.title)}}
              />
              {selectedTitle === (result.title) && (
                <p className="more-info">{moreInfo[result.title].Plot}
                <p onClick={ (e) => {
                  e.preventDefault();
                  setSelectedTitle(null)} }>X</p>
                </p>
              )}
            </div>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
}

export default Banner;

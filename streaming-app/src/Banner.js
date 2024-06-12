import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Banner.css";

function Banner() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState(null);

  useEffect(() => {
    tmdbInfo();
  }, []);

  const tmdbInfo = async () => {
    const movieOptions = {
      method: "GET",
      url: "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_year=2024&sort_by=popularity.desc",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMTM3Y2NmZTcxMjY3NjYxMzMzNDVhZjZlOWJmY2Y5ZSIsInN1YiI6IjY2NWU0ZDk4N2U3NGNlNTcyMzIzMWM3ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Bws_3Y0C7Tah8B0W1oV4kn9soF-vrTTl803_ccppujI",
      },
    };

    const tvOptions = {
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
      const [movieResponse, tvResponse] = await Promise.all([
        axios.request(movieOptions),
        axios.request(tvOptions),
      ]);

      const combinedResults = [
        ...movieResponse.data.results,
        ...tvResponse.data.results,
      ];
      setResults(combinedResults);
      setLoading(false);
      console.log(combinedResults);
    } catch (error) {
      console.error("Error fetching data from TMDB API", error);
      setLoading(false);
    }
  };

  const getMoreInfo = (title) => {
    setSelectedTitle(title === selectedTitle ? null : title);
  };

  return (
    <div className="banner-results-conatiner">
      <h1>Popular Titles from 2024</h1>
      <div className="banner-results">
        {loading ? (
          <p>Loading...</p>
        ) : results.length > 0 ? (
          results.map((result, index) => {
            const title = result.title || result.name;
            const description = result.overview;

            return (
            <div key={index} className="banner-result-item">
              <img
                src={
                  result.poster_path
                    ? `https://image.tmdb.org/t/p/w500${result.poster_path}`
                    : "./NotFound.jpeg"
                }
                alt={`${title} poster`}
                onClick={(e) => {
                  e.preventDefault();
                  getMoreInfo(title)}}
              />
              {selectedTitle === title && (
                <div className="more-info">
                <h3>{title}</h3>
                <p>{description}</p> 
                {/* <p className="close-button"
                onClick={ (e) => {
                  e.preventDefault();
                  setSelectedTitle(null)} }>X</p> */}
                </div>
              )}
            </div>
          )})
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
}

export default Banner;

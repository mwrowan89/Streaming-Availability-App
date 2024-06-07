import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Banner.css";

function Banner() {
  const [titleInfo, setTitleInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const releaseYear = 2024;
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    getInfo();
  }, [releaseYear]);

  const tmdbInfo = async () => {
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
    } catch (error) {
      console.error("Error fetching data from TMDB API", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    tmdbInfo();
  }, []);

  const getInfo = async () => {
    try {
      setLoading(true);
      const result = await axios.get("http://www.omdbapi.com/", {
        params: {
          y: 2024,
          apikey: "5aa370ab",
        },
      });
      const { data } = result;
      console.log(data);
      setTitleInfo((prevInfo) => ({
        ...prevInfo,
        [releaseYear]: data.Search || [],
      }));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data from OMDB API", error);
      setLoading(false);
    }
  };

  return (
    <div className="results-conatiner">
    <h1>Popular Titles from 2024</h1>
      <div className="results">
        {loading ? (
          <p>Loading...</p>
        ) : movies ? (
          [...movies, ...movies].map((movie, index) => (
            <div key={index} className="result-item">
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "./NotFound.jpeg"
                }
                alt={`${movie.title} poster`}
              />
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

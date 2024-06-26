import React from "react";
import { useEffect, useState } from "react";
import { tmdbPopTvInfo } from "../TmdbApi";
import "./Api.css";

function TvApi() {
  const [loading, setLoading] = useState(false);
  const [tvResults, setTvResults] = useState(null);
  const [page, setPage] = useState(1);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    const fetchTvShows = async () => {
      setLoading(true);
      try {
        const tvShows = await tmdbPopTvInfo(page);
        setTvResults(tvShows);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie data", error);
      }
    };

    fetchTvShows();
  }, [page]);

  const filterResults = async () => {
    setLoading(true);
    try {
      // if (selectedOption === "trending") {
      //   const movies = await tmdbTrendingMovies();
      //   setTvResults(movies);
      // } else if (selectedOption === "top-rated") {
      //   const movies = await tmdbTopRatedMovies(page);
      //   setTvResults(movies);
      // } else if (selectedOption === "popular") {
      //   const movies = await tmdbPopularMovies(page);
      //   setTvResults(movies);
      // } else if (selectedOption === "upcoming") {
      //   const movies = await tmdbUpcomingMovies(page);
      //   setTvResults(movies);
      // } else {
      //   const movies = await tmdbPopMovieInfo(page);
      //   setTvResults(movies);
      // }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching movie data", error);
      setLoading(false);
    }
  };

  const nextPage = () => {
    setPage((page) => page + 1);
  };
  const prevPage = () => {
    if (page > 1) {
      setPage((page) => page - 1);
    }
  };

  return (
    <div>
      <div className="tv-result-container">
        {loading ? (
          <p>Loading...</p>
        ) : tvResults ? (
          tvResults.map((result, index) => (
            <div key={index} className="tv-result-item">
              <img
                onClick={() => {
                  console.table(result);
                }}
                src={
                  result.poster_path && result.Poster !== "N/A"
                    ? `https://image.tmdb.org/t/p/w500${result.poster_path}`
                    : "./NotFound.jpeg"
                }
                alt={`${result.Title} poster`}
              />
            </div>
          ))
        ) : (
          <p className="no-results">No search results.</p>
        )}
      </div>
      <div className="next-prev-buttons">
        <h3
          id="prev"
          onClick={(e) => {
            e.preventDefault();
            prevPage();
          }}
        >
          Prev Page
        </h3>
        <p>{page}</p>
        <h3
          id="next"
          onClick={(e) => {
            e.preventDefault();
            nextPage();
          }}
        >
          Next Page
        </h3>
      </div>
    </div>
  );
}

export default TvApi;

import React, { useEffect, useState } from "react";
import {
  tmdbPopMovieInfo,
  tmdbTrendingMovies,
  tmdbTopRatedMovies,
  tmdbUpcomingMovies,
} from "../TmdbApi";
import PopUpWindow from "./PopUpWindow";
import RatingCircle from "./RatingCircle";
import Loading from "./Loading";
import "./Api.css";

function MovieApi() {
  const [loading, setLoading] = useState(false);
  const [movieResults, setMovieResults] = useState(null);
  const [page, setPage] = useState(1);
  const [selectedOption, setSelectedOption] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
    setPage(1);
  };

  const openModal = (result) => {
    setSelectedResult(result);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedResult(null);
  };

  const filterResults = async () => {
    setLoading(true);
    try {
      if (selectedOption === "trending") {
        const movies = await tmdbTrendingMovies();
        setMovieResults(movies);
      } else if (selectedOption === "top-rated") {
        const movies = await tmdbTopRatedMovies(page);
        setMovieResults(movies);
      } else if (selectedOption === "upcoming") {
        let upcomingMovies = [];
        let currentPage = page;
        const today = new Date();
        const todayDateString = today.toISOString().split("T")[0];

        while (upcomingMovies.length < 30) {
          const movies = await tmdbUpcomingMovies(currentPage);

          const filteredMovies = movies.filter(
            (movie) => movie.release_date > todayDateString
          );

          upcomingMovies = [...upcomingMovies, ...filteredMovies];

          currentPage += 1;

          if (movies.length === 0) {
            break;
          }
        }
        setMovieResults(upcomingMovies.slice(0, 30));
      } else {
        const movies = await tmdbPopMovieInfo(page);
        setMovieResults(movies);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching movie data", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    filterResults();
    // eslint-disable-next-line
  }, [selectedOption, page]);

  const nextPage = () => {
    setPage((page) => page + 1);
  };
  const prevPage = () => {
    if (page > 1) {
      setPage((page) => page - 1);
    }
  };

  return (
    <div className="page-container">
      <h2 className="filter-header">
        <label>Search Movies By: &nbsp;</label>
        <select
          id="filter-options"
          value={selectedOption}
          onChange={handleChange}
        >
          <option value="">Select...</option>
          <option value="trending">Trending</option>
          <option value="top-rated">Top Rated</option>
          <option value="upcoming">Upcoming</option>
        </select>
      </h2>
      <div className="movie-result-container">
        {loading ? (
          <p>
            <Loading />
          </p>
        ) : movieResults ? (
          movieResults
            .filter((result) => result.original_language === "en")
            .map((result, index) => (
              <div key={index} className="movie-result-item">
                <img
                  onClick={(e) => {
                    openModal(result);
                    console.table(result);
                  }}
                  src={
                    result.poster_path && result.Poster !== "N/A"
                      ? `https://image.tmdb.org/t/p/w500${result.poster_path}`
                      : "./NotFound.jpeg"
                  }
                  alt={`${result.Title} poster`}
                />
                <RatingCircle value={result.vote_average * 10} />
              </div>
            ))
        ) : (
          <p className="no-results">No search results.</p>
        )}
      </div>
      {selectedOption !== "trending" && (
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
      )}
      <PopUpWindow
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        result={selectedResult}
      />
    </div>
  );
}

export default MovieApi;

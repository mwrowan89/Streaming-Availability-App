import React from "react";
import { useEffect, useState } from "react";
import {
  tmdbPopTvInfo,
  tmdbTrendingTv,
  tmdbTopRatedTv,
  tmdbAiringToday,
} from "../TmdbApi";
import RatingCircle from "./RatingCircle";
import PopUpWindow from "./PopUpWindow";
import Loading from "./Loading";
import "./Api.css";

function TvApi() {
  const [loading, setLoading] = useState(false);
  const [tvResults, setTvResults] = useState(null);
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
        const tvShows = await tmdbTrendingTv();
        setTvResults(tvShows);
      } else if (selectedOption === "top-rated") {
        const tvShows = await tmdbTopRatedTv(page);
        setTvResults(tvShows);
      } else if (selectedOption === "airing-today") {
        const tvShows = await tmdbAiringToday(page);
        setTvResults(tvShows);
      } else {
        const tvShows = await tmdbPopTvInfo(page);
        setTvResults(tvShows);
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
        <label>Search TV Shows By: &nbsp;</label>
        <select
          id="filter-options"
          value={selectedOption}
          onChange={handleChange}
        >
          <option value="">Select...</option>
          <option value="trending">Trending</option>
          <option value="top-rated">Top Rated</option>
          <option value="airing-today">New Episodes Today</option>
        </select>
      </h2>
      <div className="tv-result-container">
        {loading ? (
          <p>
            <Loading />
          </p>
        ) : tvResults ? (
          tvResults.map((result, index) => (
            <div key={index} className="tv-result-item">
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
      <PopUpWindow
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        result={selectedResult}
      />
    </div>
  );
}

export default TvApi;

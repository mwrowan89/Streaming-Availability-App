import React from "react";
import { useEffect, useState } from "react";
import { tmdbPeopleInfo } from "../TmdbApi";
import "./TvApi.css";

function PeopleApi() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchTvShows = async () => {
      setLoading(true);
      try {
        const people = await tmdbPeopleInfo();
        setResults(people);
        setLoading(false);
        console.log(results);
      } catch (error) {
        console.error("Error fetching movie data", error);
      }
    };

    fetchTvShows();
  }, [page]);

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
        ) : results ? (
          results.map((result, index) => (
            <div key={index} className="people-result-item">
              {result.name}
              {result.profile_path}
              {/* <img
                onClick={() => {
                  console.table(result);
                }}
                src={
                  result.poster_path && result.Poster !== "N/A"
                    ? `https://image.tmdb.org/t/p/w500${result.poster_path}`
                    : "./NotFound.jpeg"
                }
                alt={`${result.Title} poster`}
              /> */}
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

export default PeopleApi;
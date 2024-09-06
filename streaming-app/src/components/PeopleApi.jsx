import React from "react";
import { useEffect, useState } from "react";
import { tmdbPeopleInfo } from "../TmdbApi";
import "./Api.css";

function PeopleApi() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  useEffect(() => {
    const fetchTvShows = async () => {
      setLoading(true);
      try {
        const people = await tmdbPeopleInfo();
        setResults(people);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie data", error);
      }
    };

    fetchTvShows();
  }, []);

  return (
    <div>
      <h1>Popular People This Week</h1>
      <div className="people-result-container">
        {loading ? (
          <p>Loading...</p>
        ) : results ? (
          results.map((result, index) => (
            <div key={index} className="people-result-item">
              <img
                onClick={() => {
                  console.table(result);
                }}
                src={
                  result.profile_path && result.profile_path !== "N/A"
                    ? `https://image.tmdb.org/t/p/w185${result.profile_path}`
                    : "./NotFound.jpeg"
                }
                alt={`${result.name} poster`}
              />
              <br />
              {result.name} <br />
              Known for: &nbsp;
              {result.known_for_department}
            </div>
          ))
        ) : (
          <p className="no-results">No search results.</p>
        )}
      </div>
      {/* <div className="next-prev-buttons">
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
      </div> */}
    </div>
  );
}

export default PeopleApi;

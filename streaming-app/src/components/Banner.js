import React, { useEffect, useState } from "react";
import { tmdbMovieInfo, tmdbTvInfo } from "../TmdbApi";
import "./Banner.css";

function Banner() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [movieData, tvData] = await Promise.all([
          tmdbMovieInfo(),
          tmdbTvInfo(),
        ]);
        setResults([...movieData, ...tvData]);
      } catch (error) {
        console.error("Error fetching data from TMDB API", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

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
                <div className="card">
                  <div className="card-front">
                    <img
                      src={
                        result.poster_path
                          ? `https://image.tmdb.org/t/p/w500${result.poster_path}`
                          : "./NotFound.jpeg"
                      }
                      alt={`${title} poster`}
                      onClick={(e) => {
                        e.preventDefault();
                        getMoreInfo(title);
                      }}
                    />
                  </div>
                  <div className="card-back">
                    <div className="more-info">
                      <h3>{title}</h3>
                      <p>{description}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
}

export default Banner;

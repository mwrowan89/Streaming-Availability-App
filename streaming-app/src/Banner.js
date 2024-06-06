import React, { useEffect, useState } from "react";
import axios from "axios";

function Banner() {
  const [titleInfo, setTitleInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const releaseYear = 2024;

  useEffect(() => {
    getInfo();
  }, [releaseYear]);

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
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : titleInfo ? (
        titleInfo[releaseYear].map((result, index) => (
          <div key={index} className="result-item">
            <h3>{result.Title}</h3>
            <img
              src={
                result.Poster && result.Poster !== "N/A"
                  ? result.Poster
                  : "./NotFound.jpeg"
              }
              alt={`${result.Title} poster`}
            />
            {titleInfo && (
              <div>
                {/* <p>Actors: {titleInfo[result.Title].Actors}</p>
                <p>Genre: {titleInfo[result.Title].Genre}</p>
                <p>Rated: {titleInfo[result.Title].Rated}</p>
                Display other info as needed */}
              </div>
            )}
            <p>Year: {result.Year}</p>
            {/* <p>IMBD Rating: {titleInfo[result.Title].imdbRating}</p> */}
            <p>Type: {result.Type}</p>
          </div>
        ))
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}

export default Banner;

import React, { useState } from "react";
import axios from "axios";


function Banner() {
    const [titleInfo, setTitleInfo] = useState(null);
    const [loading, setLoading] = useState(false);


    const getInfo = async (movieTitle) => {
        try {
          setLoading(true);
          const result = await axios.get("http://www.omdbapi.com/", {
            params: {
              t: movieTitle,
              apikey: "5aa370ab",
            },
          });
          const { data } = result;
          setTitleInfo((prevInfo) => ({
            ...prevInfo,
            [movieTitle]: data,
          }));
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data from OMDB API", error);
          setLoading(false);
        }
      };

  return (
    <div>
      <h1>Banner</h1>
    </div>
  );
}

export default Banner;

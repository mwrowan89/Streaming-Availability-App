import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


export default function PopupBox() {
    const [title, setTitle] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [titleInfo, setTitleInfo] = useState(null);
  const [loading, setLoading] = useState(false);



    const getTitle = async () => {
        try {
          setLoading(true);
          const result = await axios.get("http://www.omdbapi.com/", {
            params: {
              s: title,
              plot: "",
              apikey: "5aa370ab",
            },
            
          });
          console.log(result)
          const { data } = result;
          setSearchResults(data.Search || []);
          setLoading(false);
          console.log(data.status)
        } catch (error) {
          console.error("Error fetching data from OMDB API", error);
          setLoading(false);
        }
      };

    return (
        <div>
            {loading ? (
              <p>Loading...</p>
            ) : searchResults ?  (
              searchResults.map((result, index) => (
                <div key={index} className="result-item">
                <Popup trigger=
                {<img src={result.Poster && result.Poster !== "N/A" ? result.Poster : "./NotFound.jpeg"} alt={`${result.Title} poster`} />}
                position="right center">
                <div>GeeksforGeeks</div>
                <button>Click here</button>
            </Popup>
                </div>
            ))
            ) : (
              <p>No results found.</p>
            )}
        </div>
    )}
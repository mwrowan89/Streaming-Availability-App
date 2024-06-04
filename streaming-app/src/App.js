import { useState } from "react";
import Popup from './Popup';
import "./App.css";
import axios from "axios";
import PopupBox from "./Popup";

export default function App() {
  const [title, setTitle] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [titleInfo, setTitleInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  state = {
    show: false
  };

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

  const getInfo = async () => {
    
    try {
      setLoading(true);
      const result = await axios.get("http://www.omdbapi.com/", {
        params: {
          t: title,
          plot: "",
          apikey: "5aa370ab",
        },
      });
      const { data } = result;
      setTitleInfo(data.data);
      setLoading(false);
    }
    catch (error) {
      console.error("Error fetching data from OMDB API", error);
      setLoading(false);
    }
    const popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
  
  }

  function PopupBox() {
    this.setState({
      show: !this.state.show
    });
  }


  return (
    <div>
      <main className="App">
        <h1 className="Title">
          <span className="text-red">Stream</span> it
        </h1>
        <h5>
          Find where to stream your favorite TV Shows and Movies from 150+
          Streaming platforms
        </h5>

        <form
          className="form-container"
          onSubmit={(e) => {
            getTitle();
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <input
            className="form"
            type="text"
            placeholder=" Enter a Title"
            onChange={(e) => {
              setTitle(e.target.value);
              setSearchResults(null);
            }}
          />
          <button className="button" type="submit">
            Search
          </button>
        </form>
        <div className="search-results">
          <h1>Search Results for {title}</h1>
          <div className="result-container">
            {loading ? (
              <p>Loading...</p>
            ) : searchResults ?  (
              searchResults.map((result, index) => (
                <div key={index} className="result-item">
                  <h3>{result.Title}</h3>
                  <div className="popup"
                  onClick={PopupBox()}>
                  <img src={result.Poster && result.Poster !== "N/A" ? result.Poster : "./NotFound.jpeg"} alt={`${result.Title} poster`} />
                  <span className="popuptext" id="myPopup">Popup window</span>
                  
                  </div>
                  <p>Year: {result.Year}</p>
                  <p>Type: {result.Type}</p>
                  <p>Rating: {result.Genre}</p>
                  
                  
                  {/* {result.streamingInfo ? (
                    <div>
                      <h4>Streaming Info:</h4>
                      <ul>
                        {result.streamingInfo.map((info, index) => (
                          <li key={index}>
                            {info.title}: <a href={info.web_url} target="_blank" rel="noopener noreferrer">Watch here</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p>No streaming information available.</p>
                  )} */}
                </div>
              ))
            ) : (
              <p>No results found.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}


  //Streaming site api 81cb274c01msh4e27d6b4b0866cdp1a1d93jsn2aa43b86352d

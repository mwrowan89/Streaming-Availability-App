import { useState } from "react";
import "./App.css";
import axios from "axios";

export default function App() {
  const [title, setTitle] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);


  const getTitle = async () => {
    try {
      setLoading(true);
      const result = await axios.get("http://www.omdbapi.com/", {
        params: {
          s: title,
          apikey: "5aa370ab",
        },
      });
      const { data } = result;
      setSearchResults(data.Search || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data from OMDB API", error);
      setLoading(false);
    }
  };

  // const getStreamingInfo = async (title) => {
  //   try {
  //     const response = await axios.get(`https://api.watchmode.com/v1/title/matches/`, {
  //       params: {
  //         apiKey: "djrcOnHN4LJlkEwynPn2ihmdQrOp6Xmzp0pw8p6i",
  //         title: title,
  //       },
  //     });
  //     const titleId = response.data.title_results[0]?.id;
  //     if (titleId) {
  //       const sourcesResponse = await axios.get(`https://api.watchmode.com/v1/title/${titleId}/sources/`, {
  //         params: {
  //           apiKey: "djrcOnHN4LJlkEwynPn2ihmdQrOp6Xmzp0pw8p6i",
  //         },
  //       });
  //       return sourcesResponse.data;
  //     } else {
  //       return null;
  //     }
  //   } catch (error) {
  //     console.error("Error fetching streaming info", error);
  //     return null;
  //   }
  // };


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
            // getStreamingInfo();
            console.log(searchResults);
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
                  <img src={result.Poster && result.Poster !== "N/A" ? result.Poster : "./NotFound.jpeg"} alt={`${result.Title} poster`} />
                  <p>Year: {result.Year}</p>
                  <p>Type: {result.Type}</p>
                  {result.streamingInfo ? (
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
                  )}
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

import {useState} from 'react'
import './App.css';
import axios from 'axios'

export default function App() {
  const [title, setTitle] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [titleDetails, setTitleDetails] = useState(null);
  const [streamingInfo, setStreamingInfo] = useState(null);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="Title">
          <span className="text-red">Streaming</span> Availabilty
        </h1>
        <h5>Find where to stream your favorite TV Shows and Movies from 150+ Streaming platforms</h5>
        
        <form className="form-container"
        onSubmit={e => {
          e.preventDefault();
          e.stopPropagation();
        }}>

        <input className="form"
        type="text"
        placeholder=" Enter a Title"
        onChange={e => {
          setTitle(e.target.value);
          setSearchResults(null);
          setTitleDetails(null);
        }}
        />
        <button className="button"
        type="submit">
          Search
        </button>
        
      </form>
      </header>
      
    </div>
  );
};

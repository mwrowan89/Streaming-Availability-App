import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="Title">
          <span className="text-red">Streaming</span> Availabilty
        </h1>
        <h5>Find where to stream your favorite TV Shows and Movies from 150+ Streaming platforms</h5>
        
        <form className="form">
        <input
        type="text"
        placeholder="Enter a Title"
        />
        <button className="button"
        type="submit">
          Search
        </button>
        
      </form>
      </header>
      
    </div>
  );
}

export default App;

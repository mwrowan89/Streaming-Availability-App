import {useState} from 'react'
import './App.css';
import axios from 'axios'

export default function App() {
  const [title, setTitle] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [titleDetails, setTitleDetails] = useState(null);
  const [streamingInfo, setStreamingInfo] = useState(null);

  const getTitle = async () => {
    try {
      const result = await axios.get('api/search/', {
        params: {title}
      });
      const {data} = result;
      setSearchResults(data.results)
    } catch (error) {}
  }

  return (
    <div>
      <main className="App">
        <h1 className="Title">
          <span className="text-red">Streaming</span> Availabilty
        </h1>
        <h5>Find where to stream your favorite TV Shows and Movies from 150+ Streaming platforms</h5>
        
        <form className="form-container"
        onSubmit={e => {
          getTitle();
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
      <div className='search-results'>

      </div>
      <div>
      <h1> results</h1>
      {searchResults && (
				<div className="mt-10">
					<div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
						{searchResults
							.filter(item => item.imageurl && item.imageurl[0]) // Remove results with no images
							.map(item => (
								<div key={item.title} className="pt-6">
									<div className="flow-root bg-light rounded-lg px-4 pb-8">
										<div className="-mt-6">
											<div className="flex items-center justify-center">
												<span className="p-2">
													{item.imageurl &&
														item.imageurl[0] && (
															<img
																src={
																	item
																		.imageurl[0]
																}
																className="w-full h-full rounded-lg"
																alt={item.title}
															/>
														)}
												</span>
											</div>
											<div className="text-center justify-center items-center">
												<h3 className="mt-4 text-lg font-bold w-full break-words overflow-x-auto text-primary tracking-tight">
													{item.title}
												</h3>
												<span className="mt-2 text-sm text-secondary block">
													{item.released} -{' '}
													{item.genre[0]}
												</span>
												<p className="mt-4 text-sm leading-relaxed text-secondary block">
													{item.synopsis}
												</p>
												<button className="mt-5 text-md  text-active">
													Streaming Details &darr;
												</button>
											</div>
										</div>
									</div>
								</div>
							))}
					</div>
				</div>
			)}
      </div>
      </main>
      
    </div>
  );
};

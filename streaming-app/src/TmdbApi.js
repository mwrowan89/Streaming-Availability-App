import React from 'react'
import axios from 'axios'

const tmdbMovieInfo = async () => {
    const movieOptions = {
        method: "GET",
        url: "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_year=2024&sort_by=popularity.desc",
        headers: {
          accept: "application/json",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMTM3Y2NmZTcxMjY3NjYxMzMzNDVhZjZlOWJmY2Y5ZSIsInN1YiI6IjY2NWU0ZDk4N2U3NGNlNTcyMzIzMWM3ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Bws_3Y0C7Tah8B0W1oV4kn9soF-vrTTl803_ccppujI",
        },
    }


try {
    const response = await axios.request(movieOptions);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movie data from TMDB API", error);
    throw error;
}
}

export default tmdbMovieInfo;
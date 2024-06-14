import axios from 'axios';

const API_KEY = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMTM3Y2NmZTcxMjY3NjYxMzMzNDVhZjZlOWJmY2Y5ZSIsInN1YiI6IjY2NWU0ZDk4N2U3NGNlNTcyMzIzMWM3ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Bws_3Y0C7Tah8B0W1oV4kn9soF-vrTTl803_ccppujI";

const movieOptions = (page) => ({
  method: "GET",
  url: "https://api.themoviedb.org/3/discover/movie",
  params: {
    include_adult: true,
    include_video: false,
    language: "en-US",
    page: page,
    primary_release_year: 2024,
    sort_by: "popularity.desc"
  },
  headers: {
    accept: "application/json",
    Authorization: API_KEY,
  },
});

const tvOptions = (page) => ({
  method: "GET",
  url: "https://api.themoviedb.org/3/discover/tv",
  params: {
    include_adult: true,
    include_null_first_air_dates: false,
    language: "en-US",
    page: page,
    sort_by: "popularity.desc"
  },

  headers: {
    accept: "application/json",
    Authorization: API_KEY,
  },
});

export const tmdbMovieInfo = async (page) => {
  try {
    const response = await axios.request(movieOptions(page));
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movie data from TMDB API", error);
    throw error;
  }
};

export const tmdbTvInfo = async (page) => {
  try {
    const response = await axios.request(tvOptions);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching TV data from TMDB API", error);
    throw error;
  }
};

import axios from 'axios';

const movieOptions = {
  method: "GET",
  url: "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_year=2024&sort_by=popularity.desc",
  headers: {
    accept: "application/json",
    Authorization: "Bearer YOUR_ACCESS_TOKEN",
  },
};

const tvOptions = {
  method: "GET",
  url: "https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc",
  headers: {
    accept: "application/json",
    Authorization: "Bearer YOUR_ACCESS_TOKEN",
  },
};

export const tmdbMovieInfo = async () => {
  try {
    const response = await axios.request(movieOptions);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movie data from TMDB API", error);
    throw error;
  }
};

export const tmdbTvInfo = async () => {
  try {
    const response = await axios.request(tvOptions);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching TV data from TMDB API", error);
    throw error;
  }
};

import axios from "axios";

const API_KEY =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMTM3Y2NmZTcxMjY3NjYxMzMzNDVhZjZlOWJmY2Y5ZSIsInN1YiI6IjY2NWU0ZDk4N2U3NGNlNTcyMzIzMWM3ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Bws_3Y0C7Tah8B0W1oV4kn9soF-vrTTl803_ccppujI";

const movieOptions = (page) => ({
  method: "GET",
  url: "https://api.themoviedb.org/3/discover/movie",
  params: {
    include_adult: true,
    include_video: false,
    language: "en-US",
    page: page,
    primary_release_year: 2024,
    sort_by: "popularity.desc",
  },
  headers: {
    accept: "application/json",
    Authorization: API_KEY,
  },
});

const trendingMovieOptions = () => ({
  method: "GET",
  url: "https://api.themoviedb.org/3/trending/movie/week?language=en-US",
  headers: {
    accept: "application/json",
    Authorization: API_KEY,
  },
});

const topRatedMovieOptions = (page) => ({
  method: "GET",
  url: "https://api.themoviedb.org/3/movie/top_rated",
  params: {
    language: "en-US",
    page: page,
  },
  headers: {
    accept: "application/json",
    Authorization: API_KEY,
  },
});

const popularMovieOptions = (page) => ({
  method: "GET",
  url: "https://api.themoviedb.org/3/movie/popular",
  params: {
    language: "en-US",
    page: page,
  },
  headers: {
    accept: "application/json",
    Authorization: API_KEY,
  },
});

const upcomingMovieOptions = (page) => ({
  method: "GET",
  url: "https://api.themoviedb.org/3/movie/upcoming",
  params: {
    language: "en-US",
    page: page,
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
    include_adult: false,
    include_null_first_air_dates: false,
    language: "en-US",
    page: page,
    sort_by: "popularity.desc",
  },

  headers: {
    accept: "application/json",
    Authorization: API_KEY,
  },
});

const trendingTvOptions = () => ({
  method: "GET",
  url: "https://api.themoviedb.org/3/trending/tv/week?language=en-US",
  headers: {
    accept: "application/json",
    Authorization: API_KEY,
  },
});

const popularTvOptions = (page) => ({
  method: "GET",
  url: "https://api.themoviedb.org/3/discover/tv",
  params: {
    include_adult: false,
    include_null_first_air_dates: false,
    language: "en-US",
    page: page,
    sort_by: "popularity.desc",
  },
  headers: {
    accept: "application/json",
    Authorization: API_KEY,
  },
});

const peopleOptions = () => ({
  method: "GET",
  url: "https://api.themoviedb.org/3/person/popular?language=en-US&page=1",
  headers: {
    accept: "application/json",
    Authorization: API_KEY,
  },
});

export const tmdbTrendingMovies = async () => {
  try {
    const response = await axios.request(trendingMovieOptions());
    return response.data.results;
  } catch (error) {
    console.error("Error fetching trending movies", error);
    throw error;
  }
};

export const tmdbPopularMovies = async (page) => {
  try {
    const response = await axios.request(popularMovieOptions(page));
    return response.data.results;
  } catch (error) {
    console.error("Error fetching trending movies", error);
    throw error;
  }
};

export const tmdbUpcomingMovies = async (page) => {
  try {
    const response = await axios.request(upcomingMovieOptions(page));
    return response.data.results;
  } catch (error) {
    console.error("Error fetching trending movies", error);
    throw error;
  }
};

export const tmdbTopRatedMovies = async (page) => {
  try {
    const response = await axios.request(topRatedMovieOptions(page));
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movie data from TMDB API", error);
    throw error;
  }
};

export const tmdbPeopleInfo = async () => {
  try {
    const response = await axios.request(peopleOptions());
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movie data from TMDB API", error);
    throw error;
  }
};

export const tmdbPopMovieInfo = async (page) => {
  try {
    const response = await axios.request(movieOptions(page));
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movie data from TMDB API", error);
    throw error;
  }
};

export const tmdbPopTvInfo = async (page) => {
  try {
    const response = await axios.request(tvOptions(page));
    return response.data.results;
  } catch (error) {
    console.error("Error fetching TV data from TMDB API", error);
    throw error;
  }
};

export const tmdbTrendingTv = async () => {
  try {
    const response = await axios.request(trendingTvOptions());
    return response.data.results;
  } catch (error) {
    console.error("Error fetching trending movies", error);
    throw error;
  }
};

export const tmdbPopularTv = async (page) => {
  try {
    const response = await axios.request(popularTvOptions(page));
    return response.data.results;
  } catch (error) {
    console.error("Error fetching trending movies", error);
    throw error;
  }
};

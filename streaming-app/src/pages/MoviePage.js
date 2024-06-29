import React from "react";
import Menu from "../components/Menu";
import MovieApi from "../components/MovieApi";
import Footer from "../components/Footer";
import RatingCircle from "../components/RatingCircle";

const MoviePage = () => {
  return (
    <div className="App">
      <Menu />
      <MovieApi />
      <Footer />
    </div>
  );
};

export default MoviePage;

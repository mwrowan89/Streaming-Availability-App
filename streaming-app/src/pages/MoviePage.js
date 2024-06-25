import React from "react";
import Menu from "../components/Menu";
import MovieApi from "../components/MovieApi";
import { useState } from "react";

const MoviePage = () => {
  return (
    <div className="App">
      <Menu />

      <MovieApi />
    </div>
  );
};

export default MoviePage;

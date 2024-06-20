import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import MoviePage from "./pages/MoviePage";
import TvPage from "./pages/TvPage";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/movies" element={<MoviePage />} />
        <Route path="/tv-shows" element={<TvPage />} />
        <Route path="/" element={<App />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import MoviePage from "./pages/MoviePage";
import TvPage from "./pages/TvPage";
import PeoplePage from "./pages/PeoplePage";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/people" element={<PeoplePage />} />
        <Route path="/movies" element={<MoviePage />} />
        <Route path="/tv-shows" element={<TvPage />} />
        <Route path="/" element={<App />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;

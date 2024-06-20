import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import MoviePage from "./pages/MoviePage";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/movies" element={<MoviePage />} />
        <Route path="/" element={<App />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;

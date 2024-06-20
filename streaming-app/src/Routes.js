import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "./App";
import MoviePage from "./pages/MoviePage";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <App />
        </Route>
        <Route path="/movies">
          <MoviePage />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;

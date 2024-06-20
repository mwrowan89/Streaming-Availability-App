import React from "react";
import Menu from "../components/Menu";
import TvApi from "../components/TvApi";
import { useState } from "react";

const TvPage = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };
  return (
    <>
      <div className="App">
        <Menu />
        <h2>
          <label htmlFor="options">Search Movies By: &nbsp;</label>
          <select id="options" value={selectedOption} onChange={handleChange}>
            <option value="">Select...</option>
            <option value="movies">Movies</option>
            <option value="tv-shows">TV Shows</option>
            <option value="people">People</option>
          </select>
        </h2>
        <TvApi />
      </div>
    </>
  );
};

export default TvPage;

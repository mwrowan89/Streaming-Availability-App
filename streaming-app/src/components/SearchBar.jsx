import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";

const SearchBar = () => {
  const [title, setTitle] = useState(null);
  const navigate = useNavigate();

  const handleNavigation = (path, query) => {
    navigate(`${path}?query=${query}`);
  };

  return (
    <div>
      <form
        className="form-container"
        onSubmit={(e) => {
          e.preventDefault();
          handleNavigation("/search", title);
        }}
      >
        <input
          className="form"
          type="text"
          placeholder=" Enter a Title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />

        <button className="button" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;

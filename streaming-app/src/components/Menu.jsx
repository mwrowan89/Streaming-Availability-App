import React, { useState } from "react";
import "./Menu.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

const Menu = () => {
  const [searchBar, setSearchBar] = useState(false);
  const SearchIcon = () => {
    return <FontAwesomeIcon icon={faSearch} />;
  };
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const toggleSearchBar = () => {
    setSearchBar(!searchBar);
  };

  return (
    <div className="menu-main">
      <h1
        className="menu-title"
        onClick={() => {
          handleNavigation("/");
        }}
      >
        <span className="text-red">Discover</span> Titles
      </h1>
      <div className="menu-filter-options">
        <h3 onClick={() => handleNavigation("/movies")}>Movies</h3>
        <h3 onClick={() => handleNavigation("/tv-shows")}>TV Shows</h3>
        <h3 onClick={() => handleNavigation("/people")}>People</h3>
        <div onClick={toggleSearchBar}>
          <SearchIcon />
        </div>
        {/* TODO: add search functionality */}
      </div>
      {searchBar && <SearchBar />}
    </div>
  );
};

export default Menu;

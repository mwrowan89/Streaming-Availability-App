import React from "react";
import "./Menu.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Menu = () => {
  const SearchIcon = () => {
    return <FontAwesomeIcon icon={faSearch} />;
  };

  return (
    <div className="menu-main">
      <h1 className="menu-title">
        <span className="text-red">Discover</span> Titles
      </h1>

      <div className="menu-filter-options">
        <h3>Movies</h3>
        <h3>TV Shows</h3>
        <h3>People</h3>
        <SearchIcon />
      </div>
    </div>
  );
};

export default Menu;

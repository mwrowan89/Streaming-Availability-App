import React from "react";
import "./Menu.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const SearchIcon = () => {
    return <FontAwesomeIcon icon={faSearch} />;
  };
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
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
        <SearchIcon />
        {/* TODO: add search functionality */}
      </div>
    </div>
  );
};

export default Menu;

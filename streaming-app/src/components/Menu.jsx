import React from "react";
import "./Menu.css";

const Menu = () => {
  return (
    <div className="menu-main">
      <h1 className="Title">
        <span className="text-red">Discover</span> Titles
      </h1>

      <div className="menu-filter-options">
        <h3>Movies</h3>
        <h3>TV Shows</h3>
        <h3>People</h3>
      </div>
    </div>
  );
};

export default Menu;

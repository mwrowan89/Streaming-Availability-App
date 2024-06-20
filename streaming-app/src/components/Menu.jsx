import React from "react";
import "./Menu.css";

const Menu = () => {
  return (
    <div className="menu-main">
      <div className="hamburger-main">
        <div className="hamburger-icon"></div>
        <div className="hamburger-icon"></div>
        <div className="hamburger-icon"></div>
      </div>

      <div className="menu-filter-options">
        <h3>Movies</h3>
        <h3>TV Shows</h3>
        <h3>People</h3>
      </div>
    </div>
  );
};

export default Menu;

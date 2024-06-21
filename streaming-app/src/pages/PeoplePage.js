import React from "react";
import Menu from "../components/Menu";
import PeopleApi from "../components/PeopleApi";

const PeoplePage = () => {
  return (
    <div className="App">
      <Menu />
      <h1>People Search</h1>
      <PeopleApi />
    </div>
  );
};

export default PeoplePage;

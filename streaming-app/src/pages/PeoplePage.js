import React from "react";
import Menu from "../components/Menu";
import PeopleApi from "../components/PeopleApi";
import Footer from "../components/Footer";

const PeoplePage = () => {
  return (
    <div className="App">
      <Menu />
      <PeopleApi />
      <Footer />
    </div>
  );
};

export default PeoplePage;

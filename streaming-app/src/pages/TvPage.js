import React from "react";
import Menu from "../components/Menu";
import TvApi from "../components/TvApi";
import Footer from "../components/Footer";

const TvPage = () => {
  return (
    <>
      <div className="App">
        <Menu />
        <TvApi />
        <Footer />
      </div>
    </>
  );
};

export default TvPage;

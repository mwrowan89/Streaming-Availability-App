import React from "react";
import Menu from "../components/Menu";
import TvApi from "../components/TvApi";
import Footer from "../components/Footer";
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
        <TvApi />
        <Footer />
      </div>
    </>
  );
};

export default TvPage;

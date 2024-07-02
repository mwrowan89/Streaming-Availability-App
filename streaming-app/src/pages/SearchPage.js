import React from "react";
import SearchBar from "../components/SearchBar";
import Menu from "../components/Menu";
import Footer from "../components/Footer";

const SearchPage = () => {
  return (
    <div className="App">
      <Menu />
      <SearchBar />
      <Footer />
    </div>
  );
};

export default SearchPage;

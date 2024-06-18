import React from "react";

const SearchBar = () => {
  return (
    <div>
      <form
        className="form-container"
        onSubmit={(e) => {
          getTitle();
          e.preventDefault();
        }}
      >
        <input
          className="form"
          type="text"
          placeholder=" Enter a Title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />

        <button className="button" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;

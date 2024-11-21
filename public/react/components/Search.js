import React, { useState, useEffect } from "react";
import "./AllItems.css";

function SearchBar({ setSearchTerm }) {
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <form className="d-flex searchBar-1" role="search">
      <input
        className="form-control"
        type="search"
        placeholder="Search items..."
        aria-label="Search"
        onChange={handleSearchChange}
      />
    </form>
  );
}

export default SearchBar;

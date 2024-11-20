import React, { useState, useEffect } from "react";

function SearchBar({ setSearchTerm }) {

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search items..."
        onChange={handleSearchChange} 
        style={{ width: "100%", padding: "10px", marginBottom: "20px" }}
      />
    </div>
  );
}

export default SearchBar;
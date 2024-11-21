import React, { useState, useEffect } from "react";
import SearchBar from "./Search";
import "./AllItems.css";
import logo from "../images/stock-n-load-logo.png";

function AllItems({ view, setView, items, setActiveItem }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortItems = (items) => {
    if (sortOption === "price-asc") {
      return [...items].sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      return [...items].sort((a, b) => b.price - a.price);
    } else if (sortOption === "name-asc") {
      return [...items].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "name-desc") {
      return [...items].sort((a, b) => b.name.localeCompare(a.name));
    } else {
      return items;
    }
  };

  const sortedItems = sortItems(filteredItems);

  function handleSingleItem(item) {
    setActiveItem(item);
    setView(2);
  }

  return (
    <>
      <div className="logo-container">
        <img src={logo} alt="logo" className="logo" />
        <h1 className="logo-title">Stock-N-Load</h1>
      </div>
      <div className="searchBarContainer-1">
        <SearchBar setSearchTerm={setSearchTerm} />
        <button
          className="btn btn-success createItemBtn-1"
          onClick={() => setView(3)}
        >
          <span className="createItemText-1">Create Item</span>{" "}
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>
      <div className="dropdown-1">
        <label htmlFor="sort-dropdown">Sort By:</label>
        <select
          id="sort-dropdown"
          className="form-select form-select-sm"
          onChange={(e) => setSortOption(e.target.value)}
          value={sortOption}
        >
          <option value="">All</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name: A to Z</option>
          <option value="name-desc">Name: Z to A</option>
        </select>
      </div>
      <div className="itemsContainer-1 my-5 mx-3">
        {sortedItems &&
          sortedItems.map((item) => (
            <div
              onClick={() => handleSingleItem(item)}
              style={{ cursor: "pointer" }}
              className="card itemCard-1"
              key={item.id}
            >
              <div className="card-body">
                <h5 className="card-title">
                  <strong>{item.name}</strong>
                </h5>
                <h5 className="card-title">£{item.price.toFixed(2)}</h5>
              </div>
              <img src={item.image} className="item-img-1" alt="item image" />
            </div>
          ))}
      </div>
    </>
  );
}

export default AllItems;

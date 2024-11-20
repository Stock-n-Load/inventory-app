import React, { useState, useEffect } from "react";
import SearchBar from "./Search";
import "./AllItems.css";

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
      <h1 className="header-1">View All Items</h1>
      <button onClick={() => setView(3)}>Create Item</button>

      <SearchBar setSearchTerm={setSearchTerm} />

      <select
        onChange={(e) => setSortOption(e.target.value)}
        value={sortOption}
      >
        <option value="">Sort By</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="name-asc">Name: A to Z</option>
        <option value="name-desc">Name: Z to A</option>
      </select>

      <div className="itemsContainer-1">
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

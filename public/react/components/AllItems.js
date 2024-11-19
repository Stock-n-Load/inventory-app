import React, { useState, useEffect } from "react";

// Prepend the API URL to any fetch calls.
import apiURL from "../api";

function AllItems({ view, setView, items, setActiveItem }) {
  function handleSingleItem(item) {
    setActiveItem(item);
    setView(2);
  }

  return (
    <>
      {console.log(items)}
      <h1>View All Items</h1>
      <button onClick={() => setView(3)}>Create Item</button>
      {items &&
        items.map((item) => (
          <div
            onClick={() => handleSingleItem(item)}
            style={{ cursor: "pointer" }}
            className="card"
            key={item.id}
          >
            <img
              src={item.image}
              className="card-img-top"
              alt="item image"
              style={{ width: "200px" }}
            />
            <div className="card-body">
              <h5 className="card-title">
                <strong>{item.name}</strong>
              </h5>
              <h5 className="card-title">£{item.price.toFixed(2)}</h5>
            </div>
          </div>
        ))}
    </>
  );
}

export default AllItems;

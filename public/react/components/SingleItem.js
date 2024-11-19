import React, { useState, useEffect } from "react";

import apiURL from "../api";

function SingleItem({ setView, activeItem, setActiveItem }) {
  function handleBackToAllItems() {
    setView(1);
    setActiveItem([]);
  }

  return (
    <>
      <h1>Single Item</h1>
      <button onClick={() => handleBackToAllItems()}>Back</button>
      <button onClick={() => setView(4)}>Edit Item</button>
      <button onClick={() => setView(1)}>Delete Item</button>
      <h2>{activeItem.name}</h2>
      <p>£{activeItem.price.toFixed(2)}</p>
      <img
        src={activeItem.image}
        className="card-img-top"
        alt="item image"
        style={{ width: "200px" }}
      />
      <p>{activeItem.description}</p>
      <p>{activeItem.category}</p>
      {console.log(activeItem)}
    </>
  );
}

export default SingleItem;
